import React, { useState, useEffect } from 'react';
import Nav from "../../COMPONENTS/Navbar"
import LizardImage from "../Images/lizard_Category_IMG.jpg"
import GeckoImage from "../Images/gecko_Category_IMG.jpg"
import SnakeImage from "../Images/snake_Category_IMG.jpg"
import './Styles/Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className="Home-page-heading">
        <h1>We Are Now Live!</h1>
        <h2>Buy and sell reptiles directly from trusted breeders across South Africa.</h2>
        <button className="explore-button" onClick={() => navigate("/AddReptile")}>
        List your reptile for sale today!
          </button>
      </div>
      <h3 className="categories-heading">Categories</h3>
      <div className="image-container">
        <div className="image-wrapper">
          <img src={LizardImage} alt="Lizard" />
          <span className="image-text">Lizard</span>
        </div>
        <div className="image-wrapper">
          <img src={SnakeImage} alt="Snake" />
          <span className="image-text">Snake</span>
        </div>
        <div className="image-wrapper">
          <img src={GeckoImage} alt="Gecko" />
          <span className="image-text">Gecko</span>
        </div>
      </div>
    </>
  );
};


export default Home;
