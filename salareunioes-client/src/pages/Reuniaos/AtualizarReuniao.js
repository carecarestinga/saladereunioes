import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AtualizarReuniao = React.createClass({

	getInitialState: function() {

		return {
			updateObject: {
				id: '', 
				nome: '', 
				descricao: '',
				departamentos: ''
			}
		}
    },

	render: function() {
		
		if(this.props.parent.state.showUpdateModal === false){
			return (<div></div>);
		}

		return (
			<Modal show={this.props.parent.state.showUpdateModal}>
				<Modal.Header>
					<Modal.Title>Atualizar Reuniao</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome da Reunião</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Nome"
								value={this.state.updateObject.nome}
								onChange={this.onUpdateReuniaoNomeChange} />
							<br />
							
							<ControlLabel>Descrição da Reunião</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digte a Descrição"
								value={this.state.updateObject.descricao}
								onChange={this.onUpdateReuniaoDescricaoChange} />
							<br />
							
							<ControlLabel>Departamentos</ControlLabel>
							<Select
								name="departmentsField"
								multi={true}
								value={this.props.parent.getDepartamentoOptions(this.state.updateObject.departamentos)}
								options={this.props.parent.getDepartamentoOptions(this.props.parent.state.departamentos)}
								onChange={this.onUpdateReuniaoDepartamentoChange} />							
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

    	var selectedReuniao = this.props.parent.getReuniaoPorId(this.props.parent.state.selectedReuniaoId);

		this.state.updateObject = {
			id: selectedReuniao.id, 
			name: selectedReuniao.nome, 
			description: selectedReuniao.descricao,
			departamentos: selectedReuniao.departamentos,
		}
	},

	clearUpdateObject: function() {
		
		this.state.updateObject.id = '';
		this.state.updateObject.nome = '';
		this.state.updateObject.descricao = '';
		this.state.updateObject.departamentos = '';
	},

	//Input changes
	onUpdateReuniaoNomeChange: function(event) {
		this.state.updateObject.nome = event.target.value;
		this.forceUpdate();
	},

	onUpdateReuniaoDescricaoChange: function(event) {
		this.state.updateObject.descricao = event.target.value;
		this.forceUpdate();
	},

	onUpdateReuniaoDepartamentoChange: function(selection) {

		if (selection === null) {
			this.state.updateObject.departamentos = null;
		} else {
			var departamentos = selection.map(function(obj){ 
				var rObj = {};
				rObj['id'] = obj['value'];
				rObj['nome'] = obj['label'];
				return rObj;
			});
			
			this.state.updateObject.departamentos = departamentos;
		}

		this.forceUpdate();		
	},	

	onUpdateBtnClicked: function() {
		
		//Update Meeting
		axios.put('http://localhost:8080/reuniaos/' + this.state.updateObject.id, this.state.updateObject)
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

export default AtualizarReuniao;