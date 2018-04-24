import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AdicionarFuncionario = React.createClass({

	getInitialState: function() {

		return {
			addObject: {
				funcionario_id: '', 
				nome: '', 
				sobrenome: '', 
				salario: '', 
				departamentoId: ''
			}
		}
    },

	render: function() {

		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Criar Funcionário</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome do Funcionário</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Nome"
								value={this.state.addObject.nome}
								onChange={this.onAddFuncionarioNomeChange} />
							<br />
							
							<ControlLabel>SobreNome do Funcionário</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Sobrenome"
								value={this.state.addObject.sobrenome}
								onChange={this.onAddFuncionarioSobrenomeChange} />
							<br />
							
							<ControlLabel>Salário do Funcionário</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Salario"
								value={this.state.addObject.salario}
								onChange={this.onAddFuncionarioSalarioChange} />
							<br />
							
							<ControlLabel>Departamento do Funcionário</ControlLabel>
							<Select
								name="departmentsField"
								value={this.state.addObject.departamentoId}
								options={this.props.parent.getDepartamentoOptions()}
								onChange={this.onAddFuncionarioDepartamentoChange} />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeAddModal}>Sair</Button>
					<Button bsStyle="primary" onClick={this.onAddBtnClicked}>Salvar</Button>						
				</Modal.Footer>				
			</Modal>
		);
	},

	clearAddObject: function() {
		
		this.state.addObject.funcionario_id = '';
		this.state.addObject.nome = '';
		this.state.addObject.sobrenome = '';
		this.state.addObject.salario = '';
		this.state.addObject.departamentoId = '';
	},

	//Input changes
	onAddFuncionarioNomeChange: function(event) {
		this.state.addObject.nome = event.target.value;
		this.forceUpdate();
	},

	onAddFuncionarioSobrenomeChange: function(event) {
		this.state.addObject.sobrenome = event.target.value;
		this.forceUpdate();
	},

	onAddFuncionarioSalarioChange: function(event) {
		this.state.addObject.salario = event.target.value;
		this.forceUpdate();
	},

	onAddFuncionarioDepartamentoChange: function(selection) {

		if(selection === null) {
			this.state.addObject.departamentoId = null;
		}else {		
			this.state.addObject.departamentoId = selection.value;
		}

		this.forceUpdate();
	},
	
	onAddBtnClicked: function() {

		//Save employee
		axios.post('http://localhost:8080/funcionarios/', this.state.addObject)
			.then(function (response) {
				this.props.parent.closeAddModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default AdicionarFuncionario;