const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3000
app.use(express.static('build'))

app.use(express.json())
morgan.token("req-body",(req)=>{return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms :req-body '))
app.use(cors())


let peopleData = [
    { 
      "id": 1,
      "name": "Anirudh Singhania", 
      "number": "+91 9000000000"
    },
    { 
      "id": 2,
      "name": "Rajesh Jaiswal", 
      "number": "+91 8000000000"
    },
    { 
      "id": 3,
      "name": "Pooja Chandra", 
      "number": "+91 7000000000"
    },
    { 
      "id": 4,
      "name": "Mary D'Souza", 
      "number": "+91 9876543210"
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

app.put("/api/persons/:id",(req,res)=>{
    const updateId = req.params.id
    const updateIndex = peopleData.findIndex((person)=>person.id==Number(updateId))
    console.log(updateId)
    console.log(updateIndex)

    if(updateIndex==-1){
        res.status(404).send("Invalid ID!")
        
    }
    else{
        peopleData[updateIndex] = {"id":Number(updateId), "name":req.body.name, "number":req.body.number}
        res.status(200).send("Updated contact!")
    }
})

app.get("/info",(req,res)=>{
    const date = new Date()

    res.send(`<p>Phonebook contains info about ${peopleData.length} people.</p><br/><p>It is currently ${date.toString()}</p>`)
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})