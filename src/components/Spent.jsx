import React from 'react'

import { 
LeadingActions,
SwipeableList,
SwipeableListItem,
SwipeAction,
TrailingActions
} from 'react-swipeable-list'

import "react-swipeable-list/dist/styles.css"

import { formatDate } from "../helpers";

import SaveIcon from '../img/icono_ahorro.svg'
import HouseIcon from '../img/icono_casa.svg'
import FoodIcon from '../img/icono_comida.svg'
import SpentIcon from '../img/icono_gastos.svg'
import LeisureIcon from '../img/icono_ocio.svg'
import HealthIcon from '../img/icono_salud.svg'
import SuscriptionIcon from '../img/icono_suscripciones.svg'

const dicctionaryIcons = {
  Savings: SaveIcon,
  Food: FoodIcon,
  House: HouseIcon,
  Misc: SpentIcon,
  Leisure: LeisureIcon,
  Healthcare: HealthIcon,
  Subscriptions: SuscriptionIcon
}


const Spent = ({spent, setSpentEdit, deleteSpent}) => {
  const { category, name, quantity, id, date} = spent;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setSpentEdit(spent)}>
          Edit
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
    <SwipeAction 
    onClick={() => deleteSpent(id)}
    destructive={true}
    >
        Delete
    </SwipeAction>
    </TrailingActions>
  ) 

  return (
    <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >

    <div className="gasto sombra">
       <div className="contenido-gasto">
        <img 
        src={dicctionaryIcons[category]}  
        alt="Icono Gasto" />
        <div className="descripcion-gasto">
            <p className="categoria">{category}</p>
            <p className="nombre-gasto">{name}</p>
            <p className="fecha-gasto">
              Agregado el: {''}
              <span>{formatDate(date)}</span>
            </p>
        </div>
       </div>
       <p className="cantidad-gasto">${quantity}</p>
    </div>
       </SwipeableListItem>
    </SwipeableList>
  )
}

export default Spent