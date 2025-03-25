import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'components/Atoms';

// Import Users component directly to avoid any import issues
import Users from './Users';

function DefaultDropdownContent({
  editFields,
  usersList,
  handleDropDownOnChange,
  isLoading,
}) {
  if (isLoading) {
    return <Typography level="p2" p="10px">Loading users...</Typography>;
  }

  if (!editFields?.length) {
    return <Typography level="p2" p="10px">No users available</Typography>;
  }

  return (
    editFields.map(user => (
      <Users
        key={user?.name}
        usersList={usersList}
        name={user?.name}
        img={user?.img}
        onChange={() => handleDropDownOnChange(user)}
      />
    ))
  );
}

DefaultDropdownContent.propTypes = {
  editFields: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  })),
  usersList: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
  })),
  handleDropDownOnChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

DefaultDropdownContent.defaultProps = {
  editFields: [],
  usersList: [],
  isLoading: false,
};

export default DefaultDropdownContent;
