package com.caretronics.reunioes.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.caretronics.reunioes.domain.Reuniao;

@Repository("reuniaoDAO")
public interface ReuniaoDAO extends CrudRepository<Reuniao, Integer> {

}