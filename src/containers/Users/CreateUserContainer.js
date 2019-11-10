import React from "react";
import {connect} from 'react-redux'
import {func} from "prop-types";
import {createUsers} from "../../stores/users";
import UserForm from "../../components/Users/UserForm";

const CreateUserContainer = props => {
  return (<UserForm onSubmit={props.create}/>)
}

CreateUserContainer.propTypes = {
  create: func
}
const mapDispatchToProps = dispatch => ({
  create: model => dispatch(createUsers(model))
})
export default connect(null, mapDispatchToProps)(CreateUserContainer)