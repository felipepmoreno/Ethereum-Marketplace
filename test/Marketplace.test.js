const assert = require("assert")

const Marketplace = artifacts.require('./Marketplace.sol')

contract('Marketplace', ([deployer, seller, buyer]) => { 
    /*
    Acima, endereços das carteiras injetadas pelo ganache em sequencia, a partir do workspace
    criado para o projeto. Neste caso, temos que deployer (eu), seller e buyer são, respectivamente:
    
    0xd841B2f298b082B8198293B255024B12E32c714d
    BALANCE
    99.89 ETH
    TX COUNT
    45
    INDEX
    0

    0x920FeA97670f7Bf5634BEE121eA8945b715568D4
    BALANCE
    100.00 ETH
    TX COUNT
    0
    INDEX
    1

    0x766e932Ad1Da8CFFB370B504d987ed35DdDe49E9
    BALANCE
    100.00 ETH
    */
    let marketplace

    before(async()=>{
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async() => {
        it('deploys succesfully', async()=>{
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async()=>{
            const name = await marketplace.name()
            assert.equal(name, 'Marketplace')
        })
    })

    describe('products', async() => {
        let result, productCount
        

        before(async()=>{
            result = await marketplace.CreateProduct('Iphone X', web3.utils.toWei('1', 'ether'), {from: seller})
            /*
            O que esta entre {} é o metadado que indica para a função CreateProduct no contrato que o 
            msg.sender é o endereço da carteira do seller
            
            */
            productCount = await marketplace.productCount()
        })

        it('creates products', async() => {
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Iphone X', 'name is correct')
            assert.equal(event.price, web3.utils.toWei('1', 'ether'), 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.purchased, false, 'purchased is correct')
        })
    })  
})