import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {fetchUsers} from "../../stores/users";

const UserContainer = props => {

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
  return (
    Object.keys(props.user).map(key => <p key={key}>{key}: {props.user[key].toString()}</p>)
  )

}

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.id]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  load: () => dispatch(fetchUsers(ownProps.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)