class PhotographerFactory {
    constructor(data) {
      this.data = data;
      this.portrait = data.portrait;
      this.picture = `assets/photographers/${this.portrait}`;
      this.photographerId = data.id;
    }
  
    handleLinkClick(event) {
      event.preventDefault();
      const photographerUrl = `photographer.html?id=${this.photographerId}`;
      window.location.href = photographerUrl;
    }
  
    createPhotographerCard() {
        
      const article = document.createElement('article');
      article.setAttribute('aria-label', 'Voir le profil du photographe');
  
      const id = document.createElement('a');
      id.textContent = ' VOIR';
      id.setAttribute('href', `photographer.html?id=${this.photographerId}`);
      id.addEventListener('click', this.handleLinkClick.bind(this));
  
      const img = document.createElement('img');
      img.setAttribute('src', this.picture);
      img.setAttribute('alt', `Photographe ${this.data.name}`);
      img.setAttribute('class', 'photographerProfil');
  
      const h2 = document.createElement('h2');
      h2.setAttribute('class', 'name');
      h2.textContent = this.data.name;
  
      const location = document.createElement('p');
      location.setAttribute('class', 'location');
      location.textContent = `${this.data.city}, ${this.data.country}`;
  
      const tagline = document.createElement('p');
      tagline.setAttribute('class', 'tagline');
      tagline.textContent = this.data.tagline;
  
      const price = document.createElement('p');
      price.setAttribute('class', 'price');
      price.textContent = `${this.data.price}€/jour`;
  
      article.appendChild(id);
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(location);
      article.appendChild(tagline);
      article.appendChild(price);
  
      return article;
    }
  
    createPhotographerHeader() {
      const headerDiv = document.createElement('div');
      headerDiv.setAttribute('class', 'photograph-header card');
  
      const imgDiv = document.createElement('div');
      imgDiv.setAttribute('class', 'photograph-header img');
      headerDiv.appendChild(imgDiv);
  
      const btnDiv = document.createElement('div');
      btnDiv.setAttribute('class', 'photograph-header btn');
      headerDiv.appendChild(btnDiv);
  
      const contentDiv = document.createElement('div');
      contentDiv.setAttribute('class', 'photograph-header content');
      headerDiv.appendChild(contentDiv);
  
      const img = document.createElement('img');
      img.setAttribute('src', this.picture);
      img.setAttribute('alt', `Photographe ${this.data.name}`);
      img.setAttribute('class', 'photographer-img');
      imgDiv.appendChild(img);
  
      const contactButton = document.createElement('button');
      contactButton.setAttribute('class', 'contact_button');
      contactButton.textContent = 'Contactez-moi';
      contactButton.addEventListener('click', this.displayModal);
      btnDiv.appendChild(contactButton);
  
      const name = document.createElement('h2');
      name.setAttribute('class', 'name');
      name.textContent = this.data.name;
      contentDiv.appendChild(name);
  
      const location = document.createElement('p');
      location.setAttribute('class', 'location');
      location.textContent = `${this.data.city}, ${this.data.country}`;
      contentDiv.appendChild(location);
  
      const tagline = document.createElement('p');
      tagline.setAttribute('class', 'tagline');
      tagline.textContent = this.data.tagline;
      contentDiv.appendChild(tagline);
  
      return headerDiv;
    }

    getIdUrl() {
      var str = window.location.href;
      var url = new URL(str);
      var id = url.searchParams.get("id");
      var parsedId = parseInt(id, 10);
      return parsedId;
    }

    renderPhotographerCard(datas) {
        const photographersSection = document.querySelector(".photographer_section");
        datas.forEach((data) => {
          const photographer = new PhotographerFactory(data);
          const userCardDOM = photographer.createPhotographerCard();
          photographersSection.appendChild(userCardDOM);
        });
    }

    renderPhotographerDetails(datas) {
      const photographersSection = document.querySelector(".photograph-header");
      datas.forEach((data) => {
          const photographerModel = new PhotographerFactory(data);
          const photographerCard = photographerModel.createPhotographerHeader();
          photographersSection.appendChild(photographerCard);
      });
  }

  }