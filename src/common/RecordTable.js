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
      console.log(records)

      dispatch({type:"update_records", value: records})
      dispatch({type:'update_type', value: options[selectedIndex]})
      console.log('updating...')
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
{
     <DynamicTable />
}
    </div>
  )
}


const generateRowsAndColumns = (type, data, dispatch) => {
    let rows = []

    if(data.length === 0 || type.length === 0)
      rows.push(<tr key={'000'}><td>No data available</td></tr>)
    else{

      for(let i = 0; i < data.length; i++){

        let keysFound = RecordParser.recursiveKeyFinder(data[i])

        let row = []
        let headerRow = []
        if(i === 0){

          for(let j = 0; j < keysFound.keys.length; j++){

            headerRow.push( <td key={j.toString()+'_'+i.toString()} className="table-cell">{keysFound.keys[j]}</td> )

            if(j+1 === keysFound.keys.length)
              headerRow.push(<td key={'header'+j+keysFound.keys[j]} className="table-cell"> </td>)
          }
          rows.push(<tr key={'headerrow'+i} className="row header">{headerRow}</tr>)
        }
        for(let j = 0; j < keysFound.keys.length; j++){

          let classname = i % 2 === 0 ? 'table-cell' : 'table-cell odd'

          if(typeof keysFound.values[j] !== "object")
            row.push(<td key={i.toString()+'_'+j.toString()} className={classname}>{keysFound.values[j]}</td>)
          else
            row.push(<td key={i.toString()+'_'+j.toString()} className={classname}>Data Object</td>)

          if(j+1 === keysFound.keys.length){
            row.push(<td key={'row'+j+keysFound[j]} className={classname}><NavLink to={`/view/${data[i].id}`} onClick={()=>{
              dispatch({type: 'update_record', value: data[i]})
            }}><u> View </u></NavLink></td>)
          }

        }
        rows.push(<tr key={'rowbody'+i} className="row body">{row}</tr>)
      }

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
