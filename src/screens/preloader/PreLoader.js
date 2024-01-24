import React, { useEffect } from "react";
import gsap from "gsap";
import "../../screens/preloader/preloader.css";
import "../../Hadrien/reset.css";
import Logo from "../../assets/images/logoalternate.png";

const tl = gsap.timeline();

const PreLoader = () => {
    useEffect(() => {
    tl.to(
            ".blue",
            {
                duration: 1.5,
                delay:0.5,
                width: "20%",
                ease: "power3.out",
            },
        )
        .to(".pl-texts-container span", {
        duration: 1,
        delay:1,
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