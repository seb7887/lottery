import Web3 from 'web3'

const providerUrl = process.env.PROVIDER_URL || 'http://localhost:7545'

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
        const provider = new Web3.providers.HttpProvider(providerUrl)
        const web3 = new Web3(provider)
        resolve(web3)
      }
    })
  })
