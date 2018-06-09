const moment = require('moment')

moment.suppressDeprecationWarnings = true

const year = str => {
    const formatted = moment.utc(str).format('YYYY-MM-DD HH:mm:ss')
    return formatted == 'Invalid date'
        ? `YEAR(${str})`
        : `YEAR('${formatted}')`
}

module.exports = year