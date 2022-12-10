import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Row, Col, Button } from 'reactstrap';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { useState } from 'react';
import ModalConfig from './Components/ModalConfig';

function App() {

  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <ModalConfig showModal={showModal} setShowModal={setShowModal}/>
      <Button style={{
        position: "fixed",
        bottom: "2%",
        right: "2%",
      }}
      onClick={() => {setShowModal(true)}}
      >
        Config
      </Button>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/sign-up' element ={<SignUp/>}/>
      </Routes>
      
      {/* <Route path="/regex" element={<Regex/>}/>
      <Route path="/grammar" element={<Grammar/>}></Route> */}
    </Router>
  );
}

export default App;
