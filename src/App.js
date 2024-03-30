
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { ToastContainer} from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer/>
      
     <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Signup />} />
     
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </Router>
  
      </>
  );
}

export default App;
