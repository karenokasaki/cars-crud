import styles from "./SearchBar.module.css";

function SearchBar({ search, handleChange }) {
   return (
      <div className={styles.container}>
         <input
            className={styles.input}
            type="text"
            placeholder="Search car's name..."
            value={search}
            onChange={handleChange}
         />
      </div>
   );
}

export default SearchBar;
