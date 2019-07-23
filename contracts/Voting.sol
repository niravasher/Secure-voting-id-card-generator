pragma solidity ^0.5.0;

contract Cards {
    uint public voteCount = 0;

    struct Detail {
        string firstName;
        string fathersName;
        string lastName;
        string gender;
        date _date;
        string address;
    }

    Detail[] public details;

    constructor() public {
        generateCard("nirav", 3, 8);
    }

    function generateCard(string memory _content, uint date, uint month) public {
        details[voteCount] = Detail(_content, date, month, false);
    }
}