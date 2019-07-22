pragma solidity ^0.5.0;

contract Cards {
    uint public voteCount = 0;

    struct details {
        string name;
        uint date;
        uint month;
        bool completed;
    }

    constructor() public {
        generateCard("nirav", 3, 8);
    }

    function generateCard(string memory _content, uint date, uint month) public {
        details(_content, date, month, false);
    }
}