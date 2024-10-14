import React, { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../Assets/Home.jpg';  // Adjust the path according to your project structure
import homeSound from '../Sounds/Home.mp3';  // Import the sound file
import './HomeScreen.css';  // Make sure to import your CSS file here

const HomeScreen = () => {
  const audioRef = useRef(null); // Create a ref for the audio element

  useEffect(() => {
    // Play audio when the component mounts
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    playAudio();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div 
      className="container-fluid vh-100 d-flex align-items-center" 
      style={{
        backgroundImage: `url(${homeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        width: '100%',
        color: 'white',
      }}
    >
      <audio ref={audioRef} src={homeSound} preload="auto" /> {/* Audio element */}
      <div className="row w-100">
        {/* Question Section */}
        <div 
          className="col-12 col-md-6 text-center" 
          style={{ 
            padding: '20px 0', 
          }}
        >
          <h1 className="mb-3" style={{ fontSize: '1.7rem', color: 'black' }}>Question:</h1>
          <p className="question">
            What is the capital of France?
          </p>
          <div className="answers">
              <div className="answer">A) Berlin</div>
              <div className="answer">B) Madrid</div>
              <div className="answer">C) Paris</div>
              <div className="answer">D) Rome</div>
          </div>
        </div>

        {/* QR Code Section below the Question */}
        <div 
          className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center" 
          style={{ 
            padding: '20px 0', 
          }}
        >
          <div className="text-center"> 
            <QRCodeCanvas value="https://6cda-59-152-56-149.ngrok-free.app/enter-name" size={150} />
            <p className="mt-3" style={{ fontSize: '1.7rem', color: 'black', fontWeight: 'bold' }}>Scan the QR code and play the game</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
