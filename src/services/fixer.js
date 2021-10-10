import fetch from 'node-fetch'

export const getRate = async (currency) => {
  const response = await fetch(
    `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_KEY}&symbols=${currency},USD`
  )

  const data = await response.json()

  return data.rates[currency] / data.rates.USD
}
