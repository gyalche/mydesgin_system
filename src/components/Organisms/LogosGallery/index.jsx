import React from 'react';

import * as logos from 'components/Atoms/Logo';
import AssetGallery from 'components/Organisms/AssetGallery';

import styles from './style.module.css';

// Organize all logos by category
const logosByCategory = {
  'Receptionist Logos': [
    'Receptionist',
    'ReceptionistDiscovery',
    'ReceptionistIvr',
    'ReceptionistRooms',
    'ReceptionistSafetycheck',
    'ReceptionistScheduling',
  ],
  'Microsoft Logos': [
    'Microsoft365',
    'MicrosoftAzureActiveDirectory',
    'MicrosoftOutlook',
    'MicrosoftTeams',
  ],
  'Google Logos': [
    'Google',
    'GoogleCalendar',
    'GoogleChat',
    'GoogleMeet',
  ],
  'Communication Logos': [
    'Slack',
    'Zoom',
    'Webex',
    'Chatwork',
    'Lineworks',
    'Workplace',
  ],
  'Other Logos': [
    'Garoon',
    'Salesforce',
  ],
};

function LogosGallery() {
  const renderLogo = logoName => {
    const Logo = logos[logoName];
    return <Logo className={styles.logo} />;
  };

  const formatCopyText = logoName => `<${logoName} />`;

  return (
    <AssetGallery
      itemsByCategory={logosByCategory}
      renderItem={renderLogo}
      searchPlaceholder="Search logos..."
      copyFormat={formatCopyText}
      itemWrapperClassName={styles.logoWrapper}
      itemClassName={styles.logoName}
    />
  );
}

export default LogosGallery;
