import React from 'react';
import {NavLink} from "react-router-dom"
import './UIBasics.css'


const Button = ( props ) => {
  const size = props.size ? props.size : 'medium'

  return (
    <div className={`button button-${size}`}>
        {
          props.to ?
            <NavLink to={props.to}>{props.text.toUpperCase()}</NavLink>
          :
            <button type='submit' onClick={props.onClick}>{props.text.toUpperCase()}</button>
        }
    </div>
  )
}

const Input = (props) => {
  const size = props.size ? props.size : 'medium'
  const type = props.type ? props.type : 'text'

  return (
    <div className={`input input-${size}`}>
      <input ref={props.useRef} type={type} id={props.name.toLowerCase()} placeholder={props.name.toUpperCase()} onChange={props.onChange}/>
    </div>
  )
}

const FloatingButton = (props) => {
  const size = props.size ? props.size : 'medium'

  return (
    <div className={`floating-button floating-button-${size} float-button-${props.type}`}>
      <img src={require(`../resources/${props.type}.svg`)} alt={props.type} onClick={props.onClick}/>
    </div>
  )
}

export { Button, Input, FloatingButton}
