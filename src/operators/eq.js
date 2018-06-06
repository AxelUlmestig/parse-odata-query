
const eq = value => {
    lcVal = value.toLowerCase()

    if(lcVal === 'null' || lcVal === 'nullvalue') {
        return ' IS NULL'
    }

    if(lcVal === 'true') {
        return ' = 1'
    }

    if(lcVal === 'false') {
        return ' = 0'
    }

    // is UUID
    if(lcVal.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
        return ` = '${value}'`
    }

    return ` = ${value}`
}

module.exports = eq