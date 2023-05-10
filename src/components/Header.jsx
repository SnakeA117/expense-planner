
import NewBudget from "./NewBudget"
import BudgetControl from './BudgetControl';


const Header = ({
  spents,
  setSpents,
  budget, 
  setBudget, 
  validBudget, 
  setvalidBudget
}) => {
  return (
    <header>
        <h1>Expense Planner</h1>
        {validBudget ? (
          <BudgetControl
          setSpents={setSpents}
          setBudget={setBudget}
          spents={spents}
          budget={budget}
          setvalidBudget={setvalidBudget}
          />
        ) : (
          <NewBudget
          budget={budget}
          setBudget={setBudget}
          setvalidBudget={setvalidBudget}
          />
        )}
    </header>
  )
}

export default Header