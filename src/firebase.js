import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'
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

  createUser = (email, password, name='user') => {
    return new Promise(( res, rej) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then( (result) => {
        this.createSession(email, result.user.uid, result.user.displayName)
        this.createDefaultFolder( result.user.uid)
        result.user.updateProfile({
          displayName: name
        }).then( (result2) => {
          res(result)
        })
      }).catch( (error) => {
        rej(error)
      })
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

  sendPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  createDefaultFolder = ( uid) => {
    return new Promise(( res, rej ) => {
      this.createFolder('My first folder', uid).then( (result) => res(result))
    })
  }

  createFolder = (name, uid) => {
    return new Promise( (res, rej) => {

      let newFolder = {
        name: name,
        editedOn: Date.now(),
      }

      let newTask = {
          task: 'My first task',
          status: false,
          editedOn: Date.now()
      }

      let newFolderId = uuidv4()

      this.db.collection('data').doc(uid).collection('folders').doc(newFolderId).set(newFolder)
      .then( () => {
          let newTaskId = uuidv4()
          this.db.collection('data').doc(uid).collection('folders').doc(newFolderId).collection('tasks').doc(newTaskId).set(newTask)
          .then( () => res())
          .catch( error2 => rej(error2))
      }).catch( error => rej(error))
    })
  }

  deleteFolder = (fid, uid) => {
    console.log('deleting folder')
    return new Promise( (res, rej) => {
      this.db.collection('data').doc(uid).collection('folders').doc(fid).delete()
      .then( result =>res(result))
      .catch( error =>rej(error))
    })
  }

  getFolders = (id) => {
    return new Promise( (res, rej) => {
      this.db.collection('data').doc(id).collection('folders').orderBy('editedOn', 'desc').get().then( querySnapshot => {
        let folders = []
          querySnapshot.forEach( doc => {
            folders.push({...doc.data(), id:doc.id})
          })
          res(folders)
      }).catch( error => rej(error) )
    })
  }

  getTasks = (uid, fid) => {
    return new Promise( (res, rej) => {
        this.db.collection('data').doc(uid).collection('folders').doc(fid).collection('tasks').orderBy('editedOn', 'desc').get().then( querySnapshot => {
          let tasks = []
            querySnapshot.forEach( doc => {
              tasks.push({...doc.data(), id:doc.id})
            })
            res(tasks)
        }).catch( error => rej(error))
    })
  }

  addTask = (task, fid, uid) => {
    return new Promise( (res, rej) => {
      let t = {
        task: task,
        status: false,
        editedOn: Date.now()
      }
      this.db.collection('data').doc(uid).collection('folders').doc(fid).collection('tasks').doc(uuidv4()).set(t)
      .then( result => res(result))
      .catch( error => rej(error))
    })
  }

  deleteTask = (tid, fid, uid) => {
    return new Promise( (res, rej) => {
        this.db.collection('data').doc(uid).collection('folders').doc(fid).collection('tasks').doc(tid).delete()
        .then( result => res(result)  )
        .catch( error => rej(error) )
    })
  }

  updateTask = (tid, fid, uid, task) => {
    return new Promise( (res, rej) => {
      this.db.collection('data').doc(uid).collection('folders').doc(fid).collection('tasks').doc(tid).update({...task})
      .then( result => res(result))
      .catch( error => rej(error))
    })
  }

  createSession = (email, id, name) => {
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('name', name)
  }

  removeSession= () => {
    sessionStorage.clear()
  }

}

export default Firebase
