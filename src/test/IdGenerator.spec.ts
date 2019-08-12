import * as chai from 'chai'
import * as spies from 'chai-spies'

import { IdGenerator } from '../app'


chai.use(spies)
const expect = chai.expect

describe('IdGenerator', () => {
    describe('nextBigInt', () => {
        it('Should return bigint type', () => {
            const idGen = new IdGenerator()
            const result = idGen.nextBigInt()
            console.log(result)
            expect(typeof result).equal('bigint')
        })

        it('Should generate different numbers on each call', () => {
            const idGen = new IdGenerator()
            expect(idGen.nextBigInt()).not.to.equal(idGen.nextBigInt())
        })
    }) // END describe 'nextBigInt'

    describe('nextShortId', () => {
        it('Should return a string', () => {
            const idGen = new IdGenerator({ worker: 2 })
            const result = idGen.nextShortId()
            console.log(result)
            expect(result).not.to.be.string
            expect(result.length >= 7 && result.length <= 14).to.be.true
        })

        it('Should generate different numbers on each call', () => {
            const idGen = new IdGenerator({ worker: 2 })
            expect(idGen.nextShortId()).not.to.equal(idGen.nextShortId())
        })
    }) // END describe 'nextShortId'

    describe('nextUuidv4', () => {
        it('Should return a string', () => {
            const idGen = new IdGenerator()
            const result = idGen.nextUuidv4() // b34c842e-7eca-4504-9999-c7ac3523649c
            console.log(result)
            expect(result).to.be.string
            // UUID v4 should have 37 characters in length
            expect(result.length).to.equal(36)
            // UUID v4 should have third part starting with "4"
            expect(result.split('-')[2].charAt(0)).to.equal('4')
        })

        it('Should generate different numbers on each call', () => {
            const idGen = new IdGenerator()
            expect(idGen.nextUuidv4()).not.to.equal(idGen.nextUuidv4())
        })
    }) // END describe 'nextUuidv4'

    describe('wrapBigInt', () => {
        it('Should call next() internally if no argument is given.', () => {
            // Arrange
            const idGen = new IdGenerator(),
                nextSpy = chai.spy.on(idGen, 'nextBigInt')

            // Act
            idGen.wrapBigInt()

            // Assert
            expect(nextSpy).to.be.called.once
        })

        it('Should wrap a numeric string.', () => {
            // Arrange
            const idGen = new IdGenerator(),
                input = '12345'

            // Act
            const bigId = idGen.wrapBigInt(input)

            // Assert
            expect(typeof bigId).to.equal('bigint')
            expect(bigId).to.equal(BigInt(input))
        })

        it('Should wrap a Buffer.', () => {
            // Arrange
            const idGen = new IdGenerator()
            const buf = Buffer.allocUnsafe(8)
            buf.fill(0)
            buf.writeUInt8(0x5A, 0)
            buf.writeUInt8(0x6D, 1)
            buf.writeUInt8(0x1C, 2)
            buf.writeUInt8(0x38, 3)
            buf.writeUInt8(0x2C, 4)

            // Act
            const bigId = idGen.wrapBigInt(buf)

            // Assert
            expect(typeof bigId).to.equal('bigint')
            expect(bigId === BigInt('6515895263456919552')).to.be.true
        })
    }) // END describe 'wrapBigInt'
})
