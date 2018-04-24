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

import com.caretronics.reunioes.domain.Reuniao;
import com.caretronics.reunioes.service.ReuniaoService;

@RestController
public class ReuniaoController {
	
	@Autowired
    private ReuniaoService service;

	@GetMapping("/reuniaos")
    public ResponseEntity<List<Reuniao>> getReuniaos() {
		Iterable<Reuniao> reuniaos = this.service.list();
    	return new ResponseEntity<List<Reuniao>>((List<Reuniao>) reuniaos, HttpStatus.OK);
    }
    
    @GetMapping(value = "/reuniaos/{id}")
    public ResponseEntity<Reuniao> buscarReuniaoPorId(@PathVariable("id") Integer id) {
    	Reuniao reuniao = this.service.buscarPorId(id);
    	
    	if(reuniao == null){
    		return new ResponseEntity<Reuniao>(HttpStatus.NOT_FOUND);
    	}else{
    		return new ResponseEntity<Reuniao>(reuniao, HttpStatus.OK);
    	}      	
    }
    
    @PostMapping(value = "/reuniaos")
	public ResponseEntity<Reuniao> adicionarReuniao(@RequestBody Reuniao reuniao) {
    	this.service.salvar(reuniao);
		return new ResponseEntity<Reuniao>(reuniao, HttpStatus.CREATED);
	}
    
    @PutMapping(value = "/reuniaos/{id}")
	public ResponseEntity<Reuniao> atualizarReuniao(@PathVariable Integer id, @RequestBody Reuniao reuniao) {
    	this.service.atualizar(reuniao);
		return new ResponseEntity<Reuniao>(reuniao, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/reuniaos/{id}")
	public ResponseEntity<Void> excluirReuniao(@PathVariable("id") Integer id) {
		this.service.excluirPorId(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}    
}