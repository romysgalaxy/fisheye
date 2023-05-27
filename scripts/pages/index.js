// display photographers card 

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // photographers.forEach((photographer) => {
    //     const photographerModel = photographerFactory(photographer);
    //     const userCardDOM = photographerModel.getUserCardDOM();
    //     photographersSection.appendChild(userCardDOM);
    // });

    // photographers.forEach(function(photographer) {
    //     const photographerModel = photographerFactory(photographer);
    //     const userCardDOM = photographerModel.getUserCardDOM();
    //     photographersSection.appendChild(userCardDOM);
    // });

    photographers.forEach((photographer, n) => {
        const photographerModel = photographerFactory(photographer);
        const photographerCard = photographerModel.createPhotographerCard();
        photographersSection.appendChild(photographerCard);
    });
};

async function init() {
    // get the photographers datas
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init()