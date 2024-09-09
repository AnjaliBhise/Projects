import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'
import Slider from '../../Components/slider'
import Aboutus from '../../Components/aboutus'
import './index.css'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import Navbar from '../../Components/navHome'
import Footcomponent from '../../Components/footer'

const Home = () => {
  const navigate = useNavigate()
  const [flag, setflag] = useState('')
  const Signup = () => {
    navigate('/Signup')
  }
  const AboutUs = () => {
    setflag('true')
  }
  return (
    <div className='home'>
      <Navbar></Navbar>
      <br />
      <br />
      <Slider />
      {flag === 'true' && <AboutUs />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Footcomponent />
    </div>
  )
}

export default Home
