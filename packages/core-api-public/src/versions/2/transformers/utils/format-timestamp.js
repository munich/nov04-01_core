const moment = require('moment')
const config = require('@arkecosystem/core-module-loader').get('config')

module.exports = (epochStamp) => {
  const timestamp = moment(config.getConstants(1).epoch).utc().add(epochStamp, 'seconds')

  return {
    epoch: epochStamp,
    unix: timestamp.unix(),
    human: timestamp.format()
  }
}
