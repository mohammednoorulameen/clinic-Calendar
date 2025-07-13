"use client";

import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { DesktopCalendar } from "./desktop-calendar";
import { MobileCalendar } from "./mobile-calendar";
import { AppointmentForm } from "./appointment-form";
import { getAppointments, saveAppointments, clearUser } from "../lib/data";
import type { Appointment } from "../lib/types";
import { useMediaQuery } from "../hooks/use-mobile";

interface CalendarViewProps {
  onLogout: () => void;
}

function Calendar({ onLogout }: CalendarViewProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingAppointment, setEditingAppointment] = useState<
    Appointment | undefined
  >();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const handleAddAppointment = (date: string) => {
    setSelectedDate(date);
    setEditingAppointment(undefined);
    setShowForm(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedDate(appointment.date);
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleSaveAppointment = (
    appointmentData: Omit<Appointment, "id" | "createdAt">
  ) => {
    const newAppointments = [...appointments];

    if (editingAppointment) {
      const index = newAppointments.findIndex(
        (apt) => apt.id === editingAppointment.id
      );
      if (index !== -1) {
        newAppointments[index] = {
          ...editingAppointment,
          ...appointmentData,
        };
      }
    } else {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        ...appointmentData,
        createdAt: new Date().toISOString(),
      };
      newAppointments.push(newAppointment);
    }

    setAppointments(newAppointments);
    saveAppointments(newAppointments);
    setShowForm(false);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    const newAppointments = appointments.filter(
      (apt) => apt.id !== appointmentId
    );
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
    setShowForm(false);
  };

  const handleLogout = () => {
    clearUser();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Clinic Appointment Calendar
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          <MobileCalendar
            appointments={appointments}
            onAddAppointment={handleAddAppointment}
            onEditAppointment={handleEditAppointment}
          />
        ) : (
          <DesktopCalendar
            appointments={appointments}
            onAddAppointment={handleAddAppointment}
            onEditAppointment={handleEditAppointment}
          />
        )}
      </main>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          selectedDate={selectedDate}
          appointment={editingAppointment}
          onSave={handleSaveAppointment}
          onClose={() => setShowForm(false)}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  );
}

export default Calendar;
