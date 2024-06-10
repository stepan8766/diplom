import React, { useContext, useState } from "react";
import "../styles/NavbarStyles.css";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../index"; // Убедитесь, что путь правильный
import { observer } from "mobx-react-lite";
import logo from "../image/Logo2.png";

const Navbar = observer(() => {
  const { user } = useContext(ContextUser);
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [button, setButton] = useState(false);
  const [button2, setButton2] = useState(true);

  const HandlerClick = () => {
    setButton(!button);
    setButton2(!button2);
    document.body.classList.toggle('body-Scroll');
  };
  const handleLogout = () => {
    user.logout();
    window.location.reload();
  };

  return (
    <nav>
      <img id="logo" src={logo} alt=""></img>
      <div id="navbarblock">
        <ul id="navbarul" className={button ? "navbarul active" : "navbarul"}>
          <li>
            <a
              onClick={(e) => {
                HandlerClick();
                navigate("/Home");
                e.preventDefault();
              }}
              className="/Home"
              href="index.html"
            >
              Главная
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                HandlerClick();
                navigate("/Portfolio");
                e.preventDefault();
              }}
              className="/Portfolio"
              href="index.html"
            >
              Портфолио
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                HandlerClick();
                navigate("/Price");
                e.preventDefault();
              }}
              className="/Price"
              href="index.html"
            >
              Прайс-лист
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                HandlerClick();
                navigate("/Record");
                e.preventDefault();
              }}
              className="/Record"
              href="index.html"
            >
              Запись
            </a>
          </li>
          <li>
            <a
              onClick={(e) => {
                HandlerClick();
                navigate("/Contact");
                e.preventDefault();
              }}
              className="/Contact"
              href="index.html"
            >
              Контакты
            </a>
          </li>
          <li>
            <a>
              {user.user.email}
            </a>
          </li>
        </ul>
      </div>
      <div id="mobile">
        {button2 && <i onClick={HandlerClick} className="fa-solid fa-bars"></i>}
        {button && <i onClick={HandlerClick} className="fa-solid fa-xmark"></i>}
      </div>
      <div id="navbarin">
        {!user.isAuth && (<button
          className="open-btn fa-solid fa-right-to-bracket"
          onClick={() => { setModalActive(true); user.setIsAuth(true); }}
        ></button>)}
        {user.isAuth && (<button
                className="open-btn fa-solid fa-right-from-bracket" 
                onClick={handleLogout}
          ></button>)}
      </div>
      <Modal active={modalActive} setActive={setModalActive} />
    </nav>
  );
});

export default Navbar;
