import * as contentful from "contentful";
import testEvents from "./testEvents.js"

let defaultImageUrl = ""

const client = contentful.createClient({
  space: CONFIG_CONTENTFUL_SPACE_ID,
  accessToken: CONFIG_CONTENTFUL_KEY,
  environment: CONFIG_CONTENTFUL_ENVIRONMENT,
});



function getassetFieldUrl(assetField) {
  return "https:" + assetField.fields.file.url;
}

async function getDefaultImageURL() {
  if (defaultImageUrl) {
    return defaultImageUrl;
  }
  const response = await client.getAsset(CONFIG_CONTENTFUL_DEFAULT_EVENT_IMG_ID);
  return getassetFieldUrl(response)
}

function getAssetFromAssetList(assetField, assets) {
  const assetId = assetField.sys.id;
  const asset = assets.find((asset) => asset.sys.id === assetId);
  return asset ? getassetFieldUrl(asset) : "";
}

async function getShows() {

  console.log("getShows")
  // if (DSS_MODE !== "production") {
  //   return testEvents;
  // }
  console.log("get actual events")
  const events = client
    .getEntries({
      content_type: "event",
      order: "-fields.startDateTime",
      //   limit: 20,
    })

  const fallbackImgUrl = getDefaultImageURL();


  const [eventsResponse, fallbackImgUrlResponse] = await Promise.all([events, fallbackImgUrl])
    .catch((error) => {
      throw error;
    });

  return mapEventsToShows(eventsResponse.items,
    eventsResponse.includes.Asset,
    fallbackImgUrlResponse
  );
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
export { getShows };