import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddDepartamentoModal from './AdicionarDepartamento';
import UpdateDepartamentoModal from './AtualizarDepartamento';

var Departamentos = React.createClass({

	getInitialState: function() {

		return {
			data: null,
			selectedDepartamentoId: null,
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
					<Button bsStyle="warning" disabled={this.state.selectedDepartamentoId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Atualizar</Button>
					<Button bsStyle="danger" disabled={this.state.selectedDepartamentoId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Excluir</Button>
				</ButtonGroup>
			
				<BootstrapTable data={this.state.data} 
								striped={true} 
								hover={true} 
								pagination={true} 
								search={true} 
								selectRow={selectRowProp}>
					<TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
					<TableHeaderColumn dataField="nome" dataSort={true}>Nome</TableHeaderColumn>
					<TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
				</BootstrapTable>
							
				<AddDepartamentoModal parent={this} ref="adicionarDepartamento" />

				<UpdateDepartamentoModal parent={this} ref="atualizarDepartamento"/>
			</div>		
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {

		if(isSelected) {
			this.setState({ selectedDepartamentoId: row.id });
		}else {
			this.setState({ selectedDepartamentoId: null });
		}
	},
	
	//Add modal open/close
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.adicionarDepartamento.clearAddObject();
	},

	openAddModal: function() {
		this.refs.adicionarDepartamento.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.atualizarDepartamento.clearUpdateObject();
	},
	
	openUpdateModal: function() {
		this.refs.atualizarDepartamento.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Department
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/departamentos/' + this.state.selectedDepartamentoId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//END: Delete Department
	
	getDepartamentoPorId: function(id) {

		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},

	//Get table data and update the state to render
	refreshTable: function() {
		
		axios.get('http://localhost:8080/departamentos/')
		.then(function (departamentos) {
			this.setState({data: departamentos.data});
		}.bind(this));
	}
});

export default Departamentos;