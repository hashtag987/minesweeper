import './App.scss';
import Board from './pages/board';
import Login from './pages/forms/Login';
import Signup from './pages/forms/Signup';
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/board" element={<Board/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
