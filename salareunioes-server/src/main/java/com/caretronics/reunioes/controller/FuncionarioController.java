package com.caretronics.reunioes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.caretronics.reunioes.domain.Funcionario;
import com.caretronics.reunioes.service.FuncionarioService;

@RestController
public class FuncionarioController {

	@Autowired
    private FuncionarioService service;

	@GetMapping("/funcionarios")
    public ResponseEntity<List<Funcionario>> employee() {
		Iterable<Funcionario> funcionarios = this.service.list();
    	return new ResponseEntity<List<Funcionario>>((List<Funcionario>) funcionarios, HttpStatus.OK);
    }
    
    @GetMapping(value = "/funcionarios/{id}")
    public ResponseEntity<Funcionario> buscarFuncionarioPorId(@PathVariable("id") Integer id) {
    	Funcionario funcionario = this.service.buscarPorId(id);
    	if(funcionario == null){
    		return new ResponseEntity<Funcionario>(HttpStatus.NOT_FOUND);
    	}else{
    		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
    	}
    }
    
    @PostMapping(value = "/funcionarios")
	public ResponseEntity<Funcionario> adicionarFuncionario(@RequestBody Funcionario funcionario) {
    	this.service.salvar(funcionario);
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.CREATED);
	}
    
    @PutMapping(value = "/funcionarios/{id}")
	public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
    	this.service.atualizar(funcionario);
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/funcionarios/{id}")
	public ResponseEntity<Void> excluirFuncionario(@PathVariable("id") Integer id) {
		this.service.excluirPorId(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}