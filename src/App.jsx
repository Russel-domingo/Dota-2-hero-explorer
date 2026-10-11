import { useEffect, useState } from "react";


const API_URL = "https://api.opendota.com/api/heroStats";

function App() {
  
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const filterHeroes = heroes.filter((hero) => {
      return hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    
    if (loading) {
      return <h1>Loading heroes....</h1>
    };

    if (error) {
      return <h1>Error: {error}</h1>
    };

  return(
    <div>

      <h1>Dota2 hero explore</h1>
      <form action="">
        <input 
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Type heroes"
        />
      </form>
      {filterHeroes.length > 0 ? (
        filterHeroes.map((hero) => 
          <div key={hero.id}>
            <p>
              {hero.localized_name}
            </p>
          </div>
        )
      ) : (<p>Hero not found</p>)}
    </div>
  );
};

export default App;