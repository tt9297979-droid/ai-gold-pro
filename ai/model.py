import yfinance as yf
import numpy as np
import json
from liquidity import liquidity
from lstm import predict

data = yf.download("GC=F", period="3d", interval="5m")

closes = data["Close"].dropna().values
volume = data["Volume"].dropna().values

price = closes[-1]

ema5 = np.mean(closes[-5:])
ema20 = np.mean(closes[-20:])

vol = np.mean(volume[-10:])

pred = predict(closes)

liq = liquidity(closes)

signal = "HOLD"
confidence = 50

if ema5 > ema20 and pred > price and vol > np.mean(volume):
    signal = "BUY"
    confidence = 90

elif ema5 < ema20 and pred < price and vol > np.mean(volume):
    signal = "SELL"
    confidence = 90

tp = price + 10 if signal=="BUY" else price - 10
sl = price - 5 if signal=="BUY" else price + 5

print(json.dumps({
    "signal":signal,
    "price":round(price,2),
    "tp":round(tp,2),
    "sl":round(sl,2),
    "confidence":confidence,
    "prediction":pred,
    "liquidity":liq
}))
