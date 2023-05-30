// get the photographers datas

async function getPhotographers() {

    const response = await fetch('/../../data/photographers.json')
    let data = await response.json()
    return data
}

// get the medias datas
async function getMedias() {

    const response = await fetch('/../../data/photographers.json')
    let data = await response.json()
    console.log('get medias', data.medias)
    return data
}

async function getPhotographerv2() {
    
}