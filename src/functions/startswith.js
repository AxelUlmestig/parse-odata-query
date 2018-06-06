
const parseStrings = require('../util/parse-strings')

const startswith = args => {
    const parsedString = parseStrings(args)
    const table = parsedString.before.split(',')[0].trim()
    const arg = parsedString.inside

    return `[${table}] LIKE '${arg}%'`
}

module.exports = startswith