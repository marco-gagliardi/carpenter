import React, {useState, useEffect, Fragment} from "react";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {func, object} from 'prop-types'
import uniq from 'lodash/uniq'
import {loadUsers, deleteUsers} from "../../stores/users";

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
        setList(uniq([...list, ...payload.map(x => x.id)]))
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
    return (
      list.length === 0
        ? <div>No elements... </div>
        : <Fragment>
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
          <p><button onClick={() => load()}>More</button></p>
        </Fragment>
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
    load: (params) => dispatch(loadUsers(params)),
    delete: (id) => dispatch(deleteUsers(id))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer)