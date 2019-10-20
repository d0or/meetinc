pragma solidity ^0.5.8;

contract Meeting {

  /*struct EventStruct {
    address[] rsvps;
    bytes cid;

    bool isCanceled;
  }

  mapping(bytes32 => EventStruct) public events;*/

  mapping(bytes32 => uint8) public meetups;
  mapping(bytes32 => uint8) public attendees;

  event MeetupCreated(string url, bytes cid);
  event MeetupRSVPee(string url, address attendee);

  function rsvpForEvent(string memory url, bytes memory cid) public {
    bytes32 id = keccak256(abi.encode(url));

    meetups[id] = meetups[id] + 1; // useful for count and cheap existence check

    if (meetups[id] > 1) {
      // events[id].rsvps.push(msg.sender);
    } else {
      // events[id] = EventStruct(new address[](0), cid, false); // useful for detail information
      // events[id].rsvps.push(msg.sender);

      emit MeetupCreated(url, cid);
    }

    bytes32 attend = keccak256(abi.encode(url, msg.sender));
    attendees[attend] = 2; // code for attending

    emit MeetupRSVPee(url, msg.sender);
  }

  function rsvpForEvent(string memory url) public {
    bytes32 id = keccak256(abi.encode(url));
    require(meetups[id] > 0, "meetup needs to be created first");

    // events[id].rsvps.push(msg.sender);

    bytes32 attend = keccak256(abi.encode(url, msg.sender));
    attendees[attend] = 2;

    emit MeetupRSVPee(url, msg.sender);
  }

  function isAttending(string memory url) public view returns (bool attending) {
    attending = isAttending(url, msg.sender);
  }

  function isAttending(string memory url, address identity) public view returns (bool attending) {
    bytes32 attend = keccak256(abi.encode(url, identity));
    attending = attendees[attend] == 2;
  }

  /*function getAttendees(bytes32 id) public view returns (address[] memory attendants) {
    if (meetups[id] > 0) {
      attendants = events[id].rsvps;
    } else {
      attendants = new address[](0);
    }
  }*/

  /*function getAttendees(string memory url) public view returns (address[] memory attendants) {
    bytes32 id = keccak256(abi.encode(url));
    attendants = getAttendees(id);
  }*/

  function isRegistered(string memory url) public view returns (bool registered) {
    bytes32 id = keccak256(abi.encode(url));
    registered = meetups[id] > 0;
  }

  function countAttendees(string memory url) public view returns (uint users) {
    bytes32 id = keccak256(abi.encode(url));
    users = meetups[id];
  }
}
