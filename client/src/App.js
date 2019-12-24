import React, { useEffect, useState } from 'react'
import './App.css'

import { getWeb3 } from './blockchain'
import { Lottery } from './components'

const App = () => {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()

      setWeb3(web3)
      setAccounts(accounts)
    }
    fetch()
  }, [])

  console.log(web3)
  console.log(accounts)

  return (
    <div className="App">
      <Lottery />
    </div>
  )
}

export default App
