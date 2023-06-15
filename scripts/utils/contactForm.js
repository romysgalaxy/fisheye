class FormFactory {
    constructor(user) {
        this.user = user
      }
    
    displayModal() {
        const modal = document.getElementById("contact_modal");
        const layout = document.getElementById("layout")
        modal.style.display = "block";
        layout.style.display = "none"
    }

    displayName() {
        const div = document.querySelector('.photographer-name')
        div.innerHTML = this.user
    }
    
    closeModal() {
        const close = document.querySelector('.modal-close')
        close.addEventListener('click', function () {
            const modal = document.getElementById("contact_modal");
            const layout = document.getElementById("layout")
            modal.style.display = "none";
            layout.style.display = "block"
        })
    }

    formSubmit() {
        const form = document.querySelector('form');
        const firstName = document.getElementById('first');
        const firstNameError = document.getElementById('firstError');
        const lastName = document.getElementById('last');
        const lastNameError = document.getElementById('lastError');
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        const modal = document.getElementById("contact_modal");
        const layout = document.getElementById("layout")
        
        // add listener for submit button
        form.addEventListener('submit', (e) => isFormValid(e))

        // check if input are validated
        function validateFirstName(firstName) {
            if (firstName.length >= 2) {
                firstNameError.textContent = ''
                return true
            } 
            firstNameError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom'
            return false
        }

        function validateLastName(lastName) {
            if (lastName.length >= 2) {
                lastNameError.textContent = ''
                return true
            } 
            lastNameError.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom'
            return false
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                emailError.textContent = ''
                return true
            } 
            emailError.textContent = 'Veuillez entrer une adresse mail'
            return false
        }

        function validateMessage(message) {
            if (message.length >= 10) {
                messageError.textContent = ''
                return true
            } 
            messageError.textContent = 'Veuillez entrer 10 caractères ou plus pour le champ message'
            return false
        }

        //check if all input are valid
        function isFormValid(e) {
            e.preventDefault()
            const isFirstNameValid = validateFirstName(firstName.value)
            const isLastNameValid = validateLastName(lastName.value);
            const isEmailValid = validateEmail(email.value);
            const isMessageValid = validateMessage(message.value);
            console.log('firstName:', firstName.value)
            console.log('lastName:', lastName.value)
            console.log('email:', email.value)
            console.log('message:', message.value)
            if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
                modal.style.display = "none"
                layout.style.display = "block"
                console.log('formulaire valide')
                const div = document.getElementById('photograph-validation')
                div.textContent = "Votre formulaire a bien été envoyé"
            } else {
                console.log('formulaire invalide')
            }
        }
    }
}