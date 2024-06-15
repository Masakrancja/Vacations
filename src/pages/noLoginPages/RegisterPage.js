import React, { useState } from "react";
import URI from "../../uri";
import { dataRegisterContext } from "../../context/dataRegisterContext";
import RegisterData from "../../components/RegisterData";
import IsAdmin from "../../components/IsAdmin";
import RegisterGroupData from "../../components/RegisterGroupData";
import SelectGroups from "../../components/SelectGroups";
import ConfirmRegister from "../../components/ConfirmRegister";

const RegisterPage = () => {
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
  const [groupName, setGroupName] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [groupPostalCode, setGroupPostalCode] = useState("");
  const [groupCity, setGroupCity] = useState("");
  const [groupNip, setGroupNip] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    dataRegisterContext.login = e.target.value;
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
    dataRegisterContext.pass = e.target.value;
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
    dataRegisterContext.pass2 = e.target.value;
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    dataRegisterContext.userData.firstName = e.target.value;
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    dataRegisterContext.userData.lastName = e.target.value;
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    dataRegisterContext.userData.address = e.target.value;
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    dataRegisterContext.userData.postalCode = e.target.value;
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    dataRegisterContext.userData.city = e.target.value;
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    dataRegisterContext.userData.phone = e.target.value;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    dataRegisterContext.userData.email = e.target.value;
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    dataRegisterContext.group.name = e.target.value;
  };

  const handleGroupAddressChange = (e) => {
    setGroupAddress(e.target.value);
    dataRegisterContext.group.address = e.target.value;
  };

  const handleGroupPostalCodeChange = (e) => {
    setGroupPostalCode(e.target.value);
    dataRegisterContext.group.postalCode = e.target.value;
  };

  const handleGroupCityChange = (e) => {
    setGroupCity(e.target.value);
    dataRegisterContext.group.city = e.target.value;
  };

  const handleGroupNipChange = (e) => {
    setGroupNip(e.target.value);
    dataRegisterContext.group.nip = e.target.value;
  };

  const handleChecked = (e) => {
    setMessage("");
    if (e.target.id === "isAdmin") {
      setIsAdmin(e.target.checked);
      dataRegisterContext.isAdmin = e.target.checked;
    } else {
      setIsAdmin(!e.target.checked);
      dataRegisterContext.isAdmin = !e.target.checked;
    }
  };

  const handleConfirmClick = () => {
    setMessage("");
    console.log(dataRegisterContext);
    const options = {
      method: "POST",
      body: JSON.stringify(dataRegisterContext),
    };
    fetch(URI + "/users", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "OK") {
          const { firstName, lastName } = dataRegisterContext.userData;
          setRegistered(true);
          setMessage(`Konto dla ${firstName} ${lastName} zostało utworzone`);
          clearRegisterForm();
        } else {
          setRegistered(false);
          setMessage(response.message);
        }
      });
  };

  const clearRegisterForm = () => {
    setLogin("");
    setPass("");
    setPass2("");
  };

  const clearRegisterData = () => {
    dataRegisterContext.login = "";
    dataRegisterContext.pass = "";
    dataRegisterContext.pass2 = "";
  };

  return (
    <div>
      <h1>Rejestracja</h1>
      <RegisterData
        login={login}
        pass={pass}
        pass2={pass2}
        firstName={firstName}
        lastName={lastName}
        address={address}
        postalCode={postalCode}
        city={city}
        phone={phone}
        email={email}
        handleLoginChange={handleLoginChange}
        handlePassChange={handlePassChange}
        handlePass2Change={handlePass2Change}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handleAddressChange={handleAddressChange}
        handlePostalCodeChange={handlePostalCodeChange}
        handleCityChange={handleCityChange}
        handlePhoneChange={handlePhoneChange}
        handleEmailChange={handleEmailChange}
      />
      <IsAdmin isAdmin={isAdmin} change={handleChecked} />
      {isAdmin ? (
        <RegisterGroupData
          name={groupName}
          address={groupAddress}
          postalCode={groupPostalCode}
          city={groupCity}
          nip={groupNip}
          handleNameChange={handleGroupNameChange}
          handleAddressChange={handleGroupAddressChange}
          handlePostalCodeChange={handleGroupPostalCodeChange}
          handleCityChange={handleGroupCityChange}
          handleNipChange={handleGroupNipChange}
        />
      ) : (
        <SelectGroups />
      )}
      <ConfirmRegister
        click={handleConfirmClick}
        message={message}
        registered={registered}
      />
    </div>
  );
};
export default RegisterPage;
