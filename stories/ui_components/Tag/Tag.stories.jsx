import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tag } from 'components/Atoms';
import * as Logos from 'components/Atoms/Logo';

import {
  StoryContainer,
  Section,
  SectionTitle,
  Description,
  TagsContainer,
  TagGrid,
  TagColumn,
  TagStateLabel,
  AppearancesContainer,
  BorderedContainer,
  TagStack,
} from './Tag.stories.styles';

// Styled wrapper for logos to ensure proper sizing in graphics
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// Helper component to render a logo as a graphic
function LogoGraphic({ logo: Logo }) {
  return (
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
  );
}

LogoGraphic.propTypes = {
  logo: PropTypes.elementType.isRequired,
};

const meta = {
  title: 'ui_components/Tag',
  component: Tag,
  tags: ['!dev'],
};

export default meta;

export const TagComponent = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the tag to display',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the remove button is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    graphic: {
      control: false,
      description: 'Custom React element to use as a graphic (optional)',
      table: {
        type: { summary: 'node' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the tag will be disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    isActive: {
      control: 'boolean',
      description: 'If true, the tag will appear in an active state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    name: 'Filter',
    onClick: () => null,
    disabled: false,
    isActive: false,
  },
};

export const UsageExamples = {
  render: () => (
    <StoryContainer>
      <Section>
        <SectionTitle>Basic Tag</SectionTitle>
        <Tag name="Filter" onClick={() => null} />
      </Section>

      <Section>
        <SectionTitle>Tag with Graphic</SectionTitle>
        <Tag
          name="Zoom"
          onClick={() => null}
          graphic={<LogoGraphic logo={Logos.Zoom} />}
        />
      </Section>

      <Section>
        <SectionTitle>Multiple Tags</SectionTitle>
        <TagsContainer>
          <Tag name="Tokyo Office" onClick={() => null} />
          <Tag name="Meeting Room A" onClick={() => null} />
          <Tag name="Reception" onClick={() => null} />
        </TagsContainer>
      </Section>

      <Section>
        <SectionTitle>Long Tag Name (Auto-truncated)</SectionTitle>
        <Tag
          name="青葉台タワー-8-Reception Room1 (10) with a very very very very very very very very long name that will be truncated"
          onClick={() => null}
        />
      </Section>
    </StoryContainer>
  ),
};

// Appearances
export const Appearances = {
  render: () => (
    <AppearancesContainer>
      <Section>
        <SectionTitle>Standard Tags</SectionTitle>
        <TagGrid>
          <TagColumn>
            <TagStateLabel>Default</TagStateLabel>
            <Tag name="Filter" onClick={() => null} />
          </TagColumn>
          <TagColumn>
            <TagStateLabel>Hover</TagStateLabel>
            <Tag name="Filter" onClick={() => null} />
          </TagColumn>
          <TagColumn>
            <TagStateLabel>Pressed</TagStateLabel>
            <Tag name="Filter" onClick={() => null} isActive={true} />
          </TagColumn>
          <TagColumn>
            <TagStateLabel>Disabled</TagStateLabel>
            <Tag name="Filter" onClick={() => null} disabled={true} />
          </TagColumn>
        </TagGrid>
      </Section>

      <Section>
        <SectionTitle>Tags with Graphics</SectionTitle>
        <TagGrid>
          <TagColumn>
            <TagStateLabel>Default</TagStateLabel>
            <Tag
              name="Slack"
              onClick={() => null}
              graphic={<LogoGraphic logo={Logos.Slack} />}
            />
          </TagColumn>
          <TagColumn>
            <TagStateLabel>Hover</TagStateLabel>
            <Tag
              name="Google"
              onClick={() => null}
              graphic={<LogoGraphic logo={Logos.Google} />}
            />
          </TagColumn>
          <TagColumn>
            <TagStateLabel>Pressed</TagStateLabel>
            <Tag
              name="Microsoft Teams"
              onClick={() => null}
              graphic={<LogoGraphic logo={Logos.MicrosoftTeams} />}
              isActive={true}
            />
          </TagColumn>
          <TagColumn>
            <TagStateLabel>Disabled</TagStateLabel>
            <Tag
              name="Receptionist"
              onClick={() => null}
              graphic={<LogoGraphic logo={Logos.Receptionist} />}
              disabled={true}
            />
          </TagColumn>
        </TagGrid>
      </Section>
    </AppearancesContainer>
  ),
};

// Width behavior demonstration
export const WidthBehavior = {
  render: () => (
    <StoryContainer>
      <Section>
        <SectionTitle>Width Behavior</SectionTitle>
        <Description>Tags only take up as much width as their content requires</Description>
        <BorderedContainer marginBottom="16px">
          <TagStack>
            <Tag name="Short Tag" onClick={() => null} />
            <Tag name="Medium Length Tag Example" onClick={() => null} />
            <Tag name="This is a very long tag that demonstrates proper width behavior" onClick={() => null} />
          </TagStack>
        </BorderedContainer>
      </Section>

      <Section>
        <SectionTitle>Multiple tags in a row</SectionTitle>
        <BorderedContainer>
          <TagsContainer>
            <Tag name="Tag 1" onClick={() => null} />
            <Tag name="Tag 2" onClick={() => null} />
            <Tag name="Tag 3" onClick={() => null} />
          </TagsContainer>
        </BorderedContainer>
      </Section>

      <Section>
        <SectionTitle>Text Truncation with Ellipsis</SectionTitle>
        <Description>Long text is truncated with an ellipsis when the tag width is constrained</Description>
        <div
          style={{
            width: '200px',
            border: '1px dashed #ccc',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <Tag
            name="This is a very long tag name that will be truncated with an ellipsis"
            onClick={() => null}
          />
        </div>
        <div
          style={{
            width: '150px',
            border: '1px dashed #ccc',
            padding: '16px',
          }}
        >
          <Tag
            name="Even more truncation in a narrower container"
            onClick={() => null}
            graphic={<LogoGraphic logo={Logos.Zoom} />}
          />
        </div>
      </Section>
    </StoryContainer>
  ),
};
