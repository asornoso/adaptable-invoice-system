import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import CustomContext from './customContext.js'
import Firebase from './firebase.js'

import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import CreatePage from './pages/CreatePage'
import ViewPage from './pages/ViewPage'


const initialUserState = {
  uid: undefined,
  name: undefined,
  firebase: new Firebase(),
  record: undefined
}

const userReducer = (state, action) => {
    switch(action.type){
      case 'update_user_id': {
        return {...state, id: action.value}
      }
      case 'update_name': {
        return { ...state, name:  action.value}
      }
      case 'update_email': {
        return { ...state, email:  action.value}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}


const UserContext = new CustomContext(initialUserState, userReducer)


const initialRecordtate = {
  records: [],
  type: "",
  selected: undefined
}

const recordReducer = (state, action) => {
    switch(action.type){
      case 'update_records': {
        return {...state, records: action.value}
      }
      case 'update_type': {
        return { ...state, type:  action.value}
      }
      case 'update_selected' : {
        return {...state, selected: action.value}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}

const RecordContext = new CustomContext(initialRecordtate, recordReducer)

function App() {
  return (
    <div className="App">
      <HashRouter>
        <UserContext.Provider>
          <RecordContext.Provider>
            <Route exact path='/' component={LoginPage}/>
            <Route  path='/search' component={SearchPage}/>
            <Route  path='/create/:type' component={CreatePage}/>
            <Route  path='/view/:id' component={ViewPage}/>
          </RecordContext.Provider>
        </UserContext.Provider>
      </HashRouter>
    </div>
  );
}

export { UserContext, RecordContext }
export default App;
