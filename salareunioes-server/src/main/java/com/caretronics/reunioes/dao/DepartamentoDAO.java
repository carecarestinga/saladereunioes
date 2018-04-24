package com.caretronics.reunioes.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.caretronics.reunioes.domain.Departamento;

@Repository("departamentoDAO")
public interface DepartamentoDAO extends CrudRepository<Departamento, Integer> {

}