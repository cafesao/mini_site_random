import { useEffect, useState } from 'react'
import invokeRandom from './invokeRandom'

function App() {
  const [items, setItems] = useState([''])
  const [choice, setChoice] = useState(0)
  const [selectItem, setSelectItem] = useState({
    value: '',
    index: 0,
  })
  const [addItem, setAddItem] = useState('')

  useEffect(() => {
    setItems([
      'Loremipsumdolor',
      'sitametconsectetur',
      'adipisicingelit',
      'sit',
      'amet',
      'amet',
      'repudiandaeofficia',
      'ipsumdolor',
      'dolor',
      'sitamet',
    ])
  }, [])

  function handleDeleteItem(index: number) {
    const choicesMod = items.filter((_, indexArray) => index !== indexArray)
    setItems(choicesMod)
  }

  function handleEditItem() {
    const choicesMod = items
    choicesMod[selectItem.index] = selectItem.value
    setItems(choicesMod)
    setSelectItem({
      value: '',
      index: 0,
    })
  }

  function handleAddItem() {
    if (items.length >= 10) {
      setAddItem('')
      alert('Max items')
      return false
    }

    setItems([...items, addItem])
    setAddItem('')
  }

  async function handleInvokeRandom() {
    const randomNumber = await invokeRandom(items.length)
    setChoice(randomNumber)
  }

  return (
    <>
      <input type="checkbox" id="modal-add" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center justify-center">
          <h3 className="font-bold text-lg mb-8">Add item</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            autoFocus
            value={addItem}
            onChange={(event) => {
              setAddItem(event.target.value)
            }}
          />
          <div className="modal-action">
            <label
              htmlFor="modal-add"
              className="btn btn-success"
              onClick={handleAddItem}
            >
              Done
            </label>
            <label htmlFor="modal-add" className="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="modal-edit" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col items-center justify-center">
          <h3 className="font-bold text-lg mb-8">Edit item</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={selectItem.value}
            autoFocus
            onChange={(event) => {
              setSelectItem({
                ...selectItem,
                value: event.target.value,
              })
            }}
          />
          <div className="modal-action">
            <label
              htmlFor="modal-edit"
              className="btn btn-success"
              onClick={handleEditItem}
            >
              Done
            </label>
            <label htmlFor="modal-edit" className="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-5 bg-slate-700 p-10 rounded-xl">
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Choice</th>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {items.map((value, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{value}</td>
                    <td>
                      <div className="flex flex-row space-x-6">
                        <label
                          htmlFor="modal-edit"
                          className="btn"
                          onClick={() =>
                            setSelectItem({
                              value,
                              index,
                            })
                          }
                        >
                          Edit
                        </label>
                        <button
                          className="btn"
                          onClick={() => handleDeleteItem(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-24 mt-10 p-4 rounded-xl">
          <label htmlFor="modal-add" className="btn btn-outline btn-accent">
            Add Item
          </label>
          <div className="flex flex-row items-center justify-center space-x-2">
            <p className="text-orange-400">Your Choice: </p>
            <p className="text-orange-400 font-bold text-xl">{choice}</p>
          </div>

          <button
            className="btn btn-outline btn-success"
            onClick={handleInvokeRandom}
          >
            Random Choice
          </button>
        </div>
      </div>
    </>
  )
}

export default App
