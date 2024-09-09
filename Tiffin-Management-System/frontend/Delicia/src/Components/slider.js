import Carousel from 'react-bootstrap/Carousel'
import image1 from '../assets/burger.jpg'
import image2 from '../assets/pizz.jpg'
import image3 from '../assets/tat.jpg'
import './index.css'
const Slider = () => {
  return (
    <div className='slider'>
      <Carousel interval={1500}>
        <Carousel.Item>
          <img className='d-block w-100' src={image1} alt='First slide' />
          <Carousel.Caption>
            <h5 style={{ color: 'white' }}>
              To eat is a necessity, but to eat intelligently is an art
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={image2} alt='Second slide' />

          <Carousel.Caption>
            <h5 style={{ color: 'white' }}>
              Ask not what you can do for your country. Ask what’s for lunch
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={image3} alt='Third slide' />

          <Carousel.Caption>
            <h5 style={{ color: 'white' }}>
              A recipe has no soul. You, as the cook, must bring soul to the
              recipe
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Slider
