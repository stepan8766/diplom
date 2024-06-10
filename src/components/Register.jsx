// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// const Register = (props) => {
//   // const [name, setName] = useState('');
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <>
//       <div className="form-container">
//         <p className="LabelForm" htmlFor="form-container">
//           Создать аккаунт
//         </p>
//         <form className="register-form" onSubmit={handleSubmit}>
//           <input id="name" name="name" placeholder="Введите своё имя..." />
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
//             Регистрация
//           </button>
//         </form>
//         <button
//           className="bottombutton"
//           onClick={() => props.onFormSwitch("login")}
//         >
//         <NavLink to={'/login'} className="bottombutton">Уже есть аккаунт? Войти.</NavLink>
          
//         </button>
//       </div>
//     </>
//   );
// };

// export default Register;
// Register.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';

const Register = ({ onFormSwitch, closeModal }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/registration', { email, password: pass });
      console.log(response.data);
      // Дополнительно: сохранить токен в localStorage или в redux store
      // После успешной регистрации, автоматически войти пользователя
      // После успешного входа, закрыть модальное окно
      closeModal();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="form-container">
        <p className="LabelForm" htmlFor="form-container">
          Создать аккаунт
        </p>
        {error && <p className="error-message">{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
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
            Регистрация
          </button>
        </form>
        <button
          className="bottombutton"
          onClick={() => onFormSwitch("login")}
        >
          <NavLink to={'/login'} className="bottombutton">Уже есть аккаунт? Войти.</NavLink>
        </button>
      </div>
    </>
  );
};

export default Register;



