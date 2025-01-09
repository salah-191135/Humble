import "./styles.css";
import React, { useEffect } from 'react';
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg"

function Header({ name = "" }) {

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/Dashboard");
        } else {
            navigate("/");
        }
    }, [user, loading]);

    function logoutfnc() {
        try {
            signOut(auth).then(() => {
                navigate("/");
                toast.success("log out successful.");
            }).catch((error) => {
                toast.error(error);
            });
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className='navbar'>
            <span className="logo">Humble</span>
            {user && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={user.photoURL ? user.photoURL : userImg} height={"40px"} width={"40px"} style={{ borderRadius: "50%" }} />
                    <button className="logo link" onClick={logoutfnc}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;