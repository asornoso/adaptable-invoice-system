import React from 'react'
import {Input, FloatingButton} from '../common/UIBasics.js'
import RecordTable from '../common/RecordTable.js'
import '../styles/search.css'
import configuration from '../configuration.js'
import {RecordContext} from '../App.js'



const SearchPage = () => {



  const images = require.context('../resources', true)
  const logo = images(`./${configuration.companyInfo.brand.logo}`)


  const records = [];

  return (
    <div>
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
    </div>
  )
}

export default SearchPage
