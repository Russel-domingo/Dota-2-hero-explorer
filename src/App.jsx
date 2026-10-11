import { useEffect, useState } from "react";


const API_URL = "https://api.opendota.com/api/heroStats";

function App() {
  
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchHero() {
        try {
          const response = await fetch(API_URL);
        
          if (!response.ok) {
            throw new Error(`Http error!: ${response.status}`)
          }

          const data = await response.json();
          setHeroes(data);
        } catch (error) {
          // error
          setError(error.message);
          console.log('Network parsing error', error);
        } finally {
          setLoading(false);
        }
      }
      fetchHero();
    },[]);

    if (loading) {
      return <h1>Loading heroes....</h1>
    }

    if (error) {
      return <h1>Error: {error}</h1>
    }

  return(
    <div>
      <h1>Dota2 hero explore</h1>

      {heroes.map((hero) => {
        return <div key={hero.id}>
                <p>
                  {hero.localized_name}
                </p>
              
              </div>
      })}
    </div>
  );
};

export default App;