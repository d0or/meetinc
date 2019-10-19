pragma solidity ^0.5.8;

contract Simple {
  mapping(address => uint8) public status;

  function setStatus(uint8 state) public {
    status[msg.sender] = state;
  }

  function getStatus() public view returns (uint8 state) {
    state = status[msg.sender];
  }
}
