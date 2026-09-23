const singleUser = {
    "gender": "female",
    "name": {
      "title": "Miss",
      "first": "Minerva",
      "last": "Griego"
    },
    "location": {
      "street": {
        "number": 9665,
        "name": "Ampliación ex República Yugoslava de Macedonia"
      },
      "city": "Cerrito Colorado",
      "state": "Chihuahua",
      "country": "Mexico",
      "postcode": 88562,
      "coordinates": {
        "latitude": "25.3776",
        "longitude": "40.2663"
      },
      "timezone": {
        "offset": "+5:30",
        "description": "Bombay, Calcutta, Madras, New Delhi"
      }
    },
    "email": "minerva.griego@example.com",
    "login": {
      "uuid": "b61bf012-df11-4a68-8620-94ca73c902da",
      "username": "angrymeercat332",
      "password": "bunnies",
      "salt": "0fgQxHFA",
      "md5": "c1edeee4a9373b5d5d056d880be3d193",
      "sha1": "284fabc3a65d363ab92f54e4241ce7af91cfe5cc",
      "sha256": "050a970dc3a523cc1b458715b6e3ad16f5944c8f283145a94375aaf2f6b3f4b4"
    },
    "dob": {
      "date": "1987-05-10T11:50:45.384Z",
      "age": 39
    },
    "registered": {
      "date": "2015-06-17T11:13:14.787Z",
      "age": 11
    },
    "phone": "(627) 501 8695",
    "cell": "(662) 252 7051",
    "id": {
      "name": "NSS",
      "value": "97 99 33 1746 2"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/45.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/45.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/45.jpg"
    },
    "nat": "MX"
  }

export type SingleUserType = typeof singleUser
