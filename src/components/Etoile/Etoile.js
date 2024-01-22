import React from 'react'
import { StarOutline } from "react-ionicons"
import { Star } from "react-ionicons"
import { StarHalf } from "react-ionicons"

function Etoile({nb_etoile}){
    if (0 <= nb_etoile && nb_etoile < 0.5){
        return (
            <div className="Et-etoile">
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(0.5 <= nb_etoile && nb_etoile < 1){
        return (
            <div className="Et-etoile">
            <StarHalf height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>)
    }
    else if(1 <= nb_etoile && nb_etoile < 1.5){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(1.5 <= nb_etoile && nb_etoile < 2){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <StarHalf height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(2 <= nb_etoile && nb_etoile < 2.5){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(2.5 <= nb_etoile && nb_etoile < 3){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <StarHalf height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(3 <= nb_etoile && nb_etoile < 3.5){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(3.5 <= nb_etoile && nb_etoile < 4){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <StarHalf height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(4 <= nb_etoile && nb_etoile < 4.5){
        return (
            <div className="etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <StarOutline height="100%" width="100%" />
            </div>
        )
    }
    else if(4.5 <= nb_etoile && nb_etoile < 5){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <StarHalf height="100%" width="100%"/>
            </div>
        )
    }
    else if(5 <= nb_etoile){
        return (
            <div className="Et-etoile">
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            <Star height="100%" width="100%"/>
            </div>
        )
    }
}
export default Etoile;