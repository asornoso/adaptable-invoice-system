import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import RecordParser from '../common/RecordParser.js'
import { InputV2, FloatingButton, Button} from '../common/UIBasics.js'
import '../styles/search.css'
import configuration from '../configuration.js'


const CreatePage = (props) => {
  let template = RecordParser.findTemplate(props.match.params.type)
  let history = useHistory()
  const images = require.context('../resources', true)
  const logo = images(`./${configuration.companyInfo.brand.logo}`)

  const [inputState, setInputState] = useState(copyWithUndefinedValues(template.creation))
  const [update, setUpdate] = useState(0)


  return (
    <div className="base-container">

      <div className="logo-container">
          <img className='logo' src={logo} alt='logo'/>
      </div>

      <div className="search-container">

        <FloatingButton size='medium' type='back' onClick={()=>{ history.goBack()}} />
         Print | Edit
      </div>

      <div className="records">
        <h2> <u> New {template.name} </u> </h2>
        <div className='inputForm'>

        <ObjectDataForm template={template.creation} level={0}
          updateContainer={(key, val) => {
            let newState = deepCopyObj(inputState)
            newState[key] = val[key]
            setInputState(newState)
            setUpdate(update+1)
          }}/>


        </div>
        <Button text={"Create"} onClick={()=>{
          console.log(inputState)
        }}/>
      </div>

    </div>

  )
}

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
        updateParent={(key, val)=>{
          const newState = deepCopyObj(state)
          newState[key]= val
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

//check if all properties are not undefined
const validateForm = (obj) => {
  let keys = Object.keys(obj)

  for(let i = 0; i < keys.length; i++){

    if( obj[keys[i]] === undefined)
      return false
    else if( obj[keys[i]] instanceof Object && !validateForm(obj[keys[i]]) )
      return false

  }
  return true
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

// //check if all properties in the template are accounted for in inputstate
// const validateForm = (obj) => {
//   let keys = Object.keys(obj)
//
//   for(let i = 0; i < keys.length; i++){
//
//     if( obj[keys[i]] === undefined)
//       return false
//     else if( obj[keys[i]] instanceof Object && !validateForm(obj[keys[i]]) )
//       return false
//
//   }
//   return true
// }

export default CreatePage
