"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOCK_PATIENTS, MOCK_DOCTORS } from "../lib/data";
import type { Appointment } from "../lib/types";

interface DesktopCalendarProps {
  appointments: Appointment[];
  onAddAppointment: (date: string) => void;
  onEditAppointment: (appointment: Appointment) => void;
}

export function DesktopCalendar({
  appointments,
  onAddAppointment,
  onEditAppointment,
}: DesktopCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const getDayAppointments = (day: number) => {
    const dateKey = formatDateKey(day);
    return appointments
      .filter((apt) => apt.date === dateKey)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const getPatientName = (patientId: string) =>
    MOCK_PATIENTS.find((p) => p.id === patientId)?.name || "Unknown";
  const getDoctorName = (doctorId: string) =>
    MOCK_DOCTORS.find((d) => d.id === doctorId)?.name || "Unknown";

  const renderCalendarDays = () => {
    const days = [];

    // Fill leading empty cells
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 border border-gray-200"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getDayAppointments(day);
      const dateKey = formatDateKey(day);
      const isToday = new Date().toISOString().split("T")[0] === dateKey;

      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? "bg-blue-50 border-blue-300" : ""
          }`}
          onClick={() => onAddAppointment(dateKey)}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              isToday ? "text-blue-600" : ""
            }`}
          >
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayAppointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment.id}
                className="text-xs p-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditAppointment(appointment);
                }}
              >
                <div className="font-medium truncate">
                  {appointment.time} - {getPatientName(appointment.patientId)}
                </div>
                <div className="truncate opacity-75">
                  {getDoctorName(appointment.doctorId)}
                </div>
              </div>
            ))}
            {dayAppointments.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{dayAppointments.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <h2 className="text-2xl font-semibold">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 border rounded hover:bg-gray-100"
            aria-label="Previous Month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 border rounded hover:bg-gray-100"
            aria-label="Next Month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border-b bg-gray-50 text-sm text-center font-medium text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">{renderCalendarDays()}</div>
    </div>
  );
}
