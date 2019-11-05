import React from "react";
import {connect} from 'react-redux'
import {func} from "prop-types";
import {addUser} from "../../stores/users";
import UserForm from "../../components/Users/UserForm";

const CreateUserContainer = props => {
  return (<UserForm onSubmit={props.create}/>)
}

CreateUserContainer.propTypes = {
  create: func
}
const mapDispatchToProps = dispatch => ({
  create: model => dispatch(addUser(model))
})
export default connect(null, mapDispatchToProps)(CreateUserContainer)