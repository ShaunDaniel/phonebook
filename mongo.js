if(process.argv.length<3){
    console.log("Please provide your MongoDB password as an argument! [node mongo.js (password) (contact name) (contact number)")
}

else if(process.argv.length<4){
    const mongoose = require("mongoose")
    const url = `mongodb+srv://shaundaniel:${process.argv[2]}@cluster0.opayeeh.mongodb.net/?retryWrites=true&w=majority`
    
    mongoose.connect(url).catch((err)=>{
        console.log(err)
    })

    const PersonSchema = mongoose.Schema({
        c_name: String,
        c_number: Number 
    })

    const Person = mongoose.model("Person",PersonSchema)
    Person.find({}).then((result)=>{
        console.log("Phonebook:\n")
        result.forEach(contact => {
            console.log(`Name: ${contact.c_name}\nNumber:${contact.c_number}\n`)
        });
        mongoose.connection.close()
    })
}


else{
    const mongoose = require("mongoose")
    const url = `mongodb+srv://shaundaniel:${process.argv[2]}@cluster0.opayeeh.mongodb.net/?retryWrites=true&w=majority`
    
    mongoose.connect(url).catch((err)=>{
        console.log(err)
    })

    const PersonSchema = mongoose.Schema({
        c_name: String,
        c_number: Number 
    })

    const Person = mongoose.model("Person",PersonSchema)

    const c_name = process.argv[3]
    const c_number = process.argv[4]

    console.log(`Adding ${c_name} - ${c_number}`)

    const new_person = new Person({
        c_name: c_name,
        c_number: c_number
    })
    
    new_person.save().then(persons =>{
        console.log(persons)
        console.log(`Saved!\nContact Name: ${c_name}\nContact Number:${c_number}\n`)
        mongoose.connection.close()
    })

}