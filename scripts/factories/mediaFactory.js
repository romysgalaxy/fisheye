class MediaFactory {
  constructor(data, user, price, hearts) {
    this.data = data;
    this.user = user;
    this.price = price;
    this.hearts = hearts;
    this.picture = `assets/medias/${user}/${data.image}`;
    this.play = `assets/medias/${user}/${data.video}`;
    this.likes = data.likes;
    this.liked = false;
    //this.image = image;
    //this.id = id
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
      img.addEventListener('click', this.carouselMedia)
      div.appendChild(img);
    } else if (this.data.video) {
      const video = document.createElement("video");
      video.setAttribute("src", this.play);
      video.setAttribute("controls", true);
      video.setAttribute("class", 'media-img');
      div.appendChild(video);
    }

    div.appendChild(this.dispalyContent());

    return div;
  }

  carouselMedia = () => {
        const carousel = document.createElement('div')
        carousel.setAttribute('class', 'lightBox-container')

        const img = document.createElement('img')
        img.setAttribute("src", this.picture)

        const previous = document.createElement('button')
        const previousIcon = document.createElement('img')
        previousIcon.setAttribute("src", "./assets/icons/arrow_left.svg")
        previous.appendChild(previousIcon)

        const next = document.createElement('button')
        const nextIcon = document.createElement('img')
        nextIcon.setAttribute("src", "./assets/icons/arrow_right.svg")
        next.appendChild(nextIcon)
        
        const close = document.createElement('button')
        close.setAttribute("class", "close-btn")
        const closeIcon = document.createElement('img')
        closeIcon.setAttribute("src", "./assets/icons/close-red.svg")
        close.appendChild(closeIcon)

        carousel.appendChild(previous)
        carousel.appendChild(img)
        carousel.appendChild(next)
        carousel.appendChild(close)
        const lightBoxSection = document.querySelector('.lightBox');
        lightBoxSection.appendChild(carousel);
  }

  renderCarouselMedia(medias, user, price) {
    const model = new MediaFactory(medias, user, price);
    model.carouselMedia(); // Ajouter les écouteurs d'événement aux médias
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
    const mediaCards = this.data;

    if (filter === "title") {
      mediaCards.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      console.log("mediaCard title", mediaCards);
      this.renderPhotographerMedias(mediaCards, this.user, this.price);

    } else if (filter === "likes") {
      mediaCards.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1;
        }
        if (a.likes < b.likes) {
          return 1;
        }
        return 0;
      });
      console.log("mediaCard likes", mediaCards);
      this.renderPhotographerMedias(mediaCards, this.user, this.price);
    } else if (filter === "date") {
      mediaCards.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      console.log("mediaCard date", mediaCards);
      this.renderPhotographerMedias(mediaCards, this.user, this.price);
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
    const mediasSection = document.querySelector(".photograph-media");
        medias.forEach((media) => {
            const mediaModel = new MediaFactory(media, user, price);
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
