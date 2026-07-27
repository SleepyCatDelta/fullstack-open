const Notification = ({ message }) => {
  if (!message) return null

  return (
    <p style={{ color: message.type === 'error' ? 'red' : 'green' }}>
      {message.text}
    </p>
  )
}

export default Notification