// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    uint public value;

    function setValue(uint _value) public {
        value = _value;
    }

    function increment(uint amount) public {
        value += amount;
    }

    function decrement(uint amount) public {
        require(value >= amount, "Value must be greater than or equal to amount");
        value -= amount;
    }

    function reset() public {
        value = 0;
    }

    // Optional fallback function
    fallback() external payable {
        // Handle unexpected calls
    }
}
