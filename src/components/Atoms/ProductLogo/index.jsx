import React from 'react';
import PropTypes from 'prop-types';

import * as productComponents from './Logos';

function ProductLogo({ product, ...rest }) {
  const ProductComponent = productComponents[product];

  return <ProductComponent {...rest} />;
}

ProductLogo.propTypes = {
  product: PropTypes.oneOf(Object.keys(productComponents)).isRequired,
};

export default ProductLogo;
