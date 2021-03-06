import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './sidebar.css'
import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import user_image from '../../assets/images/iron-man.jpg'

const curr_user = {
    display_name: 'MR STARK',
    image: user_image
}

let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current.contains(event.target)) {
            handler();
            }
        };
    
        document.addEventListener("mousedown", maybeHandler);
    
        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};

const Sidebar = () => {

    const location = useLocation();
    
    const [sidebarCollapse, setSidebarCollapse] = useState(true);
    
    const toggleClass = ( ) => {
        setSidebarCollapse(!sidebarCollapse);
    };
    
    let domNode = useClickOutside(() => {
        setSidebarCollapse(true);
    });

    return (
        <nav className={`sidebar ${sidebarCollapse ? "close" : ""}`}  ref={domNode}>
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={curr_user.image} alt="vaibhav"/>
                    </span>

                    <div className="text logo-text">
                        <span className="name">{curr_user.display_name}</span>
                        <span className="profession">Web developer</span>
                    </div>
                </div>

                <i className='bx bx-chevron-right toggle' onClick={toggleClass} ></i>
            </header>

            <div className="menu-bar">
                <div className="menu">

                    <ul className="menu-links">
                
                        {
                            sidebar_items.map((item, index) => (
                                <li className="nav-link" key={index}>
                                    <a href={item.route} className={location.pathname === item.route ? "active" : ""}>
                                        <i className={`${item.icon} icon`}></i>
                                        <span className="text nav-text">{item.display_name}</span>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
