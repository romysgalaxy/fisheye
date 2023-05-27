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
    async function init() {
        const id = getIdUrl(); 
        const { photographers } = await getPhotographers();
        const filteredPhotographers = photographers.filter((photographer) => photographer.id === id);
        photographerDetails(filteredPhotographers);
    };
    
    init()

