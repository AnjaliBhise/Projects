import React from 'react';
import './AboutUs.css';
import perfumeImage1 from '../Assets/perfume3.png'; 
import perfumeImage2 from '../Assets/perfume5.png';
import perfumeImage3 from '../Assets/perfume.png';

const AboutUs = () => {
    return (
        <div className="about-us min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="about-title">About Us</h1>
            <p className="about-description">
                At <strong>Fragrance Haven</strong>, we believe that a scent can tell a story. Our carefully curated collection of perfumes is designed to help you express your unique personality and elevate your everyday moments. 
            </p>
            <p className="about-mission">
                Our mission is to provide an exquisite selection of fragrances that inspire confidence and sophistication.
            </p>
            <div className="row mt-4">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="perfume-card">
                        <img src={perfumeImage1} alt="Perfume 1" className="img-fluid" />
                        <h5>Elegant Essence</h5>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="perfume-card">
                        <img src={perfumeImage2} alt="Perfume 2" className="img-fluid" />
                        <h5>Floral Symphony</h5>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="perfume-card">
                        <img src={perfumeImage3} alt="Perfume 3" className="img-fluid" />
                        <h5>Exotic Night</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
