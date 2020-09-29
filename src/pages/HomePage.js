import React, {useEffect} from 'react'
import { useHistory} from "react-router-dom"
import {UserContext} from '../App.js'

import RecordTable from '../common/RecordTable.js'
import '../styles/home.css'
import configuration from '../configuration.js'


const HomePage = () => {
  let state = UserContext.useState()
  let history = useHistory()
  useEffect(()=>{
    if(!sessionStorage.getItem('id'))
      history.push('/')
  }, [])

  const images = require.context('../resources', true)
  const logo = images(`./${configuration.companyInfo.brand.logo}`)

  const records = [];

  return (
    <div>
      <div className="base-container">

        <div className="logo-container">
            <img className='logo' src={logo} alt='logo'/>
        </div>

        <div className="top-container">
          <h2>
            { configuration.companyInfo.name ? configuration.companyInfo.name : 'View Records'}
          </h2>
          <a href="" style={{position: 'absolute', right: 40+'px', top: 40+'px'}} onClick={ ()=> { state.firebase.logout(); history.push('/')} }>
            Logout
          </a>
        </div>


        <div className="records">
          <RecordTable data={records}/>
        </div>

      </div>
    </div>
  )
}

export default HomePage
