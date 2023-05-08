import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import invokeRandom from './invokeRandom'

function App() {
  const [items, setItems] = useState<string[]>([])
  const [choice, setChoice] = useState(0)
  const [selectItem, setSelectItem] = useState({
    value: '',
    index: 0,
  })
  const [addItem, setAddItem] = useState('')
  const [loading, setLoading] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)

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
    setLoading(true)
    const randomNumber = await invokeRandom(items.length)
    setChoice(randomNumber)
    setLoading(false)
  }

  return (
    <>
      <input
        type="checkbox"
        id="modal-add"
        className="modal-toggle"
        checked={openModalAdd}
      />
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setOpenModalAdd(false)
                handleAddItem()
              } else if (event.key === 'Escape') {
                setOpenModalAdd(false)
              }
            }}
          />
          <div className="modal-action">
            <label
              htmlFor="modal-add"
              className="btn btn-success"
              onClick={() => {
                setOpenModalAdd(false)
                handleAddItem()
              }}
            >
              Done
            </label>
            <label
              htmlFor="modal-add"
              className="btn btn-error"
              onClick={() => setOpenModalAdd(false)}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id="modal-edit"
        className="modal-toggle modal-open"
        checked={openModalEdit}
      />
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setOpenModalEdit(false)
                handleEditItem()
              } else if (event.key === 'Escape') {
                setOpenModalEdit(false)
              }
            }}
          />
          <div className="modal-action">
            <label
              className="btn btn-success"
              onClick={() => {
                setOpenModalEdit(false)
                handleEditItem()
              }}
            >
              Done
            </label>
            <label
              className="btn btn-error"
              onClick={() => setOpenModalEdit(false)}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-5 bg-slate-700 p-10 rounded-xl">
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
                <tr key={uuid()}>
                  <th
                    className={
                      choice === index + 1
                        ? 'bg-green-600 text-white rounded-s-xl'
                        : ''
                    }
                  >
                    {index + 1}
                  </th>
                  <td
                    className={
                      choice === index + 1 ? 'bg-green-600 text-white' : ''
                    }
                  >
                    {value}
                  </td>
                  <td
                    className={
                      choice === index + 1 ? 'bg-green-600 rounded-e-xl' : ''
                    }
                  >
                    <div className="dropdown dropdown-right dropdown-hover">
                      <label tabIndex={0} className="btn m-1">
                        Hover
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 space-y-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <button
                            className="btn"
                            onClick={() => {
                              setSelectItem({
                                value,
                                index,
                              })
                              setOpenModalEdit(true)
                            }}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn"
                            onClick={() => handleDeleteItem(index)}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row items-center justify-center space-x-24 mt-10 p-4 rounded-xl">
          <label
            htmlFor="modal-add"
            className="btn btn-outline btn-accent"
            onClick={() => setOpenModalAdd(true)}
          >
            Add Item
          </label>
          <div className="flex flex-row items-center justify-center space-x-2">
            {choice === 0 ? (
              <></>
            ) : (
              <>
                <p className="text-orange-400">Your Choice: </p>
                <p className="text-orange-400 font-bold text-xl">{choice}</p>
              </>
            )}
          </div>

          <button
            className={
              loading || items.length === 0
                ? 'btn btn-outline btn-disabled'
                : 'btn btn-outline btn-success'
            }
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
