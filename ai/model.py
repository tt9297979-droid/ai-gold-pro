import yfinance as yf
import numpy as np
import json

data = yf.download("GC=F", period="5d", interval="5m")

close = data["Close"].dropna().values
volume = data["Volume"].dropna().values

price = close[-1]

# EMA
ema9 = np.mean(close[-9:])
ema21 = np.mean(close[-21:])
ema50 = np.mean(close[-50:])

# RSI
delta = np.diff(close)
gain = np.maximum(delta,0).mean()
loss = -np.minimum(delta,0).mean()
rsi = 100 - (100/(1+gain/loss)) if loss!=0 else 50

# Volume spike
vol_now = volume[-1]
vol_avg = np.mean(volume[-20:])

# Liquidity
liq_high = max(close[-50:])
liq_low = min(close[-50:])

# Trend logic
signal = "HOLD"
confidence = 60

if ema9 > ema21 > ema50 and rsi < 65 and vol_now > vol_avg:
    signal = "BUY"
    confidence = 88

elif ema9 < ema21 < ema50 and rsi > 35 and vol_now > vol_avg:
    signal = "SELL"
    confidence = 88

# TP/SL Smart Money
tp = liq_high if signal=="BUY" else liq_low
sl = price - 5 if signal=="BUY" else price + 5

print(json.dumps({
    "signal":signal,
    "price":round(price,2),
    "tp":round(tp,2),
    "sl":round(sl,2),
    "confidence":confidence,
    "liquidity_high":liq_high,
    "liquidity_low":liq_low
}))
