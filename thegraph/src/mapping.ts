import {
  MeetupCreated as MeetupCreatedEvent,
  MeetupRSVPee as MeetupRSVPeeEvent
} from "../generated/Contract/Contract"
import { Meetup, Attendee, Location } from "../generated/schema"
import { log, ipfs, json, JSONValue, Bytes, Value, TypedMap } from "@graphprotocol/graph-ts"

declare const JSON;

export function handleMeetupCreated(event: MeetupCreatedEvent): void {
  let entity = new Meetup(
    event.params.url
  )
  entity.url = event.params.url
  entity.cid = event.params.cid
  entity.attendees = new Array<string>();
 
  //ipfs.mapJSON(event.params.cid.toString(), "handleIPFS", Value.fromString(entity.url));

  entity.save()
}

export function handleIPFS(value: JSONValue, url: Value): void {
  let obj = value.toObject()
  log.warning('GGGG', [JSON.stringify(obj)]);
  log.warning('DEBUG', [url.toString()])
  let meetup = Meetup.load(url.toString())

  //let loc = new Location(
  //  url+"---"+ meetup.location
  //)
  //loc.lat = obj.get("location.geo.latitude").toString()
  //loc.long = obj.get("location.geo.longitude").toString()
  //loc.save()

  //meetup.title = obj.get("title").toString()
  //meetup.start = obj.get("title").toString()
  //meetup.ends = obj.get("image").toString()
  //meetup.location = loc.id
  meetup.save()
}
function getIpfsData(hash: string): TypedMap<string, JSONValue> | null {
  let data: TypedMap<string, JSONValue>
  if (hash != null && hash.length > 0) {
    let dataBytes: Bytes = (ipfs.cat(hash)) as Bytes
    if (dataBytes != null && dataBytes.toString().length > 0) {
      log.warning('DEBUG IPFS {}', [dataBytes.toString()])
      data = json.fromBytes(dataBytes).toObject();
      // log.warning('DEBUG IPFS RS {}', [json.toString()])
      //data = _json.toObject()
    } else {
      log.warning('DEBUG IPFS SKIPPING {}', [hash])
    }
  }
  return data;
}

export function handleMeetupRSVPee(event: MeetupRSVPeeEvent): void {
  let meetup = Meetup.load(event.params.url)
  let entity = new Attendee(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.address = event.params.attendee
  entity.timestamp = event.block.timestamp.toString()
  entity.save();

  var attds = meetup.attendees;

  attds.push(entity.id);
  meetup.attendees = attds;
  meetup.save()
}
