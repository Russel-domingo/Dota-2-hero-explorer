function HeroCard(props) {
    
    const IMG_BASE_URL = "https://cdn.cloudflare.steamstatic.com"; 
    return (
        <div key={props.hero.id}>
            <img src={`${IMG_BASE_URL}${props.hero.img}`} alt={props.hero.localized_name} width={120}/>
            <p>{props.hero.localized_name}</p>
        </div>
    );
}

export default HeroCard;