import React, { useState, useEffect } from 'react'

export const Lottery = ({ web3, account, contract }) => {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const manager = await contract.methods.manager().call()
      const players = await contract.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(contract.options.address)

      setManager(manager)
      setPlayers(players)
      setBalance(balance)
    }

    fetch()
  }, [])

  const onChange = e => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()
    setMessage('Waiting on transaction success...')

    await contract.methods.enter().send({
      from: account,
      value: web3.utils.toWei(value, 'ether')
    })

    setMessage('You have been entered!')
  }

  const onClick = async () => {
    setMessage('Waiting on transaction success')

    await contract.methods.pickWinner().send({
      from: account
    })
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. There are currently{' '}
        {players.length} people entered, competing to win{' '}
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={onChange} />
        </div>
        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick a winner?</h4>
      <button onClick={onClick}>Pick a winner!</button>

      <hr />

      <h1>{message}</h1>
    </div>
  )
}
