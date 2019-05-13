import React from 'react';

const SideItem = (props) => {
    let classNames = "px-3 py-2 w-100";
    if (props.top) {
        classNames+=" rounded-top";
    } else if (props.bottom) {
        classNames+=" rounded-bottom";
    }

    if (props.selected) {
        classNames+=" side-item-sel";
    } else {
        classNames+=" border side-item";
    }

    return (
        <div className={classNames}>
            {props.name}
        </div>
    );
}

export default SideItem;