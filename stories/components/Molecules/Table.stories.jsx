import React, { useState } from 'react';
import Table from 'src/components/Molecules/Table';
import * as Layout from 'src/components/Atoms/Layout';

const { Pagination } = Table;

export default {
  title: 'Molecules/Tables',
};

export const DefaultTable = {
  title: 'Default Table',
  component: Table,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=6087%3A12412&mode=dev',
    },
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
    },
  },
  args: {
    data: [
      {
        effectiveDate: '11/6\n16:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n16:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
    ],
    columns: [
      { label: 'Date', field: 'effectiveDate', flex: '1' },
      { label: 'Code', field: 'receptionCode', flex: '1' },
      { label: 'Visitor', field: 'visitor', flex: '1' },
      { label: 'Person in Charge', field: 'personInCharge', flex: '3' },
      { label: 'Title', field: 'title', flex: '3' },
      { label: 'Room Name', field: 'meetingRoom', flex: '3' },
      { label: '', field: 'expandButton', flex: '1' },
    ],
  },
  render: args => {
    return (
      <Layout.Flex>
        <Layout.Item>
          <Table {...args}></Table>
        </Layout.Item>
      </Layout.Flex>
    );
  },
};

export const Paginations = {
  title: 'Table Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/7GhAI7t2dM3tVWpWMAVFXJ/Design-System?node-id=0%3A1&mode=dev',
    },
  },
  argTypes: {
    totalPages: {
      name: 'Total pages',
      description: 'Total pages for the pagination',
      control: { type: 'number', min: 1, step: 1 },
    },
    data: {
      name: 'data',
      description: 'Content of each single row of the Table',
    },
    columns: {
      name: 'columns',
      description:
        'Content and basic layout of all the columns, the label will be displayed,the field assigns the row to the column',
    },
  },
  args: {
    itemsPerPage: 5,
    data: [
      {
        effectiveDate: '11/6\n12:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n13:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n14:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n15:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n16:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n17:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n18:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n19:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n20:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
      {
        effectiveDate: '11/6\n21:00',
        receptionCode: '123456',
        visitor: 'Mister Visitor',
        personInCharge: 'Mister in Charge',
        title: 'The meeting title',
        meetingRoom:
          'meeting room 123 in building B next to the water fountain but no way am I making this a super long',
        memo: 'nothing',
      },
    ],
    columns: [
      { label: 'Date', field: 'effectiveDate', flex: '1' },
      { label: 'Code', field: 'receptionCode', flex: '1' },
      { label: 'Visitor', field: 'visitor', flex: '1' },
      { label: 'Person in Charge', field: 'personInCharge', flex: '3' },
      { label: 'Title', field: 'title', flex: '3' },
      { label: 'Room Name', field: 'meetingRoom', flex: '3' },
      { label: '', field: 'expandButton', flex: '1' },
    ],
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = args.itemsPerPage;

    const { data } = args;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    const itemsToDisplay = data.slice(startIndex, endIndex);

    return (
      <Layout.Block>
        <Layout.Item>
          <Pagination
            {...args}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          <Table data={itemsToDisplay} columns={args.columns}></Table>
        </Layout.Item>
      </Layout.Block>
    );
  },
};
