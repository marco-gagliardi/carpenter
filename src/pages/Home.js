import React from 'react'
import Navbar from "../components/Navbar";
const Home = (props) => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        {/* Container here */}
      </div>
    </div>
  )
};

Home.propTypes = {};

export default Home