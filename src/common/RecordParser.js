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

  recursiveKeyFinder = (obj, previousKey='') => {
    let keys = []
    let values = []
    Object.keys(obj).forEach((key, index) => {
      if(key == 'sys_info_record_type')
        return;

      let name = previousKey.length > 0 ? previousKey+'_'+key : key
      switch(typeof obj[key]){
        case 'string':
          keys.push(name)
          values.push(obj[key])
          break;
        case 'boolean':
          keys.push(name)
          values.push(obj[key])
          break;
        case 'number':
          keys.push(name)
          values.push(obj[key])
          break;
        case 'object':
          if(obj[key] instanceof Array){
            // keys.push(name)
            // values.push(obj[key])
            //skip over arrays...
          }
          else if(obj[key] instanceof Object){
            let keyvalues = this.recursiveKeyFinder(obj[key], key)
            keys.push(...keyvalues.keys)
            values.push(...keyvalues.values)
          }
          break;
        default:
          console.log('error')
      }
    })
    return {keys:keys, values:values}
  }

  objectToKeysArray = (obj) => {
    let keys = []
    Object.keys(obj).forEach((key, index) => {
      if(key == 'sys_info_record_type')
        return;

      switch(typeof obj[key]){
        case 'string':
          keys.push({name: key, type: obj[key]})
          break;
        case 'boolean':
          keys.push({name: key, type: obj[key]})
          break;
        case 'number':
          keys.push({name: key, type: obj[key]})
          break;
        case 'object':
          if(obj[key] instanceof Array){
            let temp = this.objectToKeysArray(obj[key])
            keys.push(temp)
          }
          else if(obj[key] instanceof Object){
            let temp = this.objectToKeysArray(obj[key])
            keys.push(temp)
          }
          break;
        default:
          console.log('error')
      }
    })
    return keys
  }

}


const Parser = new RecordParser()
export default Parser
