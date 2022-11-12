import { useState, useEffect } from 'react';
import axios from 'axios';

const CartItem = ({cartItem, name, setError}) => {
  return (
    <div>
      <h3>{name}, {cartItem.quantity}</h3>
    </div>
  )
}

export default CartItem;