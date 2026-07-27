const PersonForm = ({ onSubmit, nameValue, numberValue, handleNameChange, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={nameValue} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={numberValue} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
