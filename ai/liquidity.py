def liquidity(prices):
    return {
        "high": max(prices[-50:]),
        "low": min(prices[-50:])
    }
