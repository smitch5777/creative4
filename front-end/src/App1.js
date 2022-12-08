
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SimpleDuck from './SimpleDuck';
import PreviousDuck from './PreviousDuck';

function App() {
    // setup state
    const [favoriteDucks, setDucks] = useState([]);
    const [duckImg, setDuckImg] = useState("");
    const [allPreviousDucks, setPreviousDucks] = useState([]);
    // const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");
    const [previousDuckDisabled, setDisabled] = useState(true);

    const fetchDucks = async () => {
        try {
            const response = await axios.get("/api/ducks");
            console.log('fetchDucks response = ' + JSON.stringify(response));
            console.log('fetchDucks data = ' + JSON.stringify(response.data));
            console.log('fetchDucks products = ' + JSON.stringify(response.data));
            setDucks(response.data);
        } catch (error) {
            setError("error retrieving ducks: " + error);
        }
    }
    // const fetchCart = async () => {
    //   try {
    //     const response = await axios.get("/api/cart");
    //     console.log('fetchDucks response = ' + JSON.stringify(response));
    //     console.log('fetchDucks data = ' + JSON.stringify(response.data));
    //     console.log('fetchDucks products = ' + JSON.stringify(response.data));
    //     setCartItems(response.data);
    //   } catch (error) {
    //     setError("error retrieving products: " + error);
    //   }
    // }
    var randomDuckURL = "https://random-d.uk/api/v2/random";

    const newRandomDuck = async (event) => {
        axios.get(randomDuckURL)
            .then((response) => {
                console.log("Object img");
                console.log("url: " + JSON.stringify(response.data.url));
                setDuckImg(response.data.url);
                console.log(duckImg);
                console.log("allPrevDucks: " + JSON.stringify(allPreviousDucks));
                allPreviousDucks.push(response.data.url);
                console.log("allPrevDucks: " + JSON.stringify(allPreviousDucks));
                console.log("setDisabled: " + setDisabled)
                setDisabled(false);
            });
        event.preventDefault();
    }

    const postDuck = async () => {
        try {
            // name: name, img_url: img_url, description: description, location: location, price: price 
            await axios.post("/api/ducks", {});
        } catch (error) {
            setError("error adding a duck: " + error);
        }
    }
    const deleteOneDuck = async (duck) => {
        try {
            await axios.delete("/api/ducks/" + duck.id);
        } catch (error) {
            setError("error deleting a duck" + error);
        }
    }
    // const addProductToCart = async (id) => {
    //   try {
    //     await axios.post("/api/cart/" + id);
    //   } catch (error) {
    //     setError("error adding a product: " + error);
    //   }
    // }
    // const setQuantityOfCartItem = async (id, quantity) => {
    //   try {
    //     await axios.put("/api/cart/" + id + "/" + quantity);
    //   } catch (error) {
    //     setError("Crap went down");
    //   }
    // }

    // const addToCart = async (e, id) => {
    //   e.preventDefault();
    //   await addProductToCart(id);
    //   fetchCart();
    // }

    // const removeOneFromCart = async (e, id) => {
    //   e.preventDefault();
    //   console.log("important stuff:");
    //   const item = cartItems.find((item) => item.id === id);

    //   console.log('This is the quantity: ' + item.quantity);
    //   item.quantity--;
    //   await setQuantityOfCartItem(id, item.quantity);
    //   fetchCart();
    // }

    // const addOneToCart = async (e, id) => {
    //   e.preventDefault();
    //   await addProductToCart(id);
    //   fetchCart();
    // }

    // const removeAllFromCart = async (e, id) => {
    //   e.preventDefault();
    //   await setQuantityOfCartItem(id, 0);
    //   fetchCart();
    // }
    const previousDisabled = (e) => {
        console.log("is previousDisabled: length: " + allPreviousDucks.length);
        if (allPreviousDucks.length > 1) {
            return false;
        } else {
            return true;
        }
    }

    const previousDuck = async (e) => {
        console.log('AllPreviousDucks: ' + allPreviousDucks);
        allPreviousDucks.pop();
        setDuckImg(allPreviousDucks[allPreviousDucks.length - 1]);
        setDisabled(previousDisabled(e))
    }

    const addToFavorites = async (e) => {
        if (favoriteDucks.find((duck) => { return duck.img_url = duckImg })) {

        }
    }

    const alreadyInFavorites = async (duck) => {
        if (favoriteDucks.find((duck) => { return duck.img_url = duckImg })) {
            return true;
        } else {
            return false;
        }
    }

    const addNewDuck = async (e, id) => {

    }
    // fetch product data
    useEffect(() => {
        newRandomDuck();
        fetchDucks();
        // fetchCart();
    }, []);

    const addDuck = async (e) => {
        e.preventDefault();
        await postDuck();
        fetchDucks();
    }

    const deleteDuck = async (duck) => {
        await deleteOneDuck(duck);
        fetchDucks();
    }

    // render results
    return (
        <div className="App">
            {error}
            <div className="RandomDucks">
                <img className="DuckImg" src={duckImg} />
                <br />
                <button className="random_duck_button" onClick={newRandomDuck}>New Duck</button>
                <button className="like" onClick={addToFavorites}>Add to Favorites</button>
                {(previousDisabled) ? <div><button className="previous" onClick={previousDuck}>Previous Duck</button></div> : <div></div>
                }
            </div>
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
            <h1>Favorite Ducks</h1>
            {
                favoriteDucks?.map(duck => (
                    <div>
                        <SimpleDuck duck={duck} setError={setError} />
                    </div>
                ))
            }
            {/* <h1>Cart</h1>
      {
        cartItems?.map(cartItem => {
          const name = ducks.find(item => item.id === cartItem.id).name;
          return (
            <div>
              <Duck cartItem={cartItem} name={name} setError={setError} />
              <button onClick={e => removeOneFromCart(e, cartItem.id)}>-</button>
              <button onClick={e => addOneToCart(e, cartItem.id)}>+</button>
              <button onClick={e => removeAllFromCart(e, cartItem.id)}>Remove from cart</button>
            </div>
          )
        }
        )
      } */}
        </div>
    );
}

export default App;
