import React, {useState} from "react";
import {func, object} from "prop-types";
import dto from '../../config/dto/user'
import get from 'lodash/get'
import set from 'lodash/set'
import last from 'lodash/last'

const DTO = dto || {};

const UserForm = props => {
  const initialModel = { ...DTO, ...props.user }
  const [model, setModel] = useState(initialModel)

  const handleSubmit = (e) => {
    e.preventDefault()
    return props.onSubmit(model)
  }

  const renderField = ({key, value, onChange}) => {
    return (
      <div key={key} style={ {'marginLeft': '8px'} }>
        <span>{`${last(key.split('.'))}: `}</span>
        {
          typeof value === 'object'
            ? Object.keys(value).map(k => {
              return renderField({key: `${key}.${k}`, value: value[k]})
            })
            : <input
              type={typeof value === 'number' ? 'number' : 'text'}
              name={key}
              value={value}
              onChange={event => onChange(event.target.value)}
            />
        }
      </div>
    )
  }

  const setValue = (key, value) => {
    const newModel = {...model}
    set(newModel, key, value)
    setModel(newModel)
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        Object.keys(model).map(key => {
          return renderField({
            key,
            value: get(model, key),
            onChange: (value) => setValue(key, value)
          })
        })
      }
      <p>
        <button type='submit'>Ok</button>
      </p>
    </form>
  )
}

UserForm.propTypes = {
  user: object,
  onSubmit: func
}
export default UserForm