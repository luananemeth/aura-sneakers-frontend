import "./Identity.styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

function Identity() {
    return (
        <main>
            <h1>Identificação</h1>
            <div className="wrapper-login row">
                <Login />

                <Signup />
            </div>
            <ToastContainer />
        </main>
    );
}

export default Identity;
