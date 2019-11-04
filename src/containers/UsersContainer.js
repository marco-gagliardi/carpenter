import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {func} from 'prop-types'
import {getUsers} from "../stores/users";

const PAGE_SIZE = 5
const UsersContainer = props => {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({lastId: null, limit: PAGE_SIZE});
  const [loading, setLoading] = useState(true);

  const load = () => {
    props.load(params)
      .catch(() => {})
      .then(payload => {
        const length = payload.length
        const lastId = !length ? null : payload[length - 1].id
        setUsers([...users, ...Object.values(payload)])
        setParams({...params, lastId})
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }
  if(!users.length) {
    return <div>No elements... </div>
  }
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}

UsersContainer.propTypes = {
  load: func
}
const mapStateToProps = state => {
  return ({
      users: state.users
    })
}

const mapDispatchToProps = dispatch => {
  return ({
    load: (params) => dispatch(getUsers(params))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)