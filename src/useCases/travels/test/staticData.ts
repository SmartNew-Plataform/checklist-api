type LocationType = {
  latitude: number
  longitude: number
}

type TravelType = {
  id: number
  date: Date
  destination: string
  destinationCoords: LocationType
  user: string

  status: 'due' | 'progress' | 'paused' | 'stopped' | 'finished'
  pauses: {
    started: Date
    ended: Date | null
    pausedLocation: LocationType
    resumedLocation: LocationType | null
  }[]
  distanceTraveled: number
  startLocation: LocationType | null
  currentLocation: LocationType | null
}

export const travelsData: TravelType[] = [
  {
    id: 902,
    date: new Date('2024-01-15'),
    destination: 'Los Angeles - CA',
    destinationCoords: {
      latitude: 34.0194,
      longitude: -118.411,
    },
    user: 'bruno.matias',
    startLocation: null,
    status: 'due',
    pauses: [],
    distanceTraveled: 0,
    currentLocation: null,
  },
  {
    id: 903,
    date: new Date('2024-01-07'),
    destination: 'Uberlândia - MG',
    destinationCoords: {
      latitude: -18.9113,
      longitude: -48.2622,
    },
    user: 'bruno.matias',
    startLocation: null,
    status: 'due',
    pauses: [],
    distanceTraveled: 0,
    currentLocation: null,
  },
  {
    id: 904,
    date: new Date('2024-01-10'),
    destination: 'Rio de janeiro - rj',
    destinationCoords: {
      latitude: -22.9035,
      longitude: -43.2096,
    },
    user: 'bruno.matias',
    startLocation: null,
    status: 'due',
    pauses: [],
    distanceTraveled: 0,
    currentLocation: null,
  },
  {
    id: 905,
    date: new Date('2024-02-03'),
    destination: 'Sao paulo - sp',
    destinationCoords: {
      latitude: -23.5489,
      longitude: -46.6388,
    },
    user: 'bruno.matias',
    startLocation: null,
    status: 'due',
    pauses: [],
    distanceTraveled: 0,
    currentLocation: null,
  },
  {
    id: 906,
    date: new Date('2024-02-09'),
    destination: 'fortaleza - ce',
    destinationCoords: {
      latitude: -3.71839,
      longitude: -38.5434,
    },
    user: 'bruno.matias',
    startLocation: null,
    status: 'due',
    pauses: [],
    distanceTraveled: 0,
    currentLocation: null,
  },
]
