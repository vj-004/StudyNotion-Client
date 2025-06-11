import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Common/Navbar";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import OpenRoute from "./components/Auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses";
import Settings from "./components/Dashboard/Settings";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import AddCourse from "./components/Dashboard/AddCourse";


function App() {

  const {user} = useSelector((state) => state.profile);

  console.log('user: ', user);

  return (
    
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter" >
      
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/login" element = {<OpenRoute>
            <Login/>
          </OpenRoute>}/>
          <Route path = "/signup" element = {<OpenRoute>
            <Signup/>
          </OpenRoute>}/>
          <Route path="/forgot-password" element={<OpenRoute>
            <ForgotPassword/>
          </OpenRoute>} />
          <Route path="/update-password/:id" element={<UpdatePassword/>} />
          <Route path="verify-email" element={<VerifyEmail/>}/>
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>}/>
          <Route element={<PrivateRoute>
            <Dashboard/>
          </PrivateRoute>}
          
          >
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>} />


            {
              user?.accountType === 'student' && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                  <Route path="/dashboard/cart" element={<Cart/>}/>
                </>
              )
            }

            {
              user?.accountType === 'instructor' && (
                <>
                  <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                </>
              )
            }
          </Route>

          



          <Route path="*" element={<Error/>}/>
        </Routes>
        
      </div>
      
    </>
  );
}

export default App;
