import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={!user ? <Home /> : <Navigate to="/workouts"/>} />
          <Route path='/workouts' element={user ? <Main /> : <Navigate to="/login" />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to ="/workouts" />} />
          <Route path='/signup' element={!user ? <SignUp/> : <Navigate to="/login" />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
