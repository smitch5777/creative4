import BoughtText from "./BoughtText";


const SimpleDuck = ({ duck, setError }) => {
    return (
        <div>
            <h2>{duck.name}</h2>
            <BoughtText is_bought={duck.is_bought} />
            <img src={duck.img_url}>{duck.name}</img>
        </div>
    )
}

export default SimpleDuck;