import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { filterPortfolio } from "../store/portfolioSlice";
import axios from "axios";
import { ContextUser } from "..";
import "../styles/Page__PortfolioStyles.css"





const PortfolioItem = (props) => {
  const dispatch = useDispatch();
  const {user} = useContext(ContextUser)

  const dellPortfolio = async () => {
    console.log(props._id)
  
    try {
      await axios.delete(`/api/portfolios/${props._id}`)
       dispatch(filterPortfolio(props._id))
    } catch (error) {
      console.error("(dellportfolio) Ошибка при отправке данных на сервер:", error);
    }
  };
  function formatContent(content) {
    return content.split('\n').map((line, index) => (
      <span key={index} style={{ whiteSpace: 'pre-wrap', fontSize: index === 0 ? 'x-large' : 'large' }}>
          {line}
          <br />
      </span>
  ));
}
if (!user.isAuth || user.user.role !== 'admin') {
  return (
    <div className="portfolio">
      <div className="portfolio__content">
        <div className="portfolioItem p_item__1">
            <img src={props.portfolio.picture} alt="master_photo" ></img>
            </div>
        <div className="portfolioItem p_item__2"> 
          {props.portfolio.title}
        </div>
        <div className="portfolioItem p_item__3">{formatContent(props.portfolio.content)}</div>
        <div className="portfolioItem p_item__4">
          <img src={props.portfolio.port_picture1} alt="port_photo1" className="port_photo1" ></img>
          <img src={props.portfolio.port_picture2} alt="popt_photo2" className="port_photo2"></img>
          <img src={props.portfolio.port_picture3} alt="port_photo3" className="port_photo3"></img>
        </div>
      </div>
    </div>
  );
}
  return (
    <div className="portfolio">
      <div className="portfolio__content">
        <div className="portfolioItem p_item__1">
            <img src={props.portfolio.picture} alt="master_photo" ></img>
            </div>
        <div className="portfolioItem p_item__2"> 
          {props.portfolio.title}
        </div>
        <div className="portfolioItem p_item__3">{formatContent(props.portfolio.content)}</div>

        <div className="portfolioItem p_item__4">
          <img src={props.portfolio.port_picture1} alt="port_photo1" className="port_photo1" ></img>
          <img src={props.portfolio.port_picture2} alt="popt_photo2" className="port_photo2"></img>
          <img src={props.portfolio.port_picture3} alt="port_photo3" className="port_photo3"></img>

        </div>
        
      </div>
      <div className="portfolio__btns">
            <button onClick={()=>(dellPortfolio())  }>Удалить</button>        
      </div>
    </div>
  );
};

export default PortfolioItem;
