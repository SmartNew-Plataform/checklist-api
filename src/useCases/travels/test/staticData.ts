type TravelType = {
  id: number
  date: Date
  destination: string
  user: string

  status: 'due' | 'progress' | 'paused' | 'stopped' | 'finished'
  pauses: {
    started: Date
    ended: Date | null
    pausedLocation: string
    resumedLocation: string | null
  }[]
  distanceTraveled: number
  startLocation: string | null
  currentLocation: string | null
}

export const travelsData: TravelType[] = [
  {
    id: 903,
    date: new Date('2024-01-07'),
    destination: 'Uberlândia - MG',
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
    user: 'bruno.matias',
    startLocation: null,
    status: 'due',
    pauses: [],
    distanceTraveled: 0,
    currentLocation: null,
  },
]
