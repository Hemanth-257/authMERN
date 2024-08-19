import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  let navigate = useNavigate();
  const logout = () => {
    handleSuccess("Logged out! Thank you");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const [doCalculate, setDoCalculate] = useState({
    calculate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    const copyDoCalculate = { ...doCalculate };
    copyDoCalculate[name] = value;
    setDoCalculate(copyDoCalculate);
  };

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    const { calculate } = doCalculate;
    // console.log(calculate);
    if (calculate === "") {
      return handleError("Give inputs to add");
    } else {
      const splitInputs = calculate.split("+");
      let newInput = 0;
      splitInputs.forEach((ipt) => {
        newInput += +ipt;
      });
      console.log(newInput);
      handleSuccess(`Output is ${newInput}`);
    }
  };

  return (
    <>
      <h1>
        Hello <p className="logged-in-user">{loggedInUser}</p>
      </h1>
      <br />
      <div className="container">
        <h3>Arithmetic Calculations</h3>
        <br />
        <p>+ : Add</p>
        {/* <p>- : Subtract</p>
        <p>* : Multiply</p>
        <p>/ : Divide</p> */}
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="calculate"
          autoFocus
          placeholder="Calcualte here..."
          value={doCalculate.calculate}
        />
        <button onClick={handleCalculate} type="submit">
          Calculate
        </button>
      </div>
      <br />
      <button onClick={logout}>Logout</button>
      <ToastContainer />
    </>
  );
}

export default Home;
