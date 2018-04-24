package com.caretronics.reunioes.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.caretronics.reunioes.domain.Funcionario;

@Repository("funcionarioDAO")
public interface FuncionarioDAO extends CrudRepository<Funcionario,Integer> {

}