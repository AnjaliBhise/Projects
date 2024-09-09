import { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
// import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { URL } from '../../config'
import { toast } from 'react-toastify'
import Navbar from '../../Components/navHome'
import Footcomponent from '../../Components/footer'
import jwt from 'jwt-decode'
import { borderLeft, color, fontWeight } from '@mui/system'
import { red } from '@mui/material/colors'
import config from '../../config'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signinUser = () => {
    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      const body = {
        email,
        password,
      }

      // url to make signin api call
      const url = config.serverURL + `/signin`

      // make api call using axios
      axios.post(url, body).then((response) => {
        // get the server result
        const result = response.data
        console.log(result)

        if (result['status'] == 'success') {
          // toast.success('Welcome to the application')
          const payload = jwt(result['data'].jwt)
          localStorage['id'] = payload['jti']
          console.log(payload['jti'])
          console.log('JWT : ', result['data'].jwt)
          // get the data sent by server
          const { userId } = result['data']

          // persist the logged in user's information for future use
          // sessionStorage['id'] = userId
          // console.log(sessionStorage['id'])
          // sessionStorage['loginStatus'] = 1
          // console.log('Role :  ', result['data'].authorities[0].authority)
          localStorage['jwt'] = result['data'].jwt
          localStorage['loginStatus'] = 1
          console.log('JWT : ', result['data'].jwt)
          const message = 'Welcome to Delicia'
          if (result['data'].role == 'ROLE_ADMIN') {
            navigate('/Admin', { state: { message } })
          } else if (result['data'].role == 'ROLE_DELIVERYBOY') {
            navigate('/Delivery', { state: { message } })
          } else navigate('/showTiffin', { state: { message } })
          // navigate to home component
        } else {
          toast.error('Invalid user name or password')
        }
      })
    }
  }

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div className='login-box'>
          <h1>Login</h1>
          <div className='textbook'>
            <i className='fas fa-envelope'></i>
            <input
              type='text'
              placeholder='Enter Email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='form-control'
            />
          </div>
          <div className='textbook'>
            <i className='fas fa-lock'></i>
            <input
              type='password'
              placeholder='Enter Password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='form-control'
            />
          </div>
          
          <div className='mb-3' style={{ marginTop: 20 }}>
          <div className='mb-3' style={{ marginTop: 20 }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
                Dont have an account?
             <Link to='/signup' style={{ color: 'wheat', marginLeft: '10px', marginRight: '10px' }}>
            <h4>SignUp Here</h4>
             </Link>
             <Link to='/resetpassword' style={{ color: 'wheat', marginLeft: '10px' }}>
            <h4>Forget Password</h4>
             </Link>
             </div>
          </div>       
            <button
              onClick={signinUser}
              style={style.signIn}
              className='btn btn-success'>
              Sign In
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  )
}

const style = {
  container: {
    width: 500,
    height: 350,
    padding: 2,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderRadius: 10,
    border: 1,
    borderStyle: 'solid',
    borderColor: '#171511',
    boxShadow: '1px 1px 30px 10px #FFEEB8',
  },
  signIn: {
    position: 'relative',
    width: '100%',
    height: 50,
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
    textAlign: 'center',
  },
}

export default Signin
