import axios from "axios"
import { Icon } from "leaflet"
import { useEffect, useMemo, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import type { SingleUserType } from "../UsersPage/user-type"
import "./users-map.css"

type UsersMapProps = {
  users: Array<SingleUserType>
}

type UserMapPoint = {
  user: SingleUserType
  position: [number, number]
}

const geocodeCache = new Map<string, [number, number] | null>()

function parseCoordinates(user: SingleUserType): [number, number] | null {
  const { latitude, longitude } = user.location.coordinates
  const lat = Number(latitude)
  const lng = Number(longitude)

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return null
  }

  return [lat, lng]
}

function cityCountryKey(city: string, country: string) {
  return `${city}|${country}`
}

async function geocodeCityCountry(
  city: string,
  country: string,
): Promise<[number, number] | null> {
  const cacheKey = cityCountryKey(city, country)
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey) ?? null
  }

  try {
    const { data } = await axios.get<Array<{ lat: string; lon: string }>>(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: `${city}, ${country}`,
          format: "json",
          limit: 1,
        },
      },
    )
    const match = data[0]
    if (!match) {
      geocodeCache.set(cacheKey, null)
      return null
    }

    const lat = Number(match.lat)
    const lng = Number(match.lon)
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      geocodeCache.set(cacheKey, null)
      return null
    }

    const position: [number, number] = [lat, lng]
    geocodeCache.set(cacheKey, position)
    return position
  } catch {
    return null
  }
}

function getUserPoints(users: Array<SingleUserType>): Array<UserMapPoint> {
  const points: Array<UserMapPoint> = []

  for (const user of users) {
    const { city, country } = user.location
    const cached = geocodeCache.get(cityCountryKey(city, country))
    const position = cached ?? parseCoordinates(user)
    if (!position) {
      continue
    }
    points.push({ user, position })
  }

  return points
}

function createUserIcon(imageUrl: string) {
  return new Icon({
    iconUrl: imageUrl,
    iconSize: [44, 44],
    iconAnchor: [22, 44],
    popupAnchor: [0, -36],
    className: "users-map__avatar",
  })
}

function FitUserBounds({ positions }: { positions: Array<[number, number]> }) {
  const map = useMap()
  const boundsKey = positions.map(([lat, lng]) => `${lat},${lng}`).join("|")

  useEffect(() => {
    if (positions.length === 0) {
      return
    }

    if (positions.length === 1) {
      map.setView(positions[0], 5)
      return
    }

    map.fitBounds(positions, { padding: [40, 40], maxZoom: 6 })
  }, [map, boundsKey, positions])

  return null
}

export default function UsersMap(props: UsersMapProps) {
  const { users } = props
  const usersKey = users.map((user) => user.login.uuid).join("|")
  const fallbackPoints = useMemo(() => getUserPoints(users), [users])
  const [geocodedPoints, setGeocodedPoints] = useState<Array<UserMapPoint> | null>(
    null,
  )
  const [resolvedKey, setResolvedKey] = useState("")
  const points =
    resolvedKey === usersKey && geocodedPoints ? geocodedPoints : fallbackPoints
  const positions = useMemo(
    () => points.map(({ position }) => position),
    [points],
  )

  useEffect(() => {
    let cancelled = false

    async function resolvePoints() {
      const resolved = await Promise.all(
        users.map(async (user) => {
          const { city, country } = user.location
          const geocoded = await geocodeCityCountry(city, country)
          const position = geocoded ?? parseCoordinates(user)
          if (!position) {
            return null
          }
          return { user, position }
        }),
      )

      if (!cancelled) {
        setGeocodedPoints(
          resolved.filter((point): point is UserMapPoint => point !== null),
        )
        setResolvedKey(usersKey)
      }
    }

    void resolvePoints()

    return () => {
      cancelled = true
    }
  }, [users, usersKey])

  if (points.length === 0) {
    return null
  }

  return (
    <section className="users-map" aria-label="User locations">
      <MapContainer
        className="users-map__canvas"
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitUserBounds positions={positions} />
        {points.map(({ user, position }) => {
          const { name, picture, location, login } = user
          const fullName = `${name.first} ${name.last}`

          return (
            <Marker
              key={login.uuid}
              position={position}
              icon={createUserIcon(picture.medium)}
              title={fullName}
              alt={fullName}
            >
              <Popup>
                <img
                  className="users-map__popup-image"
                  src={picture.medium}
                  alt={fullName}
                  width={72}
                  height={72}
                />
                <p className="users-map__popup-name">{fullName}</p>
                <p className="users-map__popup-place">
                  {location.city}, {location.country}
                </p>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </section>
  )
}
