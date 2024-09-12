import { removeP } from "../services/persons"

const Person = ({ persons, setPersons, id, name, number }) => {
    return (
        <li key={id}>{name} {number}<button onClick=
            {() => {
                if (window.confirm(`Delete ${name}?`)) {
                    removeP(id)
                    setPersons(persons.filter(person => person.id !== id))
                }
            }}
        >delete</button>
        </li>)
}
export default Person