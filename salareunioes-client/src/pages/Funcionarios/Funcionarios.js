import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddFuncionarioModal from './AdicionarFuncionario';
import UpdateFuncionarioModal from './AtualizarFuncionario';

var Funcionarios = React.createClass({

	getInitialState: function() {
		
		return {
			data: null,
			departamentos: null,
			selectedFuncionarioId: null,
			showAddModal: false,
			showUpdateModal: false
		}
    },
	
	componentDidMount: function() {
		this.refreshTable();
	},
	
	render: function() {

		var selectRowProp = {
			mode: "radio",
			clickToSelect: true,
			className: "selected-row",
			bgColor: 'rgb(101, 148, 255)',			
			onSelect: this.onRowSelect
		};		
		
		if(!this.state.data){
			return (<div></div>);
		}
		
		return (
			<div>
				<ButtonGroup className="m-10">
					<Button bsStyle="primary" onClick={this.openAddModal}><Glyphicon glyph="plus" />Adicionar</Button>
					<Button bsStyle="warning" disabled={this.state.selectedFuncionarioId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Atualizar</Button>
					<Button bsStyle="danger" disabled={this.state.selectedFuncionarioId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Excluir</Button>
				</ButtonGroup>
			
				<BootstrapTable data={this.state.data} 
								striped={true} 
								hover={true} 
								pagination={true} 
								search={true} 
								selectRow={selectRowProp}>
					<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
					<TableHeaderColumn dataField="nome" dataSort={true}>Primeiro Nome</TableHeaderColumn>
					<TableHeaderColumn dataField="sobrenome">Último Nome</TableHeaderColumn>
					<TableHeaderColumn dataField="salario" dataFormat={this.precoFormatter}>Salario</TableHeaderColumn>
					<TableHeaderColumn dataField="departamentoId" dataFormat={this.departamentoFormatter}>Departamento</TableHeaderColumn>
				</BootstrapTable>
							
				<AddFuncionarioModal parent={this} ref="adicionarFuncionario" />

				<UpdateFuncionarioModal parent={this} ref="atualizarFuncionario"/>
			</div>		
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {
		if(isSelected) {
			this.setState({ selectedFuncionarioId: row.id });
		}else {
			this.setState({ selectedFuncionarioId: null });
		}
	},
	
	// Departamento listar para Selecionar component
	getDepartamentoOptions: function() {
		var options = [];

		options = this.state.departamentos.map(function(obj){ 
			var rObj = {};
			rObj['value'] = obj['id'];
			rObj['label'] = obj['nome'];
			return rObj;
		});

		return options;		
	},	
	
	//Adiciona modal abrir/fechar
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.adicionarFuncionario.clearAddObject();
	},
	openAddModal: function() {
		this.refs.adicionarFuncionario.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Atualiza modal abrir/fechar
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.atualizarFuncionario.clearUpdateObject();
	},
	openUpdateModal: function() {
		this.refs.atualizarFuncionario.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//INICIO: excluir funcionario
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/funcionarios/' + this.state.selectedFuncionarioId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//FIM: excluir funcionario
	
	precoFormatter: function(cell, row){
		return "<i>R</i>" + '<i class="glyphicon glyphicon-usd"></i> ' + cell;
	},
	
	departamentoFormatter: function(cell, row) {
		return this.getDepartamentoNome(row.departamentoId);
	},
	
	getDepartamentoNome: function(departamentoId) {

		for(var i in this.state.departamentos) {
			if(this.state.departamentos[i].id === departamentoId) {
                                console.log(departamentos[i].nome);
				return this.state.departamentos[i].nome;
			}
		}
		return '';
	},

	getFuncionarioPorId: function(id) {
		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},

	getFuncionarios: function() {
	  return axios.get('http://localhost:8080/funcionarios');
	},

	getDepartamentos: function() {
	  return axios.get('http://localhost:8080/departamentos');
	},
	
	//Get table data and update the state to render
	refreshTable: function() {
		
		axios.all([this.getFuncionarios(), this.getDepartamentos()])
		.then(axios.spread(function (funcionarios, departamentos) {
			this.setState({data: funcionarios.data,
							departamentos: departamentos.data});
		}.bind(this)));
	}
});

export default Funcionarios;