import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PerfumeDetails.css';

const PerfumeDetails = () => {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfume = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/perfume/${id}`);
        const fetchedPerfume = response.data;
        setPerfume(fetchedPerfume);
      } catch (error) {
        setError("Error loading perfume data.");
        console.error("Error loading perfume:", error);
      }
    };

    fetchPerfume();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (newReview) {
      try {
        const response = await axios.post(`http://localhost:8000/api/perfume/reviews/${id}`, { review: newReview });
        setPerfume((prevPerfume) => ({
          ...prevPerfume,
          reviews: [...(prevPerfume.reviews || []), newReview],
        }));
        setNewReview(''); 
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleShare = () => {
    const shareData = {
      title: perfume.name,
      text: `Check out this amazing perfume: ${perfume.name}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="perfume-details-container">
      {error && <div className="error-message">{error}</div>}
      {perfume ? (
        <>
          <div className="row" style={{ marginBottom: '15px' }}>
            {/* Left Section - Card Image */}
            <div className="col-md-6 d-flex">
              <div className="card mb-2 center-card">
                <img src={perfume.cardImage} alt={perfume.name} className="card-img-top" />
              </div>
            </div>

            {/* Right Section - Perfume Details */}
            <div className="col-md-6" style={{ textAlign: 'left' }}>
              <h2 style={{ color: 'white', marginBottom: '15px' }}>{perfume.name}</h2>
              <h4 style={{ color: 'white', marginBottom: '15px' }}>Price: ${perfume.price}</h4>
              <div className="sizes" style={{ color: 'white', marginBottom: '15px' }}>
                <strong>Available Sizes:</strong>
                <select>
                  {perfume.sizes && perfume.sizes.length > 0 ? (
                    perfume.sizes.map((size, index) => (
                      <option key={index}>{size}</option>
                    ))
                  ) : (
                    <option>No sizes available</option>
                  )}
                </select>
              </div>

              <div className="add-review" style={{ marginBottom: '15px' }}>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here"
                />
                <button onClick={handleReviewSubmit}>Submit Review</button>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <button className="btn-share" onClick={handleShare}>Share Perfume</button>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <button className="btn-share">Buy</button>
              </div>
            </div>
          </div>

          <h4 style={{ color: 'white' }}>Perfume Details</h4>
          <div id="details" className="perfume-info" style={{ marginBottom: '15px' }}>
            <p><strong>Details:</strong> {perfume.details}</p>
          </div>

          <div id="reviews" className="reviews" style={{ color: 'white', marginBottom: '15px' }}>
            <h4>Reviews</h4>
            {perfume.reviews && perfume.reviews.length > 0 ? (
              <ul>
                {perfume.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </div>

          <h4 style={{ color: 'white' }}>Gallery</h4>
          <div className="gallery row" style={{ marginBottom: '15px' }}>
            {perfume.gallery && perfume.gallery.length > 0 ? (
              perfume.gallery.slice(0, 3).map((image, index) => (
                <div key={index} className="col-md-4">
                  <div className="card mb-2">
                    <img src={image} alt={`Gallery image ${index + 1}`} className="card-img-top" />
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'white' }}>No gallery images available.</p>
            )}
          </div>
        </>
      ) : (
        <p style={{ color: 'white' }}>Loading perfume details...</p>
      )}
    </div>
  );
};

export default PerfumeDetails;
