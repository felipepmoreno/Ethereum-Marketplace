pragma solidity >0.4.21;

//https://youtu.be/VH9Q2lf2mNo?t=2940

contract Marketplace {
    string public name;
    uint public productCount = 0;//we're using this to know how many products are in the blockchain
    mapping(uint => Product) products; //key value relationship (hash). Declaring more than a single product


    struct Product{
        uint id; //uint = always positive
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    event ProductCreated(
        uint id, 
        string name,
        uint price,
        address owner,
        bool purchased
    );

    constructor() public{
        name = "Marketplace";
    }

    function CreateProduct(string memory _name, uint _price) public{
        /*Note: variables with _ in front of them means that they are local variables*/

        //require a name (need to transform into bytes since solidity doesnt support string length)
        require(bytes(name).length > 0); //se não for válido, para de executar a função e joga uma exceção
        //require a valid price
        require(_price > 0);
        //increment product count
        productCount++;
        //create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        //trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}