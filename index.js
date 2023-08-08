const express = require("express")


const app = express()
const port = 3000

app.use(express.json())

let peopleData = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons",(req,res)=>{
    res.json(peopleData)
})

app.get("/api/persons/:id",(req,res)=>{
    personData = peopleData.find((person)=>person.id==req.params.id)
    if(personData){
        res.json(personData)
    }
    else{
        res.sendStatus(404).send("404: Not found!")
    }
})

app.post("/api/persons",(req,res)=>{
    const contact = {
        "id":peopleData.length+1,
        "name":req.body.name,
        "number":req.body.number
    }
    peopleData.push(contact)
    console.log(peopleData)
    res.sendStatus(201).end()
})

app.delete("/api/persons/:id",(req,res)=>{
    peopleData = peopleData.filter((person)=>person.id!=req.params.id)
    res.status(204).end()
})

app.get("/info",(req,res)=>{
    const date = new Date()

    res.send(`<p>Phonebook contains info about ${peopleData.length} people.</p><br/><p>It is currently ${date.toString()}</p>`)
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})