import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>App Title</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/link1" activeStyle>
                        Link 1
                    </NavLink>
                    <NavLink to="/link2" activeStyle>
                        Link 2
                    </NavLink>
                    <NavLink to="/link3" activeStyle>
                        Link 3
                    </NavLink>
                    <NavLink to="/link4" activeStyle>
                        Link 4
                    </NavLink>

                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">Sign In </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
