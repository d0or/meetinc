import {
  MeetupCreated as MeetupCreatedEvent,
  MeetupRSVPee as MeetupRSVPeeEvent
} from "../generated/Contract/Contract"
import { Meetup, Attendee, Location } from "../generated/schema"
import { ipfs, JSONValue, Value } from "@graphprotocol/graph-ts"

export function handleMeetupCreated(event: MeetupCreatedEvent): void {
  let entity = new Meetup(
    event.params.url
  )
  entity.url = event.params.url
  entity.cid = event.params.cid
  entity.save()

  ipfs.mapJSON(event.params.cid.toString(), "handleIPFS", Value.fromString(entity.url));
}

export function handleIPFS(value: JSONValue, url: string): void {
  let obj = value.toObject()
  let meetup = Meetup.load(url)

  let loc = new Location(
    url+"---"+ meetup.location
  )
  loc.lat = obj.get("location.geo.latitude").toString()
  loc.long = obj.get("location.geo.longitude").toString()
  loc.save()

  meetup.title = obj.get("title").toString()
  meetup.start = obj.get("title").toString()
  meetup.ends = obj.get("image").toString()
  meetup.location = loc.id
  meetup.save()
}

export function handleMeetupRSVPee(event: MeetupRSVPeeEvent): void {
  let meetup = Meetup.load(event.params.url)
  let entity = new Attendee(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.address = event.params.attendee
  entity.timestamp = event.block.timestamp.toString()
  entity.save()

  meetup.attendees.push(entity.id)
  meetup.save()
}
