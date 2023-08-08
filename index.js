const express = require("express")


const app = express()
const port = 3000

const peopleData = [
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

app.get("/info",(req,res)=>{
    const date = new Date()

    res.send(`<p>Phonebook contains info about ${peopleData.length} people.</p><br/><p>It is currently ${date.toString()}</p>`)
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})