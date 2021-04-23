import { context, u128, PersistentVector } from 'near-sdk-as';

type AccountId = string;
type PlaceId = u32; // index in places Vector
export type PlaceName = string;
const MAX_PLACES = 10;
// export type Geolocation = number

@nearBindgen
export class Place {
	owner: string;
	private id: PlaceId;
	constructor(
		public name: PlaceName,
		public description: string,
		public image: string,
		public max_radius: u16,
		public price: u128 = u128.One,
		// public geolocation: Geolocation,
		public max_owners: u32 = 10,
		public total_owners: u32 = 0
	) {
		this.owner = context.sender;
	}

	static all(): Place[] {
		const numPlaces = min(MAX_PLACES, places.length);
		const startIndex = places.length - numPlaces;
		const result = new Array<Place>(numPlaces);
		for (let i = 0; i < numPlaces; i++) {
			result[i] = places[i + startIndex];
		}
		return result;
	}

	static find(placeId: PlaceId): Place {
		// assert(placeId >= 0, 'Place ID must be >= 0');
		// assert(placeId < places.length, 'Place ID must be valid');  // ERROR TS2365: Operator '<' cannot be applied to types 'u32' and 'i32'.
		const place = places[placeId];
		place.id = placeId;
		return place;
	}

	save(): void {
		places[this.id] = this;
	}
}

export const places = new PersistentVector<Place>('p');
