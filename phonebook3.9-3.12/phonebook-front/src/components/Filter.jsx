const Filter = ({persons,pers,handlePers,setPers}) => {

    const search = e => {
      e.preventDefault()
      for (let person in persons) {
        if (persons[person].name.toLowerCase() === pers.toLowerCase()) {
          setPers('')
          return alert(`${persons[person].name} is found, number is ${persons[person].number}`)
        }
      }
      setPers('')
    }
  
    return (
      <form onSubmit={search}>
        <div>
          filter shown with <input
            value={pers}
            onChange={handlePers}
            placeholder='Search person'
          />
          <button type="search"
          >Search</button>
        </div>
      </form>
    )
  }

  export default Filter