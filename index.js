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
    const dupliName = peopleData.some((person)=>person.name.toLowerCase()==contact.name.toLowerCase())
    const dupliNum = peopleData.some((person)=>person.number==contact.number)
    
    console.log(req.body)
    
    if(!req.body.name || !req.body.number){
        return res.status(400).send("Content missing from body.")
    }
    else{
        if (dupliName || dupliNum){
            return res.status(409).send("Name/Number already exists!")
        }
        else{
            peopleData.push(contact)
            console.log(peopleData)
            return res.status(201).send("Data saved successfully!")

        }
        
    }
    
})

app.delete("/api/persons/:id",(req,res)=>{
    contactExists = peopleData.some((person)=>person.id==req.params.id)

    if(contactExists){
        peopleData = peopleData.filter((person)=>person.id!=req.params.id)
        return res.status(204).send("Contact deleted successfully!")
    }
    else{
        return res.status(404).send("Contact not found!")
    }    

})

app.get("/info",(req,res)=>{
    const date = new Date()

    res.send(`<p>Phonebook contains info about ${peopleData.length} people.</p><br/><p>It is currently ${date.toString()}</p>`)
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})