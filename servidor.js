//const express = require("express");
import express from "express"

const app = express(); // cria o app UMA vez
app.use(express.json());

let proximoId = 2

let LISTARALUNOS = [
    {
        id: 1, nome: "Vitor"
    },
    {
        id: 2, nome: "Felipe"
    },
    {
        id: 33, nome: "Luiz"
    },
    {
        id:34, nome: "Augusto"
    }
]

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Aula do Vitão"
    });
});

app.get("/alunos",(req,res)=>{
    res.status(200).json(LISTARALUNOS)
})

app.get("/alunos/:codigo", (req,res)=>{
    const idParametro = Number(req.params.codigo) // String, Number, Boolean
    const aluno = LISTARALUNOS.find(a=> a.id === idParametro)

    if (!aluno){
        res.status(404).json({msg: `Usuário Não Encontrado`})
    }
    res.status(200).json(aluno)
})

// CADASTRO:

app.post("/alunos/",(req,res)=>{
    console.log(req.body)
    const {nome} = req.body
    if(!nome){
        res.status(400).json({msg: `Coloque o seu nome`})
    }

    const id  = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length -1].id + 1 : 1
    const aluno = {id:proximoId + 1, nome}
    LISTARALUNOS.push(aluno)
    res.status(201).json({msg: `Aluno cadastrado com sucesso`})
})

//Tratamento de Erro POST

app.post("/alunos/:id", (req, res) => {
    const id = req.params.id ? Number(req.params.id) : 0;
    if (id != 0) {
        return res.status(404).json({ msg: "Não preencha o campo com ID" });
    }
});

// Tratamento de Erro PUT
app.put("/alunos/", (req,res)=>{
    console.log("Parametro ", req.params)
    const idParametro = req.params.codigo ? Number(req.params.codigo) : 0
    if (idParametro === 0){
        return res.status(400).json({msg: `Id é obrigatório`})
    }
})

// DELETAR

app.delete("/alunos/:codigo", (req,res)=>{
    const idParametro = Number(req.params.codigo) // String, Number, Boolean
    const aluno = LISTARALUNOS.findIndex(a=> a.id === idParametro)

    if (aluno ==-1){
       return res.status(404).json({msg: `Usuário Não Encontrado`})
    }

    LISTARALUNOS.splice(aluno, 1)

    res.status(200).json({msg: `Aluno excluido com sucesso`})
})

// Tratamento de erro DELETE
app.delete("/alunos", (req,res)=>{
    console.log("Parametro ", req.params)
    const idParametro = req.params.codigo ? Number(req.params.codigo) : 0 // Condição ? valor_verdadeiro : valor_falso
    if (idParametro === 0){
        return res.status(400).json({msg: `Id é obrigatório`})
    }
})

// Alterar
app.put("/alunos/:codigo", (req,res)=>{
    const idParametro = Number(req.params.codigo) // String, Number, Boolean
    const indiceAluno = LISTARALUNOS.findIndex(a=> a.id === idParametro)
    const {nome} = req.body
    if (!indiceAluno){
       return res.status(404).json({msg: `Usuário Não Encontrado`})
    }

    if (!nome){
        return res.status(400).json({msg: `Nome é Obrigatório`})
    }

    LISTARALUNOS[indiceAluno] = {
        id : idParametro, nome
    }
    res.status(200).json({msg: `Aluno atualizado com sucesso`, Indice: indiceAluno})
})

app.listen(5000, () => {
    console.log("Servidor rodando ✅");
});