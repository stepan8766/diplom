import React, { useState, useEffect, useRef } from 'react';
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";





const Slider = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? children.length - 1 : prevIndex - 1));
    };
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1));
    };
  
    useEffect(() => {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }, [currentIndex]);
  
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 7000);
  
      return () => {
        clearInterval(intervalRef.current);
      };
    }, []);
  
    const handlePrevClick = () => {
      clearInterval(intervalRef.current);
      prevSlide();
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 10000);
    };
  
    const handleNextClick = () => {
      clearInterval(intervalRef.current);
      nextSlide();
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 10000);
    };




    
  return (
    <div className="slider">
    <button className="arrow-left" onClick={handlePrevClick}>
      <SlArrowLeftCircle />
    </button>
    <div className="slider-content" ref={sliderRef}>
      {React.Children.map(children, (child, index) => (
        <div className="slide" key={index}>
          {child}
        </div>
      ))}
    </div>
    <button className="arrow-right" onClick={handleNextClick}>
    <SlArrowRightCircle />
    </button>
  </div>
  );
};

export default Slider;