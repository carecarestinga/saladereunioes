import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ButtonGroup, Button, Modal, Glyphicon, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import AddMeetingModal from './AdicionarReuniao';
import UpdateMeetingModal from './AtualizarReuniao';

var Reuniaos = React.createClass({

	getInitialState: function() {

		return {
			data: null,
			departamentos: null,
			selectedReuniaoId: null,
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
					<Button bsStyle="warning" disabled={this.state.selectedReuniaoId === null} onClick={this.openUpdateModal}><Glyphicon glyph="refresh" />Atualizar</Button>
					<Button bsStyle="danger" disabled={this.state.selectedReuniaoId === null} onClick={this.onDeleteBtnClicked}><Glyphicon glyph="trash" />Excluir</Button>
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
							
				<AddMeetingModal parent={this} ref="adicionarReuniao" />

				<UpdateMeetingModal parent={this} ref="atualizarReuniao"/>
			</div>		
		);
	},
	
	// Keep selected row
	onRowSelect: function(row, isSelected) {
		if(isSelected) {
			this.setState({ selectedReuniaoId: row.id });
		}else {
			this.setState({ selectedReuniaoId: null });
		}
	},
	
	// Department list for Select component
	getDepartamentoOptions: function(departamentos) {
		var options = [];
		
		if(!departamentos) {
			return options;
		}

		options = departamentos.map(function(obj){ 
			var rObj = {};
			rObj['value'] = obj['id'];
			rObj['label'] = obj['nome'];
			return rObj;
		});

		return options;		
	},	
	
	//Add modal open/close
	closeAddModal: function() {
		this.setState({ showAddModal: false });
		this.refs.adicionarReuniao.clearAddObject();
	},

	openAddModal: function() {
		this.refs.adicionarReuniao.clearAddObject();		
		this.setState({ showAddModal: true });
	},

	//Update modal open/close
	closeUpdateModal: function() {
		this.setState({showUpdateModal: false});
		this.refs.atualizarReuniao.clearUpdateObject();
	},

	openUpdateModal: function() {
		this.refs.atualizarReuniao.fillUpdateObject();
		this.setState({showUpdateModal: true});
	},

	//BEGIN: Delete Meeting
	onDeleteBtnClicked: function() {
		
		axios.delete('http://localhost:8080/reuniaos/' + this.state.selectedReuniaoId)
			.then(function (response) {
				this.refreshTable();
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			});		
	},
	//END: Delete Meeting
	
	getReuniaoPorId: function(id) {
		
		for(var i in this.state.data) {
			if(this.state.data[i].id === id) {
				return this.state.data[i];
			}
		}
		return '';
	},


	getReuniaos: function() {
	  return axios.get('http://localhost:8080/reuniaos');
	},

	getDepartamentos: function() {
	  return axios.get('http://localhost:8080/departamentos');
	},
	
	//Get table data and update the state to render
	refreshTable: function() {
		
		axios.all([this.getReuniaos(), this.getDepartamentos()])
		.then(axios.spread(function (reuniaos, departamentos) {
			this.setState({data: reuniaos.data,
							departamentos: departamentos.data});
		}.bind(this)));
	}
});

export default Reuniaos;