import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Navbar from '../../Components/navHome'
import { Link } from 'react-router-dom'
import config from '../../config'

const Signup = () => {
  const navigate = useNavigate()
  const [userName, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [phone, setphone] = useState('')
  const [role, setrole] = useState('')
  const [aadharNo, setadhar] = useState('')

  const signupUser = () => {
    const body = {
      userName,
      email,
      password,
      phone,
      role,
      aadharNo,
    }
    const url = config.serverURL + `/signup`
    if (userName.length == 0) {
      toast.warning('Please enter username')
    } else if (email.length == 0) {
      toast.warning('Please enter email')
    } else if (password.length == 0) {
      toast.warning('Please enter password')
    } else if (phone.length == 0) {
      toast.warning('Please enter phone number')
    } else if (aadharNo.length == 0) {
      toast.warning('Please enter adhar no')
    } else {
      axios.post(url, body).then((response) => {
        const result = response.data
        if (result['status'] == 'success') {
          navigate('/home')
          toast.info('User Registered Successfully')
        } else {
          toast.error(result.error)
        }
      })
    }
  }
  useEffect(() => {
    toast.info('Welcome to Delicia')
  }, [])
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div className='login-box'>
          <h1>Sign Up</h1>
          <div className='textbook'>
            <i className='fas fa-user'></i>
            <input
              placeholder='Enter name'
              onChange={(e) => {
                setusername(e.target.value)
              }}
              type='text'
              className='form-control'
            />
          </div>

          <div className='textbook'>
            <i className='fas fa-envelope'></i>
            <input
              placeholder='Enter Email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type='text'
              className='form-control'
            />
          </div>

          <div className='textbook'>
            <i className='fas fa-lock'></i>
            <input
              placeholder='Enter Password'
              onChange={(e) => {
                setpassword(e.target.value)
              }}
              type='password'
              className='form-control'
            />
          </div>

          <div className='textbook'>
            <i className='fas fa-user'></i>
            {/* <label htmlFor='' className='label-control'>
              Role
            </label> */}
            <select
              style={{
                backgroundColor: 'white',
                width: 350,
                background: 'none',
              }}
              value={role}
              onChange={(e) => {
                setrole(e.target.value)
              }}>
              <option selected>Select Role</option>
              <option value='ROLE_DELIVERYBOY'>DELIVERYBOY</option>
              <option value='ROLE_USER'>USER</option>
            </select>
          </div>

          <div className='textbook'>
            <i className='fas fa-phone'></i>
            <input
              placeholder='Enter Phone no'
              onChange={(e) => {
                setphone(e.target.value)
              }}
              type='text'
              className='form-control'
            />
          </div>

          <div className='textbook'>
            <i class='fas fa-fingerprint'></i>
            <input
              placeholder='Enter Adhar No.'
              onChange={(e) => {
                setadhar(e.target.value)
              }}
              type='text'
              className='form-control'
            />
          </div>
          <div className='mb-3' style={{ marginTop: 20 }}>
            <div>
              Already have an account?
              <Link to='/signin' style={{ color: 'wheat' }}>
                <h4>SignIn Here</h4>
              </Link>
            </div>
            <button
              onClick={signupUser}
              style={style.signup}
              className='btn btn-success'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
const style = {
  container: {
    width: 400,
    height: 543,
    padding: 5,
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
  signup: {
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
export default Signup
