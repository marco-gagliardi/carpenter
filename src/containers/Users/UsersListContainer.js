import React, {useState, useEffect, Fragment} from "react";
import {connect} from 'react-redux'
import {func, object} from 'prop-types'
import {getUsers, removeUser} from "../../stores/users";
import {Link} from "react-router-dom";

const PAGE_SIZE = 5
const UsersListContainer = props => {
  const [list, setList] = useState([]);
  const [params, setParams] = useState({lastId: undefined, limit: PAGE_SIZE});
  const [loading, setLoading] = useState(true);

  const load = () => {
    props.load(params)
      .catch(() => {})
      .then(payload => {
        const length = payload.length
        const lastId = !length ? null : payload[length - 1].id
        setList([...list, ...payload.map(x => x.id)])
        setParams({...params, lastId})
      })
      .finally(() => setLoading(false))
  }

  const remove = (id) => {
    props.delete(id)
      .catch(() => {})
      .then(() => {
        setList(list.filter(x => x !== id))
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, []);

  const renderList = () => {
    if(!list.length) {
      return <div>No elements... </div>
    }
    return (
      <ul>
        {list.map(id => {
          const u = props.users[id]
          if (u) {
            return (
              <li key={u.id}><Link to={`/users/${u.id}`}>{u.name}</Link>
                <Link to={`/users/${u.id}/edit`}><button>Edit</button></Link>
                <button onClick={() => remove(u.id)}>Delete</button></li>
            )
          } else {
            return null
          }
        })}
      </ul>
    )
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      <p><Link to={'/users/new'}><button>New</button></Link></p>
      {renderList()}
    </Fragment>
  )

}

UsersListContainer.propTypes = {
  load: func,
  delete: func,
  users: object
}
const mapStateToProps = state => {
  return ({
      users: state.users
    })
}

const mapDispatchToProps = dispatch => {
  return ({
    load: (params) => dispatch(getUsers(params)),
    delete: (id) => dispatch(removeUser(id)),
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)