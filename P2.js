import React, { Component } from 'react';

class BillCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pmr: '',
      lmr: '',
      billedUnits: 0,
      unitRate: 0,
      amount: 0,
      discount: 0,
      netAmount: 0,
      error: null,
    };
  }

  // Handle input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Calculate bill
  calculateBill = () => {
    const { pmr, lmr } = this.state;

    // Validate inputs
    if (pmr <= lmr) {
      this.setState({ error: 'PMR should be greater than LMR', billedUnits: 0, amount: 0, netAmount: 0 });
      return;
    }

    const billedUnits = pmr - lmr;
    let unitRate;

    // Determine unit rate based on billed units
    if (billedUnits > 2500) {
      unitRate = 7;
    } else if (billedUnits > 1500) {
      unitRate = 5.5;
    } else if (billedUnits > 800) {
      unitRate = 4;
    } else {
      unitRate = 3;
    }

    const amount = billedUnits * unitRate;
    let discount;

    // Calculate discount based on amount
    if (amount >= 20000) {
      discount = 0.05;
    } else if (amount >= 15000) {
      discount = 0.03;
    } else if (amount >= 10000) {
      discount = 0.02;
    } else if (amount >= 5000) {
      discount = 0.01;
    } else {
      discount = 0;
    }

    const netAmount = amount - amount * discount;

    this.setState({ billedUnits, unitRate, amount, discount: discount * 100, netAmount, error: null });
  };

  render() {
    const { pmr, lmr, billedUnits, unitRate, amount, discount, netAmount, error } = this.state;

    return (
      <div>
        <h2>Current Bill Calculator</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>PMR:</label>
          <input
            type="number"
            name="pmr"
            value={pmr}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div>
          <label>LMR:</label>
          <input
            type="number"
            name="lmr"
            value={lmr}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button onClick={this.calculateBill}>Calculate</button>

        {billedUnits > 0 && (
          <div>
            <p>Billed Units: {billedUnits}</p>
            <p>Unit Rate: {unitRate}</p>
            <p>Amount: {amount}</p>
            <p>Discount: {discount}%</p>
            <p>Net Amount: {netAmount}</p>
          </div>
        )}
      </div>
    );
  }
}

export default BillCalculator;
