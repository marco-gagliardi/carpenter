import React from "react";
import {connect} from 'react-redux'
import {func} from "prop-types";
import { createUsers } from "../../stores/users";
import Form from "../../components/Users/Form";

const CreateUserContainer = props => {
  return (<Form onSubmit={props.create}/>)
}

CreateUserContainer.propTypes = {
  create: func
}
const mapDispatchToProps = dispatch => ({
  create: model => dispatch(createUsers(model))
})
export default connect(null, mapDispatchToProps)(CreateUserContainer)