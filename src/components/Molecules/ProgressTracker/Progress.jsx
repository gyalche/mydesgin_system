import React from 'react';
import PropTypes from 'prop-types';

import { Step } from './Step';
import {
  LabelContainer, StepLabel, StepLabelContainer, TrackerContainer,
} from './styles';

function ProgressTracker({ steps, currentStep }) {
  const stepCount = steps.length;

  const currentStepIndex = typeof currentStep === 'string'
    ? steps.findIndex(step => step.id === currentStep)
    : currentStep;

  return (
    <TrackerContainer>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrentStep = index === currentStepIndex;
        const hasNextStep = index < stepCount - 1;

        const getStepLabel = () => {
          if (isCompleted) return step?.completedLabel;
          if (isCurrentStep) return step?.inProgressLabel;
          return step?.label;
        };

        return (
          <StepLabelContainer key={step?.id || index}>
            <Step
              index={index}
              isCompleted={isCompleted}
              isCurrentStep={isCurrentStep}
              hasNextStep={hasNextStep}
              grow={isCompleted}
            />
            <LabelContainer>
              <StepLabel hasCompleted={isCompleted} isInProgress={isCurrentStep} lastIndex={index === stepCount - 1}>
                {getStepLabel()}
              </StepLabel>
            </LabelContainer>
          </StepLabelContainer>
        );
      })}
    </TrackerContainer>
  );
}

ProgressTracker.displayName = 'ProgressTracker';

ProgressTracker.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      completedLabel: PropTypes.string,
      inProgressLabel: PropTypes.string,
    }),
  ).isRequired,
  currentStep: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

ProgressTracker.defaultProps = {
  currentStep: 0,
};

export default ProgressTracker;
