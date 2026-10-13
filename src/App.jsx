import { useEffect, useState } from "react";


const API_URL = "https://api.opendota.com/api/heroStats";
const IMG_BASE_URL = "https://cdn.cloudflare.steamstatic.com";

function App() {
  
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [attr, setAttr] = useState('all');

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
    const handleOption = (event) => {
      setAttr(event.target.value);
    }

    const filterHeroes = heroes.filter((hero) => {
      // return attr === "All" || hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase());
      const nameMatch = hero.localized_name.toLowerCase().includes(searchTerm.toLowerCase());

      const attributeMatch =  attr === 'all' || hero.primary_attr === attr;
      return nameMatch && attributeMatch;
    
    });

    // todo filtering with attribution
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

        <select name="" id="" onChange={handleOption}>
          <option value="all">All Attribute</option>
          <option value="agi">Agility</option>
          <option value="str">Strength</option>
          <option value="int">Intelligence</option>
        </select>
      </form>

      {filterHeroes.length > 0 ? (
        filterHeroes.map((hero) => 
          <div key={hero.id}>
            <p>
              <img src={`${IMG_BASE_URL}${hero.img}`} alt={hero.localized_name} />
              {hero.localized_name}
            </p>
          </div>
        )
      ) : (<p>Hero not found</p>)}
    </div>
  );
};

export default App;