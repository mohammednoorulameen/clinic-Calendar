"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../lib/data";
import type { Appointment } from "../lib/types";

interface MobileCalendarProps {
  appointments: Appointment[];
  onAddAppointment: (date: string) => void;
  onEditAppointment: (appointment: Appointment) => void;
}

export function MobileCalendar({
  appointments,
  onAddAppointment,
  onEditAppointment,
}: MobileCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  const dayAppointments = appointments
    .filter((apt) => apt.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const getPatientName = (patientId: string) =>
    MOCK_PATIENTS.find((p) => p.id === patientId)?.name || "Unknown Patient";
  const getDoctorName = (doctorId: string) =>
    MOCK_DOCTORS.find((d) => d.id === doctorId)?.name || "Unknown Doctor";

  return (
    <div className="p-4 space-y-4">
      {/* Date Navigation */}
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            className="p-2 border rounded-full hover:bg-gray-100"
            onClick={() => navigateDate("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-center text-lg font-semibold border-none outline-none bg-transparent"
          />
          <button
            className="p-2 border rounded-full hover:bg-gray-100"
            onClick={() => navigateDate("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day View */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
          <button
            className="flex items-center text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => onAddAppointment(selectedDate)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
        <div className="p-4">
          {dayAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No appointments scheduled
            </p>
          ) : (
            <div className="space-y-3">
              {dayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => onEditAppointment(appointment)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {getPatientName(appointment.patientId)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getDoctorName(appointment.doctorId)}
                      </p>
                    </div>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {appointment.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
