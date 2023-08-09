const Alert = (props) => {
    return(
        <div className = {props.alerts}>
            {props.alertText}
        </div>
    )
}

export default Alert