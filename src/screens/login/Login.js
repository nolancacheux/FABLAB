import React from "react";
import "../../screens/login/login.css";
import "../../Hadrien/reset.css";
import PreLoader from "../../screens/preloader/PreLoader";
import { Navigate } from "react-router";
import image from "../../assets/images/arduino.png";
import Logo from "../../assets/images/LogoPreloader2.png";
import Cookies from "js-cookie";
import emailjs from "@emailjs/browser";
import bcrypt from 'bcryptjs';
import axios from 'axios';


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            prenom: "",
            email: "",
            isValidEmail: false,
            mdp: "",
            afficher: false,
            isValidPassword: false,
            stay: false,
            emails: [],
            emails2: [],
            passwords: [],
            creation: false,
            validEmail: false,
            validMdp: false,
            emailRecup: "",
            image: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.mailChange = this.mailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.envoi = this.envoi.bind(this);
        this.envoi2 = this.envoi2.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
        this.recup = this.recup.bind(this);
        this.isEmail = this.isEmail.bind(this);
        this.formulaireErreur = this.formulaireErreur.bind(this);
        this.checkCookieExists = this.checkCookieExists.bind(this);
        this.deleteCookie = this.deleteCookie.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.decryptageMdp = this.decryptageMdp.bind(this);
        this.cryptageMdp = this.cryptageMdp.bind(this);
    }

    // ! ---------- Envoyer un Email pour le mot de passe ----------//

    sendEmail(e) {
        e.preventDefault();
        for (let mail of this.state.emails) {
            if (mail === this.state.emailRecup) {
                emailjs.sendForm(
                    "service_249p0gv",
                    "template_p1517tb",
                    e.target,
                    "K-C4ATlcxBiCNFNF9"
                );
                alert("Un lien vous a été envoyé sur votre boite mail");
                this.setState({
                    emailRecup: "",
                });
                return;
            }
        }
        alert("Votre email n'existe pas. Veuillez créer votre compte HopBeer");
        this.setState({
            emailRecup: "",
        });
        return;
    }

    // ! ---------- Cookie ----------//

    checkCookieExists(cookieName) {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName + "=") === 0) {
                return true;
            }
        }

        return false;
    }

    deleteCookie(cookieName) {
        document.cookie =
            cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // ! ---------- Cryptage mot de passe ----------- //

    async cryptageMdp(e){

        try{
            let salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(e,salt)
            console.log(hash)
            return hash
        }catch(error){
            console.log(error.message)
        }
    }

    async decryptageMdp(e){

        try{
            let compare = await bcrypt.compare(this.state.mdp, e)
            if(compare === true){
                return true
            }else{
                return false
            }
        }catch(error){
            console.log(error.message)
        }
    }

    // ! ---------- Animation changement de page ----------//
    
    componentDidMount() {
        const bouton_connexion = document.querySelector("#lg-bouton-connexion");
        const bouton_inscription = document.querySelector( "#lg-bouton-inscription" );
        const menu = document.querySelector(".lg-menu");

        bouton_inscription.addEventListener("click", () => {
            menu.classList.add("mode");
        });

        bouton_connexion.addEventListener("click", () => {
            menu.classList.remove("mode");
        });

        // ! ---------- Animation changement des couleurs des îcones ----------//

        const inputs = document.querySelectorAll(".lg-input");
        function ajouter_couleur() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function supprimer_couleur() {
            let parent = this.parentNode.parentNode;
            if (this.value === "") {
                parent.classList.remove("focus");
            }
        }
        inputs.forEach((input) => {
            input.addEventListener("focus", ajouter_couleur);
            input.addEventListener("blur", supprimer_couleur);
        });

        // ! ---------- Cacher Décacher le mot de passe ----------//

        const passwords = document.querySelectorAll(".lg-div.lg-mdp");
        passwords.forEach(password => {
          const passField = password.querySelector("input");
          const showBtn = password.querySelector(".show_hide");
        
          showBtn.onclick = function () {
            if (passField.type === "password") {
              passField.type = "text";
              showBtn.classList.add("active");
            } else { 
              passField.type = "password";
              showBtn.classList.remove("active");
            }
          }
        });

        // ! ---------- Vérification Mot de passe (niveau de sécurisation) ----------//

        const showHide = document.getElementsByClassName("show_hide")[0];
        const indicat = document.getElementsByClassName("lg-indicat")[0];
        const iconText = document.getElementsByClassName("lg-icon-text")[0];
        const text = document.getElementsByClassName("lg-text")[0];
        const input = document.getElementById("lg-password");
        const faExclamationCircle = document.getElementById( "lg-exclamation-circle-for-pass" );
        const SaisieMotDePasse = document.getElementById("lg-SaisieMotDePasse");
        const cadenas = document.getElementById("lg-cadenas");
        let alphabet = /[a-zA-Z]/,
            numbers = /[0-9]/,
            scharacters = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~]/;
        input.addEventListener("keyup", () => {
            indicat.classList.add("active");
            let val = input.value;
            if (
                val.match(alphabet) ||
                val.match(numbers) ||
                val.match(scharacters)
            ) {
                text.textContent = "Mot de passe faiblement sécurisé";
                showHide.style.color = "var(--important)";
                cadenas.style.color = "var(--important)";
                iconText.style.color = "var(--important)";
                faExclamationCircle.style.color = "var(--important)";
                SaisieMotDePasse.style.border = "2px solid var(--important)";
            }
            if (val.match(alphabet) && val.match(numbers) && val.length >= 6) {
                text.textContent = "Mot de passe moyennement sécurisé";
                showHide.style.color = "var(--tertary)";
                iconText.style.color = "var(--tertary)";
                cadenas.style.color = "var(--tertary)";
                faExclamationCircle.style.color = "var(--tertary)";
                SaisieMotDePasse.style.border = "2px solid var(--tertary)";
            }
            if (
                val.match(alphabet) &&
                val.match(numbers) &&
                val.match(scharacters) &&
                val.length >= 8
            ) {
                text.textContent = "Mot de passe sécurisé";
                showHide.style.color = "#22C32A";
                iconText.style.color = "#22C32A";
                cadenas.style.color = "#22C32A";
                faExclamationCircle.style.color = "#22C32A";
                SaisieMotDePasse.style.border = "2px solid #22C32A";
            }
            if (val === "") {
                indicat.classList.remove("active");
                showHide.style.color = "#A6A6A6";
                iconText.style.color = "#A6A6A6";
                cadenas.style.color = "#A6A6A6";
                faExclamationCircle.style.color = "#A6A6A6";
                SaisieMotDePasse.style.border = "2px solid #f0f0f0";
            }
        });

        // ! ---------- Pop-Up Mot de passe oublié ----------//

        let popupsBtn = document.querySelectorAll("[data-popup-ref]");
        popupsBtn.forEach((btn) => {
            btn.addEventListener("click", activePopup);
            function activePopup() {
                let popupId = btn.getAttribute("data-popup-ref");
                let popup = document.querySelector(
                    `[data-popup-id='${popupId}']`
                );
                if (popup !== undefined && popup !== null) {
                    let popupContent = popup.querySelector(".lg-popup-content");
                    let closeBtns = popup.querySelectorAll(
                        "[data-dismiss-popup]"
                    );
                    closeBtns.forEach((btn) => {
                        btn.addEventListener("click", onPopupClose);
                    });
                    popup.addEventListener("click", onPopupClose);
                    popupContent.addEventListener("click", (ev) => {
                        ev.stopPropagation();
                    });
                    popup.classList.add("active");
                    setTimeout(() => {
                        popupContent.classList.add("active");
                    }, 1);
                    function onPopupClose() {
                        setTimeout(() => {
                            popup.classList.remove("active");
                        }, 250);
                        popupContent.classList.remove("active");
                    }
                }
            }
        });
        
        // ! ---------- Cookie ----------//

        const Url = "http://51.254.38.150:3000/connexion/email";
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch(Url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const emails = JSON.parse(result);
                this.setState({ emails });
            })
            .catch((error) => console.log("error", error));
        this.recup();
        if (this.checkCookieExists("email") && this.checkCookieExists("mdp")) {
            const email = Cookies.get("email");
            const mdp = Cookies.get("mdp");
            this.setState({
                email: email,
                mdp: mdp,
                stay: true,
            });
        }
    }

    //! ---------- Vérification formulaire (message d'erreur) ----------//

    formulaireErreur() {
        const man = document.getElementById("lg-man");
        const names = document.getElementById("lg-names");
        const username = document.getElementById("lg-username");
        const email = document.getElementById("lg-email");
        const homme = document.getElementById("lg-homme");
        const lettre = document.getElementById("lg-lettre");
        const manerror = document.getElementById("lg-manerror");
        const usererror = document.getElementById("lg-usererror");
        const emailerror = document.getElementById("lg-emailerror");
        const message = document.getElementsByClassName("lg-message");
        const sucess = document.getElementsByClassName("sucess");
        const error = document.getElementsByClassName("error");
        const SaisieMotDePasses = document.getElementById( "lg-SaisieMotDePasse" );
        const Input = document.getElementById("lg-password");
        const cadenass = document.getElementById("lg-cadenas");
        const showHides = document.getElementsByClassName("show_hide")[0];
        let v = 0;
        let u = 0;
        let e = 0;
        let p1 = 0;
        if (names.value === "") {
            manerror.style.border = "2px solid var(--important)";
            message[0].style.visibility = "visible";
            message[0].style.color = "var(--important)";
            message[0].innerText = "Le prénom ne peut pas être vide";
            error[0].style.visibility = "visible";
            error[0].style.color = "var(--important)";
            man.style.color = "var(--important)";
            sucess[0].style.visibility = "hidden";
            v = 0;
        } else {
            manerror.style.border = "2px solid #22C32A";
            error[0].style.visibility = "hidden";
            message[0].style.visibility = "visible";
            message[0].style.color = "#22C32A";
            message[0].innerText = "Correcte";
            sucess[0].style.visibility = "visible";
            sucess[0].style.color = "#22C32A";
            man.style.color = "#22C32A";
            v = 1;
        }
        if (username.value === "") {
            usererror.style.border = "2px solid var(--important)";
            message[1].style.visibility = "visible";
            message[1].style.color = "var(--important)";
            message[1].innerText = "Le nom ne peut pas être vide";
            error[1].style.visibility = "visible";
            error[1].style.color = "var(--important)";
            homme.style.color = "var(--important)";
            sucess[1].style.visibility = "hidden";
            u = 0;
        } else {
            usererror.style.border = "2px solid #22C32A";
            error[1].style.visibility = "hidden";
            message[1].style.visibility = "visible";
            message[1].style.color = "#22C32A";
            message[1].innerText = "Correcte";
            sucess[1].style.visibility = "visible";
            sucess[1].style.color = "#22C32A";
            homme.style.color = "#22C32A";
            u = 1;
        }
        if (email.value === "") {
            emailerror.style.border = "2px solid var(--important)";
            message[2].style.visibility = "visible";
            message[2].style.color = "var(--important)";
            message[2].innerText = "L'email ne peut pas être vide";
            error[2].style.visibility = "visible";
            error[2].style.color = "var(--important)";
            lettre.style.color = "var(--important)";
            e = 0;
        } else if (!this.isEmail(email.value)) {
            emailerror.style.border = "2px solid var(--important)";
            message[2].style.visibility = "visible";
            message[2].style.color = "var(--important)";
            message[2].innerText = "Email invalide";
            error[2].style.visibility = "visible";
            error[2].style.color = "var(--important)";
            lettre.style.color = "var(--important)";
            e = 0;
        } else {
            emailerror.style.border = "2px solid #22C32A";
            error[2].style.visibility = "hidden";
            message[2].style.visibility = "visible";
            message[2].style.color = "#22C32A";
            message[2].innerText = "Correcte";
            sucess[2].style.visibility = "visible";
            sucess[2].style.color = "#22C32A";
            lettre.style.color = "#22C32A";
            e = 1;
        }
        if (Input.value === "") {
            SaisieMotDePasses.style.border = "2px solid var(--important)";
            showHides.style.color = "var(--important)";
            cadenass.style.color = "var(--important)";
            p1 = 0;
        }
        if (v === 1 && u === 1 && e === 1 && p1 === 1) {
            return true;
        } else {
            return false;
        }
    }
    isEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }
    
    // ! ---------- Changer Mdp & mail ----------//

    handleChange(e) {
        const name = e.target.name;
        const type = e.target.type;
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]: value,
        });
    }
    handlePhotoChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                image: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }

    mailChange(e) {
        const email = e.target.value; 
        const myRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        const isValidEmail = myRegex.test(email);
        this.setState({
            email: email,
            isValidEmail: isValidEmail,
        });
    }
    recup() {
        const Url = "http://51.254.38.150:3000/connexion/email";
        const Url2 = "http://51.254.38.150:3000/connexion/pass";
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch(Url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const emails2 = JSON.parse(result);
                this.setState({ emails2 });
            })
            .catch((error) => console.log("error", error));
            var requestOptions2 = {
                method: "GET",
                redirect: "follow",
            };
        fetch(Url2, requestOptions2)
            .then((response) => response.text())
            .then((result) => {
                const passwords = JSON.parse(result);
                this.setState({ passwords });
            })
            .catch((error) => console.log("error", error));
    }
    passwordChange(e) {
        const pass = e.target.value; 
        const myRegex =
        /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        const isValidPassword = myRegex.test(pass);
        this.setState({
            mdp: pass,
            isValidPassword: isValidPassword,
        });
    }
    
    // ! ---------- Envoyer le formulaire ----------//

    async envoi(e) {
        e.preventDefault();
        if (
            this.state.nom.trim() === "" ||
            this.state.prenom.trim() === "" ||
            !this.state.isValidEmail ||
            !this.state.isValidPassword
        ) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }
        for (let mail of this.state.emails) {
            if (this.state.email === mail) {
                alert(
                    "Votre addresse email est déjè dans notre base. Vueillez en saisir une nouvelle ou vous connecter"
                );
                return;
            }
        }
        this.cryptageMdp(this.state.mdp)
  .then(hash => {
    this.setState({ mdp: hash }, () => {
      // Suite de votre code ici après la mise à jour de l'état
      
       const baseURL = `https://192.168.184.122:1234/users/register`;
       const data = JSON.stringify(this.state);
       console.log(data);
       const headers = {
         'Content-Type': 'application/json', // Spécifiez le type de contenu si nécessaire
         'Access-Control-Allow-Origin':'*',
       };
       axios.post(baseURL,data,{ headers })
         .then(res => {
             const persons = res.data;
         })
      this.setState({
        nom: "",
        prenom: "",
        abon: false,
        genre: "",
        email: "",
        isValidEmail: false,
        mdp: "",
        afficher: false,
        isValidPassword: false,
        creation: true,
        image: null,
      });
      sessionStorage.setItem("email", this.state.email);
    });
  })
  .catch(error => {
    console.log(error.message);
  });
}
    async envoi2(e) {
        e.preventDefault();
        if (this.state.email.trim() === "" || this.state.mdp.trim() === "") {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        let number = 0;
        for (let mail of this.state.emails) {
            if (this.state.email === mail) {
                this.setState({
                    validEmail: true,
                });
                break;
            } else {
                number += 1;
            }
        }
        if (number >= this.state.emails.length) {
            alert(
                "Votre nom d'utilisateur ou votre mot de passe ne correspond pas"
            );
            return;
        }
        if (bcrypt.compareSync(this.state.mdp, this.state.passwords[number])) {
            this.setState({
              validMdp: true,
            });
        } else {
            alert("Votre identifiant ou votre mot de passe ne correspond pas");
            return;
        }
        sessionStorage.setItem("email", this.state.email);
        if (this.state.stay) {
            Cookies.set("email", this.state.email);
            Cookies.set("mdp", this.state.mdp);
        }
        if (!this.state.stay) {
            this.deleteCookie("email");
            this.deleteCookie("msp");
        }
    }
    render() {
        
        // ! ---------- Changement de Page ----------//

        if (
            this.state.creation ||
            (this.state.validEmail && this.state.validMdp)
        ) {
            return <Navigate to="/Carte" />;
        }

        // ! ---------- Front-End de la page Login ----------//

        return (
            <div className="lg-menu">
                <PreLoader></PreLoader>
                <div className="lg-formulaire">
                    <div className="lg-inscription-connexion">
                        {/* Formulaire : Se Connecter */}
                        <form className="lg-formulaire-connexion" id="lg-forms">
                            <h2>Se Connecter</h2>
                            <div className="lg-champ-de-saisie">
                                <i className="fas fa-envelope"></i>
                                <div className="lg-div">
                                    <input type="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" className="lg-input"/>
                                </div>
                            </div>
                            <div className="lg-champ-de-saisie">
                                <i className="fas fa-lock"></i>
                                <div className="lg-div lg-mdp">
                                    <input type="password"  name="mdp" onChange={this.handleChange} value={this.state.mdp} spellCheck="false" placeholder="Mot de passe" className="lg-input"/>
                                    <span className="lg-show-btn">
                                        <i className="fas fa-eye show_hide"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="lg-option">
                                <label className="lg-checkbox">
                                    <div className="lg-form-group">
                                        <input type="checkbox" name="stay" onChange={this.handleChange} checked={this.state.stay} id="web-developer" />
                                        <label htmlFor="web-developer">
                                            <span className="lg-checkbox">
                                                <span className="lg-check"></span>
                                            </span>
                                            <span>Rester connecté</span>
                                        </label>
                                    </div>
                                </label>
                                <div className="lg-espace"></div>
                                <a data-popup-ref="lg-monPopup"> Oops, un trou de mémoire? </a>
                            </div>
                            <input type="submit" onClick={this.envoi2}  name="identifier" className="lg-bouton"  value="Se connecter" />
                            <p>Ou se connecter avec un reseau social</p>
                            <div className="lg-reseau-sociaux">
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </form>
                        {/* Formulaire : S'inscrire */}
                        <form name="sign-up" className="lg-formulaire-inscription" id="lg-form" >
                            <h2>S'inscrire</h2>
                            <div className="lg-champ-de-saisie" id="lg-manerror" >
                                <i className="fas fa-book" id="lg-man"></i>
                                <div className="lg-div">
                                    <input type="text" onInput={this.formulaireErreur} onChange={this.handleChange} name="prenom" placeholder="Prenom" className="lg-input" id="lg-names" />
                                    <div className="lg-icones">
                                        <i className="fas sucess">&#xf058;</i>
                                        <i className="fas error">&#xf06a;</i>
                                    </div>
                                    <small className="lg-message">
                                        error message
                                    </small>
                                </div>
                            </div>
                            <div className="lg-champ-de-saisie" id="lg-usererror" >
                                <i className="fas fa-user" id="lg-homme"></i>
                                <div className="lg-div">
                                    <input type="text" onInput={this.formulaireErreur} onChange={this.handleChange} name="nom" placeholder="Nom" className="lg-input" id="lg-username" />
                                    <div className="lg-icones">
                                        <i className="fas sucess">&#xf058;</i>
                                        <i className="fas error">&#xf06a;</i>
                                        <small className="lg-message">
                                            error message
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="lg-champ-de-saisie" id="lg-emailerror" >
                                <i className="fas fa-envelope" id="lg-lettre" ></i>
                                <div className="lg-div">
                                    <input type="email" onInput={this.formulaireErreur} onChange={this.mailChange} name="email" placeholder="Email" className="lg-input" id="lg-email" />
                                    <div className="lg-icones">
                                        <i className="fas sucess">&#xf058;</i>
                                        <i className="fas error">&#xf06a;</i>
                                    </div>
                                    <small className="lg-message">
                                        error message
                                    </small>
                                </div>
                            </div>
                            <div className="lg-champ-de-saisie" id="lg-SaisieMotDePasse" >
                                <i className="fas fa-lock" id="lg-cadenas"></i>
                                <div className="lg-div lg-mdp">
                                    <input type="password" spellCheck="false"  name="mdp" placeholder="Mot de passe" className="lg-input" id="lg-password"  onChange={this.passwordChange} />
                                    <span className="lg-show-btn">
                                        <i className="fas fa-eye show_hide"></i>
                                    </span>
                                </div>
                                <div className="lg-indicat">
                                    <div className="lg-icon-text">
                                        <i className="fas fa-exclamation-circle lg-error_icon" id="lg-exclamation-circle-for-pass" ></i>
                                        <h6 className="lg-text"> </h6>
                                    </div>
                                </div>
                            </div>
                            <input  type="submit" className="lg-bouton"  onClick={this.envoi}  name="inscrire"  value="S'inscrire" id="lg-btn" />
                            <p>Ou se connecter avec un reseau social</p>
                            <div className="lg-reseau-sociaux">
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="/" className="lg-icone">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                    {/* Pop-up Mot de Passe Oublié */}
                    <div className="lg-popup" data-popup-id="lg-monPopup">
                        <div className="lg-popup-content">
                            <span  className="lg-btn-close"  data-dismiss-popup >&times;</span>
                            <form onSubmit={this.sendEmail} className="lg-contact_form"  method="post" >
                                <h2>Mot de passe oublié</h2>
                                <p>Entrez votre adresse e-mail pour recevoir instructions sur la façon de réinitialiser votre mot de passe.</p>
                                <div className="lg-champ-de-saisie">
                                    <i className="fas fa-envelope"></i>
                                    <div className="lg-div">
                                        <input type="email" name="emailRecup" onChange={this.handleChange} value={this.state.emailRecup} placeholder="Email" id="lg-emails" className="lg-input"  />
                                    </div>
                                </div>
                                <input type="submit" className="lg-bouton" name="inscrire"  value="Envoyer" />
                            </form>
                        </div>
                    </div>
                    <div className="lg-panneaux">
                        {/* Panneau Gauche : S'inscrire */}
                        <div className="lg-panneau lg-panneau-gauche">
                            <div className="lg-contenu">
                                <h3>Nouveau ici ?</h3>
                                <p>Accèdez à votre espace FABLAB en ligne 💻</p>
                                <button className="lg-bouton lg-transparent" id="lg-bouton-inscription" >S'inscrire</button>
                            </div>
                            <img src={image} className="lg-image" alt="Carte" />
                        </div>
                        {/* Panneau Droite : Se Connecter */}
                        <div className="lg-panneau lg-panneau-droit">
                            <div className="lg-contenu">
                                <h3></h3>
                                <p>{" "}</p>
                                <button className="lg-bouton lg-transparent" id="lg-bouton-connexion" >S'inscrire</button>
                            </div>
                            <img src={Logo} className="lg-image" alt="Beer" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
