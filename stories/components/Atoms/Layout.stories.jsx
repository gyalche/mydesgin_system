import * as Layout from "src/components/Atoms/Layout";

export default {
  title: "Atoms/Layout",
  component: Layout.Flex,
};

export const Samples = {
  title: "Samples",
  parameters: {
    options: { showPanel: false },
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    return (
      <Layout.Block>
        <Layout.Flex mb="20px">
          <Layout.Item flex="0" bgColor="red">
            0
          </Layout.Item>
          <Layout.Item flex="2" bgColor="green">
            2
          </Layout.Item>
          <Layout.Item flex="0" bgColor="blue">
            0
          </Layout.Item>
        </Layout.Flex>
        <Layout.Flex mb="20px" disabled>
          <Layout.Item flex="0" bgColor="red">
            0
          </Layout.Item>
          <Layout.Item flex="2" bgColor="green">
            2
          </Layout.Item>
          <Layout.Item flex="0" bgColor="blue">
            0
          </Layout.Item>
        </Layout.Flex>
        <Layout.Flex mb="20px">
          <Layout.Item flex="0" bgColor="red" minW="300px">
            0 (min-width: 300px)
          </Layout.Item>
          <Layout.Item flex="2" bgColor="green">
            2
          </Layout.Item>
          <Layout.Item flex="0" bgColor="blue">
            0
          </Layout.Item>
        </Layout.Flex>
        <Layout.Flex mb="20px">
          <Layout.Item flex="2" bgColor="red">
            2
          </Layout.Item>
          <Layout.Item flex="4" bgColor="green">
            4
          </Layout.Item>
          <Layout.Item flex="6" bgColor="blue">
            6
          </Layout.Item>
        </Layout.Flex>
        <Layout.Flex>
          <Layout.Item flex="1" bgColor="red">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="green">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="blue">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="cyan">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="magenta">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="yellow">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="red">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="green">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="blue">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="cyan">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="magenta">
            1
          </Layout.Item>
          <Layout.Item flex="1" bgColor="yellow">
            1
          </Layout.Item>
        </Layout.Flex>
      </Layout.Block>
    );
  }
};
