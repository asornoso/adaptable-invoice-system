import React from 'react'
import {v4 as uuidv4} from 'uuid'

/*
  Notice the configuration file is imported for the layout, for company details
*/

const Invoice2 = {

  //Name of template, human readable form
  //Should match file name, with exception of spaces/whitespace
    name : "Invoice 2",
    autoID: true,

    jsonTemplate:{
        id: 'string',
        date: 'date',
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
          A very simple layout for invoice2 template.<br/>
          This has no styling or elements(besides a wrapping div)<br/>
          A template can contain any amount of elements and have its own css file<br/>
          This is an example of how easy it is to display data using a template <br/>
          you bought ${props.amount} on {props.date}
        </div>
      )
    }

}


export default Invoice2
