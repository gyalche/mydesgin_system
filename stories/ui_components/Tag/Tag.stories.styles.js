import styled from 'styled-components';

import { Typography } from 'components/Atoms';
import { Flex } from 'components/Atoms/Layout';

// Common container for story sections
export const StoryContainer = styled(Flex).attrs({
  direction: 'column',
  gap: '32px',
})``;

// Section container
export const Section = styled(Flex).attrs({
  direction: 'column',
  gap: '1rem',
})``;

// Section title
export const SectionTitle = styled(Typography).attrs({
  level: 'h5',
  as: 'h5',
  mb: '16px',
})``;

// Description text
export const Description = styled(Typography).attrs({
  mb: '16px',
})``;

// Container for multiple tags
export const TagsContainer = styled(Flex).attrs({
  wrap: 'wrap',
  gap: '8px',
})``;

// Grid layout for tag examples
export const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 24px;
  max-width: 800px;
  width: 100%;
`;

// Column for individual tag examples
export const TagColumn = styled(Flex).attrs({
  direction: 'column',
  alignItems: 'center',
  minW: '120px',
  w: '100%',
})``;

// Label for tag state
export const TagStateLabel = styled.span`
  margin-bottom: 12px;
  font-weight: 500;
`;

// Container with larger spacing for appearance examples
export const AppearancesContainer = styled(Flex).attrs({
  direction: 'column',
  gap: '40px',
})``;

// Vertical stack of tags
export const BorderedContainer = styled(Flex).attrs({
  border: '1px dashed #ccc',
  w: '100%',
  pt: '20px',
  pr: '20px',
  pb: '20px',
  pl: '20px',
})`
margin-bottom: ${props => props.marginBottom || '0'};
`;

// Vertical stack of tags
export const TagStack = styled(Flex).attrs({
  direction: 'column',
  gap: '16px',
})``;
