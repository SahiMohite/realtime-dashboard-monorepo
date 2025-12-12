const StatusDot = {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  marginRight: '8px',
  display: 'inline-block',
  transition: 'background-color 0.3s ease'
};

const ConnectionStatus = ({ isConnected }) => {
  const statusText = isConnected ? 'LIVE STREAM' : 'DISCONNECTED';
  const dotColor = isConnected ? 'var(--color-success)' : 'var(--color-error)';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em' }}>
      <span style={{ ...StatusDot, backgroundColor: dotColor }}></span>
      <span style={{ fontWeight: 'bold' }}>
        {statusText}
      </span>
    </div>
  );
};

export default ConnectionStatus;