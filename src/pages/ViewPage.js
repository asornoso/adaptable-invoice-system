import React, {useEffect, useState} from 'react'
import {RecordContext} from '../App.js'
import RecordParser from '../common/RecordParser.js'


const ViewPage = () => {
  return (
    <div>
      <LayoutComponent />
    </div>
  )
}

const LayoutComponent = () => {
  let state = RecordContext.useState()
  const [template, setTemplate] = useState(undefined)
  let record= findRecordById(state.selected, state.records)
  
  useEffect(()=>{
    if(state.selected !== undefined){
      let t = RecordParser.findTemplate(state.type)
      setTemplate(t)
    }
  }, [])

  return (
    <div>
      {template ?  template.layout(record) : 'No template found'}
    </div>
  )
}

const findRecordById = (id, records) => {
  for(let i = 0; i < records.length; i++){
    if(records[i].id === id)
       return records[i]
  }
  console.error('No record found with selected ID.')
  return {}
}

export default ViewPage
