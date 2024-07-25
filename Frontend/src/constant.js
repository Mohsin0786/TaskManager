const prod = {
    url: {
     API_URL: "https://taskmanager-4bvt.onrender.com",
     }
   }
   const dev = {
    url: {
     API_URL: "http://localhost:5000"
    }
   };

   console.log(import.meta.env.MODE)
export const config = import.meta.env.MODE === "development" ? dev : prod