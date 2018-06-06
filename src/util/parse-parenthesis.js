
const parseParenthesis = (str, lvl = 0) => {
    const head = str[0]
    const tail = str.substring(1)

    if(!head) {
        return {
            before: '',
            inside: '',
            remainder: ''
        }
    }

    if(head === '(' && lvl < 1) {
        return parseParenthesis(tail, lvl + 1)
    }

    if(head === '(') {
        const nextIteration = parseParenthesis(tail, lvl + 1)

        return {
            before: nextIteration.before,
            inside: head + nextIteration.inside,
            remainder: nextIteration.remainder,
        }
    }

    if(head === ')' && lvl === 1) {
        return {
            before: '',
            inside: '',
            remainder: tail,
        }
    }

    if(head === ')' && lvl < 1) {
        // TODO throw exception
    }

    if(head === ')') {
        const nextIteration = parseParenthesis(tail, lvl - 1)

        return {
            before: nextIteration.before,
            inside: head + nextIteration.inside,
            remainder: nextIteration.remainder,
        }
    }

    if(lvl < 1) {
        const nextIteration = parseParenthesis(tail, lvl)

        return {
            before: head + nextIteration.before,
            inside: nextIteration.inside,
            remainder: nextIteration.remainder,
        }
    }

    const nextIteration = parseParenthesis(tail, lvl)

    return {
        before: nextIteration.before,
        inside: head + nextIteration.inside,
        remainder: nextIteration.remainder,
    }
}

// console.log(parseParenthesis('there are no parenthesis here'))

// console.log(parseParenthesis('hello ((ost eq 3) or (kex lt 4)) and fisk gt 6'))

module.exports = parseParenthesis