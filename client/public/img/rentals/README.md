# Rental product images

Product photos for the `/rentals` catalogue. Referenced from
`client/src/pages/Rentals.tsx`. Served at `/img/rentals/<file>`.

## In use — `55" LED 4K UHD Smart Fire TV` (item id: `fire-tv-55`)

| file                 | shot        | status |
|----------------------|-------------|--------|
| `fire-tv-55-1.png`   | product     | ✅ added |
| `fire-tv-55-2.png`   | voice remote| ✅ added |

Add more angles as `fire-tv-55-3.png`, `-4.png`, … and list them in the item's
`images` array.

## Future items

When gaming PCs / laptops / monitors go back in the catalogue, drop their photos
here and reference them from the new item objects. Any missing image renders a
"Photo coming soon" placeholder, so the page never breaks.
