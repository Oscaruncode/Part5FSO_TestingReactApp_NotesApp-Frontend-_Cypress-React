const Message = ({ message }) => {

  if(message){
    const classes = message === 'Wrong credentials' ? 'error' : 'success'

    return (<div className={classes}>
      {message}
    </div>)
  }


  return null

}


export default Message