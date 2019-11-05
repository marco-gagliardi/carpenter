import React from 'react'
import Navbar from "../../components/Navbar";
import UsersListContainer from "../../containers/Users/UsersListContainer";
const UsersList = props => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        <UsersListContainer />
      </div>
    </div>
  )
};

UsersList.propTypes = {};

export default UsersList