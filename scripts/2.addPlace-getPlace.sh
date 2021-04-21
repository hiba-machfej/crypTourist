#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to call addPlace() on the contract'
echo near call \$CONTRACT addPlace '{"name":"Galata Tower", "description":"abc","image":"abc","max_radius":4 }' --account_id \$OWNER
echo
echo \$CONTRACT is $CONTRACT
echo
# near call $CONTRACT say '{"message":"'$1'", "anonymous": true}' --account_id $SPEAKER --amount $2
near call $CONTRACT addPlace '{"name":"Galata Tower", "description":"abc","image":"abc","max_radius":4 }' --accountId $OWNER


echo
echo 'About to call getPlaces() on the contract'
echo near call \$CONTRACT getPlaces --account_id \$OWNER
echo


 near call $CONTRACT getPlaces --accountId $OWNER


 near call $CONTRACT findPlace '{"placeId":0}' --accountId $OWNER