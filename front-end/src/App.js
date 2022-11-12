import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Product from './Product';
import CartItem from './CartItem';

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setProblem] = useState("");

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      console.log('fetchProducts response = ' + JSON.stringify(response));
      console.log('fetchProducts data = ' + JSON.stringify(response.data));
      console.log('fetchProducts products = ' + JSON.stringify(response.data));
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  const fetchCart = async() => {
    try {      
      const response = await axios.get("/api/cart");
      console.log('fetchProducts response = ' + JSON.stringify(response));
      console.log('fetchProducts data = ' + JSON.stringify(response.data));
      console.log('fetchProducts products = ' + JSON.stringify(response.data));
      setCartItems(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  const createProduct = async() => {
    try {
      await axios.post("/api/products", {name: name, price: price});
    } catch(error) {
      setError("error adding a product: " + error);
    }
  }
  const deleteOneProduct = async(product) => {
    try {
      await axios.delete("/api/products/" + product.id);
    } catch(error) {
      setError("error deleting a product" + error);
    }
  }
  const addProductToCart = async(id) => {
    try {
      await axios.post("/api/cart/" + id);
    } catch(error) {
      setError("error adding a product: " + error);
    }
  }
  const setQuantityOfCartItem = async(id, quantity) => {
    try {
      await axios.put("/api/cart/"+ id + "/" + quantity);
    }catch(error) {
      setError("Crap went down");
    }
  }

  const addToCart = async(e, id) => {
    e.preventDefault();
    await addProductToCart(id);
    fetchCart();
  }

  const removeOneFromCart = async(e, id) => {
    e.preventDefault();
    console.log("important stuff:");
    const item = cartItems.find((item) => item.id === id);

    console.log('This is the quantity: ' + item.quantity);
    item.quantity--;
    await setQuantityOfCartItem(id, item.quantity);
    fetchCart();
  }
  
  const addOneToCart = async(e, id) => {
    e.preventDefault();
    await addProductToCart(id);
    fetchCart();
  }

  const removeAllFromCart = async(e, id) => {
    e.preventDefault();
    await setQuantityOfCartItem(id, 0);
    fetchCart();
  }

  // fetch product data
  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);

  const addProduct = async(e) => {
    e.preventDefault();
    await createProduct();
    fetchProducts();
    setName("");
    setProblem("");
  }

  const deleteProduct = async(product) => {
    await deleteOneProduct(product);
    fetchProducts();
  }

  const updateCart = {}
  // render results
  return (
    <div className="App">
      {error}
      {/* <form onSubmit={addProduct}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Problem:
            <textarea value={price} onChange={e=>setProblem(e.target.value)}></textarea>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form> */}
      <h1>Products</h1>
      {console.log("in return products: " + JSON.stringify(products))}
      {
      products?.map( product => (
        <div>
        <Product product={product} setError={setError}/>
        <button onClick={e => addToCart(e, product.id)}>Add to Cart</button>
        </div>
      ))
      }
      <h1>Cart</h1>
      {
      cartItems?.map( cartItem => {
        const name = products.find(item => item.id === cartItem.id).name;
        return (
        <div>
        <CartItem cartItem={cartItem} name={name} setError={setError}/>
        <button onClick={e => removeOneFromCart(e, cartItem.id)}>-</button>
        <button onClick={e => addOneToCart(e, cartItem.id)}>+</button>
        <button onClick={e => removeAllFromCart(e, cartItem.id)}>Remove from cart</button>
        </div>
      )}
      )
      }
    </div>
  );
}

export default App;
