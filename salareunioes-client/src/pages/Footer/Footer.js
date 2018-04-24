import React from 'react';
import { Link } from 'react-router';

var Footer = React.createClass({
    render: function () {

        return (
                <div className="footer">
                    <p className="footer-info">
                        <span class="aw-footer-disclaimer">&copy; 2016 Caretronics It Solutions S.A.. 
                            Todos os direitos reservados.</span>
                    </p>
                </div>

                );
    }
});

export default Footer;