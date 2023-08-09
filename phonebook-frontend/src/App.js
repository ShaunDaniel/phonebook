import { useEffect, useState } from "react";
import "./App.css";


import contactService from "./services/contacts.js"

import AddContact from "./components/AddContact.js";
import Search from "./components/Search.js";
import Contact from "./components/Contacts.js";
import Footer from "./components/Footer.js"


const App = () => {
  
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ id:0,name: "", number: "" });
  const [filtered, setFiltered] = useState(false);
  const [filter_query, setFilterQuery] = useState("");
  const [alert,setAlert] = useState({
    alert: "d-none",
    alertText: ""
  })


  useEffect(() => {
    contactService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);


  const resetAlert = () => {
    setTimeout(() => {
      setAlert({
        alert: "d-none",
        alertText: ""
      })
    }, 2500);
    
  }
  
  //filtered flag setter
  const handleFilter = (e) => {
    setFilterQuery(e.target.value);
    e.target.value = "" ? setFiltered(false) : setFiltered(true);
  };
  //checks if filtered is true & filters & updates person state acc to search term
  const filteredArray = filtered ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter_query.toLowerCase())
      )
    : persons;

  // storing states of name & number input fields

  const handleNumber = (e) => {
    setNewName({ ...newName, number: e.target.value, id:persons.length+1 });
  };

  const handleName = (e) => {
    setNewName({ ...newName, name: e.target.value,id:persons.length+1 });
  };


  const handleDelete = (e) =>{
    const deleteConfirm = window.confirm(`Do you wish to delete ${persons.find((person) => person.id===Number((e.target.value))).name}?`)
    if(deleteConfirm){contactService.deleteContact(e.target.value).then((res)=>{
      setPersons(persons.filter((person)=>person.id!==Number(e.target.value)))
      setAlert({alert:"d-block row mx-2 w-50 lh-1 alert alert-success",alertText:"Contact deleted successfully!"})
      resetAlert() 
    }).catch((error)=>{
      setAlert({alert:"d-block row mx-2 w-50 lh-1 alert alert-danger",alertText:`404! Contact doesn't exist! ${error}`})
      resetAlert() 
    })} 
  }

  const addPerson = (e) => {
    e.preventDefault();
    var dupliCheck = persons.some((person) => person.name.toUpperCase() === newName.name.toUpperCase());
    var contCheck = persons.some((person) => person.number === newName.number);
    
    if (dupliCheck) {
      const replaceCheck = window.confirm(`${newName.name} already exists in phonebook! Do you want to replace the old number with ${newName.number}?`);
      const existingContact = persons.filter((person)=>person.name.toUpperCase()===newName.name.toUpperCase())[0]
      if(replaceCheck) {contactService.updateContact({"name":newName.name,"number":newName.number},existingContact.id).then((res)=>{
        setPersons(persons.map(person => person.id === existingContact.id ? { ...person, number: newName.number } : person));
        setAlert({alert:"d-block row mx-2 w-50 lh-1 alert alert-success",alertText:"Contact updated successfully!"})
        resetAlert() 
      })}

    } 
    
    else if (contCheck) {
      setAlert({alert:"d-block row mx-2 w-50 lh-1 alert alert-danger",alertText:"Number already exists!"})
      resetAlert() 
    } 
    
    else {

      contactService.createContact(newName).then((res)=>{
        setPersons([...persons,newName])
        setNewName({name:"",number:"",id:0})
        setAlert({alert:"d-block row mx-2 w-50 lh-1 alert alert-success",alertText:"Contact added successfully!"})
        resetAlert()  
      })     
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex flex-column justify-content-between">
      <div className="navbar nav m-0 p-2">
        <h2 className="app-title navbar-brand fs-2 px-2 text-light fw-bolder">📞 Phonebook</h2>
      </div>
      <div className="d-flex justify-content-around flex-column flex-md-row">
      
        <div className="add-contact flex-fill">
          <AddContact addPerson={addPerson} newName={newName} handleName={handleName} handleNumber={handleNumber} alert={alert}/>
          <Search filter_query={filter_query} handleFilter={handleFilter} />
        </div>
        <div className="search-and-display flex-fill">
          <Contact filteredArray={filteredArray} handleDelete={handleDelete}/>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  );
};

export default App;
