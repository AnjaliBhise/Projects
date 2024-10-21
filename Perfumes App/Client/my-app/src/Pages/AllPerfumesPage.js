import Navbar from '../components/Navbar.js'; 
import './Home.css'; 
import PerfumeCards from '../components/PerfumeCards.js';

const AllPerfumePage = () => {
    return (
        <div className="min-vh-100 background-img">
            <Navbar />
            <PerfumeCards />
        </div>  
            
    );
}

export default AllPerfumePage;
