import React from 'react';

class CustomContext {

  constructor(initalState, reducer){
    this.Context = React.createContext()
    this.Dispatch = React.createContext()
    this.initialState = initalState
    this.reducer = reducer
  }

  Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(this.reducer, this.initialState)
    return (
      <this.Context.Provider value={state}>
        <this.Dispatch.Provider value={dispatch}>
          {children}
        </this.Dispatch.Provider>
      </this.Context.Provider>
    )

  }


  useState = () => {
    const context = React.useContext(this.Context)
    if (context === undefined) {
      throw new Error('useState must be used within a custom context')
    }
    return context
  }

  useDispatch = () => {
    const context = React.useContext(this.Dispatch)
    if (context === undefined) {
      throw new Error('useDispatch must be used within a custom context')
    }
    return context
  }



}

export default CustomContext
