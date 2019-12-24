import React from 'react'
import './App.css'

import { Web3Provider } from './context'

const App = () => {
  return (
    <Web3Provider>
      <div className="App">Ethereum</div>
    </Web3Provider>
  )
}

export default App
