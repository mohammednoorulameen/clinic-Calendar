import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import Calendar from "./Components/Calendar";
import { AppointmentForm } from "./Components/appointment-form";

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/calendar");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/calendar" element={<Calendar onLogout={handleLogout} />} />
      <Route
        path="/appoiment"
        element={
          <AppointmentForm
            selectedDate={new Date().toISOString()}
            appointment={undefined}
            onSave={(appointment) => console.log("Saved:", appointment)}
            onClose={() => console.log("Closed")}
            onDelete={() => console.log("Deleted")}
          />
        }
      />
    </Routes>
  );
}

export default App;
