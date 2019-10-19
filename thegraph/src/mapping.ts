import { MeetupCreated as MeetupCreatedEvent } from "../generated/Contract/Contract"
import { MeetupCreated } from "../generated/schema"

export function handleMeetupCreated(event: MeetupCreatedEvent): void {
  let entity = new MeetupCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.url = event.params.url
  entity.save()
}
