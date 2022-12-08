import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav class="navbar navbar-expand-sm">
                <a class="navbar-brand" href="/">THE DUCK ARSENAL</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/ForSale">For Sale</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Favorites">My Favorites</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/SellDuck">Sell My Duck</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;