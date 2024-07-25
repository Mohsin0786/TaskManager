const prod = {
    url: {
     API_URL: "https://backend-8qoa.onrender.com",
     }
   }
   const dev = {
    url: {
     API_URL: "http://localhost:5000"
    }
   };

   console.log(import.meta.env)
export const config = import.meta.env.MODE === "development" ? dev : prod