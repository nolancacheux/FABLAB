import React, { useEffect } from "react";
import gsap from "gsap";
import "../../screens/preloader/preloader.css";
import "../../Hadrien/reset.css";
import Logo from "../../assets/images/LogoPreloader.png";

const tl = gsap.timeline();

const PreLoader = () => {
    useEffect(() => {
    tl.to(".pl-texts-container", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
        })
        .from(".pl-texts-container span", {
        duration: 1.5,
        delay: 1,
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
            <div className="pl-texts-container">
                <img src={Logo} alt="Loading Logo"></img>
                <span>La bière</span>
                <span>à portée</span>
                <span>de clic</span>
            </div>
        </div>
    );
};

export default PreLoader;