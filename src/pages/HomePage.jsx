import styles from "./HomePage.module.css";
import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import YearFilter from "../components/YearFilter/YearFilter";
import Cards from "../components/Cards/Cards";

function HomePage({ cars }) {
   const [search, setSearch] = useState("");
   const [year, setYear] = useState(null);

   function handleChange(e) {
      setSearch(e.target.value);
   }

   return (
      <div className={styles.container}>
         <div className={styles.inputs}>
            <SearchBar search={search} handleChange={handleChange} />
            <YearFilter cars={cars} year={year} setYear={setYear} />
         </div>

         <Cards cars={cars} search={search} year={year} />
      </div>
   );
}

export default HomePage;
