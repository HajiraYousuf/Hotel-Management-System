import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Services from './pages/Services.jsx'
import Booking from './pages/Booking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'

const routerProvider = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {element:<Home/>, index:true},
      {path:"/about", element:<About/> },
      {path:"/contact", element:<Contact/> },
      {path:"/services", element:<Services/> },
      {path:"/booking", element:<Booking/> },
      {path:"/my-bookings", element:<MyBookings/> },
      {path:"/rooms", element:<Rooms/> },
      {path:"/rooms/:id",element:<RoomDetails/>  },
      {path:"/profile", element:<Profile/>},
      {path:"/login", element:<Login/>},
      {path:"/register", element:<Register/>},
      {path:"/logout", element:<Logout/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routerProvider}/>
  </StrictMode>,
)
