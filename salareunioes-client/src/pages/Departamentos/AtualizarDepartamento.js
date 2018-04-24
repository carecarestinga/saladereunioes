import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AtualizarDepartamento = React.createClass({

	getInitialState: function() {
		return {
			updateObject: {
				id: '', 
				nome: '', 
				descricao: ''
			}
		}
    },

	render: function() {

		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Atualizar Departamento</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome do Departamento</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Nome"
								value={this.state.updateObject.nome}
								onChange={this.onUpdateDepartamentoNomeChange} />
							<br />
							
							<ControlLabel>Descrição do Departamento</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite a Descricao"
								value={this.state.updateObject.descricao}
								onChange={this.onUpdateDepartamentoDescricaoChange} />
							<br />
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
    	var selectedDepartamento = this.props.parent.getDepartamentoPorId(this.props.parent.state.selectedDepartamentoId);

		this.state.updateObject = {
			id: selectedDepartamento.id, 
			name: selectedDepartamento.nome, 
			description: selectedDepartamento.descricao
		}
	},
	clearUpdateObject: function() {
		this.state.updateObject.id = '';
		this.state.updateObject.nome = '';
		this.state.updateObject.descricao = '';
	},

	//Input changes
	onUpdateDepartamentoNomeChange: function(event) {
		this.state.updateObject.nome = event.target.value;
		this.forceUpdate();
	},
	onUpdateDepartamentoDescricaoChange: function(event) {
		this.state.updateObject.descricao = event.target.value;
		this.forceUpdate();
	},	
	onUpdateBtnClicked: function() {
		
		//Update Departamento
		axios.put('http://localhost:8080/departamentos/' + this.state.updateObject.id, this.state.updateObject)
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

export default AtualizarDepartamento;