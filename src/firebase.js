import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import configuration from './configuration.js'


class Firebase {
  constructor(){

    import( `${configuration.firebaseConfigPath}` ).then( config => {
        app.initializeApp(config.default)
        this.app = app
        this.auth = app.auth()
        this.db = app.firestore()
      })

  }


  signIn = (email, password) => {
    return new Promise (( res, rej) => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then( result => {
        this.createSession(email, result.user.uid, result.user.displayName)
        res(result)
      })
      .catch( error =>  rej(error))
    })
  }

  logout = () => {
     this.auth.signOut()
     this.removeSession()
  }


    createRecord = (type, obj) => {
      return new Promise((res, rej) => {
        this.db.collection(type).doc(obj['id']).set(obj)
          .then(result => res(result))
          .catch(error => rej(error))
      })
    }

    getRecordsByType = (type) => {
      console.log(this)
      return new Promise((res, rej) => {
        this.app.firestore().collection(type).get()
          .then(results => {
            let records = []
            results.forEach( doc => {
              records.push(doc.data())
            })
            res(records)
          })
          .catch(error => rej(error))
      })
    }

    getRecordById = (type, id) => {
      return new Promise((res, rej) => {
        this.db.collection(type).doc(id).get()
          .then(result => res(result))
          .catch(error => rej(error))
      })
    }

    getRecords = () => {
      return new Promise((res, rej) => {
        this.db.get()
          .then(results => {
            let records = []
            results.forEach( doc => {
              records.push(doc.data())
            })
            res(records)
          })
          .catch(error => rej(error))
      })
    }


    updateRecord = (type, obj) => {
      return new Promise((res, rej) => {
        this.db.collection(type).doc(obj.id).update(obj)
          .then(result => res(result))
          .catch(error => rej(error))
      })
    }


  //narrow down using keys before query
    searchRecord = (type, keys, searchTerm) => {
      console.log('search....')
      console.log(type, keys, searchTerm)
    }



  createSession = (email, id, name) => {
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('name', name)
  }

  removeSession= () => sessionStorage.clear()

}

export default Firebase
