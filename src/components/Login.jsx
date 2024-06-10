// import React, { useState } from "react";
// import { NavLink, } from "react-router-dom";

// const Login = (props) => {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <>
//       <div className="form-container">
//         <p className="LabelForm" htmlFor="form-container">
//           Войти
//         </p>
//         <form className="login-form" onSubmit={handleSubmit}>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Введите Email..."
//             id="email"
//             name="email"
//           />
//           <input
//             value={pass}
//             onChange={(e) => setPass(e.target.value)}
//             type="password"
//             placeholder="Введите пароль..."
//             id="password"
//             name="password"
//           />
//           <div className="pstStr"></div>
//           <button className="RegInButton" type="submit">
//             Войти
//           </button>
//         </form>
//         <button
//           className="bottombutton"
//           onClick={() => props.onFormSwitch("register")}
//         >
//         <NavLink to={'/registration'} className="bottombutton">Нет аккаунта? Создать.</NavLink>
//         </button>
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { ContextUser } from "../index"; 

const Login = ({ onFormSwitch, closeModal }) => {
  const { user } = useContext(ContextUser);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password: pass });
      console.log(response.data);

      const token = response.data.jwtToken;
      localStorage.setItem('jwtToken', token);

      const userData = { email: response.data.email };
      user.setUser(userData);
      user.setIsAuth(true);
      closeModal();
      window.location.reload();
      
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка входа");
    }
  };

  return (
    <>
      <div className="form-container">
        <p className="LabelForm" htmlFor="form-container">
          Войти
        </p>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Введите Email..."
            id="email"
            name="email"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Введите пароль..."
            id="password"
            name="password"
          />
          <div className="pstStr"></div>
          <button className="RegInButton" type="submit">
            Войти
          </button>
        </form>
        <button
          className="bottombutton"
          onClick={() => onFormSwitch("register")}
        >
          <NavLink to={'/registration'} className="bottombutton">Нет аккаунта? Создать.</NavLink>
        </button>
      </div>
    </>
  );
};

export default Login;
