import s from "./CreatePage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePage() {
   const navigate = useNavigate();
   const [form, setForm] = useState({
      title: "",
      start_production: "",
      class: "",
      image: "",
   });

   function handleChangeForm(e) {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         const response = await axios.post(
            `https://basic-server-express-production.up.railway.app/cars/create`,
            { ...form }
         );
         navigate("/");
      } catch (error) {
         console.error("Error creating car", error);
      }
   }

   return (
      <div className={s.container}>
         <h1>Create a new car</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Title
               <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChangeForm}
               />
            </label>
            <label>
               Start production
               <input
                  type="number"
                  name="start_production"
                  value={form.start_production}
                  onChange={handleChangeForm}
               />
            </label>
            <label>
               Class
               <input
                  type="text"
                  name="class"
                  value={form.class}
                  onChange={handleChangeForm}
               />
            </label>
            <label>
               Image
               <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChangeForm}
               />
            </label>
            <button type="submit">Create</button>
         </form>
      </div>
   );
}

export default CreatePage;
