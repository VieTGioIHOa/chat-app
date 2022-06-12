import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppProvider'
function ListRoom() {

  const { rooms, setSelectedRoomId, setSelectedUserId } = useContext(AppContext)
  const { setIsAddRoomHide } = useContext(AppContext)

  const handleAddRoom = () => {
    setIsAddRoomHide('block')
  }

  return (
    <div className="mt-5 ">
      <h3 className="text-white text-[24px] font-bold">Danh sách các phòng</h3>
      <ul className="">
        {rooms.length > 0 ? rooms.map(room => (
          <li key={room.id} className="px-3 py-2 ml-4 mt-1 rounded-md hover:bg-[rgba(227,217,217,0.2)] text-white cursor-pointer">
            <p onClick={() => {
              setSelectedRoomId(room.id)
              setSelectedUserId('')
            }}
              className="text-lg">{room.name}</p>
          </li>
        )) : <li className="p-3 ml-4 mt-3 text-white cursor-pointer">Bạn chưa có phòng</li>}
      </ul>
      <button onClick={handleAddRoom} className="flex items-center mt-3 text-white bg-[rgba(227,217,217,0.2)] rounded-lg px-3 py-2 hover:bg-pink-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Thhêm phòng</span>
      </button>
    </div>
  )
}

export default ListRoom