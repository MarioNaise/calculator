import React from "react"
import './App.css'
import { FormulaState, DisplayState } from "./interfaces.js"

export default class App extends React.Component {
  constructor(props: {}){
    super(props);
  }
  render(){
    return (<div className="calculator container">
      <Formula />
      <Display />
      <Buttons />
    </div>
  )
  }
}

class Formula extends React.Component<{}, FormulaState> {
  constructor(props: {}){
    super(props);
    this.state={
      formula: "0"
    }
  }
  render(){
    return (<div className="text-end text-warning fs-5">
      {this.state.formula}
    </div>
  )
  }
}

class Display extends React.Component<{}, DisplayState> {
  constructor(props: {}){
    super(props);
    this.state={
      result: "0"
    }
  }
  render(){
    return (<div id="display" className="text-end fs-4">
      {this.state.result}
    </div>
  )
  }
}

class Buttons extends React.Component {
  constructor(props: {}){
    super(props);
  }
  render(){
    return (<div>
      <button id="clear" className="btn btn-danger col-6 border-dark">AC</button>
      <button id="divide" className="btn btn-light col-3 border-dark">/</button>
      <button id="multiply" className="btn btn-light col-3 border-dark">X</button>
      <button id="seven" className="btn btn-secondary col-3 border-dark">7</button>
      <button id="eight" className="btn btn-secondary col-3 border-dark">8</button>
      <button id="nine" className="btn btn-secondary col-3 border-dark">9</button>
      <button id="subtract" className="btn btn-light col-3 border-dark">-</button>
      <button id="four" className="btn btn-secondary col-3 border-dark">4</button>
      <button id="five" className="btn btn-secondary col-3 border-dark">5</button>
      <button id="six" className="btn btn-secondary col-3 border-dark">6</button>
      <button id="add" className="btn btn-light col-3 border-dark">+</button>
      <button id="one" className="btn btn-secondary col-3 border-dark">1</button>
      <button id="two" className="btn btn-secondary col-3 border-dark">2</button>
      <button id="three" className="btn btn-secondary col-3 border-dark">3</button>
      <button id="decimal" className="btn btn-light col-3 border-dark">.</button>
      <button id="zero" className="btn btn-secondary col-6 border-dark">0</button>
      <button id="equals" className="btn btn-primary col-6 border-dark row-4">=</button>
    </div>
  )
  }
}
