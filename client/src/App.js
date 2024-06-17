import './App.css';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Auth/Private'; // Import the PrivateRoute component

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
