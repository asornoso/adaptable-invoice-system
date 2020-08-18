import React, {useState} from 'react';
import {NavLink} from "react-router-dom"
import './UIBasics.css'


const Button = ( props ) => {
  const size = props.size ? props.size : 'medium'

  return (
    <div className={`button button-${size}`} style={props.style}>
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

const InputV2 = (props) => {
  const size = props.size ? props.size : 'medium'
  const type = props.type ? props.type : 'text'

  return (
    <div className={`inputv2 input-${size}`}>
    {
        <input ref={props.useRef} type={type} id={props.name.toLowerCase()} placeholder={props.name.toUpperCase()} onChange={props.onChange}/>
    }
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


const Dropdown = (props) => {

  const size = props.size ? props.size : 'medium'
  const [selected, setSelected] = useState(0)

  return (
    <div className={`dropdown dropdown-${size}`}>
      <select  value={selected} onChange={
        (e) => {
          setSelected(e.target.value)
          props.onChange(e.target.value)
        }
      }>
        {
          props.options.map((text, i) =>{
             return <option key={text+i} value={i}> {text} </option>
          })
        }
      </select>
    </div>
  )

}

export { Button, Input, InputV2,  FloatingButton, Dropdown}
