import { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import cars_json from "./data/cars-with-id.json";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";
import carIcon from "./assets/car.png";

function App() {
   const [cars, setCars] = useState(cars_json);

   return (
      <div>
         <nav>
            <img src={carIcon} />
            <h1>Car list</h1>
            <div>
               <Link to="/">Home</Link>
               <Link to="/new">New</Link>
            </div>
         </nav>

         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/car/:id_car" element={<DetailPage />} />
            <Route path="/new" element={<CreatePage />} />
         </Routes>
      </div>
   );
}

export default App;
