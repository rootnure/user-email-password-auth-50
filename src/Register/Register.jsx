import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config"
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checked = e.target.terms.checked;
        console.log({ email, password, checked });
        // reset error
        setRegisterError('');
        setRegisterSuccess('');

        // password strength validation
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Password must contain at lest one UPPERCASE character");
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setRegisterError("Password must contain at lest one lowercase character");
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setRegisterError("Password must contain at lest one digit");
            return;
        }
        else if (!/[#?!@$%^&*-]/.test(password)) {
            setRegisterError("Password must contain at lest one special character");
            return;
        }
        else if (!checked) {
            setRegisterError("Must Check our Terms & Conditions");
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setRegisterSuccess("Registration with email " + email + " is successful");

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => console.log('Profile Updated'))
                    .catch(() => console.log('Something went wrong'))
                
                // send verification email to verify email address
                sendEmailVerification(auth.currentUser)
                    .then(result => {
                        toast.success('Check your email. Verify your email address: ' + email, {autoClose: 5500})
                        console.log(result);
                    })
            })
            .catch(error => {
                console.warn(error);
                setRegisterError(error.message);
            })

    }

    return (
        <div className="">
            <div className="mx-auto w-6/12">
                <h2 className="text-3xl text-center mb-4">Please Register</h2>
                <form onSubmit={handleRegister} className="w-9/12 mx-auto">
                    <input
                        className="w-full rounded px-4 py-2 mb-4"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required />
                    <input 
                    className="w-full rounded px-4 py-2" 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    required />
                    <br />
                    <div className="relative mt-4">
                        <input
                            className="w-full rounded px-4 py-2"
                            type={isPasswordVisible ? "text" : "password"} name="password"
                            placeholder="Password"
                            required />
                        <span
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="absolute bottom-4 top-4 flex items-center right-0 px-2 -py-2 cursor-pointer rounded rounded-s-none text-xl"
                            title={isPasswordVisible ? "Hide Password" : "Show Password"}>
                            {
                                isPasswordVisible ? <BiSolidHide></BiSolidHide> : <BiSolidShow></BiSolidShow>
                            }
                        </span>
                    </div>
                    <br />
                    <div className="mb-2 flex items-center gap-x-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label>Accept our <a href="#" className="font-bold text-blue-500">Terms and Conditions</a></label>
                    </div>
                    <br />
                    <input className="btn btn-secondary w-full" type="submit" value="Register" />
                    <br />
                </form>
            </div>
            {
                registerSuccess && <div>
                    <p className="text-center mt-4 text-green-500">{registerSuccess}</p>
                </div>
            }
            {
                registerError && <div>
                    <p className="text-center mt-4 text-red-400">{registerError}</p>
                </div>
            }
            <p className="text-center mt-4">Already have an account? Please <Link to="/login" className="text-blue-500">LogIn</Link></p>
        </div>
    );
};

export default Register;