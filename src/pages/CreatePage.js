import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import RecordParser from '../common/RecordParser.js'
import { InputV2, FloatingButton, Button} from '../common/UIBasics.js'
import '../styles/search.css'
import configuration from '../configuration.js'
import {ObjectDataForm, deepCopyObj, copyWithUndefinedValues, validateForm} from '../common/DynamicObjectComponents.js'


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
          console.log(validateForm(inputState, template.creation))
          if(validateForm(inputState, template.creation)){
            console.log('submit form to save')
          }
        }}/>
      </div>

    </div>

  )
}

export default CreatePage
