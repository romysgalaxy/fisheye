    async function init() {
        const { photographers } = await getDatas();
        const { medias } = await getDatas();

        const photographerFactory = new PhotographerFactory(photographers)
        const mediaFactory = new MediaFactory(medias)
        const id = photographerFactory.getIdUrl(); 
        
        const filteredPhotographers = photographers.filter((photographer) => photographer.id === id);
        const filteredMedias = medias.filter((media) => media.photographerId === id);
          
        const user = filteredPhotographers[0].name
        const price = filteredPhotographers[0].price
        // const hearts = filteredMedias[0].likes

        photographerFactory.renderPhotographerDetails(filteredPhotographers);
        mediaFactory.renderPhotographerMedias(filteredMedias, user)
        mediaFactory.renderPhotographerFooter(filteredMedias, user, price)
        mediaFactory.renderPhotographerFilter(filteredMedias, user, price)
    };
    
    init()

