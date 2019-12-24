require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const { interface, bytecode } = require('./compile')
const mnemonic = process.env.MNEMONIC
const url = process.env.PROVIDER_URL

const provider = new HDWalletProvider(mnemonic, url)
const web3 = new Web3(provider)

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    console.log(`Attempting to deploy from account ${accounts[0]}`)

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .estimateGas({ from: accounts[0] })

    console.log(`Contract deployed to ${result}`)
  } catch (err) {
    console.log(err)
  }
}

deploy()
