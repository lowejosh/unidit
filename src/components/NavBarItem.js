import React from "react";

const NavBarItem = (props) => {
    return ( 
        <div style={props.style} className="noselect nvb-item nvb-link px-3 text-background">
            {props.name}
        </div>
    );
}

export default NavBarItem;