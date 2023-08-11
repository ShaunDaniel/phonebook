const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Contact = require("./models/mongo.js");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("build"));

app.use(express.json());
morgan.token("req-body", (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status :response-time ms :req-body "));
app.use(cors());

const peopleData = [];

Contact.find({}).then((results) => {
  results.forEach((result) => {
    peopleData.push({
      id: result.id,
      name: result.name,
      number: result.number,
    });
  });
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("Contact not found!");
    }
  })
  .catch((err)=>{res.statusCode(500).send(err)})
});

app.post("/api/persons", (req, res) => {
  if(!req.body.name || !req.body.number){
    return res.status(400).send("Content missing from body.");
  }
  
  else{
    const new_contact = new Contact({
      name: req.body.name,
      number: req.body.number,
    });

    Contact.countDocuments({ name: new_contact.name }).then((result) => {
      if (result == 0) {
        Contact.countDocuments({ number: new_contact.number }).then((result) => {
            if (result == 0) {
              new_contact.save().then((result) => {
                console.log(result);
                return res.status(201).send("Data saved successfully!");
              });
            } else {
              return res.status(409).send("Number already exists!");
            }
          }
        );
      } else {
        return res.status(409).send("Name already exists!");
      }
    });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  Contact.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result)
    if (result.deletedCount === 1) {
      return res.status(204).send("Contact deleted successfully!");
    } else {
      return res.status(404).send("Contact not found!");
    }
  });
});

app.put("/api/persons/:id", (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    number: req.body.number,
  })
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.statusCode(404).send("Contact not found!");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/info", (req, res) => {
    console.log("entered")
  const date = new Date();

  res.send(
    `<p>Phonebook contains info about ${
    Contact.count({})
    } people.</p><br/><p>It is currently ${date.toString()}</p>`
  );
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
