import express from 'express' 
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.listen(3333)

const alunos = []

app.post('/alunos', async (req, res) => {

    await prisma.aluno.create({
        data: {
            email: req.body.email,
            name: req.body.name
        }
    })
    /*alunos.push(req.body)*/
    /* console.log(req.body) */
    res.status(201).json(req.body)
})

app.get('/alunos', async (req, res) => {

    const alunos = await prisma.aluno.findMany()

    res.status(200).json(alunos)
    /*res.send('Servidor funcionando!')*/
})

app.put('/alunos/:id', async (req, res) => {

    await prisma.aluno.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name
        }
    })
    /*alunos.push(req.body)*/
    /* console.log(req.body) */
    res.status(201).json(req.body)
})

app.delete('/alunos/:id', async (req, res) => {
    await prisma.aluno.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({mensage: "Aluno deletado com sucesso!"})

})

