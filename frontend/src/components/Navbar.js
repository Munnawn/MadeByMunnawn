// Navbar.js
// A navbar component that sits at top of page.

import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar-wrapper'>
            <div style={{display: 'flex'}}>
                <Link to='/' className="author">
                    <h1 style={{fontWeight: 300}}>Made By Munnawn</h1>
                </Link>
            </div>
        </div>
    )
};

export default Navbar;