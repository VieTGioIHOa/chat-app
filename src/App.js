import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Chatroom from './components/Chatroom'
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';


function App() {
  return (
    <div className="container relative transition ease-in-out delay-150">
      <Routes>
        <Route path="/" element={<Chatroom />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div >
        <AddRoomModal />
      </div>
      <div >
        <InviteMemberModal />
      </div>
    </div>
  );
}

export default App;
