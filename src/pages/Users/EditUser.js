import React from 'react'
import Navbar from "../../components/Navbar";
import EditUserContainer from "../../containers/Users/EditUserContainer";
import {object} from "prop-types";
const EditUser = ({match}) => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        <EditUserContainer id={match.params.id} />
      </div>
    </div>
  )
};

EditUser.propTypes = {
  match: object
};

export default EditUser