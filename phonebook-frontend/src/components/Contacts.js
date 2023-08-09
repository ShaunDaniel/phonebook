const Contact = (props) => {
    return(
        <>
        <div className="m-4">
            <div className="my-3">
            <h2>Directory📖</h2>
            </div>
            <div className="overflow-scroll" style={{maxHeight:"70vh"}}>
            <table className="table table-bordered w-100 ">
                <thead className="text-center position-sticky fixed-top bg-white">
                    <tr key="contact_header">
                    <th  key="cname" scope="col">Contact Name</th>
                    <th key="cnum" scope="col">Contact Number</th>
                    <th key="caction" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {props.filteredArray.map((person)=>
                    <tr key={"contact_"+person.id}>
                        <td style={{maxWidth:"15vw",overflow:"hidden",textOverflow:"ellipsis"}} key={person.id}>{person.name}</td>
                        <td style={{maxWidth:"15vw",overflow:"hidden",textOverflow:"ellipsis"}}  key={`num_`+person.id}>{person.number}</td>
                        <td className="d-flex justify-content-center"><button value={person.id} onClick={props.handleDelete} className="btn btn-danger">Delete</button></td>

                    </tr>
                    )}
                </tbody>
            </table>
            </div>
            {/* <ul className="list-group list-group">
                <li className="list-group-item active" aria-current="true">Contact</li>
                {props.filteredArray.map((person)=><li className="list-group-item" key={person.id}>{person.name}</li>)}
            </ul> */}
            
        </div>
        </>
    )
}

export default Contact