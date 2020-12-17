import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const MainNavbar = (props) => {

  const links = useSelector((state)=>state.session.mainNavbar);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand  tag={Link} to="/">genelinks</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {links.map((link)=>{
             return (
               <NavItem><NavLink tag={Link} to={link.uri}>{link.name}</NavLink></NavItem>
             );  
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MainNavbar;