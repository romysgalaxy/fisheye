class MediaFactory {
  constructor(data, user, price, filter ) {
    this.data = data;
    this.user = user;
    this.price = price;
    this.filter = filter;
    //this.hearts = hearts;
    this.picture = `assets/medias/${user}/${data.image}`;
    this.play = `assets/medias/${user}/${data.video}`;
    this.likes = data.likes;
    this.liked = false;
    this.handlePreviousMediaClick = this.showPreviousMedia.bind(this);
  }

  dispalyContent() {
    const content = document.createElement("div");
    content.setAttribute("class", "media-content");

    const title = document.createElement("p");
    title.setAttribute("class", "title");
    title.textContent = this.data.title;

    const favorite = document.createElement("div");
    favorite.setAttribute("class", "media-favorite");

    const like = document.createElement("p");
    like.setAttribute("class", "like");
    like.textContent = this.likes;

    const heart = document.createElement("img");
    heart.setAttribute("src", "./assets/icons/heart.svg");
    heart.setAttribute("class", "heart");

    heart.addEventListener("click", () => {
      if (!this.liked) {
        this.likes++;
        like.textContent = this.likes;
        this.liked = true;
      }
    });

    favorite.appendChild(like);
    favorite.appendChild(heart);
    content.appendChild(title);
    content.appendChild(favorite);

    return content;
  }

  createMediaCard() {
    const div = document.createElement("div");
    div.setAttribute("class", "media-card");

    if (this.data.image) {
      const img = document.createElement("img");
      img.setAttribute("src", this.picture);
      img.setAttribute("class", 'media-img');
      img.addEventListener('click', this.carouselMedia);
      div.appendChild(img);
    } else if (this.data.video) {
      const video = document.createElement("video");
      video.setAttribute("src", this.play);
      video.setAttribute("class", 'media-img');
      video.addEventListener('click', this.carouselMedia);
      div.appendChild(video);
      
    }

    div.appendChild(this.dispalyContent());

    return div;
  }

  carouselMedia = () => {

        const none = document.querySelectorAll('header, .photograph-header, .photograph-filter, .photograph-media, .photograph-footer')
        none.forEach(element => element.style.display = 'none')

        const carousel = document.createElement('div')
        carousel.setAttribute('class', 'lightBox-container')
        const lightBoxSection = document.querySelector('.lightBox');

        const previous = document.createElement('button')
        previous.setAttribute('class', 'btn-previous')
        const previousIcon = document.createElement('img')
        previousIcon.setAttribute("src", "./assets/icons/arrow_left.svg")
        previous.appendChild(previousIcon)
        previous.addEventListener('click', this.showPreviousMedia.bind(this))

        const next = document.createElement('button')
        next.setAttribute('class', 'btn-next')
        const nextIcon = document.createElement('img')
        nextIcon.setAttribute("src", "./assets/icons/arrow_right.svg")
        next.appendChild(nextIcon)
        next.addEventListener('click', this.showNextMedia.bind(this))

        const close = document.createElement('button')
        close.setAttribute("class", "close-btn")
        const closeIcon = document.createElement('img')
        closeIcon.setAttribute("src", "./assets/icons/close-red.svg")
        close.appendChild(closeIcon)
        close.addEventListener('click', () => {
          carousel.remove()
          const title = document.querySelector('.lightBox-title')
          console.log('title', title)
          title.remove()
          none.forEach(element => element.style.display = 'flex')
        })

        const newTitle = document.createElement('p')
        newTitle.setAttribute('class', 'lightBox-title')
        newTitle.textContent = this.data.title

        carousel.appendChild(previous)
        carousel.appendChild(next)
        carousel.appendChild(close)

        if (this.data.image) {
          const img = document.createElement('img');
          img.setAttribute('src', this.picture);
          img.setAttribute('id', 'carousel');
          carousel.appendChild(img);
          carousel.insertBefore(img, next)
        } else if (this.data.video) {
          console.log('ici')
          const video = document.createElement('video');
          video.setAttribute('src', this.play);
          video.setAttribute('controls', true);
          video.setAttribute('id', 'carousel');
          carousel.appendChild(video);
          carousel.insertBefore(video, next)
        }

        lightBoxSection.appendChild(carousel);
        lightBoxSection.appendChild(newTitle)
  }

  showPreviousMedia() {
    const carousel = document.querySelector('.lightBox-container');
    const mediaElement = document.getElementById('carousel');
    const title = document.querySelector('.lightBox-title')

    // Trouver l'indice de l'image actuelle dans le tableau filtré trié
    const currentIndex = this.filter.findIndex((media) => media.image === this.data.image);

    // Calculer l'indice de l'image précédente en tenant compte de la boucle
    const previousIndex = (currentIndex - 1 + this.filter.length) % this.filter.length;

    // Obtenir les informations du média précédent
    const previousMedia = this.filter[previousIndex];

    const lightBoxSection = document.querySelector('.lightBox');
    carousel.removeChild(mediaElement);
    lightBoxSection.removeChild(title);

  if (previousMedia.image) {
    const img = document.createElement('img');
    img.setAttribute('src', `assets/medias/${this.user}/${previousMedia.image}`);
    img.setAttribute('id', 'carousel');
    carousel.appendChild(img)
    const next = document.querySelector('.btn-next')
    carousel.insertBefore(img, next)
  } else if (previousMedia.video) {
    const video = document.createElement('video');
    video.setAttribute('src', `assets/medias/${this.user}/${previousMedia.video}`);
    video.setAttribute('controls', true);
    video.setAttribute('id', 'carousel');
    carousel.appendChild(video)
    const next = document.querySelector('.btn-next')
    carousel.insertBefore(video, next)
  }

  const newTitle = document.createElement('p')
  newTitle.setAttribute('class', 'lightBox-title')
  newTitle.textContent = previousMedia.title

  lightBoxSection.appendChild(newTitle)

  this.data = previousMedia;
    
  }
  
  showNextMedia() {
    const carousel = document.querySelector('.lightBox-container');
    const mediaElement = document.getElementById('carousel');
    const title = document.querySelector('.lightBox-title')
  
    const currentIndex = this.filter.findIndex((media) => media.image === this.data.image);
    console.log('currentIndex', currentIndex)
  
    const nextIndex = (currentIndex + 1) % this.filter.length
    console.log('nextIndex', nextIndex)
  
    const nextMedia = this.filter[nextIndex];
    console.log('nextMedia', nextMedia)

    carousel.removeChild(mediaElement);
    const lightBoxSection = document.querySelector('.lightBox')

    lightBoxSection.removeChild(title)

  if (nextMedia.image) {
    const img = document.createElement('img');
    img.setAttribute('src', `assets/medias/${this.user}/${nextMedia.image}`);
    img.setAttribute('id', 'carousel');
    carousel.appendChild(img)
    const next = document.querySelector('.btn-next')
    carousel.insertBefore(img, next)
  } else if (nextMedia.video) {
    const video = document.createElement('video');
    video.setAttribute('src', `assets/medias/${this.user}/${nextMedia.video}`);
    video.setAttribute('controls', true);
    video.setAttribute('id', 'carousel');
    carousel.appendChild(video)
    const next = document.querySelector('.btn-next')
    carousel.insertBefore(video, next)
  }

  const newTitle = document.createElement('p')
  newTitle.setAttribute('class', 'lightBox-title')
  newTitle.textContent = nextMedia.title

  lightBoxSection.appendChild(newTitle)

  this.data = nextMedia;
  
  }
  
  filtredMedias() {
    const div = document.createElement("div");
    div.setAttribute("class", "photograph-filter-content");

    const text = document.createElement("p");
    text.textContent = "Trier par";

    const dropdown = document.createElement("select");
    dropdown.addEventListener("change", this.handleFilterChange.bind(this));

    const option1 = document.createElement("option");
    option1.textContent = "Popularité";
    option1.value = "likes";
    dropdown.appendChild(option1);

    const option2 = document.createElement("option");
    option2.textContent = "Date";
    option2.value = "date";
    dropdown.appendChild(option2);

    const option3 = document.createElement("option");
    option3.textContent = "Titre";
    option3.value = "title";
    dropdown.appendChild(option3);

    div.appendChild(text);
    div.appendChild(dropdown);

    return div;
  }

  handleFilterChange(event) {
    const filter = event.target.value;
    this.filter = this.data
    console.log('demo')
    console.log('handleFilterChange this', this)
    //const mediaCards = this.data;

    if (filter === "title") {
      this.filter.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      console.log("mediaCard title", this.filter);
      this.renderPhotographerMedias(this.filter, this.user, this.price);

    } else if (filter === "likes") {
      this.filter.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        }
        if (a.likes < b.likes) {
          return 1;
        }
        return 0;
      });
      console.log("mediaCard likes", this.filter);
      this.renderPhotographerMedias(this.filter, this.user, this.price);
    } else if (filter === "date") {
      this.filter.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      console.log("mediaCard date", this.filter);
      this.renderPhotographerMedias(this.filter, this.user, this.price);
    }
  }

  createPhotographerFooter() {
    const div = document.createElement("div");
    div.setAttribute("class", "photographer-footer-content");

    const content = document.createElement("div");
    content.setAttribute("class", "photographer-like");

    const like = document.createElement("p");
    like.textContent = this.hearts;

    const img = document.createElement("img");
    img.setAttribute("src", "./assets/icons/heart-black.svg");

    content.appendChild(like);
    content.appendChild(img);
    div.appendChild(content);

    const priceDiv = document.createElement("p");
    priceDiv.textContent = this.price + "€ / jour";

    div.appendChild(priceDiv);

    return div;
  }

  clearMediaSection() {
    const mediasSection = document.querySelector(".photograph-media");
    mediasSection.innerHTML = ""; // Supprime tous les éléments enfants de la section des médias
  }

  renderPhotographerMedias(medias, user, price) {  

    this.clearMediaSection();
    //this.filteredByDefault();
    const mediasSection = document.querySelector(".photograph-media");
        medias.forEach((media) => {
            const mediaModel = new MediaFactory(media, user, price, medias);
            const mediaCard = mediaModel.createMediaCard();
            mediasSection.appendChild(mediaCard);
        });
  }

  renderPhotographerFooter(medias, user, price) {
    let totalLikes = 0;
    medias.forEach((media) => {
        totalLikes += media.likes
    })
    const section = document.querySelector('.photograph-footer')
    const model = new MediaFactory({}, user, price, totalLikes);
    const footer = model.createPhotographerFooter()
    section.appendChild(footer)
}
renderPhotographerFilter(medias, user, price) {
    const section = document.querySelector(".photograph-filter");
    const model = new MediaFactory(medias, user, price);
    const filter = model.filtredMedias(medias)
    section.appendChild(filter)

}
}
