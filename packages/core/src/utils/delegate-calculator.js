// TODO: move this as it is only used by core-api-public and core-database

// FIXME: expose this via module loader
const blockchain = require('../../../core-blockchain/src/manager').getInstance()
const state = blockchain.getState()
const config = require('@arkecosystem/core-module-loader').get('config')

exports.calculateApproval = (delegate) => {
  const lastBlock = state.lastBlock.data
  const constants = config.getConstants(lastBlock.height)
  const totalSupply = config.genesisBlock.totalAmount + (lastBlock.height - constants.height) * constants.reward

  return ((delegate.balance / totalSupply) * 100).toFixed(2)
}

exports.calculateProductivity = (delegate) => {
  if (!delegate.missedBlocks && !delegate.producedBlocks) {
    return (0).toFixed(2)
  }

  return (100 - (delegate.missedBlocks / ((delegate.producedBlocks + delegate.missedBlocks) / 100))).toFixed(2)
}
