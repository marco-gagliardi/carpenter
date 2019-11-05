import React from 'react'
import Navbar from "../../components/Navbar";
import CreateUserContainer from "../../containers/Users/CreateUserContainer";
const CreateUser = () => {
  return (
    <div>
      <Navbar/>
      <div className='Page__content'>
        <CreateUserContainer />
      </div>
    </div>
  )
};

CreateUser.propTypes = {
};

export default CreateUser