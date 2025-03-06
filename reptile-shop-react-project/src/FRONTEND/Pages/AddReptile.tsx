import React, { useState } from 'react';

const UploadReptile: React.FC = () => {
  const [enteredReptileName, setEnteredReptileName] = useState('');
  const [enteredReptileCategory, setEnteredReptileCategory] = useState('');
  const [enteredReptilePrice, setEnteredReptilePrice] = useState('');
  const [enteredReptileQuantity, setEnteredReptileQuantity] = useState('');
  const [reptileImages, setReptileImages] = useState<File[]>([]);
  const[enteredReptileLocation,setEnteredReptileLocation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For showing loading state

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to an array and add it to the existing images
      const selectedFiles = Array.from(e.target.files);

      setReptileImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleReptileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  // Show loading indicator

    const formData = new FormData();
    formData.append('reptileName', enteredReptileName);
    formData.append('reptileCategory', enteredReptileCategory);
    formData.append('reptilePrice', enteredReptilePrice);
    formData.append('reptileQuantity', enteredReptileQuantity);

    // Append each image to the FormData object
    reptileImages.forEach((image) => {
      formData.append('images', image);
    });

    // Get the token from localStorage (assuming it's saved there after login)
    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const response = await fetch('http://localhost:5000/user/UploadReptile', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      setIsLoading(false);  // Hide loading indicator

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage('Reptile uploaded successfully');
        console.log('Reptile uploaded successfully', result);

        // Reset form fields
        setEnteredReptileName('');
        setEnteredReptileCategory('');
        setEnteredReptilePrice('');
        setEnteredReptileQuantity('');
        setReptileImages([]);  // Clear images after upload
        setEnteredReptileLocation('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Upload failed');
        console.error('Upload failed:', errorData);
      }
    } catch (error) {
      setIsLoading(false);  // Hide loading indicator
      setError('An error occurred during the upload');
      console.error('Error during upload:', error);
    }
  };

  return (
    <div className="create-account-container">
      <div className="form-container">
        <h1>Upload Reptile</h1>
        <form onSubmit={handleReptileUpload}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Reptile Name"
              value={enteredReptileName}
              onChange={(e) => setEnteredReptileName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <select
              value={enteredReptileCategory}
              onChange={(e) => setEnteredReptileCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Lizard">Lizard</option>
              <option value="Snake">Snake</option>
              <option value="Gecko">Gecko</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Reptile Price"
              value={enteredReptilePrice}
              onChange={(e) => setEnteredReptilePrice(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              placeholder="Reptile Quantity"
              value={enteredReptileQuantity}
              onChange={(e) => setEnteredReptileQuantity(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Location"
              value={enteredReptileLocation}
              onChange={(e) => setEnteredReptileLocation(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div>
              {reptileImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  width="100"
                  height="100"
                />
              ))}
            </div>
          </div>
          <button type="submit" className="create-account-btn" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload Reptile'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default UploadReptile;
