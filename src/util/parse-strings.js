
const parseStrings = (str, escapeChar) => {
    const head = str[0]
    const tail = str.substring(1)

    if(!head) {
        return {
            before: '',
            inside: '',
            remainder: '',
        }
    }

    if(escapeChar) {
        if(head === escapeChar) {
            return {
                before: '',
                inside: '',
                remainder: tail
            }
        }

        if(!tail) {
            // TODO throw exception
        }

        const nextIteration = parseStrings(tail, escapeChar)

        return {
            before: '',
            inside: head + nextIteration.inside,
            remainder: nextIteration.remainder,
        }
    }

    if(head === '"' || head === "'") {
        return parseStrings(tail, head)
    }

    const nextIteration = parseStrings(tail)

    return {
        before: head + nextIteration.before,
        inside: nextIteration.inside,
        remainder: nextIteration.remainder
    }
}

console.log(parseStrings('this is before \'this is " inside\' this is "after"'))

module.exports = parseStrings