import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Unav from './pages/User/Unav';
import Alogin from './pages/Admin/Alogin';
import Aregister from './pages/Admin/Aregister';
import Anav from './pages/Admin/Anav';
import Ahome from './pages/Admin/Ahome';
import Users from './pages/Admin/User/Users';
import UserEdit from './pages/Admin/User/UserEdit';
import Bookings from './pages/Admin/Booking';
import Acabs from './pages/Admin/Acabs';
import Acabedit from './pages/Admin/AcabEdit';
import Addcar from './pages/Admin/AddCar';
import Uhome from './pages/User/Uhome';
import Cabs from './pages/User/Cabs';
import BookCab from './pages/User/BookCab';
import Mybookings from './pages/User/MyBooking';
import Dlogin from './pages/Driver/Dlogin';
import Dregister from './pages/Driver/Dregister';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Register/>} />
      <Route path='/unav' element={<Unav/>} />

{/* Admin */}
      <Route path='/alogin' element={<Alogin/>}/>
      <Route path='/asignup' element={<Aregister/>}/>
      <Route path='/anav' element={<Anav/>} />
      <Route path='/ahome' element={<Ahome/>} />
      <Route path='/users' element={<Users/>} />
      <Route path="/useredit/:id" element={<UserEdit/>}/>
      <Route path='/bookings' element={<Bookings/>} />
      <Route path='/acabs' element={<Acabs/>}/>
      <Route path="/acabedit/:id" element={<Acabedit/>}/>
      <Route path='/addcab' element={<Addcar/>} />

{/* Driver */}
      <Route path='/dlogin' element={<Dlogin/>}/>
      <Route path='/dsignup' element={<Dregister/>}/>
      
        {/* user       */}
      <Route path='/uhome' element={<Uhome/>}/>
      <Route path='/cabs' element={<Cabs/>}/>
      <Route path='/bookcab/:id' element={<BookCab/>}/>
      <Route path='/mybookings' element={<Mybookings/>}/>
      </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
