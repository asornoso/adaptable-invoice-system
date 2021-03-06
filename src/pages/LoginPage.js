import React, {useState, useEffect} from 'react';
import { useHistory} from "react-router-dom"
import {Button, Input} from '../common/UIBasics.js'
import {UserContext} from '../App.js'
import '../styles/login.css'
import configuration from '../configuration.js'


let state, dispatch, history

const submit = ( email, password,e ) => {
  e.preventDefault();

  if(email.length > 6 && password.length > 5){
    state.firebase.signIn(email, password).then( data => {
      dispatch({type:'update_user_id', value: data.user.uid})
      dispatch({type:'update_email', value: data.user.email})
      dispatch({type:'update_name', value: data.user.displayName})

      history.push('/home')

    }).catch( error => {
      console.log(error)
      return true
    })
  }
  else
    return true
}

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayError, setError] = useState(false)

  state = UserContext.useState()
  dispatch = UserContext.useDispatch()
  history = useHistory()

  const images = require.context('../resources', true)
  const logo = images(`./${configuration.companyInfo.brand.logo}`)

  useEffect( () => {
    if(sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0)
      history.push('/home')
  })

  return (
    <div className='login'>

      <div className="grid-container   full-page">


        <div className="logo-container">
              <img className='logo' src={logo} alt='logo'/>
        </div>

        <div className="title">
              {configuration.companyInfo.brand.name}

        </div>

        <div className="form">
        { displayError && <div> Incorrect Email or Password. Please try again </div>}

          <form onSubmit={(e) => { if(submit(email, password, e)) setError(true) }}>
            <Input name="email" type='email' onChange={e => setEmail(e.target.value)} />
            <Input name="password" type='password' onChange={e => setPassword(e.target.value)}/>
            <Button text='Sign in' />
          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
