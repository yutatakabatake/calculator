import { useState } from 'react'
import './App.css'
import NumButton from './components/NumButton'
import OperatorButton from './components/OperatorButton'
import ResetButton from './components/ResetButton'
import Inverse from './components/Inverse'
import PercentButton from './components/PercentButton'
import DecimalButton from './components/DecimalButton'
import CalcButton from './components/CalcButton'

function App() {
  const [formula, setFormula] = useState([0]);
  const [currentNum, setCurrentNum] = useState(0);
  const [history, setHistory] = useState("");

  const isAnswer = false;

  function handleClick(num) {
    const newCurrentNum = currentNum * 10 + num;
    const newFormula = [...formula.slice(0, formula.length - 1), newCurrentNum]
    setCurrentNum(newCurrentNum);
    setFormula(newFormula);
  }

  function reset() {
    setFormula([0]);
    setCurrentNum(0);
  }

  function handleOperation(op) {
    const newFormula = [...formula.slice(), op, 0]
    setCurrentNum(0);
    setFormula(newFormula);
  }

  function handleInverse() {
    const newCurrentNum = currentNum * -1;
    const newFormula = [...formula.slice(0, formula.length - 1), newCurrentNum]
    setCurrentNum(newCurrentNum);
    setFormula(newFormula);
  }

  function handlePercent() {
    const newCurrentNum = currentNum / 100;
    const newFormula = [...formula.slice(0, formula.length - 1), newCurrentNum]
    setCurrentNum(newCurrentNum);
    setFormula(newFormula);
  }

  function calculate() {
    // 1. まず × と ÷ を処理した新しい配列を作る
    let stack = [];
    let i = 0;

    while (i < formula.length) {
      const token = formula[i];

      if (token === '×' || token === '÷') {
        const prev = stack.pop();      // 1つ前の数
        const next = formula[i + 1];    // 次の数

        const result =
          token === '×' ? prev * next : prev / next;

        stack.push(result);
        i += 2;  // 次の数をスキップ
      } else {
        stack.push(token);
        i++;
      }
    }

    // 2. + と - を左から順に処理
    let result = stack[0];

    for (let i = 1; i < stack.length; i += 2) {
      const op = stack[i];
      const num = stack[i + 1];

      if (op === '+') result += num;
      else if (op === '-') result -= num;
    }

    const newHistory = [...formula.slice(), '=', result];
    setFormula([result]);
    setHistory(newHistory.join(''));
  }

  const display = formula.join('');

  return (
    <>
      <div id='history' className='text-white text-2xl'>{history}</div>
      <div className='text-white text-4xl'>{display}</div>
      <div>
        <ResetButton handleClick={reset} />
        <Inverse handleClick={handleInverse} />
        <PercentButton handleClick={handlePercent} />
        <OperatorButton name={"÷"} handleClick={handleOperation} />
      </div>
      <div>
        <NumButton value={7} handleClick={handleClick} />
        <NumButton value={8} handleClick={handleClick} />
        <NumButton value={9} handleClick={handleClick} />
        <OperatorButton name={"×"} handleClick={handleOperation} />
      </div>
      <div>
        <NumButton value={4} handleClick={handleClick} />
        <NumButton value={5} handleClick={handleClick} />
        <NumButton value={6} handleClick={handleClick} />
        <OperatorButton name={"-"} handleClick={handleOperation} />

      </div>
      <div>
        <NumButton value={1} handleClick={handleClick} />
        <NumButton value={2} handleClick={handleClick} />
        <NumButton value={3} handleClick={handleClick} />
        <OperatorButton name={"+"} handleClick={handleOperation} />
      </div>
      <div>
        <NumButton value={0} handleClick={handleClick} />
        <NumButton value={0} handleClick={handleClick} />
        <DecimalButton />
        <CalcButton handleClick={calculate} />
      </div>
    </>
  )
}

export default App
