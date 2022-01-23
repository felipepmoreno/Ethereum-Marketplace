pragma solidity >=0.4.21;

//https://youtu.be/VH9Q2lf2mNo?t=2940

contract Marketplace {
    string public name;
    uint public productCount = 0;//we're using this to know how many products are in the blockchain
    mapping(uint => Product) products; //key value relationship (hash). Declaring more than a single product


    struct Product{
        uint id; //uint = always +
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    constructor() public{
        name = "Marketplace";
    }

    function CreateProduct(string memory _name, uint _price) public{
        productCount++;
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
    }
}