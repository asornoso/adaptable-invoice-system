A React project that allows for adaptability in creating, storing, and viewing records/invoices.
Cloud based using Google's Firebase platform to deploy anywhere.

## Setup

Clone the project
Create a Firebase project and modify `/src/firebaseConfig.js` for your project
Modify the configuration in  `src/configuration.js`(More details below)
Run npm run build
Deploy!

## `Configuration`

By default, the app needs a new firebaseConfig.js file to connect to your project. <br/>
It also has a default Invoice Model.

### `Record Templates`

This system is expandable(adaptable) to various record types. In order to add your own
custom template, create a new ES6 class that contains functions that return the structure
of your data, the name of your data(invoice, bill, receipt, work order, etc), and a
react component layout to view the data in your record.
<br/>
See the default template in `src/templates/DefaultInvoice.js` for an example.

### `Viewing Records`

The view for each type of record depends on the record type and the react component
you created for it. This allows for a better UI experience and records that can be
printed out in a more usable way.
