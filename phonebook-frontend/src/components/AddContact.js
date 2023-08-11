import Alert from "./Alert"

const AddContact = (props) => {
    return(
        <form onSubmit={props.addPerson} className="m-3 row">
          <h3 className="my-3">Add Contact 📝</h3>
          <Alert alerts={props.alert.alert} alertText={props.alert.alertText} />
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <label htmlFor="contact-name" className="form-label">Name: </label> 
          <input className="form-control" id="contact-name" value={props.newName.name} onChange={props.handleName} required/>
          <label htmlFor="contact-phone" className="form-label">Phone: </label>        
          <input className="form-control" id="contact-phone" value={props.newName.number} onChange={props.handleNumber} required/>

        </div>
        <div>
          <button type="submit" className="btn btn-primary my-2 col-6 col-md-5 col-lg-4 col-xl-3">Add Contact</button>
        </div>
        <br />
      </form>
    )
}

export default AddContact