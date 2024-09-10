import styles from "./YearFilter.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

function YearFilter({ year, setYear }) {
   const [years, setYears] = useState([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await axios.get(
               "https://basic-server-express-production.up.railway.app/cars/all"
            );
            let years = response.data.map((car) => car.start_production);
            years = [...new Set(years)];
            years.sort();
            setYears(years);
         } catch (error) {
            console.error("Error fetching data", error);
         }
      }

      fetchData();
   }, []);

   function handleChange(e) {
      if (e.target.value === "all") {
         setYear(null);
         return;
      }
      setYear(e.target.value);
   }

   return (
      <div className={styles.container}>
         <label>Year</label>
         <select onChange={handleChange} className={styles.select}>
            <option value="all">All</option>
            {years.map((year, index) => (
               <option key={index} value={year}>
                  {year}
               </option>
            ))}
         </select>
      </div>
   );
}

export default YearFilter;
