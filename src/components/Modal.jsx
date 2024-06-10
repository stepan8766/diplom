// import React, { useState } from "react";
// import Login from "./Login";
// import Register from "./Register";
// import "../styles/ModalStyles.css";

// const Modal = ({ active, setActive }) => {
//   const [currentFormIn, setCurrentFormIn] = useState("register");
//   const toggleForm = (formName) => {
//     setCurrentFormIn(formName);
//   };
//   return (
//     <div
//       className={active ? "modal active" : "modal"}
//       onClick={() => setActive(false)}
//     >
//       <div className="modal_content" onClick={(e) => e.stopPropagation()}>
//         {currentFormIn === "login" ? (
//           <Login onFormSwitch={toggleForm} />
//         ) : (
//           <Register onFormSwitch={toggleForm} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../styles/ModalStyles.css";

const Modal = ({ active, setActive }) => {
  const [currentFormIn, setCurrentFormIn] = useState("login");
  
  const closeModal = () => {
    setCurrentFormIn("login"); // Сбросить текущую форму обратно на регистрацию
    setActive(false); // Закрыть модальное окно
  };
  
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {currentFormIn === "login" ? (
          <Login onFormSwitch={setCurrentFormIn} closeModal={closeModal} />
        ) : (
          <Register onFormSwitch={setCurrentFormIn} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Modal;

