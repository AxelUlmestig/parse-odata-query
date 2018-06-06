const parseStrings = require('../util/parse-strings')

const contains = args => {
    const parsedString = parseStrings(args)
    const column = parsedString.before.split(',')[0].trim()
    const arg = parsedString.inside

    return `[${column}] LIKE '%${arg}%'`
}

module.exports = contains