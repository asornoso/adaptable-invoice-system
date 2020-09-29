const configuration = {
  companyInfo: {
    brand: {
      name: "Adaptive Records System",
      logo: "logo.png", //Logo should be placed in /src/resources
      slogan: "A very adaptable records system"
    },
    //The contact object includes data relevant to your company or business.
    contact: {
      streetAddress: "1234 streetName Blvd",
      stateAddress: "City, State Zipcode",
      phone: "(123) 456-7890",
      fax: "1234567890",
      website: "www.thisismysite.com"
    }
  },
  //
  //To create your own data model, your object must include the following properties:
  //name --> Name of this type of data model(Invoice, Incident Report,  B2B Invoice, etc)
  //jsonTemplate --> a json object that defines the structure of your data
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
