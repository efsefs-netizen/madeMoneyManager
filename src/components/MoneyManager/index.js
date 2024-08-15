const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
import './index.css'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import {v4} from 'uuid'

class MoneyManager extends Component {
  state = {
    totalExpenses: 0,
    totalIncome: 0,
    transactionList: [],
    title: '',
    name: '',
    type: 'INCOME',
    amount: '',
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const amountValue = parseFloat(amount)
    if (type === 'INCOME') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome + amountValue,
      }))
    } else {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses + amountValue,
      }))
    }

    const newTransaction = {
      id: v4(),
      title,
      amount: amountValue,
      type,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      type: 'INCOME',
    }))
  }

  onDelete = (id, amount, type) => {
    const {transactionList} = this.state

    this.setState({
      transactionList: transactionList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    })

    if (type === 'INCOME') {
      this.setState(prevState => ({
        totalIncome: prevState.totalIncome - amount,
      }))
    } else {
      this.setState(prevState => ({
        totalExpenses: prevState.totalExpenses - amount,
      }))
    }
  }

  render() {
    const {totalExpenses, totalIncome, transactionList, title, amount} =
      this.state

    return (
      <div>
        <div>
          <div>
            <h1>Hi, Richard</h1>
            <p>Welcome back to your Money Manager</p>
          </div>

          <MoneyDetails
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
          <div className="bottom">
            <form onSubmit={this.onAdd}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                id="title"
                placeholder="TITLE"
                type="text"
                onChange={this.onChangeTitle}
                value={title}
              />

              <label htmlFor="amount">AMOUNT</label>
              <input
                name="amount"
                id="amount"
                type="text"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={amount}
              />

              <label htmlFor="type">TYPE</label>
              <select name="type" id="type" onChange={this.onChangeType}>
                <option value={transactionTypeOptions[0].optionId}>
                  {transactionTypeOptions[0].displayText}
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>

              <button type="submit">Add</button>
            </form>

            <ul>
              <h1>History</h1>
              <li className="history-titles">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  transactionDetails={eachTransaction}
                  onDelete={this.onDelete}
                  key={eachTransaction.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
