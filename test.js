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

    describe('where', () => {
        it('Id = 3, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Id eq 3'
            const expected = `SELECT * FROM [${tableName}] WHERE [Id] = 3`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Id eq null, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Id eq null'
            const expected = `SELECT * FROM [${tableName}] WHERE [Id] IS NULL`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Id eq NullValue, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Id eq NullValue'
            const expected = `SELECT * FROM [${tableName}] WHERE [Id] IS NULL`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Boolean eq true, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Boolean eq true'
            const expected = `SELECT * FROM [${tableName}] WHERE [Boolean] = 1`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Boolean eq false, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Boolean eq false'
            const expected = `SELECT * FROM [${tableName}] WHERE [Boolean] = 0`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Integer lt -45, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Integer lt -45'
            const expected = `SELECT * FROM [${tableName}] WHERE [Integer] < -45`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Deci eq 12.34, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Deci eq 12.34'
            const expected = `SELECT * FROM [${tableName}] WHERE [Deci] = 12.34`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Str eq \'hello world\', string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Str eq \'hello world\''
            const expected = `SELECT * FROM [${tableName}] WHERE [Str] = 'hello world'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Born eq \'2013-11-25\', string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Born eq \'2013-11-25\''
            const expected = `SELECT * FROM [${tableName}] WHERE [Born] = '2013-11-25'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Id eq d4819c54-3006-41ca-a92f-9e4497c56e09, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Id eq d4819c54-3006-41ca-a92f-9e4497c56e09'
            const expected = `SELECT * FROM [${tableName}] WHERE [Id] = 'd4819c54-3006-41ca-a92f-9e4497c56e09'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('Age ne 7, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Age ne 7'
            const expected = `SELECT * FROM [${tableName}] WHERE [Age] <> 7`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
        
        it('Age gt 23, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Age gt 23'
            const expected = `SELECT * FROM [${tableName}] WHERE [Age] > 23`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
        
        it('Age ge 23, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Age ge 23'
            const expected = `SELECT * FROM [${tableName}] WHERE [Age] >= 23`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
        
        it('Age lt 23, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Age lt 23'
            const expected = `SELECT * FROM [${tableName}] WHERE [Age] < 23`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })
        
        it('Age le 23, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=Age le 23'
            const expected = `SELECT * FROM [${tableName}] WHERE [Age] <= 23`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('contains(Name, \'Max\'), string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=contains(Name, \'Max\')'
            const expected = `SELECT * FROM [${tableName}] WHERE [Name] LIKE '%Max%'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('endswith(Name, \'Max\'), string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=endswith(Name, \'Max\')'
            const expected = `SELECT * FROM [${tableName}] WHERE [Name] LIKE '%Max'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('startswith(Name, \'Max\'), string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=startswith(Name, \'Max\')'
            const expected = `SELECT * FROM [${tableName}] WHERE [Name] LIKE 'Max%'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('length(Name) eq 7, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=length(Name) eq 7'
            const expected = `SELECT * FROM [${tableName}] WHERE LEN([Name]) = 7`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('tolower(Name) eq \'ost\', string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=tolower(Name) eq \'ost\''
            const expected = `SELECT * FROM [${tableName}] WHERE LCASE([Name]) = 'ost'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('toupper(Name) eq \'OST\', string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=toupper(Name) eq \'OST\''
            const expected = `SELECT * FROM [${tableName}] WHERE UCASE([Name]) = 'OST'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('trim(Name) eq \'OST\', string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=trim(Name) eq \'OST\''
            const expected = `SELECT * FROM [${tableName}] WHERE TRIM(' ' FROM [Name]) = 'OST'`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('A eq year(2016-01-01T13:00Z), string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=A eq year(2016-01-01T13:00Z)'
            const expected = `SELECT * FROM [${tableName}] WHERE [A] = YEAR('2016-01-01 13:00')`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('A eq year(now()), string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=A eq year(now())'
            const expected = `SELECT * FROM [${tableName}] WHERE [A] = YEAR(NOW())`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('round(A) eq 34, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=round(A) eq 34'
            const expected = `SELECT * FROM [${tableName}] WHERE ROUND([A]) = 34`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('floor(A) eq 34, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=floor(A) eq 34'
            const expected = `SELECT * FROM [${tableName}] WHERE FLOOR([A]) = 34`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('ceiling(A) eq 34, string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=ceiling(A) eq 34'
            const expected = `SELECT * FROM [${tableName}] WHERE CEILING([A]) = 34`

            const output = parse(tableName, options, params)

            assert.equal(output, expected)
        })

        it('(A eq 2) or (ceiling(B) lt 4) and ((E gt 5) or (E lt -1)), string', () => {
            const options = {}
            const tableName = 'Fishes'
            const params = '?$filter=(A eq 2) or (ceiling(B) lt 4) and ((E gt 5) or (E lt -1))'
            const expected = `SELECT * FROM [${tableName}] WHERE ([A] = 2) OR (CEILING([B]) < 4) AND (([E] > 5) OR ([E] < -1))`

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
