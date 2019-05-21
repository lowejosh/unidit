import React from 'react';
import AltCategory from './../components/AltCategory'

const AltCategoryContainer = (props) => {
    return (
        <div className="mb-4">
            <div style={{height: "2.5rem"}} className="px-2 background-primary border w-100 ">
                <h6 style={{lineHeight: "2.5rem"}} className="text-background">
                    {props.name}
                </h6>
            </div>
            {props.categories}
        </div>
        

    );
}

export default AltCategoryContainer