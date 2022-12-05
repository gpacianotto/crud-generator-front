import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Row, Col } from 'reactstrap';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
      
      {/* <Route path="/regex" element={<Regex/>}/>
      <Route path="/grammar" element={<Grammar/>}></Route> */}
    </Router>
  );
}

export default App;
