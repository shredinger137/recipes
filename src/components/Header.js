import {Link} from 'react-router-dom';


const Header = () => {

    const toggleMenu = () => {
        document.getElementById('navbarSupportedContent').classList.toggle('show');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">lulufremen</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={toggleMenu}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Header;