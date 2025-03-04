import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./ProfileButton.css";


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null); // <-- Add a ref for the button

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    console.log("showMenu state:", showMenu);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // Ensure clicking the button doesn't close the menu immediately
            if (
                menuRef.current && !menuRef.current.contains(e.target) &&
                buttonRef.current && !buttonRef.current.contains(e.target)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logoutUser());
    };

    return (
        <>
            {/* Attach ref to the button */}
            <button ref={buttonRef} onClick={toggleMenu}>
                <i className="fa-solid fa-user fa-2x"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown" ref={menuRef}>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
