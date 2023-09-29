import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";


const LogIn = () => {

    const [logInError, setLogInError] = useState('');
    const [logInSuccess, setLogInSuccess] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({ email, password });
        // reset error
        setLogInError('');
        setLogInSuccess(false);
        setIsPasswordVisible(false);

        // add input filed validation

        // user validation ==> signIn/LogIn registered user
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setLogInSuccess(true);
            })
            .catch(error => {
                console.error(error);
                setLogInError(error.message === "Firebase: Error (auth/invalid-login-credentials)." ? "Invalid Email or Password" : error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative mt-4">
                                    <input
                                        className="input input-bordered w-full"
                                        type={isPasswordVisible ? "text" : "password"} name="password"
                                        placeholder="Password"
                                        required />
                                    <span
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute bottom-0 top-0 flex items-center right-0 px-2 -py-2 cursor-pointer rounded rounded-s-none text-xl"
                                        title={isPasswordVisible ? "Hide Password" : "Show Password"}>
                                        {
                                            isPasswordVisible ? <BiSolidHide></BiSolidHide> : <BiSolidShow></BiSolidShow>
                                        }
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-secondary">Login</button>
                            </div>
                        </form>
                        <div className="h-8 flex items-center text-center">

                            {
                                logInError && <p className="text-red-500">{logInError}</p>
                            }
                            {
                                logInSuccess && <p className="text-green-500">LogIn Successful</p>
                            }
                        </div>
                        <p>Don&apos;t have an account? Please <Link to="/register" className="text-blue-500" title="Go to register page">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;