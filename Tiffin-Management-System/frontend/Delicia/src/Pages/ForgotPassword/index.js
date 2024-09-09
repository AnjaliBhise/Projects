// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import './index.css'
// // import { toast } from 'react-toastify'
// import axios from 'axios'
// import { useNavigate } from 'react-router'
// import { URL } from '../../config'
// import { toast } from 'react-toastify'
// import Navbar from '../../Components/navHome'
// import Footcomponent from '../../Components/footer'
// import jwt from 'jwt-decode'
// import { borderLeft, color, fontWeight } from '@mui/system'
// import { red } from '@mui/material/colors'
// import config from '../../config'

// const ResetPassword = () => 
// {
//   const [email, setEmail] = useState('')
//   const [oldPassword, setOldPassword] = useState('')
//   const [newPassword, setNewPassword] = useState('')

//   const navigate = useNavigate()

//   const setnewPassword = () => {
//     if (email.length === 0 || oldPassword.length===0 || newPassword.length===0) {
//       toast.warning('please fill in all fields')
//       return;
//     } 
//       const body = {
//         email,
//         newPassword
//       }
      

//       // url to make signin api call
//       const url = config.serverURL + `/resetpassword` 
//       axios
//       .post(url, body, 
//       {
//         headers: { Authorization: `Bearer ${localStorage['jwt']}` },
//       })
//       .then((response) => {
//         debugger;
//         const result = response.data
//         if (result['status'] == 'success') {
//           navigate('/signin')
//         }  else
//           {
//             toast.error("Failed to reset password.");
//           }
//         }).catch((error)=>{
//           toast.error('An error occured.');
//         });
//     }
//   return (
//     <div>
//       <div>
//         <Navbar></Navbar>
//       </div>
//       <div>
//         <div className='login-box'>
//           <h1>Reset Password</h1>
//           <div className='textbook'>
//             <i className='fas fa-envelope'></i>
//             <input
//               type='text'
//               placeholder='Enter Email'
//               onChange={(e) => {
//                 setEmail(e.target.value)
//               }}
//               className='form-control'
//             />
//           </div>
//           <div className='textbook'>
//             <i className='fas fa-lock'></i>
//             <input
//               type='password'
//               placeholder='Enter Old Password'
//               onChange={(e) => {
//                 setOldPassword(e.target.value)
//               }}
//               className='form-control'
//             />
//           </div>
//           <div className='textbook'>
//             <i className='fas fa-lock'></i>
//             <input
//               type='password'
//               placeholder='Enter New Password'
//               onChange={(e) => {
//                 setNewPassword(e.target.value)
//               }}
//               className='form-control'
//             />
//           </div>
          
//           <div className='mb-3' style={{ marginTop: 20 }}>
//           <div className='mb-3' style={{ marginTop: 20 }}>
//              <div style={{ display: 'flex', alignItems: 'center' }}>
//              </div>
//           </div>       
//             <button
//               onClick={setnewPassword}
//               style={style.signIn}
//               className='btn btn-success'>
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>

//       <br />
//       <br />
//     </div>
//   )
// }

// const style = {
//   container: {
//     width: 500,
//     height: 350,
//     padding: 2,
//     position: 'relative',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     margin: 'auto',
//     borderRadius: 10,
//     border: 1,
//     borderStyle: 'solid',
//     borderColor: '#171511',
//     boxShadow: '1px 1px 30px 10px #FFEEB8',
//   },
//   signIn: {
//     position: 'relative',
//     width: '100%',
//     height: 50,
//     backgroundColor: '#4caf50',
//     color: 'white',
//     borderRadius: 5,
//     border: 'none',
//     marginTop: 10,
//     textAlign: 'center',
//   },
// }

// export default ResetPassword

import axios from 'axios';

const ForgotPassword = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    try {
      const response = await axios.post('http://localhost:8080/users/forgot-password', { email });
      console.log(response.data); // Log the response from the backend
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.error('Error:', error); // Log any errors that occur
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
