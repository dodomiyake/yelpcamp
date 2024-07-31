maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 15 // starting zoom
});

new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h6>${campground.title}</h6><p>${campground.location}</p>`
            )
    )
    .addTo(map)
