import { useState } from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import cars_json from "./data/cars-with-id.json";
import HomePage from "./pages/HomePage";
import RandomPage from "./pages/RandomPage";
import DetailPage from "./pages/DetailPage";
import carIcon from "./assets/car.png";

function App() {
   const [cars, setCars] = useState(cars_json);

   return (
      <div>
         <nav>
            <img src={carIcon} />
            <h1>Car list</h1>
            <Link to="/">Home</Link>
            <Link to="/random">Random</Link>
         </nav>

         <Routes>
            <Route
               path="/"
               element={<HomePage cars={cars} setCars={setCars} />}
            />
            <Route
               path="/car/:id_car"
               element={<DetailPage cars={cars} setCars={setCars} />}
            />
            <Route
               path="/random"
               element={<RandomPage cars={cars} setCars={setCars} />}
            />
         </Routes>
      </div>
   );
}

export default App;
