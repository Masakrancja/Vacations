import {useState} from "react";
import Error from "./Error";
import "./css/registerData.css"

const RegisterData = () => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    }
    const handlePassChange = (e) => {
        setPass(e.target.value);
    }
    const handlePass2Change = (e) => {
        setPass2(e.target.value);
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
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
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className="registerData">
            <label htmlFor="login">Login
                <input type="text" id="login" value={login} onChange={handleLoginChange} />
            </label>
            <label htmlFor="pass">Hasło
                <input type="password" id="pass" value={pass} onChange={handlePassChange} />
            </label>
            <label htmlFor="pass2">Powtórz hasło
                <input type="password" id="pass2" value={pass2} onChange={handlePass2Change} />
            </label>
            <label htmlFor="firstName">Imię
                <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
            </label>
            <label htmlFor="lastName">Nazwisko
                <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
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
            <label htmlFor="phone">Telefon
                <input type="text" id="phone" value={phone} onChange={handlePhoneChange} />
            </label>
            <label htmlFor="email">Email
                <input type="text" id="email" value={email} onChange={handleEmailChange} />
            </label>
            <Error message={message} />
        </div>
    )
}
export default RegisterData;