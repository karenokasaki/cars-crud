import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import axios from "axios";

function DetailPage() {
   const { id_car } = useParams();
   const navigate = useNavigate();

   const [showForm, setShowForm] = useState(false);
   const [car, setCar] = useState({});
   const [form, setForm] = useState({});

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await axios.get(
               `https://basic-server-express-production.up.railway.app/cars/${id_car}`
            );
            let car = response.data;
            setCar(car);
            setForm({
               title: car.title,
               start_production: car.start_production,
               class: car.class,
               image: car.image,
               _id: car._id,
            });
         } catch (error) {
            console.error("Error fetching data", error);
         }
      }

      fetchData();
   }, []);

   function handleShowForm() {
      setShowForm(!showForm);
   }

   function handleChangeForm(e) {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         const response = await axios.put(
            `https://basic-server-express-production.up.railway.app/cars/update/${id_car}`,
            { ...form }
         );
         setShowForm(false);
         setCar(response.data);
      } catch (error) {
         console.error("Error updating car", error);
      }
   }

   async function handleDelete(e) {
      e.preventDefault();
      try {
         const response = await axios.delete(
            `https://basic-server-express-production.up.railway.app/cars/delete/${id_car}`
         );
         navigate("/");
      } catch (error) {
         console.error("Error deleting car", error);
      }
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
               <p className={styles.id}>ID: {car._id}</p>
            </div>
         </div>
         <div className={styles.detailButtons}>
            <button onClick={handleShowForm}>Edit this car</button>
         </div>

         {showForm && (
            <div className={styles.formContainer}>
               <form>
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
                     <button onClick={handleSubmit} className={styles.save}>
                        Save
                     </button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}

export default DetailPage;
