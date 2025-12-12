import React from 'react';
// 🌟 CRITICAL IMPORTS: These must be present after npm install recharts 🌟
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

const chartStyle = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: 'var(--border-radius)',
  padding: 'calc(var(--spacing-unit) * 3)',
  boxShadow: 'var(--card-shadow)',
  // REMOVE fixed height from the outer div if using ResponsiveContainer height="90%"
  // height: '400px', // <-- REMOVE THIS LINE
  // INSTEAD, ensure it can shrink but not too much, and add a min height
  minHeight: '400px', // ADD this to ensure a minimum size
  marginTop: 'calc(var(--spacing-unit) * 3)',
  // CRITICAL: Ensure it can take up space in the grid/flex context
  width: '100%' 
};

const LiveChart = ({ history, ticker }) => {
  if (!history || history.length < 2) { 
    return (
      <div style={chartStyle}>
        <h3 style={{color: 'var(--color-primary)'}}>{ticker || 'Stock'} Price Trend</h3>
        <p style={{ color: 'var(--color-text-light)', opacity: 0.7, marginTop: '20px' }}>
          Awaiting sufficient historical data (2+ points) to display chart...
        </p>
      </div>
    );
  }
  
  // Calculate price domain for Y-axis scaling
  const prices = history.map(d => d.price);
  const minPrice = Math.min(...prices) * 0.99;
  const maxPrice = Math.max(...prices) * 1.01;

  return (
    <div style={chartStyle}>
      <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
        {ticker} Price Trend (Last {history.length} Updates)
      </h3>

      {/* 🚀 RECHARTS IMPLEMENTATION 🚀 */}
      <ResponsiveContainer width="100%" height={400} /* Set fixed pixel height here */ >
        <LineChart 
          data={history} 
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid lines for better readability */}
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          
          {/* X-Axis: Time string, formatted for every 10th tick to avoid clutter */}
          <XAxis 
            dataKey="time_str" 
            interval={Math.floor(history.length / 10) || 1} 
            stroke="#999" 
            tick={{fontSize: 10}}
          />
          
          {/* Y-Axis: Price, with domain scaled dynamically */}
          <YAxis 
            domain={[minPrice, maxPrice]} 
            stroke="#999" 
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          
          {/* Tooltip to show details on hover */}
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid #555' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']} 
            labelFormatter={(label) => `Time: ${label}`}
          />
          
          {/* The actual line that tracks the price */}
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="var(--color-primary)" 
            dot={false} 
            strokeWidth={3} 
            isAnimationActive={false}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;