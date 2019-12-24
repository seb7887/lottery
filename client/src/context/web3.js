import React from 'react'
import Web3 from 'web3'

export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          await window.ethereum.enable()
          resolve(web3)
        } catch (err) {
          reject(err)
        }
      } else if (window.web3) {
        const web3 = window.web3
        resolve(web3)
      } else {
        const provider = new Web3.providers.HttpProvider(
          'http://localhost:7545'
        )
        const web3 = new Web3(provider)
        resolve(web3)
      }
    })
  })

export const Web3Context = React.createContext()

export const Web3Provider = props => (
  <Web3Context.Provider value={{ web3: getWeb3() }}>
    {props.children}
  </Web3Context.Provider>
)
