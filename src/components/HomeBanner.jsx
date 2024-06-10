
import React from "react";
import bannerImage from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\studio_12.jpg";
import "../styles/Page_HomeBanner.css";

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <img src={bannerImage} alt="Home Banner" className="home-banner__image" />
    </div>
  );
};

export default HomeBanner;
