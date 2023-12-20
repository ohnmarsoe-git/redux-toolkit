import { Link } from "react-router-dom";

const Header = () => {
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
      </nav>
    </header>
  );
};

export default Header;
