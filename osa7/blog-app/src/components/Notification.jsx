import useNotificationStore from '../stores/notificationStore'

const Notification = () => {
  const message = useNotificationStore((state) => state.message)
  if (!message) return null
  const style = {
    color: message.type === 'error' ? 'red' : 'green',
    border: `2px solid ${message.type === 'error' ? 'red' : 'green'}`,
    padding: '8px',
    marginBottom: '10px',
    backgroundColor: message.type === 'error' ? '#ffe0e0' : '#e0ffe0',
  }
  return <p style={style}>{message.text}</p>
}

export default Notification
