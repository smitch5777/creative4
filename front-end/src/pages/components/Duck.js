import BoughtText from "./BoughtText";
import Price from './Price';
import '../css/duck.css';



const Duck = ({ duck, setError }) => {
  return (
    <div className="fullDuck">
      <h2 className="duckName">{duck.name}</h2>
      <BoughtText is_bought={duck.is_bought} />
      <img className="duckImg" src={duck.img_url} alt={duck.name} />
      <h4 className="location" >Location: {duck.location}</h4>
      <br />
      <h4 className="price" >Price:</h4>
      <Price price={duck.price} />
      <h5 className="duckDescription" >{duck.description}</h5>
    </div>
  )
}

export default Duck;
