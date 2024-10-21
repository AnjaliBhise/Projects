import Navbar from '../components/Navbar.js';  
import PerfumeDetails from '../components/PerfumeDetails.js';  
import './Home.css'; 


const HomePage = () => {
    return (
        <div className="min-vh-100 background-img">
            <Navbar />
            <PerfumeDetails />
        </div>  
            
    );
}

export default HomePage;
