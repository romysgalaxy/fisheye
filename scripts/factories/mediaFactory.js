function mediaFactory(data, user) {
    
    // { name } = data

    //const name = data.medias


    console.log('user', user)
    const picture = `assets/medias/${user}/${data.image}`
    const play = `assets/medias/${user}/${data.video}`

    function dispalyContent() {
        //content
        const content = document.createElement('div')
        content.setAttribute("class", "media-content")
       
        // title
        const title = document.createElement('p')
        title.setAttribute("class", "title")
        title.textContent = data.title

        // favorite
        const favorite = document.createElement('div')
        favorite.setAttribute("class", "media-favorite")
       
        // like
        const like = document.createElement('p')
        like.setAttribute("class", "like")
        like.textContent = data.likes
        
        //heart
        const heart = document.createElement('img')
        heart.setAttribute("src", "./assets/icons/heart.svg")
        heart.setAttribute("class", "heart")

        favorite.appendChild(like)
        favorite.appendChild(heart)
        content.appendChild(title)
        content.appendChild(favorite)
               
        return content
    } 

    function createMediaCard() {
        // div
        const div = document.createElement('div')
        div.setAttribute("class", "media-card")

        // Check if it's an image or video
        if (data.image) {
            const img = document.createElement('img');
            img.setAttribute('src', picture);
            div.appendChild(img);
        } else if (data.video) {
            const video = document.createElement('video');
            video.setAttribute('src', play);
            video.setAttribute('controls', true);
            div.appendChild(video);
        }
        
        div.appendChild(dispalyContent())
        
        return (div)
    }

    function lightBox() {
        console.log('lightBox')
        return 'test'
        // const btn = document.querySelector('.heart')
        // console.log(btn)
        // btn.addEventListener('click', function () {
        //     // const lightboxOverlay = document.createElement('div');
        //     // lightboxOverlay.setAttribute('class', 'lightbox-overlay');

        //     // const lightboxContent = document.createElement('div');
        //     // lightboxContent.setAttribute('class', 'lightbox-content');
        //     console.log('test')
        // })
    }

    return { name, data, picture, createMediaCard, lightBox }
}