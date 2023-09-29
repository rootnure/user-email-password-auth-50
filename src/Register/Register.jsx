

const Register = () => {

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.email.value;
        console.log({email, password});
    }

    return (
        <div className="">
            <div className="mx-auto w-6/12">
                <h2 className="text-3xl text-center mb-4">Please Register</h2>
                <form onSubmit={handleRegister} className="w-9/12 mx-auto">
                    <input className="w-full rounded px-4 py-2" type="email" name="email" placeholder="Your Email" />
                    <br />
                    <input className="my-4 w-full rounded px-4 py-2" type="password" name="password" placeholder="Password" />
                    <br />
                    <input className="btn btn-secondary w-full" type="submit" value="Submit" />
                    <br />
                </form>
            </div>
        </div>
    );
};

export default Register;