import * as Icons from 'src/components/Atoms/Logo';

describe('Icon Module Exports', () => {
  it('should have all expected exports', () => {
    const expectedExports = [
      'Chatwork',
      'Garoon',
      'GoogleCalendar',
      'GoogleChat',
      'GoogleMeet',
      'Google',
      'Lineworks',
      'MicrosoftAzureActiveDirectory',
      'MicrosoftOutlook',
      'MicrosoftTeams',
      'Microsoft365',
      'ReceptionistDiscovery',
      'ReceptionistRooms',
      'ReceptionistSafetycheck',
      'ReceptionistScheduling',
      'Receptionist',
      'Salesforce',
      'Slack',
      'Webex',
      'Workplace',
      'Zoom',
    ];

    expectedExports.forEach((exportName) => {
      expect(Icons[exportName]).toBeDefined();
    });
  });
});
