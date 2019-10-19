pragma solidity ^0.5.0;

contract Meeting {

  struct EventStruct {
    address[] rsvps;
    bool isRegistered;
  }

  mapping(bytes32 => EventStruct) public events;

  event MeetupCreated(string url);

  function rsvpForEvent(string memory url) public {
    bytes32 id = keccak256(abi.encode(url));

    if (events[id].isRegistered) {
      events[id].rsvps.push(msg.sender);
    } else {
      events[id] = EventStruct(new address[](0), true);
      events[id].rsvps.push(msg.sender);

      emit MeetupCreated(url);
    }
  }
}
