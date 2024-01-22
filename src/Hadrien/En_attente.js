import React from "react";

class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoProfil: "",
        };
    }

    async handleFileUpload(event) {
        const file = event.target.files[0];

        try {
            // Envoyer le fichier au serveur
            const formData = new FormData();
            formData.append("image", file);

            await fetch("/upload", {
                method: "POST",
                body: formData,
            });
            this.setState({
                photoProfil: file.name,
            });
            // Le fichier a été téléchargé avec succès
            alert("Image téléchargée avec succès !");
        } catch (error) {
            console.error("Erreur lors du téléchargement de l'image :", error);
        }
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleFileUpload} />
            </div>
        );
    }
}

export default ImageUploader;
