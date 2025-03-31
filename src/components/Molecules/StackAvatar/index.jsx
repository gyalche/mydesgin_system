import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'components/Atoms';

import useClickOutside from '../../../hooks/useClickOutside';
import {
  AddAvatar,
  AddIcon,
  DropDownWrapper,
  StackAvatarContainer,
} from './style';
import StackedAvatars from './StackedAvatars';
import DefaultDropdownContent from './DefaultDropDown';

function StackAvatar({
  fields,
  editable,
  maxElementsToShow,
  onEditComponent,
  editFields,
  fetchEditFields,
  input,
}) {
  // UI state - always needed
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data state - needed for uncontrolled mode
  const [usersList, setUsersList] = useState(fields || []);
  const [dropdownItems, setDropdownItems] = useState(editFields || []);

  const dropDownRef = useRef(null);

  // Handle outside clicks to close dropdown
  useClickOutside(dropDownRef, () => {
    if (openDropDown) setOpenDropDown(false);
  });

  // Toggle dropdown visibility
  const handleOpenDropdown = useCallback(() => {
    setOpenDropDown(prev => !prev);
  }, []);

  // Fetch dropdown items when needed
  useEffect(() => {
    const fetchData = async () => {
      if (openDropDown && fetchEditFields && dropdownItems.length === 0) {
        try {
          setIsLoading(true);
          const items = await fetchEditFields();
          setDropdownItems(items);
        } catch (error) {
          console.error('Error fetching dropdown data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [openDropDown, fetchEditFields, dropdownItems.length]);

  // Handle user selection/deselection
  const handleDropDownOnChange = useCallback(user => {
    const updateList = prevList => {
      const isUserInList = prevList.some(u => u.name === user.name && u.img === user.img);

      if (isUserInList) {
        return prevList.filter(u => !(u.name === user.name && u.img === user.img));
      }
      return [...prevList, user];
    };

    // Form integration (controlled mode)
    if (input?.onChange) {
      input.onChange(updateList(input.value || []));
      return;
    }

    // Standalone usage (uncontrolled mode)
    setUsersList(prev => updateList(prev));
  }, [input]);

  // Memoize sorted dropdown items
  const filteredDropDown = useMemo(
    () => dropdownItems?.sort((a, b) => a.name.localeCompare(b.name)),
    [dropdownItems],
  );

  // Determine which users list to use (controlled or uncontrolled)
  const effectiveUsersList = input?.value ?? usersList;

  // Render dropdown content with appropriate component
  const renderDropdownContent = useCallback(() => {
    const Component = onEditComponent || DefaultDropdownContent;
    return (
      <Component
        editFields={filteredDropDown}
        usersList={effectiveUsersList}
        handleDropDownOnChange={handleDropDownOnChange}
        isLoading={isLoading}
      />
    );
  }, [filteredDropDown, effectiveUsersList, handleDropDownOnChange, isLoading, onEditComponent]);

  return (
    <StackAvatarContainer>
      <StackedAvatars users={effectiveUsersList} max={maxElementsToShow} />
      {editable && (
        <DropDownWrapper>
          <AddAvatar
            role="button"
            opened={openDropDown}
            onClick={handleOpenDropdown}
            tabIndex={0}
            aria-expanded={openDropDown}
            aria-haspopup="true"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenDropdown();
              }
            }}
          >
            <AddIcon name="action-plus" />
          </AddAvatar>
          <Dropdown ref={dropDownRef} h="200px" w="240px" isOpen={openDropDown} mt="34px">
            {renderDropdownContent()}
          </Dropdown>
        </DropDownWrapper>
      )}
    </StackAvatarContainer>
  );
}

StackAvatar.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  })),
  editable: PropTypes.bool,
  maxElementsToShow: PropTypes.number,
  onEditComponent: PropTypes.elementType,
  editFields: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  })),
  fetchEditFields: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
    })),
    onChange: PropTypes.func,
  }),
};

StackAvatar.defaultProps = {
  fields: [],
  editable: true,
  maxElementsToShow: 10,
  onEditComponent: null,
  editFields: [],
  fetchEditFields: null,
  input: {},
};

export default StackAvatar;
