import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EntryPage from './pages/EntryPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import BookList from "./pages/BookList";
import EditProfile from "./pages/EditProfile";
import ViewProfile from "./pages/ViewProfile";
import MyOrders from "./pages/MyOrders"
import AdminOrders from './pages/AdminOrders';
import AddBook from './pages/AddBook';
import AdminBooklist from './pages/AdminBooklist';
import EditBook from './pages/EditBook';
import ManageOrders from './pages/ManageOrders';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/viewprofile" element={<ViewProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/admin-orders" element={<AdminOrders />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/admin-booklist" element={<AdminBooklist />} />
          <Route path="/editbook/:id" element={<EditBook />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
