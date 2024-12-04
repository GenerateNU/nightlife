import requests
import json
import time

# Constants
API_URL = "https://places.googleapis.com/v1/places:searchNearby"
API_KEY = ""  # Replace with your valid API key
RADIUS = 50000  # 30 miles in meters
MAX_RESULTS_PER_REQUEST = 500  # Limit for results per API call

# State centroids for fetching data
STATE_COORDINATES = {
    "Alabama": (32.806671, -86.791130),
    "Alaska": (61.370716, -152.404419),
    "Arizona": (33.729759, -111.431221),
    "Arkansas": (34.969704, -92.373123),
    "California": (36.116203, -119.681564),
    "Colorado": (39.059811, -105.311104),
    "Connecticut": (41.597782, -72.755371),
    "Delaware": (39.318523, -75.507141),
    "Florida": (27.766279, -81.686783),
    "Georgia": (33.040619, -83.643074),
    "Hawaii": (21.094318, -157.498337),
    "Idaho": (44.240459, -114.478828),
    "Illinois": (40.349457, -88.986137),
    "Indiana": (39.849426, -86.258278),
    "Iowa": (42.011539, -93.210526),
    "Kansas": (38.526600, -96.726486),
    "Kentucky": (37.668140, -84.670067),
    "Louisiana": (31.169546, -91.867805),
    "Maine": (44.693947, -69.381927),
    "Maryland": (39.063946, -76.802101),
    "Massachusetts": (42.230171, -71.530106),
    "Michigan": (43.326618, -84.536095),
    "Minnesota": (45.694454, -93.900192),
    "Mississippi": (32.741646, -89.678696),
    "Missouri": (38.456085, -92.288368),
    "Montana": (46.921925, -110.454353),
    "Nebraska": (41.125370, -98.268082),
    "Nevada": (38.313515, -117.055374),
    "New Hampshire": (43.452492, -71.563896),
    "New Jersey": (40.298904, -74.521011),
    "New Mexico": (34.840515, -106.248482),
    "New York": (42.165726, -74.948051),
    "North Carolina": (35.630066, -79.806419),
    "North Dakota": (47.528912, -99.784012),
    "Ohio": (40.388783, -82.764915),
    "Oklahoma": (35.565342, -96.928917),
    "Oregon": (44.572021, -122.070938),
    "Pennsylvania": (40.590752, -77.209755),
    "Rhode Island": (41.680893, -71.511780),
    "South Carolina": (33.856892, -80.945007),
    "South Dakota": (44.299782, -99.438828),
    "Tennessee": (35.747845, -86.692345),
    "Texas": (31.054487, -97.563461),
    "Utah": (40.150032, -111.862434),
    "Vermont": (44.045876, -72.710686),
    "Virginia": (37.769337, -78.169968),
    "Washington": (47.400902, -121.490494),
    "West Virginia": (38.491226, -80.954456),
    "Wisconsin": (44.268543, -89.616508),
    "Wyoming": (42.755966, -107.302490),
    "Birmingham": (33.5186, -86.8104),
    "Montgomery": (32.3792, -86.3077),
    "Mobile": (30.6954, -88.0399),
    "Huntsville": (34.7304, -86.5861),
    "Tuscaloosa": (33.2098, -87.5692),
    "Anchorage": (61.2181, -149.9003),
    "Fairbanks": (64.8378, -147.7164),
    "Juneau": (58.3019, -134.4197),
    "Sitka": (57.0531, -135.3300),
    "Ketchikan": (55.3422, -131.6461),
    "Phoenix": (33.4484, -112.0740),
    "Tucson":(32.2226, -110.9747),
    "Mesa": (33.4152, -111.8315),
    "Chandler": (33.3062, -111.8413),
    "Scottsdale": (33.4942, -111.9261),
    "Little Rock": (34.7465, -92.2896),
    "Fort Smith": (35.3859, -94.3985),
    "Fayetteville": (36.0822, -94.1719),
    "Springdale": (36.1867, -94.1288),
    "Jonesboro": (35.8423, -90.7043),
    "Los Angeles": (34.0522, -118.2437),
    "San Diego": (32.7157, -117.1611),
    "San Jose": (37.3382, -121.8863),
    "San Francisco": (37.7749, -122.4194),
    "Fresno": (36.7378, -119.7871),
    "Denver": (39.7392, -104.9903),
    "Colorado Springs": (38.8339, -104.8214),
    "Aurora": (39.7294, -104.8319),
    "Fort Collins": (40.5853, -105.0844),
    "Lakewood": (39.7047, -105.0814),
    "Bridgeport": (41.1865, -73.1952),
    "New Haven": (41.3083, -72.9279),
    "Stamford": (41.0534, -73.5387),
    "Hartford": (41.7658, -72.6734),
    "Waterbury": (41.5582, -73.0515),
    "Wilmington": (39.7391, -75.5398),
    "Dover": (39.1582, -75.5244),
    "Newark": (39.6837, -75.7497),
    "Middletown": (39.4496, -75.7163),
    "Smyrna": (39.2998, -75.6044),
    "Jacksonville": (30.3322, -81.6557),
    "Miami": (25.7617, -80.1918),
    "Tampa": (27.9506, -82.4572),
    "Orlando": (28.5383, -81.3792),
    "St. Petersburg": (27.7676, -82.6403),
    "Atlanta": (33.7490, -84.3880),
    "Augusta": (33.4735, -82.0105),
    "Columbus": (32.4609, -84.9877),
    "Macon": (32.8407, -83.6324),
    "Savannah": (32.0809, -81.0912),
    "Honolulu": (21.3069, -157.8583),
    "East Honolulu": (21.2740, -157.7003),
    "Pearl City": (21.3972, -157.9752),
    "Hilo": (19.7071, -155.0810),
    "Kailua": (21.4022, -157.7394),
    "Boise": (43.6150, -116.2023),
    "Meridian": (43.6121, -116.3915),
    "Nampa": (43.5407, -116.5635),
    "Idaho Falls": (43.4917, -112.0339),
    "Pocatello": (42.8713, -112.4455),
    "Chicago": (41.8781, -87.6298),
    "Aurora": (41.7606, -88.3201),
    "Naperville": (41.7508, -88.1535),
    "Joliet": (41.5250, -88.0817),
    "Rockford": (42.2711, -89.0937),
    "Indianapolis": (39.7684, -86.1581),
    "Fort Wayne": (41.0793, -85.1394),
    "Evansville": (37.9716, -87.5711),
    "South Bend": (41.6764, -86.2520),
    "Carmel": (39.9784, -86.1180),
    "Des Moines": (41.5868, -93.6250),
    "Cedar Rapids": (41.9779, -91.6656),
    "Davenport": (41.5236, -90.5776),
    "Sioux City": (42.4990, -96.4003),
    "Iowa City": (41.6611, -91.5302),
    "Kansas": (38.5266, -96.7265),
    "Topeka": (39.0486, -95.6771),
    "Overland Park": (38.9822, -94.6708),
    "Olathe": (38.8814, -94.8191),
    "Wichita": (37.6872, -97.3301),
    "Lawrence": (38.9717, -95.2353),

    "Kentucky": (37.6681, -84.6701),
    "Louisville": (38.2527, -85.7585),
    "Lexington": (38.0406, -84.5037),
    "Bowling Green": (36.9685, -86.4808),
    "Owensboro": (37.7742, -87.1133),
    "Covington": (39.0837, -84.5086),

    "Louisiana": (31.1695, -91.8678),
    "New Orleans": (29.9511, -90.0715),
    "Baton Rouge": (30.4515, -91.1871),
    "Shreveport": (32.5252, -93.7502),
    "Lafayette": (30.2241, -92.0198),
    "Lake Charles": (30.2266, -93.2174),

    "Maine": (44.6939, -69.3819),
    "Portland": (43.6591, -70.2568),
    "Bangor": (44.8012, -68.7778),
    "Augusta": (44.3106, -69.7795),
    "Scarborough": (43.5788, -70.3210),
    "South Portland": (43.6415, -70.2409),

    "Maryland": (39.0639, -76.8021),
    "Baltimore": (39.2904, -76.6122),
    "Frederick": (39.4143, -77.4105),
    "Rockville": (39.0837, -77.1528),
    "Gaithersburg": (39.1434, -77.2014),
    "Bowie": (39.0068, -76.7791),

    "Massachusetts": (42.2301, -71.5301),
    "Boston": (42.3601, -71.0589),
    "Worcester": (42.2626, -71.8023),
    "Springfield": (42.1015, -72.5898),
    "Cambridge": (42.3736, -71.1097),
    "Lowell": (42.6334, -71.3162),

    "Michigan": (43.3266, -84.5361),
    "Detroit": (42.3314, -83.0458),
    "Grand Rapids": (42.9634, -85.6681),
    "Warren": (42.5145, -83.0147),
    "Sterling Heights": (42.5803, -83.0302),
    "Ann Arbor": (42.2808, -83.7430),

    "Minnesota": (45.6945, -93.9002),
    "Minneapolis": (44.9778, -93.2650),
    "Saint Paul": (44.9537, -93.0900),
    "Rochester": (44.0121, -92.4802),
    "Duluth": (46.7867, -92.1005),
    "Bloomington": (44.8408, -93.2983),

    "Mississippi": (32.7416, -89.6786),
    "Jackson": (32.2988, -90.1848),
    "Gulfport": (30.3674, -89.0928),
    "Southaven": (34.9880, -90.0126),
    "Hattiesburg": (31.3271, -89.2903),
    "Biloxi": (30.3960, -88.8853),

    "Missouri": (38.4560, -92.2883),
    "Kansas City": (39.0997, -94.5786),
    "Saint Louis": (38.6270, -90.1994),
    "Springfield": (37.2089, -93.2923),
    "Independence": (39.0911, -94.4155),
    "Columbia": (38.9517, -92.3341),

    "Montana": (46.9219, -110.4544),
    "Billings": (45.7833, -108.5007),
    "Missoula": (46.8721, -113.9940),
    "Great Falls": (47.5052, -111.3008),
    "Bozeman": (45.6770, -111.0429),
    "Butte": (46.0038, -112.5348),

    "Nebraska": (41.1253, -98.2681),
    "Omaha": (41.2565, -95.9345),
    "Lincoln": (40.8136, -96.7026),
    "Bellevue": (41.1367, -95.8908),
    "Grand Island": (40.9264, -98.3420),
    "Kearney": (40.6992, -99.0815),

    "Nevada": (38.3135, -117.0553),
    "Las Vegas": (36.1699, -115.1398),
    "Henderson": (36.0395, -114.9817),
    "Reno": (39.5296, -119.8138),
    "North Las Vegas": (36.1989, -115.1175),
    "Sparks": (39.5349, -119.7527),

    "New Hampshire": (43.4524, -71.5638),
    "Manchester": (42.9956, -71.4548),
    "Nashua": (42.7654, -71.4676),
    "Concord": (43.2081, -71.5376),
    "Derry": (42.8806, -71.3273),
    "Dover": (43.1979, -70.8737),

    "New Jersey": (40.2989, -74.5210),
    "Newark": (40.7357, -74.1724),
    "Jersey City": (40.7178, -74.0431),
    "Paterson": (40.9168, -74.1718),
    "Elizabeth": (40.6639, -74.2107),
    "Edison": (40.5187, -74.4121),
    
    # New Mexico
    "Albuquerque": (35.0844, -106.6504),
    "Las Cruces": (32.3199, -106.7637),
    "Rio Rancho": (35.2328, -106.6634),
    "Santa Fe": (35.6870, -105.9378),
    "Roswell": (33.3943, -104.5230),

    # New York
    "New York City": (40.7128, -74.0060),
    "Buffalo": (42.8864, -78.8784),
    "Rochester": (43.1566, -77.6088),
    "Yonkers": (40.9312, -73.8988),
    "Syracuse": (43.0481, -76.1474),

    # North Carolina
    "Charlotte": (35.2271, -80.8431),
    "Raleigh": (35.7796, -78.6382),
    "Greensboro": (36.0726, -79.7920),
    "Durham": (35.9940, -78.8986),
    "Winston-Salem": (36.0999, -80.2442),

    # North Dakota
    "Fargo": (46.8772, -96.7898),
    "Bismarck": (46.8083, -100.7837),
    "Grand Forks": (47.9253, -97.0329),
    "Minot": (48.2325, -101.2963),
    "West Fargo": (46.8740, -96.9004),

    # Ohio
    "Columbus": (39.9612, -82.9988),
    "Cleveland": (41.4993, -81.6944),
    "Cincinnati": (39.1031, -84.5120),
    "Toledo": (41.6528, -83.5379),
    "Akron": (41.0814, -81.5190),

    # Oklahoma
    "Oklahoma City": (35.4676, -97.5164),
    "Tulsa": (36.1539, -95.9928),
    "Norman": (35.2226, -97.4395),
    "Broken Arrow": (36.0609, -95.7975),
    "Lawton": (34.6036, -98.3959),

    # Oregon
    "Portland": (45.5152, -122.6784),
    "Eugene": (44.0521, -123.0868),
    "Salem": (44.9429, -123.0351),
    "Gresham": (45.5001, -122.4305),
    "Hillsboro": (45.5229, -122.9898),

    # Pennsylvania
    "Philadelphia": (39.9526, -75.1652),
    "Pittsburgh": (40.4406, -79.9959),
    "Allentown": (40.6084, -75.4902),
    "Erie": (42.1292, -80.0851),
    "Reading": (40.3356, -75.9269),

    # Rhode Island
    "Providence": (41.8240, -71.4128),
    "Warwick": (41.7001, -71.4162),
    "Cranston": (41.7798, -71.4373),
    "Pawtucket": (41.8787, -71.3826),
    "East Providence": (41.8137, -71.3701),

    # South Carolina
    "Charleston": (32.7765, -79.9311),
    "Columbia": (34.0007, -81.0348),
    "North Charleston": (32.8546, -79.9748),
    "Mount Pleasant": (32.8323, -79.8284),
    "Rock Hill": (34.9249, -81.0251),

    # South Dakota
    "Sioux Falls": (43.5446, -96.7311),
    "Rapid City": (44.0805, -103.2310),
    "Aberdeen": (45.4647, -98.4865),
    "Brookings": (44.3114, -96.7984),
    "Watertown": (44.8994, -97.1150),

    # Tennessee
    "Memphis": (35.1495, -90.0490),
    "Nashville": (36.1627, -86.7816),
    "Knoxville": (35.9606, -83.9207),
    "Chattanooga": (35.0456, -85.3097),
    "Clarksville": (36.5298, -87.3595),

    # Texas
    "Houston": (29.7604, -95.3698),
    "San Antonio": (29.4241, -98.4936),
    "Dallas": (32.7767, -96.7970),
    "Austin": (30.2672, -97.7431),
    "Fort Worth": (32.7555, -97.3308),

    # Utah
    "Salt Lake City": (40.7608, -111.8910),
    "West Valley City": (40.6916, -112.0010),
    "Provo": (40.2338, -111.6585),
    "West Jordan": (40.6097, -111.9391),
    "Orem": (40.2969, -111.6946),

    # Vermont
    "Burlington": (44.4759, -73.2121),
    "South Burlington": (44.4660, -73.1700),
    "Rutland": (43.6106, -72.9726),
    "Barre": (44.1970, -72.5028),
    "Montpelier": (44.2601, -72.5754),

    # Virginia
    "Virginia Beach": (36.8529, -75.9780),
    "Norfolk": (36.8508, -76.2859),
    "Chesapeake": (36.7682, -76.2875),
    "Richmond": (37.5407, -77.4360),
    "Newport News": (37.0871, -76.4730),

    # Washington
    "Seattle": (47.6062, -122.3321),
    "Spokane": (47.6588, -117.4260),
    "Tacoma": (47.2529, -122.4443),
    "Vancouver": (45.6387, -122.6615),
    "Bellevue": (47.6104, -122.2007),

    # West Virginia
    "Charleston": (38.3498, -81.6326),
    "Huntington": (38.4192, -82.4452),
    "Morgantown": (39.6295, -79.9559),
    "Parkersburg": (39.2667, -81.5615),
    "Wheeling": (40.0630, -80.7209),
    
    # Wisconsin
    "Milwaukee": (43.0389, -87.9065),
    "Madison": (43.0731, -89.4012),
    "Green Bay": (44.5133, -88.0133),
    "Kenosha": (42.5847, -87.8212),
    "Racine": (42.7261, -87.7829),

    # Wyoming
    "Cheyenne": (41.1399, -104.8202),
    "Casper": (42.8501, -106.3252),
    "Laramie": (41.3114, -105.5911),
    "Gillette": (44.2911, -105.5022),
    "Rock Springs": (41.5875, -109.2026)


}



