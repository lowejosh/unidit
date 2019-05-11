import React, {useState} from 'react';
import NavBarItem from './../components/NavBarItem';

const NavBarContainer = (props) => {
    const [isSignedIn, setSignedIn] = useState(0);

    const [isHomeSelected, setHomeSelected] = useState(1);

    return (
        <div className="px-5 w-100 nvb background-primary mx-0 justify-content-start">
            <div className="noselect font-weight-bold nvb-item pointer px-3 text-background">
                UNIDIT
            </div>
            <NavBarItem name="Home" isSelected={isHomeSelected} link="/home"></NavBarItem>
            <NavBarItem name="Find a unit" isSelected={isHomeSelected} link="/home"></NavBarItem>
            <NavBarItem name="Help" isSelected={isHomeSelected} link="/home"></NavBarItem>
            <NavBarItem name="University Services" isSelected={isHomeSelected} link="/home"></NavBarItem>
            {/* <div id="uni-full" className="noselect nvb-item nvb-uni position-absolute mr-5 px-3 text-background">
                {props.university.fullName}
            </div>
            <div id="uni-small" className="noselect nvb-item nvb-uni position-absolute mr-5 px-3 text-background">
                {props.university.smallName}
            </div> */}

            
            <div className="position-absolute d-inline-block" style={{right: "3.5rem"}}>
                <NavBarItem name="Register" isSelected={isHomeSelected} link="/home"></NavBarItem>
                <NavBarItem name="Login" isSelected={isHomeSelected} link="/home"></NavBarItem>
            </div>

        </div>

    );
    
}

export default NavBarContainer