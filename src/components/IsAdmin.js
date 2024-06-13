import React from "react";

const IsAdmin = () => {
    return (
        <div>
            <label htmlFor="isUser">Pracownik<input type="radio" name="userType" id="isUser" /></label>
            <label htmlFor="isAdmin">Właściciel<input type="radio" name="userType" id="isAdmin" /></label>
        </div>
    )
}
export default IsAdmin;