import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/workouts' Component={Main} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
