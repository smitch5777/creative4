
import { useState, useEffect } from 'react';
import axios from 'axios';
import Duck from './components/Duck';

const Favorites = () => {
    const [favoriteDucks, setDucks] = useState([]);
    const [error, setError] = useState("");

    const fetchFavoriteDucks = async () => {
        try {
            const response = await axios.get("/api/favorites");
            console.log('fetchFavorites response = ' + JSON.stringify(response));
            setDucks(response.data);
        } catch (error) {
            setError("error retrieving ducks: " + error);
        }
    }

    const deleteFromFavorites = async (e, duck_id) => {
        try {
            const response = await axios.delete("/api/favorites/" + duck_id);
            console.log('delete From favorites response = ' + JSON.stringify(response));
            await fetchFavoriteDucks();
        } catch (error) {
            setError("Error Deleting from favorites" + error);
        }
    }

    useEffect(() => {
        fetchFavoriteDucks();
    })

    return (
        <div className="Favorite Ducks">
            <h1>Favorite Ducks</h1>
            {favoriteDucks.length > 0 ?
                favoriteDucks?.map(duck => (
                    <div>
                        <Duck duck={duck} setError={setError} />
                        <button className="dislike" onClick={e => deleteFromFavorites(e, duck.id)}>Delete From Favorites</button>
                    </div>
                )) :
                <div> You haven't favorited any Ducks</div>
            }
        </div>
    )
}

export default Favorites;