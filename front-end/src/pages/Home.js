import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/home.css';

const Home = () => {
    const [duckImg, setDuckImg] = useState("https://random-d.uk/api/254.jpg");
    const [error, setError] = useState("");


    var randomDuckURL = "https://random-d.uk/api/v2/random";

    const newRandomDuck = async (event) => {
        axios.get(randomDuckURL)
            .then((response) => {
                console.log("Object img");
                console.log("url: " + JSON.stringify(response.data.url));
                setDuckImg(response.data.url);
                console.log(duckImg);
            });
        event.preventDefault();
    }

    useEffect(() => {
    }, []);

    return (
        <div className='home'>
            <div className='Welcome'>Welcome to The Duck Arsenal!!</div>
            <div className='description'>Here you can look through the different ducks we have for sale, put one of your own up for sale, or just browse around. Have fun!!!</div>
            <br />
            <div className="RandomDucks">
                <div className='flex'>
                    <h2>Random Ducks: </h2>
                    <button className="random_duck_button" onClick={newRandomDuck}>New Duck</button>
                </div>
                <img className="DuckImg" src={duckImg} />
            </div>
        </div>
    )

}

export default Home;