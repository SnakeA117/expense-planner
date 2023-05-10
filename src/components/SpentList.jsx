import Spent from "./Spent"

const SpentList = ({
  spents, 
  setSpentEdit, 
  deleteSpent,
  filter,
  spentsFilter,
}) => {
  return (
    <div className="listado-gastos contenedor">


        {
            filter ? (
              <>
                <h2>{spentsFilter.length ? 'Spents' : 'No spents found in this category'}</h2>
                 {   spentsFilter.map(spent => (
                      <Spent
                          deleteSpent={deleteSpent}
                          key={spent.id}
                          spent={spent}
                          setSpentEdit={setSpentEdit}
                      />
                  ))}
            </>
            ) : (
              <>
                <h2>{spents.length ? 'Spents' : 'No spents found'}</h2>
                    { spents.map(spent => (
                        <Spent
                            deleteSpent={deleteSpent}
                            key={spent.id}
                            spent={spent}
                            setSpentEdit={setSpentEdit}
                        />
                    ))}
            </>
          )
        }

    </div>
  )
}

export default SpentList