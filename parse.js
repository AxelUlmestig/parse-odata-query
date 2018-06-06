
const parseFilter = require('./src/parse-filter')

// TODO additional WHERE clauses in options
// TODO SQL flavour in options
const parse = (tableName, options, urlParams) => {
    const params = typeof urlParams === 'string'
        ? parseUrlParams(urlParams)
        : urlParams

    const schema = options.schema
        ? `[${options.schema}].`
        : ''

    const top = params['$top']
        ? `TOP ${params['$top']} `
        : ''

    const select = params['$select']
        ? formatSelect(params['$select'])
        : '*'

    const orderBy = params['$orderby']
        ? ` ORDER BY ${formatOrderBy(params['$orderby'])}`
        : ''

    const where = params['$filter']
        ? ` WHERE ${parseFilter(params['$filter'])}`
        : ''

    return `SELECT ${top}${select} FROM ${schema}[${tableName}]${orderBy}${where}`
}

const formatSelect = propertiesStr =>
    propertiesStr
        .split(',')
        .map(str => str.trim())
        .map(str => `[${str}]`)
        .reduce((combined, str) => `${combined}, ${str}`)

const formatAscDesc = str => {
    const [prop, order] = str.split(' ')

    const formattedOrder = order && order.toUpperCase() == 'DESC'
        ? 'DESC'
        : 'ASC'

    return `[${prop}] ${formattedOrder}`
}

const formatOrderBy = propertiesStr =>
    propertiesStr
        .split(',')
        .map(str => str.trim())
        .map(formatAscDesc)
        .reduce((combined, str) => `${combined}, ${str}`)

const parseUrlParams = paramStr =>
    paramStr
        .split('&')
        .map(str => str[0] == '?' ? str.substring(1) : str)
        .map(str => str.split('='))
        .map(pair => [pair[0].toLowerCase(), pair[1]])
        .reduce((obj, pair) => Object.assign(obj, { [pair[0]]: pair[1] }), {})

module.exports = parse
