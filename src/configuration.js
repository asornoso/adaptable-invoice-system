const configuration = {
  theme:{
    primaryColor: '#000000',
    secondaryColor: '#323232',
    textColor: '#ffffff'
  },
  companyInfo: {
    brand: {
      name: "Adaptive Invoicing System",
      logo: "logo.png", //Logo should be placed in /src/resources
      slogan: "The best invoicing system"
    },
    //The contact object includes data relevant to your company or business.
    //If
    contact: {
      address: "1234 address, city zipcode",
      phone: "(123) 456-7890",
      fax: "1234567890",
      website: "www.thisismysite.com"
    }
  },
  //The data javascript object contains a list paths to ES6 classes that serve
  // as models for the forms and layouts of any records.
  //
  //To create your own data model, your object must include the following properties:
  //name --> Name of this type of data model(Invoice, Incident Report,  B2B Invoice, etc)
  //structure --> an object that contains all the data this record uses/stores
  //layout --> a function that returns a react component that renders your data as needed
  //
  //An invoice object is included by default. View the contents as an example
  templates: [
    "DefaultInvoice.js", "Invoice2.js",
  ],
  //Path to your firebase configuration file
  firebaseConfigPath: "./firebaseConfig.js"
}

export default configuration;
