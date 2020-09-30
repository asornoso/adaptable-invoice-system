import React from 'react'
import configuration from '../configuration.js'
import './DefaultInvoice.css'
/*
  Notice the configuration file is imported for the layout, for company details
  Also a custom stylesheet is also imported for the layout defined below
*/

const DefaultInvoice = {

    //Name of template, human readable form
    //Should match file name, with exception of spaces/whitespace
    name : "Default Invoice",
    autoID: true,

    //all the fields that need to exist in order to create this record
    //Valid types:
    //string, number, date,
    //Sub arrays and sub objects are valid
    jsonTemplate:{

      id: 'number',
      customer: {
        name: 'string',
        id: 'number',
      },
      purchase: {
        date: 'date',
        id: 'number',
        amount: 'number',
        items: [
          {
            name: 'string',
            price: 'number'
          }
        ]
      }
    },

    layout: (props) => {


      console.log(props)
      if(props === undefined || Object.keys(props).length === 0 )
        return (<div>No record passed to layout</div>)

      const images = require.context('../resources', true)
      const logo = images(`./${configuration.companyInfo.brand.logo}`)
      console.log(props.purchase.items)

      const rows =   props.purchase.items.map((item, i) => {
          return <tr key={'row_'+i} className={i % 2 === 0 ? 'light-row' : 'dark-row'}><td>{item.name}</td><td>{item.price}</td></tr>
        })

      return (
        <div className="center-wrapper">
          <div className='invoice-wrapper'>
            <div className='company-info'>
              <h2>{configuration.companyInfo.brand.name}</h2>
              <h4>{configuration.companyInfo.contact.streetAddress}</h4>
              <h4>{configuration.companyInfo.contact.stateAddress}</h4>
              <h4>{configuration.companyInfo.contact.phone}</h4>
              <h4>{configuration.companyInfo.contact.fax}</h4>
              <h4>{configuration.companyInfo.contact.website}</h4>
            </div>
            <div className='company-logo'>
                <img className='logo' src={logo} alt='logo'/>
            </div>
            <div className='customer-info'>
              <p>Customer Name: {props.customer.name}</p>
              <p>Customer ID: {props.customer.id}</p>
            </div>
            <div className='purchase-info'>
              <p> Invoice ID: {props.id} </p>
              <p>Transaction ID: {props.purchase.id}</p>
              <p>Date: {props.purchase.date}</p>
              <p>Total: {props.purchase.amount}</p>
            </div>
            <div className='table'>
              <table>
                <thead>
                  <tr className='header-row'><th>Item Name:</th><th>Item Price:</th></tr>
                </thead>
                <tbody>
                {
                  rows
                }
                </tbody>
              </table>

            </div>

          </div>
        </div>
      )
    }

}


export default DefaultInvoice
