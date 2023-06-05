async function init() {
    const { photographers } = await getDatas();
    const photographerFactory = new PhotographerFactory(photographers)
    photographerFactory.renderPhotographerCard(photographers);
};

init() 