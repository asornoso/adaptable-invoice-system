import React from 'react'
import {v4 as uuidv4} from 'uuid'

/*
  Notice the configuration file is imported for the layout, for company details
*/

const Invoice2 = {

  //Name of template, human readable form
  //Should match file name, with exception of spaces/whitespace
    name : "Invoice 2",

    jsonTemplate:{
        date: 'timestamp',
        purchase_id: 'string',
        amount: 'number',
        items: [
          {
            name: 'string',
            price: 'number'
          }
        ]
    },

    layout: (props) => {
      return (
        <div key={uuidv4()}>
          hello this is my layout for invoice 2 <br/>
          you bought ${props.purchase.amount} on {props.purchase.date}
        </div>
      )
    }

}


export default Invoice2
