import React from 'react'
import Navbar from "../../components/Navbar";
import EditUserContainer from "../../containers/Users/EditUserContainer";
const EditUser = () => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        <EditUserContainer />
      </div>
    </div>
  )
};

EditUser.propTypes = {
};

export default EditUser