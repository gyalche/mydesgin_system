import React from 'react';

import { Icon } from 'components/Atoms';
import AssetGallery from 'components/Organisms/AssetGallery';

import styles from './style.module.css';

// Organize all icons by category
const iconsByCategory = {
  'Action Icons': [
    'action-arrow-cycle',
    'action-checkbox-default',
    'action-checkbox-indeterminate',
    'action-checkbox-selected',
    'action-circle-radio-selected',
    'action-circle-regular',
    'action-copy',
    'action-cross',
    'action-doc-download-solid',
    'action-doc-download',
    'action-drag-handle',
    'action-link-external',
    'action-lock-opened',
    'action-lock',
    'action-logout',
    'action-loupe',
    'action-pencil',
    'action-plus',
    'action-sort',
    'action-trashbox',
  ],
  'Alert Icons': [
    'alert-circle-solid-check',
    'alert-circle-solid-cross',
    'alert-circle-solid-info',
    'alert-polygon-solid-exclamation',
  ],
  'File Icons': [
    'file-cloud-download',
    'file-cloud-upload',
    'file-doc-csv',
    'file-doc-search',
    'file-doc',
  ],
  'Global Icons': [
    'global-beginner',
    'global-building-man',
    'global-camera',
    'global-chevron-down',
    'global-chevron-large-down',
    'global-chevron-large-left',
    'global-chevron-large-up',
    'global-circle-check',
    'global-circle-cross',
    'global-circle-exclamation',
    'global-circle-info',
    'global-circle-question',
    'global-circle-solid',
    'global-circle-user',
    'global-circle-yen',
    'global-clock',
    'global-cog',
    'global-creditcard',
    'global-globe',
    'global-hashtag',
    'global-letters',
    'global-link',
    'global-menu-grid',
    'global-menu-hamburger',
    'global-minus',
    'global-numbers',
    'global-picture',
    'global-polygon-exclamation',
    'global-puzzle',
    'global-resize-textarea',
    'global-small-check',
    'global-sms',
    'global-spinner',
    'global-trueorfalse',
    'global-user',
  ],
  'Interface Icons': [
    'Interface-arrow-left',
    'Interface-arrow-right',
    'Interface-avatar',
    'Interface-bell-badge',
    'Interface-bell',
    'Interface-calendar-dot',
    'Interface-calendar-timer',
    'Interface-chevron-double-left',
    'Interface-chevron-double-right',
    'Interface-chevron-large-right',
    'Interface-chevron-left',
    'Interface-chevron-right',
    'Interface-chevron-up',
    'Interface-circle-solid-question',
    'Interface-Cog-solid',
    'Interface-ellipsis-3dots',
    'Interface-eye-open',
    'Interface-eye-slashed',
    'Interface-link-off',
    'Interface-sentence-long',
    'Interface-sentence-short',
    'Interface-variable',
  ],
  'Navigation Icons': [
    'navigation-building',
    'navigation-calendar-clock',
    'navigation-clock-man',
    'navigation-doc-log',
    'navigation-door-cog',
    'navigation-door-graph',
    'navigation-door-opened',
    'navigation-guestlist',
    'navigation-home',
    'navigation-ipad-cog',
    'navigation-profile',
    'navigation-security',
    'navigation-speachbubble-dot',
    'navigation-users',
  ],
};

function IconGallery() {
  const renderIcon = iconName => <Icon name={iconName} className={styles.icon} />;
  const formatCopyText = iconName => `<Icon name="${iconName}" />`;

  return (
    <AssetGallery
      itemsByCategory={iconsByCategory}
      renderItem={renderIcon}
      searchPlaceholder="Search icons..."
      copyFormat={formatCopyText}
      itemWrapperClassName={styles.iconWrapper}
      itemClassName={styles.iconName}
    />
  );
}

export default IconGallery;
