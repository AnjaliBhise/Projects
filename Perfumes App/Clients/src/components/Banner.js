import React from 'react'; 
import sale from '../Assets/sale_perfume.png'; 
import './Banner.css'; 

const Banner = () => {
    return ( 
        <>
            <div className="glow-red"></div>
            <div className="glow-blue"></div>
            <div className="d-flex justify-content-between align-items-center celebrate" style={{ height: '75vh' }}>
                <div className="text-center">
                    <img src={sale} alt="Perfume" className="home-image" />
                </div>
                <div className="col-md-6 text-center">
                    <p className="banner-tagline">Celebrate the sales day!</p>
                    <h3 className="banner-discount">Save 20% off on all collection items</h3>
                    <a href="/perfumes" className="btn btn-success custom-bg">Shop Now</a>
                </div>
            </div>
            <div className="scroll-container">
                <div className="scroll">
                    <h2>20% OFF</h2>
                    <h2>Order Now</h2>
                    <div className="dot"></div>
                </div>
                <div className="scroll">
                    <h2>20% OFF</h2>
                    <h2>Order Now</h2>
                    <div className="dot"></div>
                </div>
                <div className="scroll">
                    <h2>20% OFF</h2>
                    <h2>Order Now</h2>
                    <div className="dot"></div>
                </div>
                <div className="scroll">
                    <h2>20% OFF</h2>
                    <h2>Order Now</h2>
                    <div className="dot"></div>
                </div>
            </div>
        </>
    );
}

export default Banner;
