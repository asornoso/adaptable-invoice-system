import React, {useState, useEffect } from 'react'
import { Dropdown} from "../common/UIBasics.js"
import configuration from '../configuration.js'
import {RecordContext} from '../pages/SearchPage.js'


const readTemplateFiles = (loc) => {
    let files = configuration.templates
    let templates = []

    for(let i = 0; i < files.length; i++){
      let jsobj = require(`../templates/${files[i]}`).default
      templates.push(jsobj)
    }
    return templates
}

const fetchRecords = (type) => {
  if(type === 'Default Invoice')
  {
    return [
      {
        id: '123456789',
        customer: {
          name: 'name1',
          id: '12345',
        },
        purchase: {
          date: Date.now(),
          purchase_id: '123456',
          amount: 50.50,
          items: [
            {
              name: 'chair',
              price: 50.50
            }
          ]
        }
      }
    ]
  }
  else{
    return [
      {
        purchase: {
          date: Date.now(),
          purchase_id: '123457',
          amount: 50.50,
          items: [
            {
              name: 'chair',
              price: 50.50
            }
          ]
        }
      }
    ]
  }
}


const RecordTable = (props) => {

  let state = RecordContext.useState()
  let dispatch = RecordContext.useDispatch()

  let templates = readTemplateFiles()
  let options = templates.map((t, i) => {return t.name})

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [recordUpdates, setRecordUpdates] = useState(0)
  const [dropdownUpdates, setDropdownUpdates] = useState(0)

  useEffect( () => {
      dispatch({type:"update_records", value:fetchRecords(options[selectedIndex])})
      dispatch({type:'update_type', value: options[selectedIndex]})
      console.log(state.records)
      console.log('updating...')
  }, [dropdownUpdates, recordUpdates])


  return (
    <div>
      <Dropdown  size='medium' options={options} onChange={(val)=>{
          setSelectedIndex(val)
          setDropdownUpdates(dropdownUpdates + 1)
        }}/>

      {
        state.records.map((record, i) => {
          return templates[selectedIndex].layout(record)
        })
      }

      <DynamicTable />

    </div>
  )

}

const recursiveKeyFinder = (obj, previousKey='') => {
  let keys = []
  let values = []
  Object.keys(obj).forEach((key, index) => {
    console.log(typeof obj[key])
    switch(typeof obj[key]){
      case 'string':
        keys.push(previousKey+key)
        values.push(obj[key])
        break;
      case 'boolean':
        keys.push(previousKey+key)
        values.push(obj[key])
        break;
      case 'number':
        keys.push(previousKey+key)
        values.push(obj[key])
        break;
      case 'object':
        if(obj[key] instanceof Array){
          keys.push(previousKey+key)
          values.push(obj[key])
        }
        else if(obj[key] instanceof Object){
          let keyvalues = recursiveKeyFinder(obj[key], key)
          keys.push(...keyvalues.keys)
          values.push(...keyvalues.values)
        }
        break;
      default:
        console.log('error')
    }
  })
  return {keys:keys, values:values}
}

const generateRowsAndColumns = (type, data) => {

    console.log(data, type)
    let rows = []

    if(data.length === 0 || type.length === 0)
      rows.push(['No data available'])
    else{
      //let structure = require(`../templates/${type.replace(/\s/g,'')}.js`).default.structure
      //console.log(structure)
      let keysFound = recursiveKeyFinder(data[0])
      console.log(keysFound)


    }
    return rows


  // console.log(data)
  // let rows = []
  //
  // if(data.length === 0)
  //   rows.push(['No data available'])
  // else{
  //   let headerRow = []
  //   Object.keys(data[0]).forEach((key,index) => {
  //       if(typeof data[0][key] == "object")
  //       headerRow.push(key)
  //   })
  //   rows.push(headerRow)
  //   for(let i = 0; i < data.length; i++){
  //     let row = []
  //     Object.keys(data[i]).forEach((key,index) => {
  //       row.push(data[i][key])
  //     })
  //     rows.push(row)
  //   }
  // }
  // return rows
}



const DynamicTable = () => {

  let state = RecordContext.useState()
  let dispatch = RecordContext.useDispatch()
  const [rows, setRows] = useState([])
  const [rowUpdates, setRowUpdates] = useState(0)

  useEffect(()=>{
    setRows(generateRowsAndColumns(state.type, state.records))
    console.log(rows)
  }, [state.records, state.type])

  let data = {
    rows: [],
    cols: []
  }

  for(let i = 0; i < rows.length; i++){
    console.log(rows[i])

  }



  return (
    <div>
      hi
    </div>
  )


}

export default RecordTable


/*
  It should display a dropdown of which type of Records to show
  The table should display the last 50 records of selected type(with pagination)
  The table should update based on the type of record available

*/
