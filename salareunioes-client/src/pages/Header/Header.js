import React from 'react';
import { Link } from 'react-router';
import './header.css';
import logo1 from './img_caretronics_01.png';
import logo2 from './logo.svg';

var Header = React.createClass({
    render: function () {

        return (
                <div className="header">
                    <div className="header-div" >
                        <div className="header-logo1" >
                            <img   src={logo1} className="App-logo1" alt="logo1" />
                        </div>
                        <div className="header-paragrafo" >
                            <p >
                                Reuniões Caretronics
                            </p>
                        </div>
                    </div>
                    <div className="menu">
                    <img   src={logo2} className="App-logo2" alt="logo2" />
                        <Link to="/funcionarios" className="menu-link-item" activeClassName="active">Funcionários</Link>
                        <Link to="/departamentos" className="menu-link-item" activeClassName="active">Departamentos</Link>
                        <Link to="/reuniaos" className="menu-link-item" activeClassName="active">Reuniões</Link>
                        <img   src={logo2} className="App-logo2" alt="logo2" />
                    </div>
                </div>

                );
    }
});

export default Header;