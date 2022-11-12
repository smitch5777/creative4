import { useState, useEffect } from 'react';
import axios from 'axios';

const Product = ({product, setError}) => {

  const float_price = parseFloat(product.price);
  const price = float_price.toFixed(2);
  return (
    <div>
      <h3>{product.name}, ${price}</h3>
    </div>
  )
}

export default Product;