
const firstWords = (nbr, str) => {
    const words = str.split(' ')

    const leading = words.slice(0, nbr)

    const remaining = words
        .slice(nbr)
        .reduce((w1, w2) => `${w1} ${w2}`, '')
        .substring(1)

    return  {
        leading,
        remaining,
    }
}

module.exports = firstWords