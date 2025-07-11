import React, { useId } from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId()

  return (
    <div className={`bg-white/80 backdrop-blur-md p-4 rounded-xl text-sm flex shadow-md ${className}`}>
      <div className="w-1/2 pr-2">
        <label htmlFor={amountInputId} className="text-gray-600 mb-1  inline-block">
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-gray-100 text-gray-800 font-semibold py-2 px-3 rounded-md focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>

      <div className="w-1/2 pl-2 text-right">
        <p className="text-gray-600 font-medium mb-2 block ">Currency Type</p>
        <select
          className="w-full text-gray-800 font-semibold py-2 px-3 bg-gray-100 cursor-pointer rounded-md focus:ring-2 focus:ring-blue-500"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputBox
