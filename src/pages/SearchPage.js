import React from 'react'
import {Input, FloatingButton} from '../common/UIBasics.js'
import RecordTable from '../common/RecordTable.js'
import '../styles/search.css'
import CustomContext from '../customContext.js'

import configuration from '../configuration.js'

const initialState = {
  records: [],
  type: "",

}

const reducer = (state, action) => {
    switch(action.type){
      case 'update_records': {
        return {...state, records: action.value}
      }
      case 'update_type': {
        return { ...state, type:  action.value}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}

const RecordContext = new CustomContext(initialState, reducer)


const SearchPage = () => {



  const images = require.context('../resources', true)
  const logo = images(`./${configuration.companyInfo.brand.logo}`)


  const records = [];

  return (
    <RecordContext.Provider>
      <div className="base-container">

        <div className="logo-container">
            <img className='logo' src={logo} alt='logo'/>
        </div>

        <div className="search-container">
          <Input name="search" type="text" size="large" />
          <div className="search-button">
            <FloatingButton type="search" size='medium'/>
          </div>
        </div>


        <div className="records">

          <RecordTable data={records}/>


        </div>

      </div>
    </RecordContext.Provider>
  )
}


export {SearchPage,  RecordContext }
