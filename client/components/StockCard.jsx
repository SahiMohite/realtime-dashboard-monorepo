const StockCard = ({ data }) => {
  const { ticker, price, change_percent, time_str } = data;
  
  const isPositive = change_percent >= 0;
  const changeColor = isPositive ? 'var(--color-success)' : 'var(--color-error)';
  const arrow = isPositive ? '▲' : '▼';

  return (
    <div style={{ 
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--border-radius)',
      padding: 'calc(var(--spacing-unit) * 3)',
      boxShadow: 'var(--card-shadow)',
      transition: 'transform 0.3s ease',
      borderLeft: `4px solid ${changeColor}`, /* Highlight border based on change */
      // Hover effect to show interactivity
      ':hover': { transform: 'translateY(-2px)' } 
    }}>
      
      <h2 style={{ margin: 0, color: 'var(--color-text-light)' }}>{ticker}</h2>
      
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        {/* Large, prominent price display */}
        <span style={{ fontSize: '3em', fontWeight: 700, color: 'var(--color-text-light)' }}>
          ${price ? price.toFixed(2) : 'N/A'}
        </span>
      </div>
      
      {/* Percentage Change Indicator */}
      <p style={{ 
        color: changeColor, 
        fontSize: '1.4em', 
        fontWeight: 600, 
        margin: '5px 0' 
      }}>
        {arrow} {Math.abs(change_percent).toFixed(2)}%
      </p>
      
      <small style={{ 
        color: 'var(--color-text-light)', 
        opacity: 0.6, 
        display: 'block', 
        marginTop: '15px' 
      }}>
        Last Update: {time_str || 'N/A'}
      </small>
    </div>
  );
};

export default StockCard;