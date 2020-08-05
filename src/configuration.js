const configuration = {
  theme:{
    primaryColor: '#000000',
    secondaryColor: '#323232',
    textColor: '#ffffff'
  },
  companyInfo: {
    brand: {
      name: "Adaptive Invoicing System",
      logo: "./logo.png",
      slogan: "The best invoicing system"
    },
    //The contact object includes data relevant to your company or business.
    //If
    contact: {
      address: "1234 This is an address",
      phone: "(123) 456-7890",
      fax: "1234567890",
      website: "www.thisismysite.com"
    }
  },
  //The data javascript object contains a list paths to ES6 classes that serve
  // as models for the forms and layouts of any records.
  //
  //To create your own data model, your class must include the function listed:
  //dataModel --> returns a javascript object of structured data
  //layoutModel --> returns a react component that renders your data as needed
  //name --> returns the name of this type of data model(Invoice 1, etc)
  //
  //An invoice class is included by default. View the contents as an example
  data: [
    "./classes/DefaultInvoice.js",
  ],
  //Path to your firebase configuration file
  firebaseConfigPath: "./firebaseConfig.js"
}

export default configuration;
