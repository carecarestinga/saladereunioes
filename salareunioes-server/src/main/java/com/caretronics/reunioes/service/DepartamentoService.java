package com.caretronics.reunioes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caretronics.reunioes.dao.DepartamentoDAO;
import com.caretronics.reunioes.domain.Departamento;

@Transactional
@Service("departamentoService")
public class DepartamentoService {
 
    @Autowired
    private DepartamentoDAO dao;
 
    public Iterable<Departamento> list() {
        return dao.findAll();
    }    
    
    public Departamento bucarPorId(Integer id) {
        return dao.findOne(id);
    }
 
    public Boolean salvar(Departamento departamento) {
        if(departamento != null){
        	dao.save(departamento);
        	return true;
        }else{
        	return false;
        }
    }
 
    public Boolean atualizar(Departamento departamento) {
    	Departamento entity = dao.findOne(departamento.getId());
        if(entity != null){
        	entity.setNome(departamento.getNome());
        	entity.setDescricao(departamento.getDescricao());
        	entity.setFuncionarios(departamento.getFuncionarios());
        	entity.setReuniaos(departamento.getReuniaos());
        	dao.save(entity);
        	return true;
        }else{
        	return false;
        }
    }
    
    public Boolean excluirPorId(Integer id) {
    	Departamento entity = dao.findOne(id);
        if(entity != null){
        	dao.delete(entity);
        	return true;
        }else{
        	return false;
        }
    }
}