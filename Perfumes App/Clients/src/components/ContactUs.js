import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description">
                We're here to help! If you have any questions or feedback, feel free to reach out to us.
            </p>
            <div className="contact-info mt-1">
                <h4>Get in Touch</h4>
                <p>Email: <a href="mailto:contact@essenceperfume.com">contact@essenceperfume.com</a></p>
                <p>Phone: <a href="tel:+918962349720">+91 8962349720</a></p>
            </div>
            <div className="additional-options mt-1">
                <h4>Additional Options</h4>
                <p>🛒 <strong>Live Chat:</strong> Chat with our support team for immediate assistance!</p>
                <p>📬 <strong>Newsletter:</strong> <strong>Subscribe</strong> to our newsletter for exclusive updates and promotions!</p>
                <p>📅 <strong>Book a Consultation:</strong> Schedule a one-on-one consultation to discuss our products!</p>
            </div>
            <p className="mt-3">Thank you for connecting with us!</p>
        </div>
    );
};

export default ContactUs;
