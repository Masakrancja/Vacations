import {useState} from "react";
import Error from "./Error";
import "./css/registerGroupData.css"

const RegisterGroupData = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [nip, setNip] = useState("");
    const [message, setMessage] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }
    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    }
    const handleCityChange = (e) => {
        setCity(e.target.value);
    }
    const handleNipChange = (e) => {
        setNip(e.target.value);
    }

    return (
        <div className="registerGroupData">
            <label htmlFor="name">Nazwa firmy
                <input type="text" id="name" value={name} onChange={handleNameChange} />
            </label>
            <label htmlFor="address">Adres
                <input type="text" id="address" value={address} onChange={handleAddressChange} />
            </label>
            <label htmlFor="postalCode">Kod pocztowy
                <input type="text" id="postalCode" value={postalCode} onChange={handlePostalCodeChange} />
            </label>
            <label htmlFor="city">Miasto
                <input type="text" id="city" value={city} onChange={handleCityChange} />
            </label>
            <label htmlFor="nip">NIP
                <input type="text" id="nip" value={nip} onChange={handleNipChange} />
            </label>
            <Error message={message} />
        </div>
    )
}
export default RegisterGroupData;