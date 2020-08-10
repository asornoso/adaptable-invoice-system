import React from 'react'
import RecordParser from '../common/RecordParser.js'
import {Input} from '../common/UIBasics.js'
import {v4 as uuidv4} from 'uuid'

const CreatePage = (props) => {
  console.log(props.match.params.type)
  let template = RecordParser.findTemplate(props.match.params.type)
  console.log(template.creation)

  let reordered = []

  return (
    <div>
      <ObjectDataForm obj={template.creation} name={template.name} level={0}/>

    </div>
  )
}

//Props is an object of keys(data fields) and values(data types)
const ObjectDataForm = (props) => {

  let formElements = []


  Object.keys(props.obj).forEach((key, i) => {
    if(props.obj[key] instanceof Array){
      let o = props.obj[key][0]
      formElements.push(<ObjectDataForm obj={o} name={key} key={uuidv4()} level={props.level + 1}/>)
    }
    else if(props.obj[key] instanceof Object ){
      formElements.push(<ObjectDataForm obj={props.obj[key]} name={key} key={uuidv4()} level={props.level + 1}/>)
    }
    else{
      let inputDiv = (
        <div key={uuidv4()} className='input-field'>
          <Input type={props.obj[key]} name={props.name+' '+key}/>

          Enter Value for: {props.name+'_'+key} | Data is of Type: {props.obj[key]}
        </div>
      )

      for(let i = 0; i < props.level; i++){
        inputDiv = <div style={{marginLeft: '2rem'}} key={uuidv4()}> {inputDiv} </div>
      }

      formElements.push(inputDiv)
      //formElements.push(<div key={uuidv4()} className='input-field'>  Enter Value for: {props.name+'_'+key} | Data is of Type: {props.obj[key]}</div>)
    }
  })

  return (
    <div>
      {formElements}
    </div>
  )

}



export default CreatePage
