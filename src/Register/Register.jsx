import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config"
import { useState } from "react";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({email, password});
        // reset error
        setRegisterError('');
        setRegisterSuccess('');
        
        // password strength validation
        if(password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setRegisterSuccess("Registration with email " + email + " is successful");
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
                    <input className="w-full rounded px-4 py-2" type="email" name="email" placeholder="Your Email" required />
                    <br />
                    <input className="my-4 w-full rounded px-4 py-2" type="password" name="password" placeholder="Password" required />
                    <br />
                    <input className="btn btn-secondary w-full" type="submit" value="Submit" />
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
        </div>
    );
};

export default Register;