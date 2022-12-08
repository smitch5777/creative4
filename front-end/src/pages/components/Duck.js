import BoughtText from "./BoughtText";
import Price from './Price';
import '../css/duck.css';



const Duck = ({ duck, setError }) => {
  return (
    <div>
      <h2>{duck.name}</h2>
      <BoughtText is_bought={duck.is_bought} />
      <img src={duck.img_url}>{duck.name}</img>
      <h4>Found in: {duck.location}</h4>
      <br />
      <h4>The Price for {duck.name} is:</h4>
      <Price price={duck.price} />
      <br />
      <h4>More Information:</h4>
      <h5>{duck.description}</h5>
    </div>
  )
}

export default Duck;