import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const Header = () => {
  const token = useSelector(selectCurrentToken);

  return (
    <header className="header">
      <h1>Redux Blog</h1>
      <nav>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/blog">BLOG</Link>
        </li>
        <li>
          <Link to="/user">USERS</Link>
        </li>
        {!token ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </nav>
    </header>
  );
};

export default Header;
