import React from 'react'
import {object} from "prop-types";
import Navbar from "../../components/Navbar";
import UserContainer from "../../containers/Users/UserContainer";
const User = ({match}) => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        <UserContainer id={match.params.id} />
      </div>
    </div>
  )
};

User.propTypes = {
  match: object
};

export default User