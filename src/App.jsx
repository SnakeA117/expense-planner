import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal';
import SpentList from './components/SpentList';
import newIconSpent from './img/nuevo-gasto.svg'
import { generateId } from './helpers';
import Filters from './components/Filters';



function App() {

  const [spents, setSpents] = useState(
    localStorage.getItem('spents') ? JSON.parse(localStorage.getItem('spents')) : []
  );
  
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [validBudget, setvalidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [spentEdit, setSpentEdit] = useState({});

  const [filter, setFilter] = useState('')
  const [spentsFilter, setSpentsFilter] = useState([])
  
  useEffect(() => {
      if(Object.keys(spentEdit).length > 0) {
        setModal(true)
        setTimeout(() => {
          setAnimateModal(true)
        }, 500); 
      }
  }, [spentEdit])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget])

  useEffect(() => {
    localStorage.setItem('spents', JSON.stringify(spents) ?? [])
  }, [spents])

  useEffect(() => {
    if(filter) {
      const spentsFilter = spents.filter(spent => spent.category === filter )
      setSpentsFilter(spentsFilter)
    }
  }, [filter]);


  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;

    if (budgetLS > 0) {
      setvalidBudget(true)
    }
  }, [])





  const handleNewSpent = () => {
    setModal(true)
    setSpentEdit({})
    setTimeout(() => {
      setAnimateModal(true)
    }, 500); 
  }
  
  const saveSpent = spent => {

    if(spent.id) {
      const spentUpdated = spents.map(spentState => spentState.id === spent.id ? spent : spentState)
      setSpents(spentUpdated)
      setSpentEdit({})
    } else {
      spent.id = generateId()
      spent.date = Date.now();
      setSpents([...spents, spent])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const deleteSpent = id => {
    const spentUpdated = spents.filter(spent => spent.id !== id);
    setSpents(spentUpdated)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        spents={spents}
        setSpents={setSpents}
        budget={budget}
        setBudget={setBudget}
        validBudget={validBudget}
        setvalidBudget={setvalidBudget}
      />

      {validBudget && (
        <>
          <main>
            <Filters
              filter={filter}
              setFilter={setFilter}
            />
            <SpentList
              setSpentEdit={setSpentEdit}
              spents={spents}
              deleteSpent={deleteSpent}
              filter={filter}
              spentsFilter={spentsFilter}
            />
          </main>
              <div className='nuevo-gasto'>
              <img 
              src={newIconSpent} 
              alt="Spent new icon"
              onClick={handleNewSpent}
               />

           </div>
        </>
      )}

      {modal && <Modal 
              setModal={setModal}
              animateModal={animateModal}
              setAnimateModal={setAnimateModal}
              saveSpent={saveSpent}
              spentEdit={spentEdit}
              setSpentEdit={setSpentEdit}
              />}
    </div>
  )
}

export default App
