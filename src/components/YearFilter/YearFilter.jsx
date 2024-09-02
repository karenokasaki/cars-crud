import styles from "./YearFilter.module.css";

function YearFilter({ cars, year, setYear }) {
   //get all years
   let years = cars.map((car) => car.start_production);

   //remove duplicates
   years = [...new Set(years)];

   //sort
   years.sort();

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
