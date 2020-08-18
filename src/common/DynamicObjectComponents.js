import React, {useState, useEffect} from 'react'
import { InputV2, FloatingButton, Button} from '../common/UIBasics.js'


//A dataform for objects
const ObjectDataForm = (props) => {
  const [state, setState] = useState(copyWithUndefinedValues(props.template))

  let formElements, keys

  formElements = []
  keys = Object.keys(props.template)
  for(let i =0; i < keys.length; i++){
    const key = keys[i]
    const name = props.name ? props.key2+' '+key : key

    if(props.template[key] instanceof Array){

      let o = props.template[key][0]
      formElements.push(
        <ArrayDataForm template={o} key={name} name={name} key2={key} level={props.level + 1} index={0}
        updateParent={(key, val)=>{
          const newState = deepCopyObj(state)
          newState[key]= val
          setState(newState)
          if(props.updateParent)
            props.updateParent(props.key2, newState)
          else
            props.updateContainer(key, newState)
        }}/>
      )

    }
    else if(props.template[key] instanceof Object ){

      formElements.push(
        <ObjectDataForm template={props.template[key]} key={name} name={name} key2={key} level={props.level + 1}
        updateParent={ (key, val) => {
          const newState = deepCopyObj(state)
          newState[key] = val
          setState(newState)
          if(props.updateParent)
            props.updateParent(props.key2, newState)
          else
            props.updateContainer(key, newState)
        }}/>
      )
    }
    else{
        formElements.push(
          <DataInput key={name} type={props.template[key]} name={name} key2={key} level={props.level + 1}
          value={state[key]}
          update={(val)=>{
            const newState = deepCopyObj(state)
            newState[key]= val
            setState(newState)
            if(props.updateParent){
              if(props.index >= 0)
                props.updateParent(key, newState, props.index)
              else
                props.updateParent(props.key2, newState)
            }
            else
              props.updateContainer(key, newState)
          }}/>
        )
     }
  }

  return <div>{formElements}</div>
}



//A dataform that works with array data types
const ArrayDataForm = (props) => {
  const [state, setState] = useState([copyWithUndefinedValues(props.template)])

  useEffect(()=>{
    addBlockToState(props.index)
  }, [])

  const newBlock = (i, obj) => {
    return (
      <div key={props.name+i} className="item-wrapper" >
        <ObjectDataForm className="array-data" template={props.template}  level={props.level}   index={i}
       updateParent={(key, val, index)=>{
         let temp = [...state]
         temp[index] = {...temp[index], [key]: val[key]}
         setState(temp)
         if(props.updateParent)
           props.updateParent(props.key2, temp)
         else
           props.updateContainer(key, temp)
       }}/>
       {
         i !== 0 ?

           <div className="delete-button" onClick={(e)=>{
             const updatedState = [...state]
             updatedState.splice(i, 1)
             setState(updatedState)
           }}>
            Delete
           </div>
         :
          <div></div>
        }
     </div>)
  }

  const addBlockToState = (i) => {
    let newState = deepCopyArray(state)
    newState.push(copyWithUndefinedValues(props.template))
    setState(newState)
  }

  let formElements = []
  for(let i = 0; i < state.length; i++){
    formElements.push(newBlock(i, state[i]))
  }

  return (
    <div className='array-item-container'>

      <div className='array-items-header' >
        <h2 style={{'textAlign': 'center'}}> <u>{props.key2} </u></h2>
      </div>

      <div className='array-items-button'>
        <Button text={`Add ${props.key2}`}  size={'small'} onClick={ ()=> {
          addBlockToState(state.length)
        }} />
      </div>

      <div className='array-items'>
        {formElements}
      </div>

    </div>
  )
}



const DataInput = (props) => {
  const [value, setValue] = useState()

  let inputDiv =(
    <form  className='input-field'>
      {props.name}
      <InputV2 type={props.type} name={props.name}  value={props.value} onChange={(e) => {
        setValue(e.target.value)
        props.update(e.target.value)
      }}/>
    </form>
  )

  for(let j = 0; j < props.level; j++)
    inputDiv = <div style={{marginLeft: '1.4rem', marginTop:'0.7rem'}}> {inputDiv} </div>

  return inputDiv
}




//copy all properties to new object, with values equal to undefined
//This assists with input validation
const copyWithUndefinedValues = (obj) => {
  let newObj = {}
  let keys = Object.keys(obj)

  for(let i = 0; i < keys.length; i++){
    if( obj[keys[i]] instanceof Array){
      newObj[keys[i]] = []
      newObj[keys[i]][0] =  copyWithUndefinedValues( obj[keys[i]][0] )
    } else if( obj[keys[i]] instanceof Object)
      newObj[keys[i]] = copyWithUndefinedValues(obj[keys[i]])
    else
      newObj[keys[i]] = undefined
  }
  return newObj
}

const deepCopyObj = (obj) => {
  let newObj = {}
  let keys = Object.keys(obj)

  for(let i = 0; i < keys.length; i++){
    if( obj[keys[i]] instanceof Array){
      newObj[keys[i]] = deepCopyArray(obj[keys[i]])
    } else if( obj[keys[i]] instanceof Object)
      newObj[keys[i]] = deepCopyObj(obj[keys[i]])
    else if(obj[keys[i]] === undefined)
      newObj[keys[i]] = undefined
    else
      newObj[keys[i]] = obj[keys[i]]
  }
  return newObj
}

const deepCopyArray = (array) => {
  let newArray = []

  for(let i = 0; i < array.length; i++){
    if(array[i] instanceof Array)
      newArray.push(deepCopyArray(array[i]))
    else if( array[i] instanceof Object)
      newArray.push(deepCopyObj(array[i]))
    else
      newArray.push(array[i])
  }
  return newArray
}

//check if all properties in the template are accounted for in inputstate
//1 check that no property is undefined in obj1
//2 check that all properties in obj2 exist in obj1
const validateForm = (obj, template) => {
  let objectKeys = Object.keys(obj)
  let templateKeys = Object.keys(template)

  for(let i = 0; i < objectKeys.length; i++){
    if( obj[objectKeys[i]] === undefined )
      return false

    else if( obj[objectKeys[i]] instanceof Array){
      if( !validateArray( obj[objectKeys[i]]))
        return false

      for(let j = 0; j < obj[objectKeys[i]].length; j++){
        if( !(validateForm(obj[objectKeys[i]][j], template[templateKeys[i]][0])) )
          return false

      }
    }
    else if( obj[objectKeys[i]] instanceof Object)
      if(!validateForm(obj[objectKeys[i]], template[templateKeys[i]]))
        return false
      else if(!validateObject(obj[objectKeys[i]]))
        return false
  }
  return true
}

//Checks only for undefined values in the array
const validateArray = (array) => {
  for(let i = 0; i < array.length; i++){
    if(array[i] === undefined )
      return false
    else if(array[i] instanceof Array && !validateArray(array[i]))
      return false
    else if(array[i] instanceof Object && !validateObject(array[i]))
      return false
  }
  return true
}

//Checks only for undefined values in the object
const validateObject = (obj) => {
  let keys = Object.keys(obj)
  for(let i = 0; i < keys.length; i++){
    if( obj[keys[i]] === undefined )
      return false
    else if( obj[keys[i]] instanceof Array && !validateArray( obj[keys[i]]))
      return false
    else if( obj[keys[i]] instanceof Object && !validateObject(obj[keys[i]]) )
      return false
  }
  return true
}

export {ObjectDataForm, copyWithUndefinedValues, deepCopyObj, deepCopyArray, validateForm }
