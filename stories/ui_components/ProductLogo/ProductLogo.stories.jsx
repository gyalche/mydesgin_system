import ProductLogoComponent from 'components/Atoms/ProductLogo';
import * as productComponents from 'components/Atoms/ProductLogo/Logos';
import * as Layout from 'components/Atoms/Layout';

const meta = {
  title: 'UI Components/Product Logo',
  component: ProductLogoComponent,
  tags: ['!dev'],
};

export default meta;

const productList = Object.keys(productComponents);

export const ProductLogo = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    product: {
      description: 'Name of the product',
      control: {
        type: 'select',
      },
      options: productList,
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    product: 'Receptionist',
  },
  render: ({ product, ...args }) => (
    <ProductLogoComponent product={product} {...args} />
  ),
};

export const Palette = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout.Flex gap="30px" wrap="wrap">
      {productList.map(p => (
        <Layout.Item flex="1">
          <ProductLogoComponent product={p} />
        </Layout.Item>
      ))}
    </Layout.Flex>
  ),
};
