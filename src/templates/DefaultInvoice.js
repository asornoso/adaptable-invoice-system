import React from 'react'
import {v4 as uuidv4} from 'uuid'
/*
  Notice the configuration file is imported for the layout, for company details
*/

const DefaultInvoice = {

    //Name of template, human readable form
    //Should match file name, with exception of spaces/whitespace
    name : "Default Invoice",

    //all the fields that need to exist in order to create this record
    //Valid types:
    //string, number, date,
    //Sub arrays and sub objects are valid
    creation:{
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
      return (
        <div key={uuidv4()}>
          hello this is my layout for default invoice<br/>
          {props.customer.name} bought ${props.purchase.amount} on {props.purchase.date}
        </div>
      )
    }

}


export default DefaultInvoice
