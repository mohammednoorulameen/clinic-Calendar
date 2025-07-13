import type { Patient, Doctor, Appointment } from "./types"

export const MOCK_PATIENTS: Patient[] = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "Emily Davis" },
  { id: "5", name: "David Wilson" },
  { id: "6", name: "Lisa Anderson" },
  { id: "7", name: "Robert Taylor" },
  { id: "8", name: "Jennifer Martinez" },
]

export const MOCK_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Amanda Chen", specialty: "General Practice" },
  { id: "2", name: "Dr. James Rodriguez", specialty: "Cardiology" },
  { id: "3", name: "Dr. Maria Gonzalez", specialty: "Pediatrics" },
  { id: "4", name: "Dr. Thomas Lee", specialty: "Orthopedics" },
  { id: "5", name: "Dr. Rachel Kim", specialty: "Dermatology" },
]

export const MOCK_CREDENTIALS = {
  email: "staff@clinic.com",
  password: "123456",
}

// localStorage utilities
export const getAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("clinic-appointments")
  return stored ? JSON.parse(stored) : []
}

export const saveAppointments = (appointments: Appointment[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("clinic-appointments", JSON.stringify(appointments))
}

export const getUser = (): { email: string; isAuthenticated: boolean } | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("clinic-user")
  return stored ? JSON.parse(stored) : null
}

export const saveUser = (user: { email: string; isAuthenticated: boolean }): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("clinic-user", JSON.stringify(user))
}

export const clearUser = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("clinic-user")
}
