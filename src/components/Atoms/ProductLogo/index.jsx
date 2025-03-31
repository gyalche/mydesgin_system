import React from 'react';
import PropTypes from 'prop-types';

import * as productComponents from './Logos';

function ProductLogo({ product, ...rest }) {
  const ProductComponent = productComponents[product];

  if (!ProductComponent) {
    throw new Error(`${product} does not exist.`);
  }
  // FIXME: support setting color of logo
  return <ProductComponent {...rest} />;
}

ProductLogo.propTypes = {
  product: PropTypes.oneOf(Object.keys(productComponents)).isRequired,
};

export default ProductLogo;
