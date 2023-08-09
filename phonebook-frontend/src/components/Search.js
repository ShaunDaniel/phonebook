const Search = (props) => {
    return(
    <>
    <div className="m-3 row">
        <div className="col-12 col-lg-6 col-xl-6">
        <h4>Search Contact 🔍</h4>
        <input className="form-control" type="text" value={props.filter_query} onChange={props.handleFilter}/>
        </div>
    </div>
    </>    )
}

export default Search