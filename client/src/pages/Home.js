import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="container">
            <Link to="/auth" className="login-link">Login to chat</Link>
        </div>
    );
};

export default Home;
