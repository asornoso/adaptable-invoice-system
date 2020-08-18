import React, {useEffect, useState} from 'react'
import {UserContext} from '../App.js'
import RecordParser from '../common/RecordParser.js'


const ViewPage = () => {
  let state = UserContext.useState()
  const [template, setTemplate] = useState(undefined)

  useEffect(()=>{
    if(state.record)
      setTemplate(RecordParser.findTemplate(state.record.sys_info_record_type))

  }, [state])

  return (
    <div>
      <div> Print </div>
      <div> Edit </div>
      {template ?  template.layout(state.record) : 'No template found'}
    </div>
  )
}


export default ViewPage
