import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/forSale.css';
import Duck from './components/Duck';

const ForSale = () => {

    const [ducks, setDucks] = useState([]);
    const [error, setError] = useState("");

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

    const addToFavorites = async (e, id) => {
        try {
            const response = await axios.put("/api/favorites/" + id);
            console.log('Add To Favorites response = ' + JSON.stringify(response));
            alert('This duck successfully added to favorites');
        } catch (error) {
            setError("error retrieving ducks: " + error);
        }
    }

    useEffect(() => {
        fetchDucks();
    }, []);

    return (
        <div className="DucksForSale">
            <h1>Ducks For Sale</h1>
            {ducks.length > 0 ?
                ducks?.map(duck => (
                    <div>
                        <Duck duck={duck} setError={setError} />
                        <button className="like" onClick={addToFavorites}>Add to Favorites</button>
                    </div>
                )) :
                <div>I'm sorry, it appears we don't have any Ducks for Sale.</div>
            }
        </div>
    )
}

export default ForSale;