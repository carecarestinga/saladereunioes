package com.caretronics.reunioes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.caretronics.reunioes.domain.Departamento;
import com.caretronics.reunioes.service.DepartamentoService;

@RestController
public class DepartamentoController {

	@Autowired
	private DepartamentoService service;

	@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
	@GetMapping("/departamentos")
	public ResponseEntity<List<Departamento>> getDepartamentos() {
		Iterable<Departamento> departamentos = this.service.list();
		return new ResponseEntity<List<Departamento>>((List<Departamento>) departamentos, HttpStatus.OK);
	}

	@GetMapping(value = "/departamentos/{id}")
	public ResponseEntity<Departamento> buscarDepartamentoPorId(@PathVariable("id") Integer id) {
		Departamento departamento = this.service.bucarPorId(id);

		if (departamento == null) {
			return new ResponseEntity<Departamento>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Departamento>(departamento, HttpStatus.OK);
		}
	}

	@PostMapping(value = "/departamentos/", consumes = "application/json")
	public ResponseEntity<Departamento> adicionarDepartamento(@RequestBody Departamento departamento) {
		this.service.salvar(departamento);
		return new ResponseEntity<Departamento>(departamento, HttpStatus.CREATED);
	}

	@PutMapping(value = "/departamentos/{id}")
	public ResponseEntity<Departamento> updateDepartamento(@PathVariable Integer id,
			@RequestBody Departamento departamento) {
		this.service.atualizar(departamento);
		return new ResponseEntity<Departamento>(departamento, HttpStatus.OK);
	}

	@DeleteMapping(value = "/departamentos/{id}")
	public ResponseEntity<Void> deleteDepartamento(@PathVariable("id") Integer id) {
		this.service.excluirPorId(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}