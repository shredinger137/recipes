const Header = () => {

    const toggleMenu = () => {
        document.getElementById('navbarSupportedContent').classList.toggle('show');
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <span class="navbar-brand">lulufremen</span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" onClick={toggleMenu}>
                <span class="navbar-toggler-icon"></span>
            </button>

            <div  class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;