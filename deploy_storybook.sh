#!/usr/bin/env bash

SLACK_URL="${SLACK_URL:-}"
BOTNAME="frontend-deploy"
EMOJI=":rocket:"
APPNAME="Design System"

target_env=$1

if [[ ${target_env} != "prod" ]] && [[ ${target_env} != "staging" ]] && [[ ${target_env} != "testing" ]]; then
  echo "Specify stage"
  exit 1
fi

if [[ -z "" ]]; then
  echo "Set SLACK_URL before running this script"
  exit 1
fi

# s3 bucket
case "$target_env" in
  "prod")      s3_bucket="storybook.receptionist.jp" ;;
esac

# cloudfront distribution
case "$target_env" in
  "prod")      dist_id="E1R7O1G5RGY6HL" ;;
esac

case "$target_env" in
  "prod")      CHANNEL="#infra-design-system" ;;
esac

function notifiy_slack() {
  person=$(whoami)
  branch=$(git branch | grep \*)
  payload=$(cat <<-EOF
    {
      "channel": "$CHANNEL",
      "username": "$BOTNAME",
      "icon_emoji": "$EMOJI",
      "attachments": [
        {
          "fallback": "$1",
          "text": "$2",
          "color": "$3",
          "fields": [
            {
              "title": "User (Deploy)",
              "value": "$user"
            },
            {
              "title": "User (Build)",
              "value": "$person"
            },
            {
              "title": "Stage",
              "value": "$target_env"
            },
            {
              "title": "Branch",
              "value": "$branch"
            }
          ]
        }
      ]
    }
EOF
)

  curl -X POST --data-urlencode "payload=$payload" $SLACK_URL
}

function build() {
  text="$APPNAME web deploy :starting"
  notifiy_slack "start" "$text" ""
  echo "BUILDING for $target_env"
  npm run build:${target_env}
}

function deploy() {
  echo "DEPLOYING for $target_env"
  aws s3 sync storybook-static/ s3://$s3_bucket --profile receptionist
}

function remove_cache() {
  echo "REMOVING CACHE..."
  aws cloudfront create-invalidation --distribution-id $dist_id --paths '/*' --profile receptionist
}

function finish() {
  echo "DEPLOY TO $target_env DONE!!!"
  text=":tada: $APPNAME web deploy :success :tada:"
  notifiy_slack "deployed" "$text" "good"
}

function error() {
  echo "ERROR HAPPEND IN $1"
  text="$APPNAME web deploy :failed in $1"
  notifiy_slack "error" "$text" "danger"
  exit 0
}

build || error "build"
deploy || error "deploy"
remove_cache || error "remove cache"
finish
