import React from 'react';
import PropTypes from 'prop-types';

import StackAvatar from 'components/Molecules/StackAvatar';
import * as Layout from 'components/Atoms/Layout';
import { Typography, Avatar } from 'components/Atoms';

const meta = {
  title: 'UI Components/StackAvatar',
  component: StackAvatar,
  tags: ['!dev'],
  parameters: {
    controls: {
      exclude: ['input'],
    },
  },
};

export default meta;

// Enhanced custom dropdown component
function CustomDropdownComponent({
  editFields = [], usersList = [], handleDropDownOnChange, isLoading,
}) {
  if (isLoading) {
    return (
      <div style={{ padding: '15px', textAlign: 'center' }}>
        <Typography level="p2" style={{ color: '#4a6cf7' }}>Loading custom users...</Typography>
      </div>
    );
  }

  if (!editFields?.length) {
    return (
      <div style={{ padding: '15px', textAlign: 'center' }}>
        <Typography level="p2" style={{ color: '#f76e6e' }}>No users available</Typography>
      </div>
    );
  }

  // Check if a user is already selected
  const isSelected = user => usersList.some(u => u.name === user.name && u.img === user.img);

  return (
    <div
      style={{
        padding: '10px',
        width: '100%',
        background: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <Typography level="p2" style={{ fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
        Select Users
      </Typography>

      {editFields.map(user => {
        const selected = isSelected(user);

        return (
          <div
            key={user.name}
            onClick={() => handleDropDownOnChange(user)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDropDownOnChange(user);
              }
            }}
            tabIndex={0}
            style={{
              cursor: 'pointer',
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '4px',
              marginBottom: '5px',
              backgroundColor: selected ? '#e6f7ff' : 'transparent',
              border: selected ? '1px solid #91d5ff' : '1px solid transparent',
              transition: 'all 0.2s',
            }}
            role="option"
            aria-selected={selected}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar name={user.name} img={user.img} size="small" />
              <Typography level="p2">{user.name}</Typography>
            </div>

            {selected && (
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#1890ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                ✔
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

CustomDropdownComponent.propTypes = {
  editFields: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, img: PropTypes.string })),
  usersList: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, img: PropTypes.string })),
  handleDropDownOnChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

CustomDropdownComponent.defaultProps = {
  editFields: [],
  usersList: [],
  handleDropDownOnChange: () => {},
  isLoading: false,
};

// Default dropdown example
export const StackAvatars = {
  argTypes: {
    field: {
      description: 'Array of objects with img and name keys',
      control: {
        type: 'array',
      },
    },
    editable: {
      description: 'If true, the stack would be editable, otherwise read-only.',
      control: {
        type: 'boolean',
      },
    },
    maxElementsToShow: {
      description: 'Maximum number of elements to show in the stack.',
      control: {
        type: 'number',
      },
    },
    onEditComponent: {
      description: 'Edit component to render when editing the fields.',
      control: false,
    },
  },
  args: {
    fields: [
      { name: '山田太郎', img: '' },
      { name: '鈴木太郎', img: '' },
      { name: '佐藤太郎', img: '' },
      { name: 'テスト太郎', img: '' },
    ],
    editable: true,
    maxElementsToShow: 10,
    editFields: [
      { name: '山田太郎', img: '' },
      { name: '鈴木太郎', img: '' },
      { name: '佐藤太郎', img: '' },
      { name: 'テスト太郎', img: '' },
      { name: '中村翔太', img: '' },
      { name: '佐藤陽介', img: '' },
      { name: '高橋美咲', img: '' },
      { name: '山田健一', img: '' },
      { name: '藤井菜々子', img: '' },
      { name: '小川玲奈', img: '' },
    ],
    onEditComponent: null,
  },
  render: args => (
    <Layout.Block minH="300px">
      <StackAvatar {...args} />
    </Layout.Block>
  ),
};

// Custom dropdown example
export const StackAvatarsWithCustomDropdown = {
  argTypes: {
    field: {
      description: 'Array of objects with img and name keys',
      control: {
        type: 'array',
      },
    },
    editable: {
      description: 'If true, the stack would be editable, otherwise read-only.',
      control: {
        type: 'boolean',
      },
    },
    maxElementsToShow: {
      description: 'Maximum number of elements to show in the stack.',
      control: {
        type: 'number',
      },
    },
    onEditComponent: {
      description: 'Edit component to render when editing the fields.',
      control: false,
    },
  },
  args: {
    fields: [
      { name: '山田太郎', img: '' },
      { name: '鈴木太郎', img: '' },
    ],
    editable: true,
    maxElementsToShow: 10,
    editFields: [
      { name: '山田太郎', img: '' },
      { name: '鈴木太郎', img: '' },
      { name: '佐藤太郎', img: '' },
      { name: 'テスト太郎', img: '' },
      { name: '中村翔太', img: '' },
      { name: '佐藤陽介', img: '' },
    ],
    onEditComponent: CustomDropdownComponent,
  },
  render: args => (
    <Layout.Block minH="240px">
      <StackAvatar {...args} />
    </Layout.Block>
  ),
};
