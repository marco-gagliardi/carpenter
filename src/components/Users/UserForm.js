import React, {useState} from "react";
import {func, object} from "prop-types";

const DEFAULT_MODEL = {
  name: ''
}

const UserForm = props => {
  const initialModel = {...DEFAULT_MODEL, ...props.user}
  const [model, setModel] = useState(initialModel)

  const handleSubmit = (e) => {
    e.preventDefault()
    return props.onSubmit(model)
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(model).map(key => {
        return <p key={key}>{`${key}: `}<input name={`${key}`} onChange={({value}) => setModel({name: value})}/></p>
      })}
      <p><button type='submit'>Ok</button></p>
    </form>
  )
}

UserForm.propTypes = {
  user: object,
  onSubmit: func
}
export default UserForm