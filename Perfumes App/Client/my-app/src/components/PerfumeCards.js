import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import './PerfumeCards.css'; 

const PerfumeCards = () => {
  const [perfumes, setPerfumes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/perfumes') 
      .then(response => {
        setPerfumes(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        setError(error.message); 
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return <div>Loading perfumes...</div>; 
  }

  if (error) {
    return <div>Error loading perfumes: {error}</div>; 
  }

  return (
    <div className="perfume-showcase" style={{ backgroundImage: `url('Background.jpg')` }}>
      <div className="container py-5">
        <div className="row">
          {perfumes.map((perfume) => (
            <div className="col-md-4" key={perfume._id}> 
              <div className="card perfume-card shadow-sm mb-4">
                <img 
                  src={perfume.cardImage} 
                  className="card-img-top" 
                  alt={perfume.name} 
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{perfume.name}</h5>
                  <p className="card-text">{perfume.description}</p>
                  <h6 className="card-price">${perfume.price.toFixed(2)}</h6>
                  <Link to={`/perfume/${perfume._id}`} className="btn btn-details">View Details</Link> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfumeCards;
