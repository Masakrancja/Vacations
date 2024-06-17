import React, { useState } from "react";
import URI from "../../uri";
import { dataRegisterContext } from "../../context/dataRegisterContext";
import RegisterData from "../../components/RegisterData";
import IsAdmin from "../../components/IsAdmin";
import RegisterGroupData from "../../components/RegisterGroupData";
import SelectGroups from "../../components/SelectGroups";
import ConfirmRegister from "../../components/ConfirmRegister";

const RegisterPage = () => {
  const [login, setLogin] = useState(dataRegisterContext.login);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [firstName, setFirstName] = useState(
    dataRegisterContext.userData.firstName
  );
  const [lastName, setLastName] = useState(
    dataRegisterContext.userData.lastName
  );
  const [address, setAddress] = useState(dataRegisterContext.userData.address);
  const [postalCode, setPostalCode] = useState(
    dataRegisterContext.userData.postalCode
  );
  const [city, setCity] = useState(dataRegisterContext.userData.city);
  const [phone, setPhone] = useState(dataRegisterContext.userData.phone);
  const [email, setEmail] = useState(dataRegisterContext.userData.email);
  const [groupName, setGroupName] = useState(dataRegisterContext.group.name);
  const [groupAddress, setGroupAddress] = useState(
    dataRegisterContext.group.address
  );
  const [groupPostalCode, setGroupPostalCode] = useState(
    dataRegisterContext.group.postalCode
  );
  const [groupCity, setGroupCity] = useState(dataRegisterContext.group.city);
  const [groupNip, setGroupNip] = useState(dataRegisterContext.group.nip);
  const [isAdmin, setIsAdmin] = useState(dataRegisterContext.isAdmin);
  const [selectedGroup, setSelectedGroup] = useState(
    dataRegisterContext.groupId
  );
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupAddressChange = (e) => {
    setGroupAddress(e.target.value);
  };

  const handleGroupPostalCodeChange = (e) => {
    setGroupPostalCode(e.target.value);
  };

  const handleGroupCityChange = (e) => {
    setGroupCity(e.target.value);
  };

  const handleGroupNipChange = (e) => {
    setGroupNip(e.target.value);
  };

  const handleChecked = (e) => {
    setMessage("");
    if (e.target.id === "isAdmin") {
      setIsAdmin(e.target.checked);
    } else {
      setIsAdmin(!e.target.checked);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  const handleConfirmClick = () => {
    setMessage("");
    let hasError = false;
    if (pass !== pass2) {
      hasError = true;
      setMessage("Podane hasła się różnią. Wpisz ponownie poprawne");
    }

    storeRegisterData();

    if (!hasError) {
      const options = {
        method: "POST",
        body: JSON.stringify(dataRegisterContext),
      };
      fetch(URI + "/users", options)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "OK") {
            const { firstName, lastName } = dataRegisterContext.userData;
            setRegistered(true);
            setMessage(`Konto dla ${firstName} ${lastName} zostało utworzone`);
            clearRegisterForm();
            clearRegisterData();
          } else {
            setRegistered(false);
            setMessage(response.message);
          }
        });
    }
  };

  const storeRegisterData = () => {
    dataRegisterContext.login = login;
    dataRegisterContext.pass = pass;
    dataRegisterContext.pass2 = pass2;
    dataRegisterContext.userData.firstName = firstName;
    dataRegisterContext.userData.lastName = lastName;
    dataRegisterContext.userData.address = address;
    dataRegisterContext.userData.postalCode = postalCode;
    dataRegisterContext.userData.city = city;
    dataRegisterContext.userData.phone = phone;
    dataRegisterContext.userData.email = email;
    dataRegisterContext.group.name = groupName;
    dataRegisterContext.group.address = groupAddress;
    dataRegisterContext.group.postalCode = groupPostalCode;
    dataRegisterContext.group.city = groupCity;
    dataRegisterContext.group.nip = groupNip;
    dataRegisterContext.isAdmin = isAdmin;
    dataRegisterContext.groupId = parseInt(selectedGroup);
  };

  const clearRegisterForm = () => {
    setLogin("");
    setPass("");
    setPass2("");
    setIsAdmin(false);
    setSelectedGroup(0);
    setFirstName("");
    setLastName("");
    setAddress("");
    setPostalCode("");
    setCity("");
    setPhone("");
    setEmail("");
    setGroupName("");
    setGroupAddress("");
    setGroupPostalCode("");
    setGroupCity("");
    setGroupNip("");
  };

  const clearRegisterData = () => {
    dataRegisterContext.login = "";
    dataRegisterContext.pass = "";
    dataRegisterContext.pass2 = "";
    dataRegisterContext.isAdmin = false;
    dataRegisterContext.selectedGroup = 0;
    dataRegisterContext.userData.firstName = "";
    dataRegisterContext.userData.lastName = "";
    dataRegisterContext.userData.address = "";
    dataRegisterContext.userData.postalCode = "";
    dataRegisterContext.userData.city = "";
    dataRegisterContext.userData.phone = "";
    dataRegisterContext.userData.email = "";
    dataRegisterContext.group.name = "";
    dataRegisterContext.group.address = "";
    dataRegisterContext.group.postalCode = "";
    dataRegisterContext.group.city = "";
    dataRegisterContext.group.nip = "";
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
      <IsAdmin isAdmin={isAdmin} handleChecked={handleChecked} />
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
        <SelectGroups
          selectedGroup={selectedGroup}
          handleSelectChange={handleSelectChange}
        />
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
