import { useState, useEffect}from 'react'

const Filters = ({filter, setFilter}) => {
  return (
    <div className="filtros sombra contenedor">
        <form>
            <div className="campo">
                <label>Filter expenses</label>
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value="">--All categories--</option>
                    <option value="Savings">Savings</option>
                    <option value="Food">Food</option>
                    <option value="House">House</option>
                    <option value="Misc">Misc</option>
                    <option value="Leisure">Leisure</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Subscriptions">Subscriptions</option>     
                </select>
            </div>
        </form>

    </div>
  )
}

export default Filters