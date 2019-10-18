# Team-21
## Team Meeting: Taking out the Middle man for community events

At Diffusion Devcon 2019 Team Meeting builds a smart contract based solution for meetup like events. Each meetup group is a topically 
and locally focused community coming with individual rules. We therefore model each group as an individual smart contract that holds a state of 

- group creator (immutable)
- current organizer team (+ 1..n "admins" who are fully capable of changing all rules)

- group metadata
	+ - title 
	+ - tags (array:string)
	+ - home turf(s) (e.g. "coding portugal" ["Porto", "Lisboa","Coimbra", "Portimao"])
	+ 
- array:members of that group (must be "leavable")
- array:events ("instances")
	- title
	- venue information (address, WGS84 location, door title)
	- price 
	- attendees ("rsvp"s of each event)

//we could also model each *event* as an individual, rule based smart contract spawned by the group

More complex data (e.g. event descriptions, photos, logos) is to be stored on a decentralized filesystem (ipfs)

We'd like to solve the "at the door case". Every attendee should be "identifiable" at the door. We could use the ĐOor idea of it. We can also go with the FOAM protocol to safely locate a user based on their trusted beacon network. By tracing that a user can verifiably claim that he attended the event at a time and at a date.

It should be 1000% free for attendees to join an event. Gas Station Networks can help us to move the gas fees towards the meetup group organizers. Since meetup.com is charging 80€/y hosts are absolutely used to paying fees anyway.

Tickets. If an event is *not* free, you can either 
- send transaction containing the fee to a method of the group's smart contract (containing the events' index / "id")
- sell fungible tokens (coined after the group's or the event's name - using Proof of Attendance / FOAM might even get you coins you can use to pay / present for other events ;) )
- sell NFTs (each ticket is individual, which might be useful for highly controlled entrance scenarios)

Discovery. The strength of meetup.com is to find more meetup groups of your interest. To search events on chain we evaluate using TheGraph for offchain queries. We also think of deep querying the ledger to find user relations (addresses that joined this event also are members of that group)

Governance. We'd employ the DAOStack as a tool for organizers, hosts and community members to judge about a meetups' leadership. No more "the organizer of X stepped down, you want to take over for €80?" messages and hostile takeovers.

Identity. While there are SSI solutions with a claim backed trust model, if we need it, I'd shoot for 3box which is simply returning a token that's bound to a more or less socially upheated profile.
