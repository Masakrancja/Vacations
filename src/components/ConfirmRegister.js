import { dataRegisterContext } from "../context/RegisterContext";

const ConfirmRegister = () => {
  const handleButtonClick = () => {
    console.log(dataRegisterContext);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Rejestruj</button>
    </div>
  );
};
export default ConfirmRegister;
