import React, {useEffect, useState} from 'react'
import {RecordContext} from '../App.js'
import RecordParser from '../common/RecordParser.js'


const ViewPage = () => {
  return (
    <div>
      <div> Print </div>
      <div> Edit </div>
      <LayoutComponent />
    </div>
  )
}

const LayoutComponent = () => {
  let state = RecordContext.useState()
  const [template, setTemplate] = useState(undefined)

  useEffect(()=>{
    if(state.selected !== undefined){
      let t = RecordParser.findTemplate(state.type)
      console.log(t)

      console.log(state)
      setTemplate(t)
    }


  }, [state])

  return (
    <div>
      {template ?  template.layout(state.record) : 'No template found'}
    </div>
  )
}


export default ViewPage
