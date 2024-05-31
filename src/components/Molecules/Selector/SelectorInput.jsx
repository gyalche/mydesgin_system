import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelect } from 'downshift';
import Dropdown from 'components/Atoms/Dropdown';

import Option from './Option';
import DefaultDisplay from './DefaultDisplay';

const SelectorContainer = styled.div`
  color: var(--rds-color-neutral-10);
  height: 100%;
  width: ${({ $w }) => $w};
  margin-top: ${({ $mt }) => $mt};
  margin-right: ${({ $mr }) => $mr};
  margin-bottom: ${({ $mb }) => $mb};
  margin-left: ${({ $ml }) => $ml};
`;

const SelectorList = styled.ul`
  margin: 0;
  overflow-y: auto;
  padding: 0;
  width: ${({ $w }) => $w};
  height: ${({ $h }) => $h};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--rds-color-neutral-0);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--rds-color-neutral-4);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--rds-color-neutral-4);
    border-radius: 3px;
  }
`;

const SelectorInput = ({
  h,
  w,
  mt,
  mr,
  mb,
  ml,
  dropdownHeight,
  options,
  optionsComponent,
  display,
  label,
  input,
  name,
  value,
  onChange,
  initialSelectedItem,
  ...rest
}) => {
  const handleOnChange = selectedItem => {
    if (onChange) {
      onChange(selectedItem);
      return;
    }

    input?.onChange(selectedItem);
  };

  // Initial item from react-final-form
  const initialItem = options.find(
    option =>
      option.value === value?.value || option.value === input?.value?.value
  );

  const firstItem = options[0];

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    onSelectedItemChange: ({ selectedItem }) => handleOnChange(selectedItem),
    initialSelectedItem: initialItem || initialSelectedItem || firstItem,
  });

  // Trigger handleOnChange with initially selected item's value on mount
  useEffect(() => {
    handleOnChange(selectedItem);
  }, []);

  const OptionsComponent = optionsComponent;

  const DisplayComponent = display || DefaultDisplay;

  return (
    <SelectorContainer
      $w={w}
      $mt={mt}
      $mr={mr}
      $mb={mb}
      $ml={ml}
      name={name || input?.name}
      data-testid="selector"
      {...rest}
    >
      <DisplayComponent
        h={h}
        selectedItem={selectedItem}
        isOpen={isOpen}
        label={label}
        {...getToggleButtonProps()}
      />
      <Dropdown
        scroll={false}
        isOpen={isOpen}
        w={w}
        h={dropdownHeight}
        mt="4px"
        overflowX="hidden"
      >
        {/* downshift checks if getMenuProps was called and that there is a menu node in existence,
         since Dropdown unmounts the menu node when isOpen is false, it gives a console error */}
        <SelectorList
          $w={w}
          $h={dropdownHeight}
          {...getMenuProps({}, { suppressRefError: true })}
        >
          {options.length > 0 &&
            options.map((item, index) => (
              <OptionsComponent
                key={item.value}
                item={item}
                index={index}
                highlightedIndex={highlightedIndex}
                getItemProps={getItemProps}
              >
                {item.label}
              </OptionsComponent>
            ))}
        </SelectorList>
      </Dropdown>
    </SelectorContainer>
  );
};

SelectorInput.defaultProps = {
  h: '40px',
  w: '240px',
  mt: '0',
  mr: '0',
  mb: '0',
  ml: '0',
  dropdownHeight: '200px',
  options: [],
  optionsComponent: Option,
  label: null,
};

SelectorInput.propTypes = {
  h: PropTypes.string,
  w: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  dropdownHeight: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
  options: PropTypes.array,
  optionsComponent: PropTypes.func,
  onChange: PropTypes.func,
  display: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  label: PropTypes.string,
  input: PropTypes.object,
  initialSelectedItem: PropTypes.object,
};

export default SelectorInput;
