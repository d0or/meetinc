pragma solidity ^0.5.8;

contract Meeting {

  struct EventStruct {
    address[] rsvps;
    bool isRegistered;
    bool isCanceled;
  }

  mapping(bytes32 => EventStruct) public events;

  mapping(bytes32 => uint8) public meetups;
  mapping(bytes32 => uint8) public attendees;

  event MeetupCreated(string url);

  function rsvpForEvent(string memory url) public {
    bytes32 id = keccak256(abi.encode(url));

    if (events[id].isRegistered) {
      events[id].rsvps.push(msg.sender);
    } else {
      events[id] = EventStruct(new address[](0), true, false);
      events[id].rsvps.push(msg.sender);

      emit MeetupCreated(url);
    }
  }

  function getAttendees(string memory url) public view returns (address[] memory attendants) {
    bytes32 id = keccak256(abi.encode(url));

    if (events[id].isRegistered) {
      attendants = events[id].rsvps;
    } else {
      attendants = new address[](0);
    }
  }

  function isRegistered(string memory url) public view returns (bool registered) {
    bytes32 id = keccak256(abi.encode(url));

    registered = events[id].isRegistered || false;
  }
  
  function naiveAttention(string memory url) public {
    bytes32 id = keccak256(abi.encode(url));

    meetups[id] = meetups[id] + 1;

    if (meetups[id] == 1) {
      emit MeetupCreated(url);
    }

    bytes32 attend = keccak256(abi.encode(url, msg.sender));

    attendees[attend] = 2;
  }

  function doesAttend(string memory url) public view returns (bool isAttending) {
    bytes32 attend = keccak256(abi.encode(url, msg.sender));
    isAttending = attendees[attend] == 2;
  }
  
  function count(string memory url) public view returns (uint users) {
    bytes32 id = keccak256(abi.encode(url));
    users = meetups[id];
  }

}
