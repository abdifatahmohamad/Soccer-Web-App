// import {Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./components/Home";
import AddEdit from "./components/AddEdit";
import View from "./components/View";

function App() {
  return (
    <Router>
    <div className="App">
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/AddTeam" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit/>} />
        <Route path="/view/:id" element={<View/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
