import React from 'react'
import Navbar from "../components/Navbar";
import UsersContainer from "../containers/UsersContainer";
const Users = (props) => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        <UsersContainer />
      </div>
    </div>
  )
};

Users.propTypes = {};

export default Users