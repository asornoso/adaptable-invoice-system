import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import { Dropdown, Button} from "../common/UIBasics.js"
import {RecordContext} from '../pages/SearchPage.js'
import {UserContext} from '../App.js'
import RecordParser from './RecordParser.js'


const RecordTable = (props) => {
  let state = UserContext.useState()


  let dispatch = RecordContext.useDispatch()

  let templates = RecordParser.readTemplateFiles()
  let options = templates.map((t, i) => {return t.name})

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [dropdownUpdates, setDropdownUpdates] = useState(0)

  const fetchRecords = () =>{
    state.firebase.getRecordsByType(options[selectedIndex]).then( records => {
      dispatch({type:"update_records", value: records})
      dispatch({type:'update_type', value: options[selectedIndex]})
    })
  }

  useEffect( () => {

      if(state.firebase.db !== undefined){
        fetchRecords()
      }
      else{
        setTimeout(()=>{
          fetchRecords()
        }, 100)
      }

  }, [dropdownUpdates])

  return (
    <div>
      <Dropdown  size='medium' options={options} onChange={(val)=>{
          setSelectedIndex(val)
          setDropdownUpdates(dropdownUpdates + 1)
        }}/>

        <Button text={`Create new ${options[selectedIndex]}`} to={`/create/${options[selectedIndex]}`} style={{fontSize: '0.8rem', lineHeight: '1rem'}} />

     <DynamicTable />

    </div>
  )
}

const customSort = (a, b) => {
  if(a.name.toLowerCase() === 'id')
    return -1
  else if(b.name.toLowerCase() === 'id')
    return 1
  else if(a.name < b.name)
    return -1
  else if(a.name > b.name)
    return 1
  else
    return 0
}

const parseDataToArray = (obj, parent_name) => {
  let dataArray = []
  Object.keys(obj).forEach((key, i) => {
    if(obj[key] instanceof Array)
      dataArray.push({name: key, value: 'List of Data'})
    else if(obj[key] instanceof Object){
      Object.keys(obj[key]).forEach((k, j) => {
        if(obj[key][k] instanceof Object)
          dataArray.push({name: key+' '+k, value: 'Object'})
        else
          dataArray.push({name: key+' '+k, value: obj[key][k]})
      })
    }
    else
      dataArray.push({name: key, value: obj[key]})
  })
  return dataArray.sort((a, b) => customSort(a, b))
}


const generateRowsAndColumns = (type, data, dispatch) => {
    let rows = []

    if(data.length === 0 || type.length === 0)
      rows.push(<tr key={'000'}><td>No data available</td></tr>)
    else{

      let dataArray = []
      data.forEach((element, i)=>{
        dataArray.push(parseDataToArray(element))
      })

      dataArray.forEach((array, i) => {
        let row = []
        let headerRow = []
        if( i === 0 ){
          array.forEach((recordData, j) => {
            headerRow.push( <td key={j.toString()+'_'+i.toString()} className="table-cell">{recordData.name}</td> )
          })
          headerRow.push(<td key={'row_'+i+'_blank'} className="table-cell"> </td>)
          rows.push(<tr key={'headerrow'+i} className="row header">{headerRow}</tr>)
        }
        array.forEach((recordData, j) => {
          console.log(recordData)
          let classname = i % 2 === 0 ? 'table-cell' : 'table-cell odd'
          row.push(<td key={i.toString()+'_'+j.toString()} className={classname}>{recordData.value}</td>)

          if(j+1 === array.length){
            row.push(<td key={'row'+j+recordData.value} className={classname}><NavLink to={`/view/${array[0].value}`} onClick={()=>{
              dispatch({type: 'update_record', value: data[i]})
              console.log(data[i])
            }}><u> View </u></NavLink></td>)
          }
        })
        rows.push(<tr key={'rowbody_'+i} className="row body">{row}</tr>)



      })

/*

      for(let i = 0; i < data.length; i++){
        let keys = Object.keys(data[i])
        keys.sort()
        let row = []
        let headerRow = []
        if(i===0){
          let j = 0
          for(j = 0; j < keys.length; j++){
            headerRow.push( <td key={j.toString()+'_'+i.toString()} className="table-cell">{keys[j]}</td> )
          }
          headerRow.push(<td key={'header'+j+keys[j]} className="table-cell"> </td>)
          rows.push(<tr key={'headerrow'+i} className="row header">{headerRow}</tr>)
        }
        for(let j = 0; j < keys.length; j++){

          let classname = i % 2 === 0 ? 'table-cell' : 'table-cell odd'

          if(typeof data[i][keys[j]] !== "object")
            row.push(<td key={i.toString()+'_'+j.toString()} className={classname}>{data[i][keys[j]]}</td>)
          else
            row.push(<td key={i.toString()+'_'+j.toString()} className={classname}>Data Object</td>)

          if(j+1 === keys.length){
            row.push(<td key={'row'+j+keys[j]} className={classname}><NavLink to={`/view/${data[i].id}`} onClick={()=>{
              dispatch({type: 'update_record', value: data[i]})
              console.log(data[i])
            }}><u> View </u></NavLink></td>)
          }

        }
        rows.push(<tr key={'rowbody'+i} className="row body">{row}</tr>)
      }

*/



    }
    return rows
}



const DynamicTable = () => {

  let state = RecordContext.useState()
  let dispatch = UserContext.useDispatch()
  const [rows, setRows] = useState([])

  useEffect(()=>{
    setRows(generateRowsAndColumns(state.type, state.records, dispatch))
  }, [state.records, state.type])

  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default RecordTable
