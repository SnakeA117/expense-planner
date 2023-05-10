import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const BudgetControl = ({
  spents, 
  budget,
  setSpents,
  setBudget,
  setvalidBudget,
}) => {

  const [percentage, setPercentage] = useState(0)
  const [available, setAvailable ] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const totalSpent = spents.reduce((total, gasto) => gasto.quantity + total, 0);
    const totalAvailable = budget - totalSpent;

    // Calculate percentage
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);
    setAvailable(totalAvailable)
    setSpent(totalSpent)

    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1000)
  }, [spents])


  const formatQuantity = (quantity) => {
    return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  const handleResetApp = () => {
      const result = confirm('Are you sure you want to reset?')
      if (result) {
        setSpents([]);
        setBudget(0);
        setvalidBudget(false)
     }
  }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
           <CircularProgressbar
           styles={buildStyles({
                pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: percentage > 100 ? '#DC2626' : '#3B82F6',
           })}
            value={percentage}
            text={`${percentage}% Spent`}
           />
        </div>
        <div className='contenido-presupuesto'>
          <button 
          className="reset-app"
          type="button"
          onClick={handleResetApp}>
              Reset App
          </button>
            <p>
                <span>Budget:</span> {formatQuantity(budget)}
            </p>

            <p className={`${available < 0 ? 'negativo' : ''}`}>
                <span>Available:</span> {formatQuantity(available)}
            </p>

            <p>
                <span>Spent:</span> {formatQuantity(spent)}
            </p>
        </div>
    </div>
  )
}

export default BudgetControl