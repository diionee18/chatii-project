import { Link } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";

const Header = () => {
    const [isActive, setActive] = useState(true);


    return (
        <header>
            <div className="header-wrapper">
                <div>
                    <Link to="/">
                        <h1> Chatii </h1>
                    </Link>
                </div>
                
                <div className="user-account">
                    
                    <Link to="/signin">
                        <button onClick={(e) => setActive(!isActive)} className={isActive ?  "active" : "account-btn" }> Logga in </button>
                    </Link>

                    <Link to="/signup">
                        <button onClick={(e) => setActive(!isActive)} className={isActive ? "account-btn" : "active"}> Skapa konto </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
