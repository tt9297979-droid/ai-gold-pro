import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

def predict(prices):

    X = []
    for i in range(20, len(prices)):
        X.append(prices[i-20:i])

    X = np.array(X)
    X = X.reshape((X.shape[0], X.shape[1], 1))

    model = Sequential()
    model.add(LSTM(32, input_shape=(20,1)))
    model.add(Dense(1))
    model.compile(loss='mse', optimizer='adam')

    model.fit(X, prices[20:], epochs=2, verbose=0)

    last = prices[-20:].reshape(1,20,1)

    return float(model.predict(last)[0][0])
