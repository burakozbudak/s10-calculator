import TotalDisplay from "./components/TotalDisplay.jsx";
import CalcButton from "./components/CalcButton.jsx";
import { useReducer } from "react";
import { reducer, initialState } from "./store/reducers.jsx"; 
import { 
  applyNumber, 
  changeOperation, 
  clearDisplay, 
  result,
  memoryAdd,
  memoryRecall, 
  memoryClear
} from "./store/actions.jsx";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <nav className="text-center py-6 px-4 bg-stone-800 text-white text-xl/none">
        Reducer Challenge
      </nav>

      <div className="mt-12 mx-auto w-75">
        <form name="Cal">
          <TotalDisplay value={state.total} />
          <div className="flex justify-between bg-black text-white text-sm px-3 py-2">
            <span id="operation">
              <b>Operation:</b> {state.operation}
            </span>
            <span id="memory">
              <b>Memory:</b> {state.memory}
            </span>
          </div>
          <div className="flex">
            <CalcButton value={"M+"} onClick = {() => dispatch(memoryAdd())} />
            <CalcButton value={"MR"} onClick = {() => dispatch(memoryRecall())} />
            <CalcButton value={"MC"} onClick = {() => dispatch(memoryClear())} />
          </div>
          <div className="flex">
            <CalcButton value={1} onClick = {() => dispatch(applyNumber(1))} />
            <CalcButton value={2} onClick = {() => dispatch(applyNumber(2))} />
            <CalcButton value={3} onClick = {() => dispatch(applyNumber(3))} />
          </div>

          <div className="flex">
            <CalcButton value={4} onClick = {() => dispatch(applyNumber(4))} />
            <CalcButton value={5} onClick = {() => dispatch(applyNumber(5))} />
            <CalcButton value={6} onClick = {() => dispatch(applyNumber(6))} />
          </div>

          <div className="flex">
            <CalcButton value={7} onClick = {() => dispatch(applyNumber(7))} />
            <CalcButton value={8} onClick = {() => dispatch(applyNumber(8))} />
            <CalcButton value={9} onClick = {() => dispatch(applyNumber(9))} />
          </div>
          <div className="flex">
            <CalcButton value={"+"} onClick = {() => dispatch(changeOperation("+"))} />
            <CalcButton value={0} onClick = {() => dispatch(applyNumber(0))} />
            <CalcButton value={"-"} onClick = {() => dispatch(changeOperation("-"))} />
          </div>
          <div className="flex">
            <CalcButton value={"*"} onClick = {() => dispatch(changeOperation("*"))} />
            <CalcButton value={"/"} onClick = {() => dispatch(changeOperation("/"))} />
            <CalcButton value={"CE"} onClick = {() => dispatch(clearDisplay())} />
          </div>

          <div className="flex">
            <CalcButton value={"="} onClick = {() => dispatch(result())} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
