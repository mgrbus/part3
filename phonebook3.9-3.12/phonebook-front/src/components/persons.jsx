import Person from './person.jsx'

const Persons = ({ persons, setPersons }) => {

    return (
        <ul>
            {persons.map(person =>
                <Person persons={persons} setPersons={setPersons} key={person.id} id={person.id} name={person.name} number={person.number} />)
            }
        </ul>
    )
}

export default Persons