def fetch_nearby_places(latitude, longitude, radius=RADIUS):
    """
    Fetch nearby places using Google Maps Places API with pagination.
    Enhanced with robust error handling and debugging.
    """
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': '*',  # Request all available fields
    }

    payload = {
        "includedTypes": ["bar", "night_club"],
        "maxResultCount": 20,  # Limited to 20 results per request
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": latitude,
                    "longitude": longitude,
                },
                "radius": radius,
            }
        },
    }

    all_places = []
    while True:
        try:
            response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
            response.raise_for_status()  # Raise for HTTP errors
            data = response.json()

            if "error" in data:
                print(f"API error response: {data['error']}")
                break

            places = data.get("places", [])
            all_places.extend(places)

            # Check for pagination token
            next_page_token = data.get("nextPageToken")
            if next_page_token:
                print("next page here")
                time.sleep(2)  # Delay required before using next_page_token
                payload["pageToken"] = next_page_token
            else:
                break

        except requests.exceptions.HTTPError as e:
            print(f"HTTP error: {e}")
            print(f"Response content: {response.text}")
            break
        except requests.exceptions.RequestException as e:
            print(f"Request error: {e}")
            break
        except Exception as e:
            print(f"Unexpected error: {e}")
            break

    return all_places



def map_place_to_venue(place):
    """
    Map a single place result to the venue schema, including price and hours.
    """
    name = place.get('displayName', {}).get('text')
    formatted_address = place.get('formattedAddress')

    # Extract address components
    address_components = place.get('addressComponents', [])
    city = state = zip_code = None
    for component in address_components:
        if 'locality' in component['types']:
            city = component['longText']
        elif 'administrative_area_level_1' in component['types']:
            state = component['shortText']
        elif 'postal_code' in component['types']:
            zip_code = component['longText']

    # Extract location (latitude and longitude)
    location = place.get('location', {})
    latitude = location.get('latitude')
    longitude = location.get('longitude')
    if latitude and longitude:
        location = f"SRID=4326;POINT({longitude} {latitude})"

    # Determine venue type
    types = place.get('types', [])
    venue_type = 'BAR' if 'bar' in types else 'CLUB' if 'night_club' in types else None
    if not venue_type:
        return None  # Skip non-bar or non-club venues

    # Map price level
    price_mapping = {
        "PRICE_LEVEL_UNSPECIFIED": 0,
        "PRICE_LEVEL_FREE": 1,
        "PRICE_LEVEL_INEXPENSIVE": 2,
        "PRICE_LEVEL_MODERATE": 3,
        "PRICE_LEVEL_EXPENSIVE": 4,
        "PRICE_LEVEL_VERY_EXPENSIVE": 5
    }
    price = price_mapping.get(place.get('priceLevel', "PRICE_LEVEL_UNSPECIFIED"))

    # Extract operating hours
    opening_hours = place.get('currentOpeningHours', {}).get('weekdayDescriptions', [])
    weekday_hours = {
        'monday_hours': opening_hours[0] if len(opening_hours) > 0 else None,
        'tuesday_hours': opening_hours[1] if len(opening_hours) > 1 else None,
        'wednesday_hours': opening_hours[2] if len(opening_hours) > 2 else None,
        'thursday_hours': opening_hours[3] if len(opening_hours) > 3 else None,
        'friday_hours': opening_hours[4] if len(opening_hours) > 4 else None,
        'saturday_hours': opening_hours[5] if len(opening_hours) > 5 else None,
        'sunday_hours': opening_hours[6] if len(opening_hours) > 6 else None,
    }

    # Prepare data to return
    return {
        'name': name,
        'address': formatted_address,
        'city': city,
        'state': state,
        'zip_code': zip_code,
        'location': location,
        'venue_type': venue_type,
        'price': price,
        **weekday_hours  # Include all weekday hours fields
    }




