import { Routes, Route } from "react-router-dom";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginForm from "./scenes/loginform";
import RegistrationForm from "./scenes/registeruser";
import HomeNav from "./global/HomeNav";
import Footer from "./global/Footer";
import { useState, useEffect } from "react";
import ForgotPassword from "./scenes/forgotpassword";
import About from "./scenes/about";
import Resources from "./scenes/resources";
import Homepage from "./scenes/homepage";
import AdminNav from "./global/AdminNav";
import AllUsers from "./scenes/allusers";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateUser from "./scenes/updateuser";
import Report from "./scenes/report";
import AdminDashboard from "./scenes/dashboard";
import Settings from "./global/Settings";
import UserProfile from "./scenes/userprofile";
import GrievanceHistory from "./scenes/grievancehistory";
import UserNav from "./global/UserNav";
import GrievanceForm from "./scenes/grievanceform";
import GrievanceStatus from "./scenes/grievancestatus";
import ResetPassword from "./scenes/resetpassword";

function App() {
  const [theme, colorMode] = useMode();
  const [isHomeNav, setIsHomeNav] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Fetch user role after login
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "guest"; 
    setUserRole(role);
  }, []);

  // Example: When user navigates to admin or user pages, disable HomeNav
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/dashboard") || currentPath.startsWith("/profile")) {
      setIsHomeNav(false); // Hide HomeNav after login or on protected routes
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          
          {/* Conditionally Show HomeNav */}
          {isHomeNav && <HomeNav setIsHomeNav={setIsHomeNav} />}
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/home" element={<Homepage setIsHomeNav={setIsHomeNav} />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>

          {/* Conditionally Render AdminNav or UserNav Based on Role */}
          {userRole === "admin" && <AdminNav />}
          {(userRole === "student" || userRole === "faculty" || userRole === "staff") && <UserNav />}

          <Routes>
            {/* Admin-Protected Routes */}
            <Route path="/allusers" element={<ProtectedRoute component={AllUsers} />} />
            <Route path="/edit-profile" element={<ProtectedRoute component={UpdateUser} />} />
            <Route path="/dashboard" element={<ProtectedRoute component={AdminDashboard} />} />
            <Route path="/reports" element={<ProtectedRoute component={Report} />} />
            <Route path="/settings" element={<ProtectedRoute component={Settings} />} />
            <Route path="/grievance-history" element={<ProtectedRoute component={GrievanceHistory} />} />
            <Route path="/view-profile" element={<ProtectedRoute component={UserProfile} />} />
            <Route path="/grievance-status" element={<ProtectedRoute component={GrievanceStatus} />} />

            {/* User-Protected Routes */}
            <Route path="/update-profile" element={<ProtectedRoute component={UpdateUser} />} />
            <Route path="/grievance" element={<ProtectedRoute component={GrievanceForm} />} />
            <Route path="/settings" element={<ProtectedRoute component={Settings} />} />
            <Route path="/view-profile" element={<ProtectedRoute component={UserProfile} />} />
            <Route path="/grievance-status" element={<ProtectedRoute component={GrievanceStatus} />} />
          </Routes>

        </Box>
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
