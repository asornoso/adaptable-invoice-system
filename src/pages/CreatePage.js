import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import RecordParser from '../common/RecordParser.js'
import {  FloatingButton, Button} from '../common/UIBasics.js'
import '../styles/create.css'
import configuration from '../configuration.js'
import {ObjectDataForm, deepCopyObj, copyWithUndefinedValues, validateForm} from '../common/DynamicObjectComponents.js'

import {UserContext} from '../App.js'

const CreatePage = (props) => {
  let template = RecordParser.findTemplate(props.match.params.type)
  let history = useHistory()
  const images = require.context('../resources', true)
  const logo = images(`./${configuration.companyInfo.brand.logo}`)

  const [inputState, setInputState] = useState(copyWithUndefinedValues(template.jsonTemplate))
  const [update, setUpdate] = useState(0)
  const state = UserContext.useState()


  return (
    <div className="base-container">

      <div className="logo-container">
          <img className='logo' src={logo} alt='logo'/>
      </div>


      <div className='head'>
        <FloatingButton size='medium' type='back' onClick={()=>{ history.goBack()}} />
      </div>


      <div className="record-form">
        <h2> <u> New {template.name} </u> </h2>
        <div className='inputForm'>

              <ObjectDataForm template={template.jsonTemplate} level={0} hideID={template.autoID}
                updateContainer={(key, val) => {
                  let newState = deepCopyObj(inputState)
                  newState[key] = val[key]
                  setInputState(newState)
                  setUpdate(update+1)
                }}/>


        </div>
              <Button text={"Create"} onClick={()=>{
                console.log(inputState)
                console.log(validateForm(inputState, template.jsonTemplate))
                if(validateForm(inputState, template.jsonTemplate)){
                  console.log('submit form to save')
                  state.firebase.createRecord(template.name, inputState)
                    .then( result => {
                      console.log(result)
                    })

                }
              }}/>
      </div>

    </div>

  )
}

export default CreatePage
