import React from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import Testimonials from '../../components/testimonials/Testimonials';
import { UserData } from '../../context/UserContext';

const Home = () => {
    const{isAuth, user}= UserData()
    console.log("isAuth value: home ", isAuth)
  return (
    <div>
      <div className='home'>
        <div className='home-content'>
          <h1>Welcome to our E-learning Platfom</h1>
          <p>Learn, Grow, Excel</p>
          <button onClick={()=> navigate("/courses")} className='common-btn'>Get Started
          </button>
        </div>

      </div>
      <Testimonials/>
    </div>
  )
};

export default Home;
