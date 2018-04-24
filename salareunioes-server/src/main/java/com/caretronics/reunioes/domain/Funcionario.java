package com.caretronics.reunioes.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "FUNCIONARIO")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id", scope = Funcionario.class)
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "FUNCIONARIO_ID", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty
    @Column(name = "NOME", nullable = false)
    private String nome;

    @NotEmpty
    @Column(name = "SOBRENOME", nullable = false)
    private String sobrenome;

    @NotNull
    @Column(name = "SALARIO", nullable = false)
    private Integer salario;

    @Column(name = "DEPARTAMENTO_ID")
    private Integer departamentoId;

//    //@JsonIgnore
//    @JsonBackReference
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "DEPARTAMENTO_ID", referencedColumnName = "DEPARTAMENTO_ID")
//    private Departamento departamentoId;
    public Funcionario() {
    }

//    public Funcionario(Integer id, String nome, String sobrenome, Integer salario, Departamento departamentoId) {
//        super();
//        this.id = id;
//        this.nome = nome;
//        this.sobrenome = sobrenome;
//        this.salario = salario;
//        this.departamentoId = departamentoId;
//    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public Integer getSalario() {
        return salario;
    }

    public void setSalario(Integer salario) {
        this.salario = salario;
    }

    public Integer getDepartamentId() {
        return departamentoId;
    }

    public void setDepartamentoId(Integer departamentoId) {
        this.departamentoId = departamentoId;
    }

//    public Departamento getDepartamentoId() {
//        return departamentoId;
//    }
//
//    public void setDepartamentoId(Departamento departamentoId) {
//        this.departamentoId = departamentoId;
//    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((departamentoId == null) ? 0 : departamentoId.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Funcionario other = (Funcionario) obj;
        if (departamentoId == null) {
            if (other.departamentoId != null) {
                return false;
            }
        } else if (!departamentoId.equals(other.departamentoId)) {
            return false;
        }
        if (id == null) {
            if (other.id != null) {
                return false;
            }
        } else if (!id.equals(other.id)) {
            return false;
        }
        return true;
    }

}
