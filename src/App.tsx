import React from "react";
import './App.css';
import { AppState } from "./interfaces.js";

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      formula: "",
      display: "0",
      currentResult: ""
    }
    this.handleClear = this.handleClear.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }

  handleClear() {
    this.setState({
      formula: "",
      display: "0",
      currentResult: ""
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
    } else if(this.state.display.length < 16){

      let regexOperator: RegExp = /[*+/-]/g;
      const isOperator = regexOperator.test(this.state.display);
      
      if(isOperator){
        this.setState({
        formula: this.state.formula + e.target.value,
        display: e.target.value
       })
      } else {
        this.setState({
        formula: this.state.formula + e.target.value,
        display: this.state.display + e.target.value
       })
      }
    }

  }

  handleOperator(e: any){
    // is operator on display?
    let regexOperator: RegExp = /[*+/-]/g;
    const isOperator = regexOperator.test(this.state.display);
    // if no operator, append operator
    if(!isOperator){
      this.setState({
        formula: this.state.formula + e.target.value,
        display: e.target.value
      });
    }
    // if one operator: minus allowed to append, every other: replace
    if(isOperator && this.state.display.length == 1){
      console.log("append minus, replace for all other");
    }
    // else return
    return
  }
  
  handleDecimal(e: any){
    if(this.state.display.indexOf(".") < 0){
      this.setState({
        formula: this.state.formula + e.target.value,
        display: this.state.display + e.target.value
      })
    }
  }

  handleResult(){
    let {formula}: any = this.state;
    let result;
    if(this.state.currentResult){
      // USE REGEX HERE !!!!!!!!!!!!!!!!!!!
      let equalsSigns = [];
      for(let i = 0; i < this.state.formula.length; i++){
        if (formula[i]==="="){
          equalsSigns.push(i);
        }
      }
      result = eval(this.state.formula.slice(equalsSigns[equalsSigns.length-1]+1));
      formula = this.state.currentResult;
    } else {
      result = eval(formula);
    }
    if(!result){
      this.setState({
      display: "-",
      currentResult: ""
    });
    } else {
    this.setState({
      formula: `${formula}=${result}`,
      display: result,
      currentResult: result
    });
    }
  }


  render() {
    return (<div className="calculator container">
      <Formula formula={this.state.formula} />
      <Display display={this.state.display} />
      <Buttons handleClear={this.handleClear} handleButton={this.handleButton} handleOperator={this.handleOperator} handleResult={this.handleResult} handleDecimal={this.handleDecimal} />
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

class Buttons extends React.Component<{ handleClear: any; handleButton: any; handleOperator: any; handleResult: any; handleDecimal: any }, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (<div>
      <button onClick={this.props.handleClear} id="clear" className="btn btn-danger col-6 border-dark">AC</button>
      <button id="divide" onClick={this.props.handleOperator} value="/" className="btn btn-light col-3 border-dark">/</button>
      <button id="multiply" onClick={this.props.handleOperator} value="*" className="btn btn-light col-3 border-dark">X</button>
      <button onClick={this.props.handleButton} id="seven" value="7" className="btn btn-secondary col-3 border-dark">7</button>
      <button id="eight" onClick={this.props.handleButton} value="8" className="btn btn-secondary col-3 border-dark">8</button>
      <button id="nine" onClick={this.props.handleButton} value="9" className="btn btn-secondary col-3 border-dark">9</button>
      <button id="subtract" onClick={this.props.handleOperator} value="-" className="btn btn-light col-3 border-dark">-</button>
      <button id="four" onClick={this.props.handleButton} value="4" className="btn btn-secondary col-3 border-dark">4</button>
      <button id="five" onClick={this.props.handleButton} value="5" className="btn btn-secondary col-3 border-dark">5</button>
      <button id="six" onClick={this.props.handleButton} value="6" className="btn btn-secondary col-3 border-dark">6</button>
      <button id="add" onClick={this.props.handleOperator} value="+" className="btn btn-light col-3 border-dark">+</button>
      <button id="one" onClick={this.props.handleButton} value="1" className="btn btn-secondary col-3 border-dark">1</button>
      <button id="two" onClick={this.props.handleButton} value="2" className="btn btn-secondary col-3 border-dark">2</button>
      <button id="three" onClick={this.props.handleButton} value="3" className="btn btn-secondary col-3 border-dark">3</button>
      <button id="decimal" onClick={this.props.handleDecimal} value="." className="btn btn-light col-3 border-dark">.</button>
      <button id="zero" onClick={this.props.handleButton} value="0" className="btn btn-secondary col-6 border-dark">0</button>
      <button id="equals" onClick={this.props.handleResult} value="" className="btn btn-primary col-6 border-dark row-4">=</button>
    </div>
    )
  }
}
