import React, { useState, useEffect } from 'react';
import { storage, database } from './firebase'; // Import your Firebase config
import './App.css'; // Import your CSS file

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch image data from Firebase Storage
    const fetchImages = async () => {
      try {
        const imageRef = storage.ref('images'); // Replace 'images' with your storage path
        const imageList = await imageRef.listAll();
        const imageUrls = await Promise.all(
          imageList.items.map(item => item.getDownloadURL())
        );
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const checkAnswer = async (isCar) => {
    if (isCar) {
      setResult('Correct! That is a car.');
    } else {
      setResult('Incorrect. That is not a car.');
    }

    // Update game data in Firebase Realtime Database (optional)
    try {
      const gameDataRef = database.ref('gameData');
      await gameDataRef.update({
        // ... (update game data, e.g., score, attempts)
      });
    } catch (error) {
      console.error('Error updating game data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Identify the Car!</h1>
      <div className="image-container">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            onClick={() => handleImageClick(imageUrl)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className="selected-image">
          <img src={selectedImage} alt="Selected Image" />
          <button onClick={() => checkAnswer(true)}>Is a Car</button>
          <button onClick={() => checkAnswer(false)}>Is Not a Car</button>
        </div>
      )}
      <div className="result">{result}</div>
    </div>
  );
}

export default App;
