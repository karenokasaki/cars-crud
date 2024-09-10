import { Link } from "react-router-dom";
import styles from "./Cards.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Cards({ search, year }) {
   const [cars, setCars] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(true);
      async function fetchData() {
         try {
            const response = await axios.get(
               "https://basic-server-express-production.up.railway.app/cars/all"
            );
            setCars(response.data);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false);
         }
      }

      fetchData();
   }, []);

   return (
      <>
         {loading && <p>Loading...</p>}
         {!loading && cars.length === 0 && <p>No cars found</p>}
         {!loading && cars.length > 0 && (
            <div className={styles.cards}>
               {cars
                  .filter((car) =>
                     year ? car.start_production === Number(year) : true
                  )
                  .filter((car) =>
                     car.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((car) => (
                     <div key={car._id} className={styles.card}>
                        <div className={styles.image}>
                           <img src={car.image} />
                        </div>
                        <h2 className={styles.title}>{car.title}</h2>
                        <Link to={`/car/${car._id}`} className={styles.button}>
                           <button>See details</button>
                        </Link>
                     </div>
                  ))}
            </div>
         )}
      </>
   );
}

export default Cards;
