import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {Route, Routes} from "react-router-dom"
import NoteState from './components/context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  function showAlert(message,type)
  {
    setAlert(
      {
        msg:message,
        type:type
      })

      setTimeout(() => {
        setAlert(null);
      }, 2000);
  }
  return (
    
    <NoteState>
    <Navbar/>
    <Alert alert={alert}/>
      <div className="container">
     <Routes>
     <Route path="/" element={ <Home showAlert={showAlert}/>}/>
     <Route exact path="/about" element={ <About/>}/>
     <Route exact path="/login" element={ <Login showAlert={showAlert}/>}/>
     <Route exact path="/signup" element={ <Signup showAlert={showAlert}/>}/> 

     </Routes>
      </div>
    </NoteState>
    
  );
}

export default App;
