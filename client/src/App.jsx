import React from 'react';
import useWebSocket from '../hooks/useWebSocket'
import ConnectionStatus from '../components/ConnectionStatus'
import StockCard from '../components/StockCard'
import LiveChart from '../components/LiveChart'; // Placeholder

// Define initial empty state for the stock feed
const initialStockData = { 
  ticker: 'AWAITING DATA', 
  price: 0.00, 
  change_percent: 0.00, 
  timestamp: 0,
  time_str: '--:--:--'
};

function App() {
  const { latestData, history, isConnected } = useWebSocket('stockUpdate', initialStockData);
  
  const isDataAvailable = latestData && latestData.ticker !== 'AWAITING DATA';

  return (
    <div className="Dashboard">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: 'calc(var(--spacing-unit) * 4)',
        borderBottom: '1px solid var(--color-surface)'
      }}>
        <h1>Real-Time Stream Dashboard</h1>
        <ConnectionStatus isConnected={isConnected} />
      </header>
      
      <div className="DataDisplay" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', /* Responsive Grid */
        gap: 'calc(var(--spacing-unit) * 3)',
        paddingTop: 'calc(var(--spacing-unit) * 4)'
      }}>
        {/* Only render StockCard if we have valid data */}
        {isDataAvailable ? (
          <StockCard data={latestData} />
        ) : (
          <div>Waiting for first stream update...</div>
        )}
      </div>

      {/* CHART INTEGRATION (placed below the main cards) */}
      <div className="ChartArea" style={{ 
        // Ensure the ChartArea takes full width below the cards
        gridColumn: '1 / -1', 
        width: '100%',
      }}>
        <LiveChart history={history} ticker={latestData.ticker} />
      </div>
    </div>
  );
}

export default App;