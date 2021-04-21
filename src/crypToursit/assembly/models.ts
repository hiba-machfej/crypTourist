import { context, u128, PersistentVector } from 'near-sdk-as';

type AccountId = string
type PlaceId = u32 // index in places Vector
type PlaceName = string

@nearBindgen
export class Place {
  owner: string;
  constructor(
    public name: PlaceName,
    public description: string,
    public image: string,
    public price: u128,
    // public geolocation: Geolocation,
    public max_radius: u16,
    public max_owners: u32 = 10,
    public total_owners: u32 = 10
  ) {
    this.owner = context.sender;
  }
}