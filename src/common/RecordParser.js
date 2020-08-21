import configuration from '../configuration.js'


class RecordParser  {

  readTemplateFiles = () => {
      let files = configuration.templates
      let templates = []

      for(let i = 0; i < files.length; i++){
        let obj = require(`../templates/${files[i]}`).default
        templates.push(obj)
      }
      return templates
  }

  findTemplate = (templateName) => {
    let files = configuration.templates

    for(let i = 0; i < files.length; i++){
      let obj = require(`../templates/${files[i]}`).default
      if(obj.name === templateName)
        return obj

    }
    return {error: 'no such template'}
  }

}


const Parser = new RecordParser()
export default Parser
