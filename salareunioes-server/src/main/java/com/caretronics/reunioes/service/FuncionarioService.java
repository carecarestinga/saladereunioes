package com.caretronics.reunioes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caretronics.reunioes.dao.FuncionarioDAO;
import com.caretronics.reunioes.domain.Funcionario;

@Transactional
@Service("funcionarioService")
public class FuncionarioService {

    @Autowired
    private FuncionarioDAO dao;

    public Iterable<Funcionario> list() {
        return dao.findAll();
    }

    public Funcionario buscarPorId(Integer id) {
        return dao.findOne(id);
    }

    public Boolean salvar(Funcionario funcionario) {
        if (funcionario != null) {
            dao.save(funcionario);
            return true;
        } else {
            return false;
        }
    }

    public Boolean atualizar(Funcionario funcionario) {
        Funcionario entity = dao.findOne(funcionario.getId());
        if (entity != null) {
            entity.setNome(funcionario.getNome());
            entity.setSobrenome(funcionario.getSobrenome());
            entity.setSalario(funcionario.getSalario());
            entity.setDepartamentoId(funcionario.getDepartamentId());
            dao.save(entity);
            return true;
        } else {
            return false;
        }
    }

    public Boolean excluirPorId(Integer id) {
        Funcionario entity = dao.findOne(id);
        if (entity != null) {
            dao.delete(entity);
            return true;
        } else {
            return false;
        }
    }
}
