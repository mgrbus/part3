const Notification = ({ message }) => {
    const ukras = {
        color:'red',
        fontSize:33,
        fontStyle:'italic'
    }
  
    return (
      <div style={ukras}><p>{message}</p>
      </div>
    )
  }

  export default Notification