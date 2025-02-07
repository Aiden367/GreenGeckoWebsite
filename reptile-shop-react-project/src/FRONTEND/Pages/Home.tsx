import React, { useState, useEffect } from 'react';
import Nav from "../../COMPONENTS/Navbar"
import LizardImage from "../Images/lizard_Category_IMG.jpg"
import GeckoImage from "../Images/gecko_Category_IMG.jpg"
import SnakeImage from "../Images/snake_Category_IMG.jpg"
import './Styles/Home.css'
import axios from 'axios';

const CarouselOfReptiles: React.FC = () => {
  const [reptiles, setReptiles] = useState<any[]>([]);

  // Fetch data from backend API
  useEffect(() => {
    axios.get('http://localhost:5000/display/GetLatestReptile')
      .then(response => {
        setReptiles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the reptiles!', error);
      });
  }, []);

  return (
    <div className='carousel-container'>
      <h1>Latest Reptiles Added</h1>
      <div className='carousel'>
        {reptiles.map((reptile: any) => (
          <div key={reptile._id} className="carousel-item">
            {reptile.images && reptile.images.length > 0 ? (
              reptile.images.map((imageUrl: string, index: number) => (
                <img
                  key={index}
                  src={imageUrl} // Use the URL directly
                  alt={reptile.reptileName}
                  className="carousel-image"
                />
              ))
            ) : (
              // Fallback to a default image if no image URLs are available
              <img
                src="default.jpeg"
                alt={reptile.reptileName}
                className="carousel-image"
              />
            )}
            <p>{reptile.reptileName}</p> {/* Display reptile name */}
          </div>
        ))}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <>
      <Nav />

      <div className="image-container">
        <img src={LizardImage} alt="Lizard Image" />
        <img src={SnakeImage} alt="Snake Image" />
        <img src={GeckoImage} alt="Gecko Image" />
      </div>
      <CarouselOfReptiles />
    </>
  );
};

export default Home;
