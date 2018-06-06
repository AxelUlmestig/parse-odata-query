const parseParenthesis = require('./util/parse-parenthesis')
const parseStrings = require('./util/parse-strings')
const firstWords = require('./util/first-words')

const functions = require('./functions')
const operators = require('./operators')

const parseFilter = filterStr => {
    if(!filterStr) {
        return ''
    }

    return parseFunctionOrTable(filterStr)
}

const parseFunction = (format, str) => {
    const separatedParenthesis = parseParenthesis(str)
    const f = getFunction(separatedParenthesis.before)

    if(f) {
        const functionArgs = parseFuncArgs(separatedParenthesis.inside)
        return `${f(functionArgs)}${parseOperator(separatedParenthesis.remainder)}`
    }

    if(!separatedParenthesis.before && separatedParenthesis.inside) {
        const inParenthesis = parseFunctionOrTable(separatedParenthesis.inside)
        const afterParenthesis = parseOperator(separatedParenthesis.remainder)
        return `(${inParenthesis})${afterParenthesis}`
    }

    const { leading: [word], remaining } = firstWords(1, str)

    return format(word, parseOperator(remaining))
}

const parseFunctionOrTable = str => {
    const format = (column, operation) => `[${column}]${operation}`
    return parseFunction(format, str)
}

const parseFunctionOrValue = str => {
    const format = (value, operation) => `${value}${operation}`
    return parseFunction(format, str)
}

const parseFuncArgs = str => {
    if(!str) {
        return ''
    }

    const { before, inside, remainder } = parseStrings(str)

    const commaSeparated = before
        .split(',')
        .map(x => x.trim())
        .filter(x => x !== '')
        .map(parseFunctionOrValue)

    const insideArr = inside
        ? [`'${inside}'`]
        : []

    const remainderArr = remainder
        ? [parseFuncArgs(remainder)]
        : []

    return commaSeparated
        .concat(insideArr)
        .concat(remainderArr)
        .reduce((tot, str) => `${tot}, ${str}`, '')
        .substring(2)
}

const parseOperator = str => {
    if(!str) {
        return ''
    }

    const { leading, remaining } = firstWords(1, str.trim())
    const parsedString = parseStrings(remaining)

    const operator = operators[leading[0].toLowerCase()]

    if(parsedString.before) {
        return operator(parseFunctionOrValue(parsedString.before))
    }

    return operator(`'${parsedString.inside}'`)
}

const beforeChar = (char, str) =>
    str.split(char)[0]

const afterChar = (char, str) =>
    str.substr(beforeChar(char, str) + 1)

const getFunction = str => {
    const cleanStr = str.trim().toLowerCase()

    return functions[cleanStr]
}

module.exports = parseFilter