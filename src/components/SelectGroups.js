import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import URI from '../uri';
import Error from "./Error";

const SelectGroups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(0)
    const [message, setMessage] = useState("");

    const handleSelectChange = (e) => {
        console.log(e.target.value);
        setSelectedGroup(e.target.value);
    }

    useEffect(() => {
        fetch(URI + '/groups')
        .then(resposne => resposne.json())
        .then(response => {
            console.log(response);
            if (response.status === 'OK') {
                setGroups(response.response);
                setMessage("");
            } else {
                setMessage(response.message);
            }
        });
    }, []);

    let options = [<option key="0" value="0"></option>];
    options.push(
        groups.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
        ))
    );

    return (
        <div>
            <label htmlFor="selectGroup">Wybierz firmę</label>
            <select name="selectGroup" id="selectGroup" onChange={handleSelectChange} value="2">
                {options}
            </select>
            <Error message={message} />
        </div>

    );
}
export default SelectGroups;