A React project that allows for adaptability in creating, storing, and viewing records/invoices. <br/>
Cloud based using Google's Firebase platform to deploy anywhere.

## Setup

Clone the project <br/>
Create a Firebase project and modify `/src/firebaseConfig.js` for your project <br/>
Modify the configuration in  `src/configuration.js`(More details below) <br/>
Run npm run build <br/>
Deploy!

## Configuration

By default, the app needs a new firebaseConfig.js file to connect to your project. <br/>
It also has a default Invoice Model.

### Record Templates

This system is expandable(adaptable) to various record types. In order to add your own
custom template, create a new javascript object that contains the properties that
contain your data structure, the name of your data(invoice, bill, receipt, work order, etc), and a function that returns a react component layout to view the data in your record.
<br/><br/>
See the default template in `src/templates/DefaultInvoice.js` for an example.

### Viewing Records

The view for each type of record depends on the record type and the react component
you created for it. This allows for a better UI experience and records that can be
printed out in a more usable way.

### Adding Users

Users should be added via the Firebase Authentication page for you Firebase project.
There is no "signup page" as users who have access to company information should
be tracked and limited by an IT Administrator.
