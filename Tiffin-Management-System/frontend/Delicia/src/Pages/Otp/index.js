import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../../Components/navHome'
import config from '../../config'

const Otp = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const Verifyotp = () => {
    const body = { otp }

    const url = config.serverURL + `/users/forgot-password`
    axios
      .post(url, body, {
        headers: { Authorization: `Bearer ${localStorage['jwt']}` },
      })
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          navigate('/Signin')
        } else {
          toast.error("Failed to reset password.")
        }
      }).catch((error) => {
        toast.error('An error occurred.')
      })
  }

  return (
    <div>
      <Navbar />
      <div className='login-box'>
        <h1>OTP Verification</h1>
        <div className='textbook'>
          <i className='fas fa-envelope'></i>
          <input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='mb-3' style={{ marginTop: 20 }}>
          <button
            onClick={Verifyotp}
            style={style.signIn}
            className='btn btn-success'>
            Verify
          </button>
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

export default Otp
