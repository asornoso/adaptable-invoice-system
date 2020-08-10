import React from 'react'

/*
  Valid data types:
    string
    number
    timestamp
    arrays/objects

  Notice the configuration file is imported for the layout, for company details
*/

const Invoice2 = {

  //Name of object, case sensitive, spaces OK
    name : "Invoice2",


    structure: {
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
          hello this is my layout for invoice 2 <br/>
          you bought ${props.purchase.amount} on {props.purchase.date}
        </div>
      )
    }

}


export default Invoice2
