import UserLoginPage from "./Pages/UserLoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserSignUpPage from "./Pages/UserSignUpPage";
import AdminPage from "./Pages/AdminPage";
import App_list from "./Components/App_list/App_list";
import { AuthProvider } from './Context/AuthContext'
import Status from "./Components/Status/Status";
import Slots from "./Components/Slots/Slots"
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import UserHomePage from "./Pages/UserHomePage";
import Registration from "./Components/RegistrationForm/Registration";
function App() {
  return (
    <Router>

      <div className="App">
        <AuthProvider>


          <Routes>
            <Route exact path="/" element={<UserLoginPage />} />
            <Route path='/signup' element={<UserSignUpPage />} />
            <Route path="/home" element={<UserHomePage />} ></Route>
            <Route path="/register" element={<Registration />} />
            <Route path="/admin_login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />}>

              <Route path="" element={<App_list />} />
              <Route path="status" element={<Status />} />
              <Route path="slots" element={<Slots />} />

            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
