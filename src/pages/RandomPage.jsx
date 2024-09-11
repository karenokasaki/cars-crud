import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RandomPage.module.css";

function RandomPage({ cars, setCars }) {
   const { id_car } = useParams();
   const navigate = useNavigate();

   /* isso roda toda vez que a pagina é loudada */
   let listIds = cars.map((car) => car.id);
   let randomId = listIds[Math.floor(Math.random() * listIds.length)];
   let car = cars[randomId];

   useEffect(() => {
      /* Toda vez que a pagina louda, ele espera 5 segundos e recarrega ela */
      /* Isso faz o código voltar pra linha 10 */
      setTimeout(() => {
         window.location.reload();
      }, 5000);
   }, []);

   const [showForm, setShowForm] = useState(false);
   const [form, setForm] = useState({
      title: car.title,
      start_production: car.start_production,
      class: car.class,
      image: car.image,
      id: car.id,
   });

   function handleShowForm() {
      setShowForm(!showForm);
   }

   function handleChangeForm(e) {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   }

   function handleSubmit(e) {
      e.preventDefault();

      const index = cars.findIndex((car) => car.id === Number(id_car));
      const newCars = [...cars];
      newCars[index] = form;
      setCars(newCars);
      setShowForm(false);
   }

   function handleDelete() {
      const index = cars.findIndex((car) => car.id === Number(id_car));
      const newCars = [...cars];
      newCars.splice(index, 1);
      setCars(newCars);
      navigate("/");
   }

   return (
      <div>
         <h1>Car details</h1>
         <div className={styles.container}>
            <div className={styles.image}>
               <img src={car.image} alt={car.title} />
            </div>
            <div className={styles.content}>
               <h2>{car.title}</h2>
               <p>Start production: {car.start_production}</p>
               <p>Class: {car.class}</p>
               <p className={styles.id}>ID {car.id}</p>
            </div>
         </div>
         <div className={styles.detailButtons}>
            <button onClick={handleShowForm}>Edit this car</button>
         </div>

         {showForm && (
            <div className={styles.formContainer}>
               <form onSubmit={handleSubmit}>
                  <div className={styles.input}>
                     <label className={styles.label}>Title</label>
                     <input
                        type="text"
                        value={form.title}
                        onChange={handleChangeForm}
                        name="title"
                     />
                  </div>

                  <div className={styles.input}>
                     <label className={styles.label}>Start production</label>
                     <input
                        type="text"
                        value={form.start_production}
                        onChange={handleChangeForm}
                        name="start_production"
                     />
                  </div>

                  <div className={styles.input}>
                     <label className={styles.label}>Class</label>
                     <input
                        type="text"
                        value={form.class}
                        onChange={handleChangeForm}
                        name="class"
                     />
                  </div>

                  <div className={styles.input}>
                     <label className={styles.label}>Image url</label>
                     <input
                        type="text"
                        value={form.image}
                        onChange={handleChangeForm}
                        name="image"
                     />
                  </div>

                  <div className={styles.buttons}>
                     <button onClick={handleDelete} className={styles.delete}>
                        Delete this car
                     </button>
                     <button type="submit" className={styles.save}>
                        Save
                     </button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}

export default RandomPage;
