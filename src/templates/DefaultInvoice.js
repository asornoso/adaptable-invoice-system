import React from 'react'

/*
  Valid data types:
    string
    number
    timestamp
    arrays/objects

  Notice the configuration file is imported for the layout, for company details
*/

const DefaultInvoice = {

    //Name of object, case sensitive, spaces OK
    name : "Default Invoice",


    structure: {
      customer: {
        name: 'string',
        id: 'string',
      },
      purchase: {
        date: 'timestamp',
        purchase_id: 'string',
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
      return (
        <div key={props.id}>
          hello this is my layout <br/>
          {props.customer.name} bought ${props.purchase.amount} on {props.purchase.date}
        </div>
      )
    }

}


export default DefaultInvoice
