
function getassetFieldUrl(assetField) {
    return "https:" + assetField.fields.file.url;
}

function getAssetFromAssetList(assetField, assets) {
    const assetId = assetField.sys.id;
    const asset = assets.find((asset) => asset.sys.id === assetId);
    return asset ? getassetFieldUrl(asset) : "";
}

function mapEventsToShows(events, assets, defaultAssetUrl = defaultImageUrl) {
    const defaultEventLink = "https://www.instagram.com/desertskystrings";
    return events.map((entry) => {
        return {
            title: entry.fields.title ?? "",
            startDateTime: entry.fields.startDateTime ?? "",
            endDateTime: entry.fields.endDateTime ?? "",
            locationName: entry.fields.locationName ?? "",
            locationCity: entry.fields.locationCity ?? "",
            locationState: entry.fields.locationState ?? "",
            imageUrl: entry.fields.image ?
                getAssetFromAssetList(entry.fields.image, assets) :
                defaultAssetUrl,
            link: entry.fields.link ?? defaultEventLink,
            description: entry.fields.description ?? "",
            ticketPrice: entry.fields.ticketPrice ?? ""
        };
    });
}

function mapOrgInfo(orgInfo) {
    return {
        about: orgInfo.fields.about,
        mission: orgInfo.fields.mission,
        vision: orgInfo.fields.vision,
        bookingDescription: orgInfo.fields.bookingDescription,
        joinDescription: orgInfo.fields.joinDescription,
        howToHelp: orgInfo.fields.howToHelp,

    };
}

export {
    mapEventsToShows,
    getassetFieldUrl,
    mapOrgInfo
}