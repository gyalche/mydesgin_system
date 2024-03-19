import React from 'react';
import Table from 'src/components/Molecules/Table';
import * as Layout from 'src/components/Atoms/Layout';

export default {
  title: 'Molecules/Tables',
};

export const DefaultTable =  {
  title: 'Default Table',
  component: Table,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev'
    }
  },
  argTypes: {
    data: {
      name: 'data',
      description: 'Content of each single row of the Table',
    },
    columns: {
      name: 'columns',
      description: 
      'Content and basic layout of all the columns, the label will be displayed,the field assigns the row to the column',
    }
  },
  args:{
    data: [{
      effectiveDate:'11/6\n16:00',
      receptionCode: '123456',
      visitor: 'Mister Visitor',
      personInCharge: 'Mister in Charge',
      title: 'The meeting title',
      meetingRoom: 'meeting room 123 in building B next to the water fountain',
      memo:'nothing' 
      },
      {
      effectiveDate:'11/6\n16:00',
      receptionCode: '123456',
      visitor: 'Mister Visitor',
      personInCharge: 'Mister in Charge',
      title: 'The meeting title',
      meetingRoom: 'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
      memo:'nothing' 
      }
    ],
    columns: [
      { label: 'Date', field: 'effectiveDate', flex: '1'},
      { label: 'Code', field: 'receptionCode', flex: '1'},
      { label: 'Visitor', field: 'visitor', flex: '1'},
      { label: 'Person in Charge', field: 'personInCharge', flex: '3'},
      { label: 'Title', field: 'title', flex: '3',},
      { label: 'Room Name', field: 'meetingRoom', flex: '3'},
      { label: '', field: 'expandButton', flex: '1'},
    ],

  },
  render: (args) => {
    return  ( 
      <Layout.Flex>
        <Layout.Item>
          <Table {...args} ></Table>
        </Layout.Item>
      </Layout.Flex>
    );
  }
};
