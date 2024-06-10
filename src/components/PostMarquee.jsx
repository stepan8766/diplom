import React from "react"
import "../styles/Page__Home_Marquee.css"

const Marquee = ({ images }) => {
    return (
      <div className="marquee">
        <div className="marquee__inner">
          {images.concat(images).map((image, index) => (
            <span className="marquee__item" key={index}>
              <img src={image} alt={`Imag ${index + 1}`} />
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default Marquee;