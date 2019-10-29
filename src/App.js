import React, { StrictMode } from 'react'
import Routes from "./pages/Routes";
import { Provider } from 'react-redux'
import store from './stores'
import ErrorHandler from './components/ErrorHandler'
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <StrictMode>
        <ErrorHandler>
          <Routes/>
        </ErrorHandler>
      </StrictMode>
    </Provider>
  )
};

export default App