import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/favorites.css';
import Duck from './components/Duck';

const ForSale = () => {

    const [ducks, setDucks] = useState([]);
    const [error, setError] = useState("");

    const fetchDucks = async () => {
        try {
            const response = await axios.get("/api/ducks");
            console.log('fetchDucks response = ' + JSON.stringify(response));
            console.log('fetchDucks data = ' + JSON.stringify(response.data));
            console.log('url = ' + response.data[0].img_url);
            setDucks(response.data);
        } catch (error) {
            setError("error retrieving ducks: " + error);
        }
    }

    const addToFavorites = async (id) => {
        try {
            const response = await axios.put("/api/favorites/" + id);
            console.log('Add To Favorites response = ' + JSON.stringify(response));
        } catch (error) {
            setError("error retrieving ducks: " + error);
        }
    }

    useEffect(() => {
        fetchDucks();
    }, []);

    return (
        <div className="FavoriteDucks">
            <div className="TitleText">Ducks For Sale</div>
            {ducks.length > 0 ?
                ducks?.map(duck => (
                    <div className='oneDuck'>
                        <Duck duck={duck} setError={setError} />
                        <button className="dislike" onClick={() => addToFavorites(duck.id)}>Add to Favorites</button>
                    </div>
                )) :
                <div>I'm sorry, it appears we don't have any Ducks for Sale.</div>
            }
            {console.log('length: ' + ducks.length + '\n ducks: ' + JSON.stringify(ducks))}
        </div>
    )
}

export default ForSale;
