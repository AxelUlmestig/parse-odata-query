
const trim = table => {
    return `TRIM(' ' FROM [${table}])`
}

module.exports = trim