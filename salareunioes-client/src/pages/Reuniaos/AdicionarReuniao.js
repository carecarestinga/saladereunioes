import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

var AdicionarReuniao = React.createClass({

	getInitialState: function() {
		
		return {
			addObject: {
				reuniao_id: '', 
				nome: '', 
				descricao: '',
				departamentos: ''
			}
		}
    },
	
	render: function() {

		if(this.props.parent.state.showAddModal === false){
			return (<div></div>);
		}	
	
		return (
			<Modal show={this.props.parent.state.showAddModal}>
				<Modal.Header>
					<Modal.Title>Criar Reuniões</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Nome da Reunião</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite o Nome"
								value={this.state.addObject.nome}
								onChange={this.onAddReuniaoNomeChange} />
							<br />
							
							<ControlLabel>Descrição da Reunião</ControlLabel>
							<FormControl
								type="text"
								placeholder="Digite a Descrição"
								value={this.state.addObject.descricao}
								onChange={this.onAddReuniaoDescricaoChange} />
							<br />
							
							<ControlLabel>Departamentos</ControlLabel>
							<Select
								name="departmentsField"
								multi={true}
								value={this.props.parent.getDepartamentoOptions(this.state.addObject.departamentos)}
								options={this.props.parent.getDepartamentoOptions(this.props.parent.state.departamentos)}
								onChange={this.onAddReuniaoDepartamentoChange} />								
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

		this.state.addObject.reuniao_id = '';
		this.state.addObject.nome = '';
		this.state.addObject.descricao = '';
	},

	//Input changes
	onAddReuniaoNomeChange: function(event) {
		this.state.addObject.nome = event.target.value;
		this.forceUpdate();
	},

	onAddReuniaoDescricaoChange: function(event) {
		this.state.addObject.descricao = event.target.value;
		this.forceUpdate();
	},

	onAddReuniaoDepartamentoChange: function(selection) {

		if (selection === null) {
			this.state.updateObject.departamentos = null;
		} else {
			var departamentos = selection.map(function(obj){ 
				var rObj = {};
				rObj['id'] = obj['value'];
				rObj['nome'] = obj['label'];
				return rObj;
			});
			
			this.state.addObject.departamentos = departamentos;
		}
		
		this.forceUpdate();		
	},

	onAddBtnClicked: function() {

		//Save meeting
		axios.post('http://localhost:8080/reuniaos/', this.state.addObject)
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

export default AdicionarReuniao;