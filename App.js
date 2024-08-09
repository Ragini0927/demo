import React, { useState } from 'react';
import ProductLiability from './ProductLiability';
import ProductCart from './ProductCart';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!cart.includes(product)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  return (
    <div>
      <ProductLiability addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />
      <ProductCart cart={cart} />
    </div>
  );
}

export default App;
