import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class Navigation extends Component{
  render() {
    return (
      <header>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              Github Repo Listing using React
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem componentClass={Link} href="/" to="/">Home</NavItem>
          </Nav>
        </Navbar>
      </header>
    )
  }
};

export default Navigation;
