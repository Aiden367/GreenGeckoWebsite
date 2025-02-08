import React, { useEffect, useState } from 'react';
import './Styles/BuyReptiles.css';

interface Reptile {
  _id: string;
  reptileName: string;
  reptileCategory: string;
  reptilePrice: string;
  reptileQuantity: string;
  images: string[]; // Array of image URLs
  dateUploaded: string;
}

const DisplayReptiles: React.FC = () => {
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // State for the currently selected image
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search query

  // Fetch the latest reptiles from the backend
  useEffect(() => {
    const fetchReptiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/display/GetLatestReptile');
        if (!response.ok) {
          throw new Error('Failed to fetch reptiles');
        }
        const data = await response.json();
        setReptiles(data);
      } catch (error) {
        setError('Failed to load reptiles');
      } finally {
        setLoading(false);
      }
    };

    fetchReptiles();
  }, []);

 
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredReptiles = reptiles.filter((reptile) =>
    reptile.reptileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="reptile-list">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a reptile..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {filteredReptiles.length > 0 ? (
        filteredReptiles.map((reptile) => (
          <div key={reptile._id} className="reptile-box">
            <div className="reptile-content">
              {/* Main Image on the Left */}
              <div className="reptile-image">
                {reptile.images.length > 0 && (
                  <img
                    src={reptile.images[currentImageIndex]}
                    alt={`Reptile ${reptile.reptileName} - Main`}
                    width="300"
                    style={{ marginBottom: '10px' }}
                  />
                )}
                {/* Thumbnails */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {reptile.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Reptile ${reptile.reptileName} - ${index + 1}`}
                      width="80"
                      style={{
                        cursor: 'pointer',
                        border: index === currentImageIndex ? '2px solid blue' : 'none',
                      }}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Details on the Right */}
              <div className="reptile-details">
                <h2>{reptile.reptileName}</h2>
                <p><strong>Category:</strong> {reptile.reptileCategory}</p>
                <p><strong>Price:</strong> ${reptile.reptilePrice}</p>
                <p><strong>Quantity:</strong> {reptile.reptileQuantity}</p>
                <p><strong>Date Uploaded:</strong> {new Date(reptile.dateUploaded).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No reptiles available</p>
      )}
    </div>
  );
};

export default DisplayReptiles;
