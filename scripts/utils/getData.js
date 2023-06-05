// fetch the datas json

async function getDatas() {
    const response = await fetch('/../../data/photographers.json')
    let data = await response.json()
    return data
}