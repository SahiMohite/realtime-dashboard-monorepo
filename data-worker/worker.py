import redis
import json
import time
import os
from dotenv import load_dotenv
from stock_simulator import StockSimulator

# Load REDIS_URL from .env file
load_dotenv() 

REDIS_URL = os.getenv("REDIS_URL")
CHANNEL_NAME = "stock_feed"

if not REDIS_URL:
    raise ValueError("REDIS_URL environment variable is not set!")

def run_publisher():
    try:
        r = redis.from_url(REDIS_URL)
        r.ping()
        print("--- Redis connection established successfully.")
    except Exception as e:
        print(f"!!! Error connecting to Redis: {e}")
        return

    simulator = StockSimulator("GME-XYZ")
    print(f"--- Starting publisher on channel: {CHANNEL_NAME}")
    
    while True:
        data = simulator.generate_update()
        message = json.dumps(data)
        
        # PUBLISH: The core Pub/Sub command
        subscribers = r.publish(CHANNEL_NAME, message)
        
        print(f"Published: {data['time_str']} | Price: {data['price']} | Subscribers: {subscribers}")
        
        # Throttle the stream to 10 updates per second
        time.sleep(0.1)

if __name__ == '__main__':
    run_publisher()