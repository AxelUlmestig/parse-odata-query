const parse = require('./parse')
const assert = require('assert')

describe('construct SQL queries', () => {
    describe('no query', () => {
        it('empty string', () => {
            const options = {}
            const tableName = 'Users'
            const params = ''
            const expected = `SELECT * FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('empty object', () => {
            const options = {}
            const tableName = 'Users'
            const params = {}
            const expected = `SELECT * FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
    })

    describe('top', () => {
        it('top 3, string', () => {
            const options = {}
            const tableName = 'Users'
            const params = '?$top=3'
            const expected = `SELECT TOP 3 * FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('top 3, object', () => {
            const options = {}
            const tableName = 'Users'
            const params = {'$top': 3}
            const expected = `SELECT TOP 3 * FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
    })

    describe('select', () => {
        it('select 1 property, string', () => {
            const options = {}
            const tableName = 'Users'
            const params = '?$select=Id'
            const expected = `SELECT [Id] FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('select 1 property, object', () => {
            const options = {}
            const tableName = 'Users'
            const params = {'$select': 'Id'}
            const expected = `SELECT [Id] FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('select 3 properties, string', () => {
            const options = {}
            const tableName = 'Users'
            const params = '?$select=Id, Name, Age'
            const expected = `SELECT [Id], [Name], [Age] FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('select 3 properties, object', () => {
            const options = {}
            const tableName = 'Users'
            const params = {'$select': 'Id, Name, Age'}
            const expected = `SELECT [Id], [Name], [Age] FROM [${tableName}]`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
    })

    describe('order by', () => {
        it('order by, string', () => {
            const options = {}
            const tableName = 'Users'
            const params = '?$orderby=Id ASC, Name desC, Age'
            const expected = `SELECT * FROM [${tableName}] ORDER BY [Id] ASC, [Name] DESC, [Age] ASC`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('order by, object', () => {
            const options = {}
            const tableName = 'Users'
            const params = {'$orderby': 'Id ASC, Name desC, Age'}
            const expected = `SELECT * FROM [${tableName}] ORDER BY [Id] ASC, [Name] DESC, [Age] ASC`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
    })

    it('schema', () => {
        const options = {
            schema: 'DW'
        }
        const tableName = 'Users'
        const params = ''
        const expected = `SELECT * FROM [${options.schema}].[${tableName}]`

        const output = parse(tableName, options, params)

        assert.equal(output, expected)

    })
})
