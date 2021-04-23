import { Place, places, PlaceName } from './models';
import { u128, Context, logging } from 'near-sdk-as';

export function addPlace(
	name: PlaceName,
	description: string,
	image: string,
	// geolocation: Geolocation,
	max_radius: u16
): void {
	const place = new Place(
		name,
		description,
		image,
		// geolocation,
		max_radius
	);

	places.push(place);
}

export function changePlaceName(placeId: u32, placeName: PlaceName): void {
	assert(placeId >= 0, 'Place ID must be >= 0');
	const place = Place.find(placeId);
	logging.log(place.name);
	place.name = placeName;
	logging.log(place.name);
	place.save();
}

export function changeMaxRadius(placeId: u32, max_radius: u16): void {
	assert(placeId >= 0, 'Place ID must be >= 0');
	const place = Place.find(placeId);
	logging.log(place.max_radius);
	place.max_radius = max_radius;
	logging.log(place.max_radius);
	place.save();
}

export function getPlaces(): Place[] {
	return Place.all();
}
export function findPlace(placeId: u32): Place {
	return Place.find(placeId);
}
// "name":"Galata Tower", "description":"abc","image":"abc","price":3,"max_radius":4

// near call addPlace '{"name":"Galata Tower", "description":"abc","image":"abc","price":3,"max_radius":4 }' --accountId

// near call $CONTRACT addPlace '{"name":"Galata Tower", "description":"abc","image":"abc","max_radius":4 }' --accountId hiba.testnet
