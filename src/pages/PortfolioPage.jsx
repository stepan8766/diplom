import { useState } from "react"
import React  from 'react'
import "../styles/Page__HomeStyles.css"
import PortfolioList from "../components/PortfolioList"
import PortfolioForm from "../components/PortfolioForm"
// import PostMarquee from "../components/PostMarquee"
import HomeBanner from "../components/HomeBanner"


const Portfolio_page = () => {
const [portfolios, setPortfolios] = useState([])

const createPortfolio = (newPortfolio) => {setPortfolios ( [newPortfolio, ...portfolios])}



  return (
    <>  
        <HomeBanner/>
        <div className='portfolio-content'>
          <PortfolioForm create={createPortfolio} />
          <PortfolioList portfolios={portfolios} />
      </div>
    </>

  )
}


export default Portfolio_page