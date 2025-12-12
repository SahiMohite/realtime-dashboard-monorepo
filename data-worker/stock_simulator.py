import random
import time
from datetime import datetime

class StockSimulator:
    def __init__(self, ticker, initial_price=100.00):
        self.ticker = ticker
        self.price = initial_price

    def generate_update(self):
        """Generates a new simulated stock price based on a small random walk."""
        
        # Small random change ensures continuous movement
        price_change = random.uniform(-0.5, 0.5) 
        self.price += price_change
        
        # Ensure price doesn't go negative (simulated constraint)
        self.price = max(0.01, self.price) 
        
        # Calculate percentage change based on initial price for simplicity
        change_percent = ((self.price - 100.00) / 100.00) * 100.00
        
        return {
            "ticker": self.ticker,
            "price": round(self.price, 2),
            "change_percent": round(change_percent, 2),
            "timestamp": int(time.time() * 1000),
            "time_str": datetime.now().strftime("%H:%M:%S")
        }

if __name__ == '__main__':
    # Example usage test
    simulator = StockSimulator("TEST-SIM")
    for _ in range(3):
        print(simulator.generate_update())
        time.sleep(0.5)