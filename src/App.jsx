import { Routes, Route, BrowserRouter } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import ProfilePage from "./pages/profilePage"
import { AuthProvider } from "./context/authProvider"
import ProtectedRoute from "./components/protectedRoute"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*Rutas Publicas*/}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/*Rutas Privadas*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
