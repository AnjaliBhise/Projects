import React from 'react'
import Footcomponent from '../Components/footer'
import { Link } from 'react-router-dom'
import Ajay from '../assets/Ajay.jpg'
import Aditya from '../assets/Aditya.JPG'
import Hrushi from '../assets/Hrushi.jpg'
import Rohan from '../assets/Rohan.jpg'
import Navbar from './navHome'
const Aboutus = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div style={{ backgroundColor: 'gainsboro' }}>
        <h1 style={{ textAlign: 'center' }}> About us</h1>
        <div
          className='container'
          style={{ paddingTop: 50, paddingBottom: 50 }}>
          We love picky eaters. We love foodies. We love vegetarians. We love
          health freaks. “Is there any dessert?” We love them too. We love the
          ones who call. We even love the ones who order online. We love them
          all. “Discover your next healthy dish” Born with a mission to
          revolutionize eating habits, we believe in providing tiffins in Mumbai
          that are healthy, homely and hygienic. These meals are ideal for
          people who are too busy to cook or don’t wish to compromise on
          nutrition with restaurant food. The menu, at Yummy Tiffins, comes in a
          variety of mouth-watering cuisines and nutritional options- a
          judicious mix of carbohydrates and proteins, low calorie content and
          no artificial flavours/preservatives. Whether it’s Hakka noodles,
          Cheese Balls or Gulab Jamun. Nutrition doesn’t have to mean bland,
          boring diets. Ask the dietician on board. It’s just like you would
          make it, minus the effort. The team at Yummy Tiffins ensures that the
          meals are not only healthy but also appealing to the eye and palette.
          We believe in giving surprises and breaking monotony, so our menu
          changes daily and features over 40 dishes that change every day. That
          includes a variety of vegetables, daal, soups, raita, rice, rotis,
          salads, and snack items. These are healthy, well-balanced meals cooked
          in rice bran/olive oil, which provide the right amount of protein
          along with essential vitamins and minerals. The same food prepared in
          canteens or Udupi restaurants can be tasty, but is generally oily and
          big on your pocket. Yummy Tiffins also offers different meal plans,
          such as, diabetic meal, low/medium calorie meals, and meals for those
          who want to put on weight. This means, you can build your own healthy
          tiffin or choose from 10-12 combo schemes. Now, relish the tangy
          vegetable masala, homemade GajarHalwa, and life-changing Garlic
          Spinach and Chickpea soup. Go on, order as you are.
          <br />
          <br />
          <br />
          <h3>Why us</h3>
          Although you would love to have that fulfilling home cooked meal you
          enjoyed back in school days it's difficult to manage anything close to
          that with your busy schedule. What most of us end up eating is not
          really healthy and at times to our horror even unhygienic food,
          nutritious meal has become "out of sight, out of mind". It's very
          important for you to get your daily nutrition - too less or too much
          is equally harmful, what your health demands is a well balanced and
          healthy tiffin service. Locations Sign up for tiffin services in
          Andheri West or join us for tiffin services from Lower Parel or even
          register from Thane or Borivali, we will not say a ‘NO’. We deliver
          just everywhere.
          <h6>Affordable prices.</h6>
          Customized lunch and dinner tiffin services in Mumbai start at just
          Rs.60/- The food that you eat is healthy, yummy at the same time it’s
          affordable.
          <br />
          <h6>Fresh ingredients.</h6>
          Everyday fresh vegetable of the best quality are procured to ensure
          that the food that you eat is good for your health.
          <br />
          <h6>Tasty Food.</h6>
          Our experienced chefs ensure that the food you eat has the perfect mix
          of spices. The food that you eat is not too spicy or too oily at the
          same time it’s very tasty.
          <br />
          <h6>Disposable containers.</h6>
          Food is packed in disposable plastic containers. All these containers
          are carefully packed in a disposable bag. This ensures that there are
          no chances of contamination.
          <br />
          <h6>No preservatives/ artificial color/pre-cooked gravies.</h6>
          No artificial preservatives, colors or pre-cooked gravies to make the
          food look attractive. The food that you eat is just like the way food
          cooked at home.
          <br />
          <h6>Experienced cooks.</h6>
          Our cooks have more than a decade of experience in catering industry.
          <br />
          <br />
          <br />
          <br />
          <h1 style={{ textAlign: 'center' }}></h1>
          <div class='row text-center'>
            <div class='col-xl-3 col-sm-6 mb-5'>
              {/* <div class='bg-white rounded shadow-sm py-5 px-4'>
                <img
                  src={Rohan}
                  alt=''
                  width='100'
                  class='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
                />
                <h5 class='mb-0'>Rohan Jadhav</h5>
                <span class='small text-uppercase text-muted'>
                  CEO - Founder
                </span>
              </div> */}
            </div>

            <div class='col-xl-3 col-sm-6 mb-5'>
              {/* <div class='bg-white rounded shadow-sm py-5 px-4'>
                <img
                  src={Ajay}
                  alt=''
                  width='100'
                  class='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
                />
                <h5 class='mb-0'>Ajay Jadhav</h5>
                <span class='small text-uppercase text-muted'>
                  CEO - Founder
                </span>
              </div> */}
            </div>

            <div class='col-xl-3 col-sm-6 mb-5'>
              {/* <div class='bg-white rounded shadow-sm py-5 px-4'>
                <img
                  src={Hrushi}
                  alt=''
                  width='100'
                  class='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
                />
                <h5 class='mb-0'>Hrushikesh Pawar</h5>
                <span class='small text-uppercase text-muted'>
                  CEO - Founder
                </span>
              </div> */}
            </div>

            <div class='col-xl-3 col-sm-6 mb-5'>
              {/* <div class='bg-white rounded shadow-sm py-5 px-4'>
                <img
                  src={Aditya}
                  alt=''
                  width='100'
                  class='img-fluid rounded-circle mb-3 img-thumbnail shadow-sm'
                />
                <h5 class='mb-0'>Aditya Panari</h5>
                <span class='small text-uppercase text-muted'>
                  CEO - Founder
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <Footcomponent />
      </div>
    </div>
  )
}
export default Aboutus
