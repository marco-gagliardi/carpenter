import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {func, object} from "prop-types";
import {editUser, loadUser} from "../../stores/users";
import UserForm from "../../components/Users/UserForm";

const EditUserContainer = props => {
  const [loading, setLoading] = useState(true);

  const load = () => {
    props.load()
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }
  if (!props.user) {
    return <p>Cannot load element</p>
  }

  return (<UserForm onSubmit={props.edit}/>)
}

EditUserContainer.propTypes = {
  load: func,
  edit: func,
  user: object
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.id]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: () => dispatch(loadUser(ownProps.id)),
  edit: model => dispatch(editUser(model))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditUserContainer)