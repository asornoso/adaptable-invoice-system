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

const reducer = (state, action) => {
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
      case 'update_record': {
        return {...state, record: action.value}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}


const UserContext = new CustomContext(initialUserState, reducer)


function App() {
  return (
    <div className="App">
      <HashRouter>
        <UserContext.Provider>
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/search' component={SearchPage}/>
          <Route exact path='/create/:type' component={CreatePage}/>
          <Route exact path='/view/:id' component={ViewPage}/>
        </UserContext.Provider>
      </HashRouter>
    </div>
  );
}

export { UserContext }
export default App;
