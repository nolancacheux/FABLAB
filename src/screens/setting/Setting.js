import React from "react";
import "./../../screens/setting/setting.css";
import "./../../components/header/header.css";
import "../../screens/profil/profil.css";
import Header from "./../../components/header/Header";
import "../../Hadrien/reset.css";
import Navigation from "./../../components/navigation/Navigation";
import PP from "../../assets/images/Profil.png";
import { Navigate } from "react-router";
import bcrypt from "bcryptjs";
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nom: "",
      prenom: "",
      email: "",
      emailTmp: "",
      isValidEmail: true,
      mdp: "",
      afficher: false,
      isValidPassword: true,
      emails: [],
      passwords: [],
      delete: false,
      validEmail: true,
      validMdp: false,
      nouveauMdp: "",
      ville: "",
      pays: "",
      description: "",
      emailRecup: "",
      image: "",
      imageStyle: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.mailChange = this.mailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.envoi = this.envoi.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.recup = this.recup.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.formulaireErreur = this.formulaireErreur.bind(this);
    this.cancel = this.cancel.bind(this);
    this.modifacate = this.modifacate.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteCookie = this.deleteCookie.bind(this);
  }
  // ! ---------- Fonction cryptage mot de passe -----------------//
  async cryptageMdp(e) {
    try {
      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(e, salt);
      console.log(hash);
      return hash;
    } catch (error) {
      console.log(error.message);
    }
  }

  async componentDidMount() {
    this.recup();
    // ! ---------- Fonction pour afficher le formulaire d'édition ----------//

    const btnModificate = document.getElementById("stg-btn-modificate");
    const btnCancel = document.getElementById("stg-btn-cancel");
    const btnValidate = document.getElementById("stg-btn-validate");
    const inputsDisabled = document.querySelectorAll(".stg-input[disabled]");
    const man = document.getElementById("stg-man");
    const homme = document.getElementById("stg-homme");
    const lettre = document.getElementById("stg-lettre");
    const manerror = document.getElementById("stg-manerror");
    const usererror = document.getElementById("stg-usererror");
    const emailerror = document.getElementById("stg-emailerror");
    const message = document.getElementsByClassName("stg-message");
    const sucess = document.getElementsByClassName("sucess");
    const error = document.getElementsByClassName("error");

    btnModificate.addEventListener("click", function () {
      this.style.display = "none";
      btnCancel.style.display = "inline-block";
      btnValidate.style.display = "inline-block";
      inputsDisabled.forEach((input) => {
        input.removeAttribute("disabled");
      });
    });
    btnCancel.addEventListener("click", function () {
      this.style.display = "none";
      btnValidate.style.display = "none";
      btnModificate.style.display = "inline-block";
      inputsDisabled.forEach((input) => {
        input.setAttribute("disabled", true);
      });
      inputsDisabled.forEach((label) => {
        label.setAttribute("disabled", true);
      });
      manerror.style.borderColor = "#f0f0f0";
      usererror.style.borderColor = "#f0f0f0";
      emailerror.style.borderColor = "#f0f0f0";
      message[0].style.visibility = "hidden";
      message[1].style.visibility = "hidden";
      message[2].style.visibility = "hidden";
      text.style.visibility = "hidden";
      error[0].style.visibility = "hidden";
      error[1].style.visibility = "hidden";
      error[2].style.visibility = "hidden";
      sucess[0].style.visibility = "hidden";
      sucess[1].style.visibility = "hidden";
      sucess[2].style.visibility = "hidden";
      faExclamationCircle.style.visibility = "hidden";
      man.style.color = "#A6A6A6";
      homme.style.color = "#A6A6A6";
      lettre.style.color = "#A6A6A6";
      showHide.style.color = "#A6A6A6";
      iconText.style.color = "#A6A6A6";
      cadenas.style.color = "#A6A6A6";
      SaisieMotDePasse.style.border = "2px solid #f0f0f0";
      for (let i = 0; i < inputsDisabled.length; i++) {
        const input = inputsDisabled[i];
        const oldValue = input.getAttribute("data-old-value");
        input.value = oldValue;
      }
    });

    //! ---------- Cacher Décacher le mot de passe ----------//

    const passwords = document.querySelectorAll(".stg-mdp");
    passwords.forEach((password) => {
      const passField = password.querySelector("input");
      const showBtn = password.querySelector("i");
      showBtn.onclick = function () {
        if (passField.type === "password") {
          passField.type = "text";
          showBtn.classList.add("active");
        } else {
          passField.type = "password";
          showBtn.classList.remove("active");
        }
      };
    });

    // ! ---------- Vérification Mot de passe (niveau de sécurisation) ----------//

    const showHide = document.getElementsByClassName("show_hide")[0];
    const indicator = document.getElementsByClassName("stg-indicate")[0];
    const iconText = document.getElementsByClassName("stg-icon-text")[0];
    const text = document.getElementsByClassName("stg-text")[0];
    const input = document.getElementById("stg-password");
    const faExclamationCircle = document.getElementById(
      "stg-exclamation-circle-for-pass"
    );
    const SaisieMotDePasse = document.getElementById("stg-SaisieMotDePasse");
    const cadenas = document.getElementById("stg-cadenas");
    let alphabet = /[a-zA-Z]/,
      numbers = /[0-9]/,
      scharacters = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~]/;
    input.addEventListener("keyup", () => {
      indicator.classList.add("active");
      let val = input.value;
      if (val.match(alphabet) || val.match(numbers) || val.match(scharacters)) {
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
        indicator.classList.remove("active");
        showHide.style.color = "#A6A6A6";
        iconText.style.color = "#A6A6A6";
        cadenas.style.color = "#A6A6A6";
        faExclamationCircle.style.color = "#A6A6A6";
        SaisieMotDePasse.style.border = "2px solid #f0f0f0";
      }
    });

    // ! ---------- Recherche de la ville ----------//

    const recherche = document.getElementById("stg-BarrePays");
    let infos_villes;
    try {
      const res = await fetch("../../ville.json");
      infos_villes = await res.json();
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données JSON :",
        error
      );
    }
    recherche.addEventListener("input", () => {
      const search_val = recherche.value.toUpperCase();
      const liste_res = document.getElementById("stg-liste_resultatsPays");
      liste_res.innerHTML = "";
      if (search_val && infos_villes) {
        for (let i = 0; i < infos_villes.length; i++) {
          const name_fr = infos_villes[i].Nom_commune.toUpperCase();
          if (name_fr.startsWith(search_val)) {
            const element = document.createElement("li");
            element.innerText = infos_villes[i].Nom_commune;
            element.id = i;
            element.onclick = () => {
              this.setState({ ville: infos_villes[i].Nom_commune });
              liste_res.style.display = "none";
            };
            liste_res.append(element);
          }
        }
      }
      if (search_val === "") {
        liste_res.style.display = "none";
      } else {
        liste_res.style.display = "block";
      }
    });

    // ! ---------- Recherche de la Langue ----------//

    const recherchePays = document.getElementById("stg-BarreLangue");
    let pays;
    try {
      const res = await fetch("../../langue.json");
      pays = await res.json();
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données JSON :",
        error
      );
    }
    recherchePays.addEventListener("input", () => {
      const search_val = recherchePays.value.toUpperCase();
      const liste_res = document.getElementById("stg-liste_resultatsLangue");
      liste_res.innerHTML = "";
      if (search_val && pays) {
        for (let i = 0; i < pays.length; i++) {
          const name_fr = pays[i].name_fr.toUpperCase();
          if (name_fr.startsWith(search_val)) {
            const element = document.createElement("li");
            element.innerText = pays[i].name_fr.toUpperCase();
            element.id = i;
            element.onclick = () => {
              this.setState({ pays: pays[i].name_fr.toUpperCase() });
              liste_res.style.display = "none";
            };
            liste_res.append(element);
          }
        }
      }
      if (search_val === "") {
        liste_res.style.display = "none";
      } else {
        liste_res.style.display = "block";
      }
    });
  }
  deleteCookie(cookieName) {
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // ! ---------- Fonction Poto de profil ----------//

  handleImageUpload = async (e) => {
    const file = e.target.files[0];
    try {
      // Envoyer le fichier au serveur
      const formData = new FormData();
      formData.append("image", file);

      await fetch("http://51.254.38.150:3000/connexion/upload", {
        // Modifier le chemin d'accès au serveur si nécessaire
        method: "POST",
        body: formData,
      });
      console.log(file.name);
      this.setState({
        image: file.name,
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageURL = e.target.result;
        const image = new Image();
        image.src = imageURL;
        image.onload = () => {
          const imageSize = Math.min(image.width, image.height);
          const imageStyle = `background-image: url(${imageURL});`;
          this.setState({ imageStyle: imageURL });
        };
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
    }
  };

  // ! ---------- Fonction Formulaire de Modification ----------//

  formulaireErreur() {
    const man = document.getElementById("stg-man");
    const names = document.getElementById("stg-names");
    const username = document.getElementById("stg-username");
    const email = document.getElementById("stg-email");
    const homme = document.getElementById("stg-homme");
    const lettre = document.getElementById("stg-lettre");
    const manerror = document.getElementById("stg-manerror");
    const usererror = document.getElementById("stg-usererror");
    const emailerror = document.getElementById("stg-emailerror");
    const message = document.getElementsByClassName("stg-message");
    const sucess = document.getElementsByClassName("sucess");
    const error = document.getElementsByClassName("error");
    const SaisieMotDePasses = document.getElementById("stg-SaisieMotDePasse");
    const Input = document.getElementById("stg-password");
    const cadenass = document.getElementById("stg-cadenas");
    const showHides = document.getElementsByClassName("show_hide")[0];
    let v = 0;
    let u = 0;
    let e = 0;
    let p1 = 0;

    if (names.value === "") {
      manerror.style.borderColor = "var(--important)";
      message[0].style.visibility = "visible";
      message[0].style.color = "var(--important)";
      message[0].innerText = "Le prénom ne peut pas être vide";
      error[0].style.visibility = "visible";
      error[0].style.color = "var(--important)";
      man.style.color = "var(--important)";
      sucess[0].style.visibility = "hidden";
      v = 0;
    } else {
      manerror.style.borderColor = "#22C32A";
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
      usererror.style.borderColor = "var(--important)";
      message[1].style.visibility = "visible";
      message[1].style.color = "var(--important)";
      message[1].innerText = "Le nom ne peut pas être vide";
      error[1].style.visibility = "visible";
      error[1].style.color = "var(--important)";
      homme.style.color = "var(--important)";
      sucess[1].style.visibility = "hidden";
      u = 0;
    } else {
      usererror.style.borderColor = "#22C32A";
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
      emailerror.style.borderColor = "var(--important)";
      message[2].style.visibility = "visible";
      message[2].style.color = "var(--important)";
      message[2].innerText = "L'email ne peut pas être vide";
      error[2].style.visibility = "visible";
      error[2].style.color = "var(--important)";
      lettre.style.color = "var(--important)";
      e = 0;
    } else if (!this.isEmail(email.value)) {
      emailerror.style.borderColor = "var(--important)";
      message[2].style.visibility = "visible";
      message[2].style.color = "var(--important)";
      message[2].innerText = "Email invalide";
      error[2].style.visibility = "visible";
      error[2].style.color = "var(--important)";
      lettre.style.color = "var(--important)";
      e = 0;
    } else {
      emailerror.style.borderColor = "#22C32A";
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
      SaisieMotDePasses.style.borderColor = "var(--important)";
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
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  // ! ---------- Modification Back ----------//

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
    const myRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = myRegex.test(email);
    this.setState({
      email: email,
      isValidEmail: isValidEmail,
    });
  }

  cancel() {
    const email = sessionStorage.getItem("email");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("http://51.254.38.150:3000/connexion/" + email, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { id, prenom, nom, email, mdp, ville, pays, description, image } =
          result;
        this.setState({
          id,
          prenom,
          nom,
          email,
          mdp,
          ville,
          pays,
          description,
          image,
        });
        this.setState({ emailTmp: email }, () => {
          if (this.state.image !== null && this.state.image !== "") {
            var requestOptions2 = {
              method: "GET",
              redirect: "follow",
            };
            fetch(
              "http://51.254.38.150:3000/connexion/photo/" + this.state.image,
              requestOptions2
            )
              .then((response) => response.blob())
              .then((blob) => {
                const imageURL = URL.createObjectURL(blob);
                this.setState({ imageStyle: imageURL }, () => {
                  this.forceUpdate(); // Forcer le composant à se rendre à nouveau
                });
              })
              .catch((error) =>
                console.log(
                  "Erreur lors de la récupération de l'image :",
                  error
                )
              );
          } else {
            this.setState({ imageStyle: PP }, () => {
              this.forceUpdate(); // Forcer le composant à se rendre à nouveau
            });
          }
        });
        return email;
      })
      .catch((error) =>
        console.log(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        )
      );
  }

  modifacate(e) {
    e.preventDefault();
    if (
      this.state.nom.trim() === "" ||
      this.state.prenom.trim() === "" ||
      !this.state.isValidEmail ||
      (!this.state.isValidPassword && this.state.nouveauMdp === '')
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    for (let mail of this.state.emails) {
      if (
        this.state.emailTmp === mail &&
        this.state.emailTmp !== this.state.email
      ) {
        alert(
          "Votre addresse email est déjè dans notre base. Vueillez en saisir une nouvelle ou vous connecter"
        );
        return;
      }
    }
    if (this.state.nouveauMdp === '') {
      const baseURL = "http://51.254.38.150:3000/connexion/" + this.state.id;
      const { id, prenom, nom, email, ville, pays, image, description } =
        this.state;
      const data = JSON.stringify({
        id,
        prenom,
        nom,
        email,
        ville,
        pays,
        image,
        description,
      });
      console.log(data);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      };
      fetch(baseURL, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      sessionStorage.setItem("email", this.state.email);
      alert("Votre profil a bien été modifié");
    } else {
      this.cryptageMdp(this.state.nouveauMdp).then((hash) => {
        this.setState({ mdp: hash }, () => {
          const baseURL = "http://51.254.38.150:3000/connexion/" + this.state.id;
          const {
            id,
            prenom,
            nom,
            email,
            mdp,
            ville,
            pays,
            image,
            description,
          } = this.state;
          const data = JSON.stringify({
            id,
            prenom,
            nom,
            email,
            mdp,
            ville,
            pays,
            image,
            description,
          });
          console.log(data);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: data,
            redirect: "follow",
          };
          fetch(baseURL, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
          sessionStorage.setItem("email", this.state.email);
          alert("Votre profil a bien été modifié");
        });
      });
    }
  }

  delete() {
    const baseUrl = "http://51.254.38.150:3000/connexion/" + this.state.id;
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(baseUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          this.setState({ delete: true });
          console.log("Suppression réussie !");
          alert("Votre profil a été supprimé");
        } else {
          console.log("Échec de la suppression !");
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la suppression :", error);
      });
    this.deleteCookie("email");
    this.deleteCookie("msp");
  }

  recup() {
    this.cancel();
    const Url = "http://51.254.38.150:3000/connexion/email";
    const Url2 = "http://51.254.38.150:3000/connexion/pass";
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
    const myRegex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const isValidPassword = myRegex.test(pass);
    this.setState({
      mdp: pass,
      isValidPassword: isValidPassword,
    });
  }
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
      if (
        this.state.emailTmp === mail &&
        this.state.emailTmp !== this.state.email
      ) {
        alert(
          "Votre addresse email est déjè dans notre base. Vueillez en saisir une nouvelle ou vous connecter"
        );
        return;
      }
    }
    const baseURL = "http://51.254.38.150:3000/connexion";
    const data = JSON.stringify(this.state);
    console.log(data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };
    fetch(baseURL, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
  }

  //! Front-End de la page Settings !//

  render() {
    if (this.state.delete) {
      return <Navigate to="/" />;
    }
    return (
      <div>
        <Header
          icon={"construct-outline"}
          title={"Paramètre"}
          position={false}
        ></Header>
        <section
          className="setting"
          style={{
            height: "68vh",
            width: "100%",
            padding: "0px 30px",
            maxHeight: "calc(100vh - 10vh)",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <form
            method="post"
            name="sign-up"
            className="stg-forms"
            id="stg-form"
          >
            <div className="stg-left">
              <h2>Prenom</h2>
              <div className="stg-champ-de-saisie" id="stg-manerror">
                <i className="fas fa-book" id="stg-man" />
                <div className="stg-div">
                  <input
                    type="text"
                    onInput={this.formulaireErreur}
                    name="prenom"
                    placeholder="Prenom"
                    value={this.state.prenom}
                    onChange={this.handleChange}
                    className="stg-input"
                    id="stg-names"
                    disabled
                  />
                  <div className="stg-icones">
                    <i className="fas sucess"></i>
                    <i className="fas error"></i>
                  </div>
                  <small className="stg-message">error message</small>
                </div>
              </div>
              <h2>Nom</h2>
              <div className="stg-champ-de-saisie" id="stg-usererror">
                <i className="fas fa-user" id="stg-homme" />
                <div className="stg-div">
                  <input
                    type="text"
                    onInput={this.formulaireErreur}
                    name="nom"
                    placeholder="Nom"
                    value={this.state.nom}
                    onChange={this.handleChange}
                    className="stg-input"
                    id="stg-username"
                    disabled
                  />
                  <div className="stg-icones">
                    <i className="fas sucess"></i>
                    <i className="fas error"></i>
                  </div>
                  <small className="stg-message">error message</small>
                </div>
              </div>
              <h2>Email</h2>
              <div className="stg-champ-de-saisie" id="stg-emailerror">
                <i className="fas fa-envelope" id="stg-lettre" />
                <div className="stg-div">
                  <input
                    type="email"
                    onInput={this.formulaireErreur}
                    name="email"
                    placeholder="Email"
                    value={this.state.emailTmp}
                    onChange={this.mailChange}
                    className="stg-input"
                    id="stg-email"
                    disabled
                  />
                  <div className="stg-icones">
                    <i className="fas sucess"></i>
                    <i className="fas error"></i>
                  </div>
                  <small className="stg-message">error message</small>
                </div>
              </div>
              <h2>Mot de Passe</h2>
              <div className="stg-champ-de-saisie" id="stg-SaisieMotDePasse">
                <i className="fas fa-lock" id="stg-cadenas" />
                <div className="stg-div stg-mdp">
                  <input
                    type="password"
                    spellCheck="false"
                    name="mdp"
                    placeholder="Mot de passe"
                    value={this.state.nouveauMdp}
                    onChange={this.passwordChange}
                    className="stg-input"
                    id="stg-password"
                    disabled
                  />
                  <span className="stg-show-btn">
                    <i className="fas fa-eye show_hide" />
                  </span>
                </div>
                <div className="stg-indicate">
                  <div className="stg-icon-text">
                    <i
                      className="fas fa-exclamation-circle error_icon"
                      id="stg-exclamation-circle-for-pass"
                    />
                    <h6 className="stg-text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="stg-right">
              <div className="stg-explication">
                <div className="stg-profil">
                  <h2>Profil </h2>
                  <div id="stg-image-container">
                    <div
                      id="stg-image-preview"
                      style={{
                        backgroundImage: `url(${this.state.imageStyle})`,
                      }}
                      ref={(ref) => (this.imagePreview = ref)}
                    ></div>
                    <input
                      type="file"
                      id="stg-image-upload"
                      accept="image/*"
                      onChange={this.handleImageUpload}
                    />
                    <label
                      className="stg-input"
                      htmlFor="stg-image-upload"
                      id="stg-add-button"
                    >
                      <i className="fas fa-plus" />
                    </label>
                  </div>
                </div>
                <div className="stg-description">
                  <h2>Description</h2>
                  <textarea
                    className="stg-input"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    id="stg-area"
                    disabled
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="stg-choice">
                <div className="stg-localisation">
                  <h2>Ville</h2>
                  <div className="stg-city">
                    <i className="fas fa-globe" />
                    <input
                      className="stg-Ville stg-input"
                      name="ville"
                      type="text"
                      value={this.state.ville}
                      placeholder="Tapez votre ville"
                      onChange={this.handleChange}
                      id="stg-BarrePays"
                      disabled
                    />
                  </div>
                  <ul id="stg-liste_resultatsPays" />
                </div>
                <div className="stg-localisation">
                  <h2>Langue</h2>
                  <div className="stg-city">
                    <i className="fas fa-language" />
                    <input
                      className="stg-Ville stg-input"
                      name="pays"
                      type="text"
                      value={this.state.pays}
                      onChange={this.handleChange}
                      placeholder="Tapez votre langue"
                      id="stg-BarreLangue"
                      disabled
                    />
                  </div>
                  <ul id="stg-liste_resultatsLangue" />
                </div>
              </div>
              <div className="stg-coordination">
                <button
                  type="button"
                  className="stg-bouton"
                  id="stg-btn-modificate"
                >
                  {" "}
                  Modifier{" "}
                </button>
                <div className="stg-modification">
                  <input
                    type="submit"
                    className="stg-bouton"
                    name="inscrire"
                    onClick={this.modifacate}
                    defaultValue="Validate"
                    id="stg-btn-validate"
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="stg-bouton"
                    id="stg-btn-cancel"
                    onClick={this.cancel}
                    style={{ display: "none" }}
                  >
                    {" "}
                    Annuler{" "}
                  </button>
                </div>
                <button
                  type="button"
                  className="stg-bouton"
                  onClick={this.delete}
                  id="stg-btn-delete"
                >
                  {" "}
                  Supprimer{" "}
                </button>
              </div>
            </div>
          </form>
        </section>
        <Navigation
          library={false}
          search={false}
          map={false}
          profil={false}
          setting={true}
          position={false}
        />
        ;
      </div>
    );
  }
}

export default Setting;
