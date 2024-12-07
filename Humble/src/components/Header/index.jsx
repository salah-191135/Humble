import "./styles.css";
import React, { useEffect } from 'react';
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";


function Header() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/Dashboard");
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
        // alert('logout');
    }

    return (
        <div className='navbar'>
            <p className="logo">Humble</p>
            {user &&
                (<p className="logo link" onClick={logoutfnc}>
                    Logout
                </p>)}
        </div>

    );
}

export default Header;