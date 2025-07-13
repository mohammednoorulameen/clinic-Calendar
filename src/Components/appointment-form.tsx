"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../lib/data";
import type { Appointment } from "../lib/types";

interface AppointmentFormProps {
  selectedDate: string;
  appointment?: Appointment;
  onSave: (appointment: Omit<Appointment, "id" | "createdAt">) => void;
  onClose: () => void;
  onDelete?: (appointmentId: string) => void;
}

export function AppointmentForm({
  selectedDate,
  appointment,
  onSave,
  onClose,
  onDelete,
}: AppointmentFormProps) {
  const [patientId, setPatientId] = useState(appointment?.patientId || "");
  const [doctorId, setDoctorId] = useState(appointment?.doctorId || "");
  const [time, setTime] = useState(appointment?.time || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !doctorId || !time) return;

    onSave({
      patientId,
      doctorId,
      date: selectedDate,
      time,
    });
  };

  const handleDelete = () => {
    if (appointment && onDelete) {
      onDelete(appointment.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">
            {appointment ? "Edit Appointment" : "New Appointment"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="text"
                value={selectedDate}
                disabled
                className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="patient"
                className="block text-sm font-medium mb-1"
              >
                Patient
              </label>
              <select
                id="patient"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select patient
                </option>
                {MOCK_PATIENTS.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="doctor"
                className="block text-sm font-medium mb-1"
              >
                Doctor
              </label>
              <select
                id="doctor"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select doctor
                </option>
                {MOCK_DOCTORS.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium mb-1">
                Time
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                {appointment ? "Update" : "Save"} Appointment
              </button>

              {appointment && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
