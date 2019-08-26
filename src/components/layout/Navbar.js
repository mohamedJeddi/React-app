import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Navbar extends Component {

    state = {
        dropdownOpen: false
    }

    toggle = () => {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <Link className="navbar-brand" to="#">React-App</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/" style={{ cursor: 'pointer' }}>Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                            Action
                            </DropdownToggle>
                            <DropdownMenu>
                            <Link className="dropdown-item" to="/dep"><DropdownItem>Departement</DropdownItem></Link>
                            <DropdownItem divider />
                            <Link className="dropdown-item" to="/entreprise"><DropdownItem>Entreprise</DropdownItem></Link>
                            </DropdownMenu>
                        </ButtonDropdown>
                        </ul>
                    </div>
                </nav>


            </div>
        )
    }
}

