import React, { useEffect, useState } from 'react'
import './App.css'

import { getWeb3 } from './blockchain'
import { lotteryAbi, lotteryAddress } from './abis'
import { Lottery } from './components'

const App = () => {
  const [web3, setWeb3] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const lottery = new web3.eth.Contract(lotteryAbi, lotteryAddress)

      setWeb3(web3)
      setAccounts(accounts)
      setContract(lottery)
    }
    fetch()
  }, [])

  if (!web3 || !accounts || !contract) {
    return null
  }

  return (
    <div className="App">
      <Lottery web3={web3} account={accounts[0]} contract={contract} />
    </div>
  )
}

export default App
