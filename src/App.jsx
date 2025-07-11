import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import InputBox from './components/InputBox'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (!currencyInfo[to]) return
    const result = parseFloat(amount) * currencyInfo[to]
    setConvertedAmount(result)
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center text-white"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
          url('https://png.pngtree.com/thumb_back/fh260/background/20220512/pngtree-growing-chart-against-the-background-of-the-usa-america-flag-candlestick-image_1298780.jpg')
        `,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="w-full max-w-md mx-auto rounded-xl p-6 shadow-2xl backdrop-blur-lg bg-white/20 border-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <h1 className="text-xl font-semibold mb-6 text-white drop-shadow-lg">Currency Converter</h1>

          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(val) => setAmount(val)}
          />

          <div className="relative w-full h-0.5 my-6">
            <button
              type="button"
              className=""
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-medium px-4 py-3 rounded-lg mt-6 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!amount || !currencyInfo[to]}
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
