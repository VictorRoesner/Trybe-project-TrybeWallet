import React from 'react';
import Expenses from '../components/Expenses';
import ExpenseTable from '../components/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Expenses />
        <ExpenseTable />

      </>

    );
  }
}

export default Wallet;