def map_venues_to_list(places):
    """
    Convert raw places data into structured venue data.
    """
    venue_data = []
    for place in places:
        venue = map_place_to_venue(place)
        if venue:
            venue_data.append(venue)
    return venue_data


def fetch_all_states_venues(state_coordinates):
    """
    Fetch venues for all states and log detailed errors for debugging.
    """
    all_venues = []
    for state, coords in state_coordinates.items():
        latitude, longitude = coords
        print(f"Fetching data for {state} at coordinates: {coords}...")
        try:
            places = fetch_nearby_places(latitude, longitude)
            if not places:
                print(f"No data returned for {state}.")
                continue

            venues = map_venues_to_list(places)
            all_venues.extend(venues)
        except Exception as e:
            print(f"Error fetching data for {state}: {e}")
    return all_venues


def generate_sql_inserts(venues):
    """
    Generate SQL INSERT statements for the venues, including price and hours.
    """
    sql_values = []
    for venue in venues:
        name = venue['name'].replace("'", "''")
        address = venue['address'].replace("'", "''")
        city = venue['city']
        state = venue['state']
        zip_code = venue['zip_code']
        location = venue['location']
        venue_type = venue['venue_type']
        price = venue['price'] if venue['price'] is not None else 'NULL'
        monday_hours = venue['monday_hours'].replace("'", "''") if venue['monday_hours'] else 'NULL'
        tuesday_hours = venue['tuesday_hours'].replace("'", "''") if venue['tuesday_hours'] else 'NULL'
        wednesday_hours = venue['wednesday_hours'].replace("'", "''") if venue['wednesday_hours'] else 'NULL'
        thursday_hours = venue['thursday_hours'].replace("'", "''") if venue['thursday_hours'] else 'NULL'
        friday_hours = venue['friday_hours'].replace("'", "''") if venue['friday_hours'] else 'NULL'
        saturday_hours = venue['saturday_hours'].replace("'", "''") if venue['saturday_hours'] else 'NULL'
        sunday_hours = venue['sunday_hours'].replace("'", "''") if venue['sunday_hours'] else 'NULL'

        sql_values.append(
            f"('{name}', '{address}', '{city}', '{state}', '{zip_code}', "
            f"ST_GeogFromText('{location}'), '{venue_type}', {price}, "
            f"'{monday_hours}', '{tuesday_hours}', '{wednesday_hours}', "
            f"'{thursday_hours}', '{friday_hours}', '{saturday_hours}', '{sunday_hours}')"
        )
    return (
        "INSERT INTO public.venue (name, address, city, state, zip_code, location, venue_type, price, "
        "monday_hours, tuesday_hours, wednesday_hours, thursday_hours, friday_hours, saturday_hours, sunday_hours) VALUES "
        + ", ".join(sql_values)
        + ";"
    )





# Main Execution
all_venues = fetch_all_states_venues(STATE_COORDINATES)

if all_venues:
    sql_insert_statement = generate_sql_inserts(all_venues)
    print(sql_insert_statement)
else:
    print("No venues found.")
