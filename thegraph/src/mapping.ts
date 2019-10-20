import {
  MeetupCreated as MeetupCreatedEvent,
  MeetupRSVPee as MeetupRSVPeeEvent
} from "../generated/Contract/Contract"
import { Meetup, Attendee } from "../generated/schema"

export function handleMeetupCreated(event: MeetupCreatedEvent): void {
  let entity = new Meetup(
    event.params.url
  )
  entity.url = event.params.url
  entity.cid = event.params.cid
  entity.save()
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
