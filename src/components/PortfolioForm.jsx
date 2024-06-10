import React, { useState, useRef, useContext } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addPortfolio} from "../store/portfolioSlice";
import { ContextUser } from "../index";
import "../styles/Page__PortfolioStyles.css"
// import imag from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\3234.jpg"
const PortfolioForm = ({ create }) => {
  const dispatch = useDispatch();
  const [portfolio, setPortfolio] = useState({ title: "", content: "", picture: null, port_picture1: null, port_picture2: null, port_picture3: null });
  const fileInputRef = useRef(null);
  const {user} = useContext(ContextUser)

  const addNewPortfolio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', portfolio.title);
    formData.append('content', portfolio.content);
    formData.append('picture', portfolio.picture);
    formData.append('port_picture', portfolio.picture);
    formData.append('port_picture1', portfolio.port_picture1);
    formData.append('port_picture2', portfolio.port_picture2);
    formData.append('port_picture3', portfolio.port_picture3);

       axios.post("/api/portfolios", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((result)=>{
        dispatch(addPortfolio(result.data))
      })
      
      setPortfolio({ title: "", content: "", picture: null,  port_picture1: null, port_picture2: null, port_picture3: null});
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }
  };

  const handlePictureChange = (e) => {
    setPortfolio({ ...portfolio, picture: e.target.files[0] });
  };
  const handle_portPictureChange1 = (e) => {
    setPortfolio({ ...portfolio, port_picture1: e.target.files[0] });
  };
  const handle_portPictureChange2 = (e) => {
    setPortfolio({ ...portfolio, port_picture2: e.target.files[0] });
  };
  const handle_portPictureChange3 = (e) => {
    setPortfolio({ ...portfolio, port_picture3: e.target.files[0] });
  };

  // const handleRemovePicture = (index) => {
  //   const updatedPictures = portfolio.pictures.filter((_, i) => i !== index);
  //   setPortfolio({ ...portfolio, pictures: updatedPictures });
  // };
  if (!user.isAuth || user.user.role !== 'admin') {
    return null; 
  }
  return (
    
     <div>
      <form className="portfolio-form">
        <input
          value={portfolio.title}
          onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
          type="text"
          placeholder="ФИО специалиста"
        />
        <textarea className="text-content"
          value={portfolio.content}
          onChange={(e) => setPortfolio({ ...portfolio, content: e.target.value })}
          type="text"
          placeholder="Должность специалиста"
        />

          <div className="input-file-row">
            <label className="input-file">
              <input  className="portfolio_input-file"
                onChange={handlePictureChange}
                type="file"
                accept=".jpg .jpeg .png"
                placeholder="Фотография"
                ref={fileInputRef}
                multiple
                name="file[]" 
              />
              <span>Фотография мастера</span>
            </label>
            <div className="input-file-list"></div>
          </div>

          
          <div className="input-file-row">
            <label className="input-file">
                <input  className="port1_portfolio_input-file"
                  onChange={handle_portPictureChange1}
                  type="file"
                  accept=".jpg .jpeg .png"
                  placeholder="Фотография"
                  ref={fileInputRef}
                />
              <span>Первая работа</span>
            </label>
            <div className="input-file-list"></div>
          </div>


          <div className="input-file-row">
            <label className="input-file">
                  <input  className="port2_portfolio_input-file"
                  onChange={handle_portPictureChange2}
                  type="file"
                  accept=".jpg .jpeg .png"
                  placeholder="Фотография"
                  ref={fileInputRef}
                />
              <span>Вторая работа</span>
            </label>
            <div className="input-file-list"></div>
          </div>


          <div className="input-file-row">
            <label className="input-file">
              <input  className="port3_portfolio_input-file"
                onChange={handle_portPictureChange3}
                type="file"
                accept=".jpg .jpeg .png"
                placeholder="Фотография"
                ref={fileInputRef}
              />
              <span>Третья работа</span>
            </label>
            <div className="input-file-list"></div>
          </div>
          
        
        <button className="portfolio-form__button" onClick={addNewPortfolio}>
          Создать новое портфолио
        </button>
      </form>
    </div>
 );
};

export default PortfolioForm;
