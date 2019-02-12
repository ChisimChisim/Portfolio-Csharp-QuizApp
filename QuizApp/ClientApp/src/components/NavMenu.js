import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>QuizApp</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/'} exact>
          <NavItem>
            <Glyphicon glyph='home' /> Play!
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/managehome'}>
          <NavItem>
            <Glyphicon glyph='th-list' /> Add/Edit Quiz
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/history'}>
          <NavItem>
            <Glyphicon glyph='education' /> Quiz Result History
          </NavItem>
        </LinkContainer>
   
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
