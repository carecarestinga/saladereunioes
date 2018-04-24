package com.caretronics.reunioes.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caretronics.reunioes.dao.ReuniaoDAO;
import com.caretronics.reunioes.domain.Reuniao;

@Transactional
@Service("reuniaoService")
public class ReuniaoService {

    @Autowired
    private ReuniaoDAO dao;

    public Iterable<Reuniao> list() {
        return dao.findAll();
    }

    public Reuniao buscarPorId(Integer id) {
        return dao.findOne(id);
    }

    public Boolean salvar(Reuniao reuniao) {
        if (reuniao != null) {
            dao.save(reuniao);
            return true;
        } else {
            return false;
        }
    }

    public Boolean atualizar(Reuniao reuniao) {
        Reuniao entity = dao.findOne(reuniao.getId());
        if (entity != null) {
            entity.setNome(reuniao.getNome());
            entity.setDescricao(reuniao.getDescricao());
            entity.setDepartamentos(reuniao.getDepartamentos());
            dao.save(entity);
            return true;
        } else {
            return false;
        }
    }

    public Boolean excluirPorId(Integer id) {
        Reuniao entity = dao.findOne(id);
        if (entity != null) {
            dao.delete(entity);
            return true;
        } else {
            return false;
        }
    }
}
