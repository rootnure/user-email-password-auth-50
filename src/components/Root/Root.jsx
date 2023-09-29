import { Outlet } from 'react-router-dom';
import Header from '../../Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Root = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={true}
                theme="colored"
            ></ToastContainer>
        </>
    );
};

export default Root;