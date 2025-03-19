import React from 'react';
import PropTypes from 'prop-types';

import {
  StepCircle,
  StepLine,
  CheckIcon,
  StepContainer,
  StepLineWrapper,
  StepLineBackground,
  StepIndex,
} from './styles';

export function Step({
  index, isCurrentStep, isCompleted, hasNextStep, grow,
}) {
  return (
    <StepContainer>
      <StepLineWrapper>
        <StepCircle isActive={isCurrentStep} complete={isCompleted}>
          {isCompleted ? <CheckIcon name="global-small-check" /> : <StepIndex>{index + 1}</StepIndex>}
        </StepCircle>
        {hasNextStep && (
          <>
            <StepLineBackground />
            <StepLine isActive={isCurrentStep || isCompleted} grow={grow} />
          </>
        )}
      </StepLineWrapper>
    </StepContainer>
  );
}

Step.propTypes = {
  index: PropTypes.number.isRequired,
  isCurrentStep: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  hasNextStep: PropTypes.bool.isRequired,
  grow: PropTypes.bool.isRequired,
};
