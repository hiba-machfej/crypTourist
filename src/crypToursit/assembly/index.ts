import { Place, places, PlaceName } from './models';
import { u128, Context } from 'near-sdk-as';

export function addPlace(
  name: PlaceName,
  description: string,
  image: string, price: u128,
  // geolocation: Geolocation,
  max_radius: u16,
  max_owners: u32): void {

  const place = new Place(name,
    description,
    image,
    price,
    // geolocation,
    max_radius,
    max_owners)

  places.push(place);
}

