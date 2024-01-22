import React  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";

function Field({ name, id, value, onChange, children }) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{children}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                id={id}
                name={name}
                className="form-control"
            />
        </div>
    );
}

function Checkbox({ name, value, onChange, children }) {
    return (
        <div className="form-check">
            <input
                type="checkbox"
                checked={value}
                onChange={onChange}
                id={name}
                name={name}
                className="form-check-input"
            />
            <label htmlFor={name} className="form-check-label">
                {children}
            </label>
        </div>
    );
}

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            passwords: [],
            email: "",
            mdp: "",
            index: 0,
            afficher: false,
            validEmail: false,
            validMdp: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.recup = this.recup.bind(this);
        this.envoi = this.envoi.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const type = e.target.type;
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        this.setState({
            [name]: value,
        });
    }
    recup() {
        const Url = "http://localhost:4000/connexion/email";
        const Url2 = "http://localhost:4000/connexion/pass";

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

    componentDidMount() {
        this.recup();
    }

    async envoi(e) {
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

        if (this.state.mdp === this.state.passwords[number]) {
            this.setState({
                validMdp: true,
            });
        } else {
            alert("Votre identifiant ou votre mot de passe ne correspond pas");
            return;
        }
        sessionStorage.setItem("email", this.state.email);
    }

    render() {
        if (this.state.validEmail && this.state.validMdp) {
            return <Navigate to="/Carte" />;
        }
        return (
            <div>
                <form className="container">
                    <Field
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    >
                        Identifiant
                    </Field>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        {this.state.afficher ? (
                            <input
                                className="form-control"
                                type="text"
                                name="mdp"
                                value={this.state.mdp}
                                onChange={this.handleChange}
                            />
                        ) : (
                            <input
                                className="form-control"
                                type="password"
                                name="mdp"
                                value={this.state.mdp}
                                onChange={this.handleChange}
                            />
                        )}
                        <Checkbox
                            name="afficher"
                            value={this.state.afficher}
                            onChange={this.handleChange}
                        >
                            afficher Mot de passe
                        </Checkbox>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            onClick={this.envoi}
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Connexion;
