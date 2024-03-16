import {Routes, Route} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Stake from "./components/Stake";
import Profile from "./components/Profile";


function App() {
  return <div className="App">
    <Header/>
 <Routes>
  <Route  path="/"  element={<Stake/>}/>
  <Route  path="/Profile"  element={<Profile/>}/>
 </Routes>
 
  </div>;
}

export default App;
