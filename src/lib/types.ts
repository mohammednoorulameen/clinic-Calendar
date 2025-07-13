export interface Patient {
  id: string
  name: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  createdAt: string
}

export interface User {
  email: string
  isAuthenticated: boolean
}
