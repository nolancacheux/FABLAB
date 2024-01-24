import React, { useEffect } from "react";
import gsap from "gsap";
import "../../screens/preloader/preloader.css";
import "../../Hadrien/reset.css";
import Logo from "../../assets/images/LogoPreloader2.png";

const tl = gsap.timeline();

const PreLoader = () => {
    useEffect(() => {
        tl.to(".pl-texts-container", {
            duration: 1.5,
            opacity: 1,
            y: 70,
            skewY: 10,
            stagger: 0.4,
            ease: "Power3.easeOut",
            })
            .to(".pl-texts-container span", {
            duration: 1,
            y: 70,
            skewY: -20,
            stagger: 0.2,
            ease: "Power3.easeOut",
            })
            .to(
            ".preloader",
            {
                duration: 1.5,
                height: "0vh",
                ease: "Power3.easeOut",
            },
            "-=2"
            )
        }, []);

    
    //! Front-End de la page Preloader !//

    return (
        <div className="preloader">
            <div className="blue">  
            </div>
            <img src={Logo} alt="Loading Logo"></img>
        </div>
    );
};

export default PreLoader;