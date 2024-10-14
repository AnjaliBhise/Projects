import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import enterNameImage from '../Assets/EnterName.jpg'; // Adjust the path according to your project structure

const EnterName = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/quiz', { state: { playerName: name } });
  };

  return (
    <div 
      className="container-fluid vh-100 d-flex justify-content-center align-items-center" 
      style={{
        backgroundImage: `url(${enterNameImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', // Text color
      }}
    >
      <div className="row w-100">
        <div className="col-12 col-md-6 offset-md-3 text-center bg-dark bg-opacity-50 p-4 rounded"> {/* Added background for readability */}
          <h1 className="mb-4" style={{ fontSize: '1.5rem' }}>Enter your name to start the quiz</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Start Quiz</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterName;
