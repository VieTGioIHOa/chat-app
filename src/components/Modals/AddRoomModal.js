import React from 'react'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { useForm } from 'react-hook-form'
import { addDocument } from '../../firebase/service'
import { db } from '../../firebase/config'
import { collection } from 'firebase/firestore'

export default function AddRoomModal() {

    const { isAddRoomHide, setIsAddRoomHide } = React.useContext(AppContext)
    const { uid } = React.useContext(AuthContext)

    const { handleSubmit, register, resetField } = useForm()

    const handleOK = (data) => {
        //add newroom to firestore
        addDocument(collection(db, 'rooms'), { ...data, members: [uid] })
        resetField('name')
        resetField('description')
        setIsAddRoomHide('hidden')
    }

    const handleCancel = () => {
        resetField('name')
        resetField('description')
        setIsAddRoomHide('hidden')
    }
    return (
        <div className={isAddRoomHide}>
            <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.3)] ">
                <form onSubmit={handleSubmit(handleOK)}  className="bg-white rounded p-5 w-[400px]" name='Form' >
                    <h2 className="font-bold text-[20px] mb-2">Tạo phòng</h2>
                    <div>
                        <p>
                            Tên phòng
                        </p>
                        <input
                            {...register('name')}
                            className="border-solid border-[1px] border-slate-300 px-2 py-1 mt-2 mb-1 w-[100%]"
                            placeholder="Nhập tên phòng"
                            name='name' />
                    </div>
                    <div>
                        <p>
                            Mô tả
                        </p>
                        <input
                            {...register('description')}
                            className="border-solid border-[1px] border-slate-300 px-2 py-1 mt-2 mb-1 w-[100%]"
                            placeholder="Nhập mô tả..."
                            name='description' />
                    </div>
                    <button type="submit" className="p-2 rounded bg-sky-300 text-white pointer mr-3 mt-4 ">OK</button>
                    <button type="button" onClick={handleCancel} className="p-2 rounded bg-sky-300 text-white pointer mr-3 mt-4 ">Cancel</button>
                </form>
            </div>
        </div>
    )
}

