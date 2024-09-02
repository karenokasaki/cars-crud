import cars from "./src/data/cars.json" assert { type: "json" };
import fs from "fs";

// add a random ID to each car
cars.forEach((car, index) => {
   car.id = index + 101;
   if (!car.start_production) {
      car.start_production = "unknown";
   }

   if (!car.class) {
      car.class = "unknown";
   }
});

// save in a new json file
fs.writeFileSync("./src/data/cars-with-id.json", JSON.stringify(cars, null, 3));
console.log("File created successfully!");
