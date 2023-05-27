function photographerFactory(data) {
    //const { name } = data
    const portrait = data.portrait
    const picture = `assets/photographers/${portrait}`; 

    function handleLinkClick(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien
      
        const photographerId = data.id;
        const photographerUrl = `photographer.html?id=${photographerId}`;
      
        // Redirige l'utilisateur vers la page photographer.html
        window.location.href = photographerUrl;
    }

    function createPhotographerCard() {
        // article
        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", "Voir le profil du photographe")
        
        // id
        const id = document.createElement( 'a' );
        id.textContent = " VOIR"
        id.setAttribute("href", "photographer.html?id=" + data.id);
        id.addEventListener("click", handleLinkClick);

        // img
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photographe " + data.name)
        img.setAttribute("class", "photographerProfil")

        // name
        const h2 = document.createElement( 'h2' )
        h2.setAttribute("class", "name")
        h2.textContent = data.name

        // location
        const location = document.createElement( 'p' )
        location.setAttribute("class", "location")
        location.textContent = data.city + ", " + data.country

        // tagline
        const tagline = document.createElement( 'p' )
        tagline.setAttribute("class", "tagline")
        tagline.textContent = data.tagline

        // price
        const price = document.createElement( 'p' )
        price.setAttribute("class", "price")
        price.textContent = data.price + "€/jour"

        article.appendChild(id)
        article.appendChild(img)
        article.appendChild(h2)
        article.appendChild(location)
        article.appendChild(tagline)
        article.appendChild(price)

        return (article)
    }

    function createPhotographerHeader() {
        //div
        const divInfo = document.querySelector('.photograph-header .content')
        const divImg = document.querySelector('.photograph-header .img')
        
        // img
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photographe " + data.name)
        img.setAttribute("class", "photographer-img")

        // name
        const h2 = document.createElement( 'h2' )
        h2.setAttribute("class", "name")
        h2.textContent = data.name

        // location
        const location = document.createElement( 'p' )
        location.setAttribute("class", "location")
        location.textContent = data.city + ", " + data.country

        // tagline
        const tagline = document.createElement( 'p' )
        tagline.setAttribute("class", "tagline")
        tagline.textContent = data.tagline

        divImg.appendChild(img)
        divInfo.appendChild(h2)
        divInfo.appendChild(location)
        divInfo.appendChild(tagline)

        return (div)
    }
    return { name, data, picture, createPhotographerCard, createPhotographerHeader }
}