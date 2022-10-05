import React from "react";
import './App.css';
import { AppState } from "./interfaces.js";

//let regexOperator: RegExp = /[*+/-]/g;

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      formula: "",
      display: "0"
    }
    this.handleClear = this.handleClear.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  handleClear() {
    this.setState({
      formula: "",
      display: "0"
    })
  }

  handleButton(e: any) {
    if (this.state.display === "0") {
      if(this.state.formula === "0" && e.target.value === "0"){
        return;
      } else if(this.state.formula === "0") {
        this.setState({
        formula: e.target.value,
        display: e.target.value
      })
      } else {
        this.setState({
        formula: this.state.formula + e.target.value,
        display: e.target.value
      })
      }
    } else {
      this.setState({
        formula: this.state.formula + e.target.value,
        display: this.state.display + e.target.value
      })
    }

  }
  handleDecimal(){
    console.log(".")
  }

  handleResult(){
    this.setState({
      formula: `${this.state.formula}=${eval(this.state.formula)}`,
      display: eval(this.state.formula)
    });
  }


  render() {
    return (<div className="calculator container">
      <Formula formula={this.state.formula} />
      <Display display={this.state.display} />
      <Buttons clear={this.handleClear} nums={this.handleButton} result={this.handleResult} decimal={this.handleDecimal} />
    </div>
    )
  }
}

function Formula(props: { formula: string }): JSX.Element {
  return (<div id="formula" className="text-end text-warning fs-5">
    {props.formula}
  </div>
  )
}

function Display(props: { display: string }): JSX.Element {
  return (<div id="display" className="text-end fs-4">
    {props.display}
  </div>
  )
}

class Buttons extends React.Component<{ clear: any; nums: any; result: any; decimal: any }, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (<div>
      <button onClick={this.props.clear} id="clear" className="btn btn-danger col-6 border-dark">AC</button>
      <button id="divide" onClick={this.props.nums} value="/" className="btn btn-light col-3 border-dark">/</button>
      <button id="multiply" onClick={this.props.nums} value="*" className="btn btn-light col-3 border-dark">X</button>
      <button onClick={this.props.nums} id="seven" value="7" className="btn btn-secondary col-3 border-dark">7</button>
      <button id="eight" onClick={this.props.nums} value="8" className="btn btn-secondary col-3 border-dark">8</button>
      <button id="nine" onClick={this.props.nums} value="9" className="btn btn-secondary col-3 border-dark">9</button>
      <button id="subtract" onClick={this.props.nums} value="-" className="btn btn-light col-3 border-dark">-</button>
      <button id="four" onClick={this.props.nums} value="4" className="btn btn-secondary col-3 border-dark">4</button>
      <button id="five" onClick={this.props.nums} value="5" className="btn btn-secondary col-3 border-dark">5</button>
      <button id="six" onClick={this.props.nums} value="6" className="btn btn-secondary col-3 border-dark">6</button>
      <button id="add" onClick={this.props.nums} value="+" className="btn btn-light col-3 border-dark">+</button>
      <button id="one" onClick={this.props.nums} value="1" className="btn btn-secondary col-3 border-dark">1</button>
      <button id="two" onClick={this.props.nums} value="2" className="btn btn-secondary col-3 border-dark">2</button>
      <button id="three" onClick={this.props.nums} value="3" className="btn btn-secondary col-3 border-dark">3</button>
      <button id="decimal" onClick={this.props.decimal} value="." className="btn btn-light col-3 border-dark">.</button>
      <button id="zero" onClick={this.props.nums} value="0" className="btn btn-secondary col-6 border-dark">0</button>
      <button id="equals" onClick={this.props.result} value="" className="btn btn-primary col-6 border-dark row-4">=</button>
    </div>
    )
  }
}
