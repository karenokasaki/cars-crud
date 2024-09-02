import { Link } from "react-router-dom";
import styles from "./Cards.module.css";

function Cards({ cars, search, year }) {
   return (
      <div className={styles.cards}>
         {cars
            .filter((car) =>
               car.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((car) =>
               year ? car.start_production === Number(year) : true
            )
            .map((car) => (
               <div key={car.id} className={styles.card}>
                  <div className={styles.image}>
                     <img src={car.image} />
                  </div>
                  <h2 className={styles.title}>{car.title}</h2>
                  <Link to={`/car/${car.id}`} className={styles.button}>
                     <button>See details</button>
                  </Link>
               </div>
            ))}
      </div>
   );
}

export default Cards;
