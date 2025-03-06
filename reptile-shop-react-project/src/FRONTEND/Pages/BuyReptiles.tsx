import React, { useEffect, useState } from 'react';
import './Styles/BuyReptiles.css';
import Nav from "../../COMPONENTS/Navbar"
interface Reptile {
  _id: string;
  reptileName: string;
  reptileCategory: string;
  reptilePrice: string;
  reptileQuantity: number;
  dateUploaded: string;
  uploadedBy: {
    firstName: string;
    lastName: string;
  };
  images: string[];
}

const DisplayReptiles: React.FC = () => {
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinPrice(e.target.value ? parseFloat(e.target.value) : null);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxPrice(e.target.value ? parseFloat(e.target.value) : null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredReptiles = reptiles
    .filter((reptile) => reptile.reptileName.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((reptile) => {
      const price = parseFloat(reptile.reptilePrice);
      return (
        (!minPrice || price >= minPrice) &&
        (!maxPrice || price <= maxPrice)
      );
    });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Nav/>
    <div className="reptile-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search reptiles by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
  
      <div className="main-content">
        {/* Left Column - Price Filter */}
        <div className="filter-box">
          <h3>Filter by Price</h3>
          <label>Min Price:</label>
          <select onChange={handleMinPriceChange} value={minPrice ?? ''}>
            <option value="">No Min</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
  
          <label>Max Price:</label>
          <select onChange={handleMaxPriceChange} value={maxPrice ?? ''}>
            <option value="">No Max</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
          </select>
        </div>
  
        {/* Right Column - Reptile List */}
        <div className="reptile-list">
          {/* Reptiles Display */}
          {filteredReptiles.length > 0 ? (
            filteredReptiles.map((reptile) => (
              <div key={reptile._id} className="reptile-box">
                <div className="reptile-image">
                  {reptile.images.length > 0 && (
                    <img src={reptile.images[0]} alt={reptile.reptileName} width="150" />
                  )}
                </div>
  
                <div className="reptile-details">
                  <h2>{reptile.reptileName}</h2>
                  <p><strong>Category:</strong> {reptile.reptileCategory}</p>
                  <p><strong>Price:</strong> ${reptile.reptilePrice}</p>
                  <p><strong>Quantity:</strong> {reptile.reptileQuantity}</p>
                  <p><strong>Date Uploaded:</strong> {new Date(reptile.dateUploaded).toLocaleDateString()}</p>
                  <p>
                    <strong>Uploaded By:</strong>{" "}
                    {reptile.uploadedBy ? `${reptile.uploadedBy.firstName} ${reptile.uploadedBy.lastName}` : "Unknown"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No reptiles match your search criteria.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
  
};

export default DisplayReptiles;
