import { context, u128, PersistentVector } from 'near-sdk-as';

type AccountId = string
type PlaceId = u32 // index in places Vector
export type PlaceName = string
// export type Geolocation = number

@nearBindgen
export class Place {
  owner: string;
  constructor(
    public name: PlaceName,
    public description: string,
    public image: string,
    public max_radius: u16,
    public price: u128 = u128.Zero,
    // public geolocation: Geolocation,
    public max_owners: u32 = 10,
    public total_owners: u32 = 10
  ) {
    this.owner = context.sender;
  }

  static find(placeId: PlaceId): Place {

    assert(placeId >= 0, "Place ID must be >= 0")
    assert(placeId < places.length, "Place ID must be valid")

    return places[placeId]
  }
}

export const places = new PersistentVector<Place>('p');