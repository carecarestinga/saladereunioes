import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AtualizarFuncionario = React.createClass({

	getInitialState: function() {

		return {
			updateObject: {
				id: '', 
				nome: '', 
				sobrenome: '', 
				salario: '', 
				departamentoId: ''
			}
		}
    },

    shouldComponentUpdate: function() {
    	//console.log('EU:shouldComponentUpdate');
    	//return this.props.parent.state.showUpdateModal;
    	return true;
    },

	render: function() {
		
		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Atualizar Funcionário</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome do Funcionário</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Primeiro Nome"
								value={this.state.updateObject.nome}
								onChange={this.onUpdateFuncionarioNomeChange} />
							<br />
							
							<ControlLabel>SobreNome do Funcionário</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o SobreNome"
								value={this.state.updateObject.sobrenome}
								onChange={this.onUpdateFuncionarioSobrenomeChange} />
							<br />
							
							<ControlLabel>Salário do Funcionário</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Salário"
								value={this.state.updateObject.salario}
								onChange={this.onUpdateFuncionarioSalarioChange} />
							<br />
							
							<ControlLabel>Departamento do Funcionário</ControlLabel>
							<Select
								name="departmentsField"
								value={this.state.updateObject.departamentoId}
								options={this.props.parent.getDepartamentoOptions()}
								onChange={this.onUpdateFuncionarioDepartamentoChange} />
						</FormGroup>
					</form>						
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.parent.closeUpdateModal}>Sair</Button>
					<Button bsStyle="primary" onClick={this.onUpdateBtnClicked}>Atualizar</Button>						
				</Modal.Footer>
			</Modal>
		);
	},

	fillUpdateObject: function() {

    	var selectedFuncionario = this.props.parent.getFuncionarioPorId(this.props.parent.state.selectedFuncionarioId);

		this.state.updateObject = {
			id: selectedFuncionario.id, 
			name: selectedFuncionario.nome, 
			surname: selectedFuncionario.sobrenome, 
			salary: selectedFuncionario.salario, 
			departmentId: selectedFuncionario.departamentoId
		}
	},

	clearUpdateObject: function() {

		this.state.updateObject.id = '';
		this.state.updateObject.nome = '';
		this.state.updateObject.sobrenome = '';
		this.state.updateObject.salario = '';
		this.state.updateObject.departamentoId = '';
	},

	//Input changes
	onUpdateFuncionarioNomeChange: function(event) {
		this.state.updateObject.nome = event.target.value;
		this.forceUpdate();
	},

	onUpdateFuncionarioSobrenomeChange: function(event) {
		this.state.updateObject.sobrenome = event.target.value;
		this.forceUpdate();
	},

	onUpdateFuncionarioSalarioChange: function(event) {
		this.state.updateObject.salario = event.target.value;
		this.forceUpdate();		
	},

	onUpdateFuncionarioDepartamentoChange: function(selection) {

		if(selection === null) {
			this.state.updateObject.departamentoId = null;
		}else {
			this.state.updateObject.departamentoId = selection.value;
		}
		
		this.forceUpdate();		
	},
			
	onUpdateBtnClicked: function() {
		
		//Update funcionario
		axios.put('http://localhost:8080/funcionarios/' + this.state.updateObject.id, this.state.updateObject)
			.then(function (response) {
				this.props.parent.closeUpdateModal();
				this.props.parent.refreshTable();
				console.log(response);
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});
	}
});

export default AtualizarFuncionario;