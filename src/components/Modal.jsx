import CloseBtn from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
import Message from './Message'

const Modal = ({
  setModal, 
  animateModal, 
  setAnimateModal, 
  saveSpent,
  spentEdit,
  setSpentEdit,
}) => {

  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [id, setId] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    if(Object.keys(spentEdit).length > 0) {
      setName(spentEdit.name)
      setQuantity(spentEdit.quantity)
      setCategory(spentEdit.category)
      setId(spentEdit.id)
      setDate(spentEdit.date)
    }
  }, [])

  const hideModal = () => {
    setAnimateModal(false)
    setSpentEdit({})
    setTimeout(() => {
      setModal(false)
    }, 500);
  }
  

  const handleSubmit = e => {
    e.preventDefault();
    if ([name, quantity].includes('')) {
      setMessage('All fields are required')
      setTimeout(()=> {
        setMessage('')
      }, 3000)
      return;
    }

    saveSpent({name, quantity, category, id, date})
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
      <img
          src={CloseBtn}
          alt='Close Button' 
          onClick={hideModal}
      />
      </div>

      <form 
      onSubmit={handleSubmit}
      className={`formulario ${animateModal ? "animar" : ''}`}
      
      >
        <legend>{spentEdit.name ? 'Edit Expense' : 'New Expense'}</legend>
        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="nombre">Name of Expense</label>
          <input 
          id='nombre'
          type="text" 
          value={name}
          placeholder='Add the name of your expense.'
          onChange={e => setName(e.target.value)}
          />

        </div>

        <div className="campo">
          <label htmlFor="cantidad">Quantity</label>
          <input 
          id='cantidad'
          type="number" 
          placeholder='Add the amount you spent. E.g $300'
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Category</label>
          <select 
          value={category}
          onChange={e => setCategory(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="Savings">Savings</option>
            <option value="Food">Food</option>
            <option value="House">House</option>
            <option value="Misc">Misc</option>
            <option value="Leisure">Leisure</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Subscriptions">Subscriptions</option>
      
          </select>

          <input
            type="submit"
            value={spentEdit.name ? 'Edit Expense' : 'Add Expense'}
        
          />
        </div>
      </form>
    </div>
  )
}

export default Modal