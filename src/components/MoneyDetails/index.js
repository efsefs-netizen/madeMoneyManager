// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {totalIncome, totalExpenses} = props
  const newTotalBalance = totalIncome - totalExpenses

  return (
    <ul className="moneyManagerSection">
      <li className="moneyManagerSection">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount">{newTotalBalance}</p>
        </div>
      </li>

      <li className="moneyManagerSection">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount">{totalIncome}</p>
        </div>
      </li>

      <li className="moneyManagerSection">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">{totalExpenses}</p>
        </div>
      </li>
    </ul>
  )
}

export default MoneyDetails
