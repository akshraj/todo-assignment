import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/mainLayout/MainLayout";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<div>There is nothing here</div>} />
      </Routes>
    </div>
  );
}

export default App;

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};
