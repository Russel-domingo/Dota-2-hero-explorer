function HeroCard(props) {
    
    const IMG_BASE_URL = "https://cdn.cloudflare.steamstatic.com"; 
    
    const heroAttr = () => {
        if (props.hero.primary_attr === 'agi') {
            return <p> Attribute: Agility</p>
        }
        if (props.hero.primary_attr === 'int') {
            return <p> Attribute: Intelligence</p>
        }

        if (props.hero.primary_attr === 'str') {
            return <p> Attribute: Strength</p>
        }    
    }
    
    return (
        <div>
            <img src={`${IMG_BASE_URL}${props.hero.img}`} alt={props.hero.localized_name} width={120}/>
            <p>{props.hero.localized_name}</p>
            <p>{heroAttr()}</p>
        </div>
    );
}

export default HeroCard;