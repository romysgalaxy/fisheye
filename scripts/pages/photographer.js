    async function init() {
        const { photographers } = await getDatas();
        const { medias } = await getDatas();

        const photographerFactory = new PhotographerFactory(photographers)
        const mediaFactory = new MediaFactory(medias)
        
        const id = photographerFactory.getIdUrl(); 
        
        const filteredPhotographers = photographers.filter((photographer) => photographer.id === id);
        const filteredMedias = medias
            .filter((media) => media.photographerId === id)
            .sort((a, b) => b.likes - a.likes)
          
        const user = filteredPhotographers[0].name
        const price = filteredPhotographers[0].price
        // const hearts = filteredMedias[0].likes
        const formFactory = new FormFactory(user)

        photographerFactory.renderPhotographerDetails(filteredPhotographers);
        mediaFactory.renderPhotographerMedias(filteredMedias, user, price)
        mediaFactory.renderPhotographerFooter(filteredMedias, user, price)
        mediaFactory.renderPhotographerFilter(filteredMedias, user, price)
        formFactory.displayName(user)
        formFactory.closeModal()
        formFactory.formSubmit()
    };
    
    init()

