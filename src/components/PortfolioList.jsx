import React, { useEffect } from "react";
import PortfolioItem from "./PortfolioItem";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { addPortfolio } from "../store/portfolioSlice";
import Slider from "./PortfolioSlider";

const PortfolioList = ({ title }) => {
  const portfolios = useSelector(state => state.portfolios.portfolios);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios.get("/api/portfolios").then((result) => { 
      result.data.forEach(element => {
        dispatch(addPortfolio(element));
      });
    });
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <div className="parent_position">
        <Slider>
          {portfolios.map((portfolio, index) => (
            <PortfolioItem number={index + 1} _id={portfolio._id} portfolio={portfolio} key={portfolio.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default PortfolioList;