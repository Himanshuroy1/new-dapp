// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    string public message;
    uint256 public value;

    // Constructor to set initial values
    constructor(string memory _message, uint256 _value) {
        message = _message;
        value = _value;
    }

    // Function to update the message
    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
    }

    // Function to update the value
    function updateValue(uint256 _newValue) public {
        value = _newValue;
    }

    // Function to retrieve the value
    function retrieveValue() public view returns (uint256) {
        return value;
    }

    // Function to retrieve the message
    function retrieveMessage() public view returns (string memory) {
        return message;
    }

    // Function to reset the message to a default value
    function clearMessage() public {
        message = "";  // Default message
    }

    // Function to reset the value to 0
    function resetValue() public {
        value = 0;  // Reset value to 0
    }

    // Optional fallback function
    fallback() external payable {
        // Handle unexpected calls
    }
}
