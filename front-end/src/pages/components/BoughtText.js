import '../css/boughtText.css';

const BoughtText = ({ is_bought, setError }) => {
    if (is_bought) {
        return (
            <h3 className="bought_text">BOUGHT</h3>
        )
    } else {
        return (
            <h3 className="available_text">STILL AVAILABLE</h3>
        )
    }
}

export default BoughtText;