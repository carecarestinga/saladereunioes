import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import MainTemplate from './pages/MainTemplate';
import Funcionarios from './pages/Funcionarios';
import Departamentos from './pages/Departamentos';
import Reuniaos from './pages/Reuniaos';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={MainTemplate}>
			<Route path="funcionarios" components={{main: Funcionarios}} />
			<Route path="departamentos" components={{main: Departamentos}} />
			<Route path="reuniaos" components={{main: Reuniaos}} />
		</Route>
	</Router>,
	document.getElementById('root')
);
