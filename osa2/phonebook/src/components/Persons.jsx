const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}
    <button onClick={() => handleDelete(person.id)}>delete</button>
  </p>
)

const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person =>
      <Person key={person.name} person={person} handleDelete={handleDelete} />
    )}
  </div>
)

export default Persons
