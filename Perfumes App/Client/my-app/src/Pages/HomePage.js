import Navbar from '../components/Navbar.js';  
import Banner from '../components/Banner.js';  
import './Home.css'; 


const HomePage = () => {
    return (
        <div className="min-vh-100 background-img">
            <Navbar />
            <Banner />
        </div>  
            
    );
}

export default HomePage;
