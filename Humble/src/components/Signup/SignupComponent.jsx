import React, { useState } from "react";
import Input from "../Input/Input";
import "./styles.css";
import Button from "../Button/Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function SignupComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirnpassword, setConfirnPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();

    function SignupWithEmail(event) {
        event.preventDefault();
        setLoading(true);
        //create user with email
        if (name != "" && email != "" && password != "" && confirnpassword != "") {
            if (password == confirnpassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Signed up
                        const user = userCredential.user;
                        console.log('user => ', user);
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirnPassword("");
                        toast.success("User has been created");
                        setLoading(false);
                        //create a doc with user id as the following:
                        await createUserDocument(user);
                        navigate("/Dashboard");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage);
                        // ..
                    });
            } else {
                toast.error("passwords must match!");
                setLoading(false);
            }
        } else {
            toast.error("all fields are required");
            setLoading(false);
        }
    };

    function SigninWithEmail(event) {
        // event.preventDefault();
        setLoading(true);
        if (email != "" && password != "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    navigate("/Dashboard");

                    toast.success("Welcome back!");
                    setLoading(false);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    console.log("errorMessage", errorMessage);

                });
        } else {
            toast.error("Email and password are required!");
            setLoading(false);
        }
    };

    const SignWithGoogle = (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log("user :: ", user);
                    await createUserDocument(user);
                    navigate("/Dashboard");
                    toast.success("Welcome back");
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.log("errorMessage :: ", errorMessage);
                    toast.error("login failed");
                    setLoading(false);
                });

        } catch (error) {
            toast.error("login failed");
            setLoading(false);

        }
    }

    const createUserDocument = async (user) => {
        setLoading(true);
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            const { displayName, email, photoURL } = user;
            const createdAt = new Date();

            try {
                await setDoc(userRef, {
                    name: displayName ? displayName : name,
                    email,
                    photoURL: photoURL ? photoURL : "",
                    createdAt,
                });
                toast.success("Account Created!");
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                console.error("Error creating user document: ", error);
                setLoading(false);
            }
        }
    };

    return (
        <>
            {login
                //Log In
                ? <div className="signup-wrapper">
                    <h2 className="title">
                        Login on <span style={{ color: "var(--theme)" }}>Humble</span>
                    </h2>
                    <form>
                        <Input
                            type="email"
                            label={"email"}
                            placeholder={"salah-idrees@gmail.com"}
                            state={email}
                            setState={setEmail}
                        />
                        <Input
                            type={"password"}
                            label={"password"}
                            placeholder={"********"}
                            state={password}
                            setState={setPassword}
                        />
                        <div className="submit-btn">
                            <Button disabled={loading} text={loading ? "loading..." : "Login with Email"} clickF={SigninWithEmail} blue={true} />
                            <p style={{ textAlign: "center", margin: "0 1rem" }}>or</p>
                            <Button text={loading ? "loading..." : "Login with Google"} blue={true} clickF={SignWithGoogle} />
                        </div>
                    </form>
                    <Button style={{ textAlign: "center" }} text={"Don't Have an Acount? sign up here"} clickF={() => setLogin(!login)}></Button>
                </div>
                //Sign Up
                : <div className="signup-wrapper">
                    <h2 className="title">
                        Signup on <span style={{ color: "var(--theme)" }}>Humble</span>
                    </h2>
                    <form>
                        <Input
                            type={"text"}
                            label={"full name"}
                            placeholder={"salah idrees"}
                            state={name}
                            setState={setName}
                        />
                        <Input
                            type="email"
                            label={"email"}
                            placeholder={"salah-idrees@gmail.com"}
                            state={email}
                            setState={setEmail}
                        />
                        <Input
                            type={"password"}
                            label={"password"}
                            placeholder={"********"}
                            state={password}
                            setState={setPassword}
                        />
                        <Input
                            type={"password"}
                            label={"Confirm password"}
                            placeholder={"********"}
                            state={confirnpassword}
                            setState={setConfirnPassword}
                        />
                        <div className="submit-btn">
                            <Button disabled={loading} text={loading ? "loading..." : "SignUp with Email"} clickF={SignupWithEmail} blue={true} />
                            <p style={{ textAlign: "center", margin: "0 1rem" }}>or</p>
                            <Button text={loading ? "loading..." : "SignUp with Google"} blue={true} clickF={SignWithGoogle} />
                        </div>
                    </form>
                    <Button style={{ textAlign: "center" }} text={'Have an Acount Already?'} clickF={() => setLogin(!login)}></Button>
                </div>
            }
        </>
    );
}

export default SignupComponent;
