// get the photographer id in the url and convert it in integer
    function getIdUrl() {
        var str = window.location.href;
        var url = new URL(str);
        var id = url.searchParams.get("id");
        var parsedId = parseInt(id, 10);
        return parsedId;
      }

// display header photographer
    async function photographerDetails(photographers) {
        const photographersSection = document.querySelector(".photograph-header .content");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const photographerCard = photographerModel.createPhotographerHeader();
            photographersSection.appendChild(photographerCard);
        });
    }

// display media photographer
    async function photographerMedias(medias, user) {
        const mediasSection = document.querySelector(".photograph-media");
        medias.forEach((media) => {
            const mediaModel = mediaFactory(media, user);
            const mediaCard = mediaModel.createMediaCard();
            mediasSection.appendChild(mediaCard);
        });
    }

    // lightbox

    function displayLightBox() {
        const lightBox = lightBox()
        const section = document.querySelector(".lightBox")
        section.appendChild(lightBox);
    }


    async function init() {
        const id = getIdUrl(); 
        const { photographers } = await getPhotographers();
        const { medias } = await getMedias();

        const filteredPhotographers = photographers.filter((photographer) => photographer.id === id);
        const filteredMedias = medias.filter((media) => media.photographerId === id);
          
        const user = filteredPhotographers[0].name
        console.log(filteredMedias)  

        photographerDetails(filteredPhotographers);
        photographerMedias(filteredMedias, user);
        displayLightBox()

    };
    
    init()

