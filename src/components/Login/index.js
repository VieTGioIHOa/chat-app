import React from "react";

import { FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { collection } from "firebase/firestore";

import { app, db } from '../../firebase/config'
import { auth } from '../../context/AuthProvider'
import { addDocument, generateKeywords } from '../../firebase/service'
const provider = new FacebookAuthProvider();


function Login() {
    const handleLogin = async () => {
        const data = await signInWithPopup(auth, provider)
        const { user, providerId } = data

        // Add a new document in collection "users"
        if (getAdditionalUserInfo(data).isNewUser) {
            const firebaseCollectionRef = collection(db, "users")
            addDocument(firebaseCollectionRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase())
            });
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pt-10">
            <div className="m-[auto] text-center bg-yellow-50 w-[400px]  border rounded px-5 py-10 border-slate-200 border-solid">
                <h2 className="text-[30px] font-bold text-sky-700">ĐĂNG NHẬP</h2>
                <div>
                    <button
                        onClick={handleLogin}
                        className="p-2 text-xl text-white rounded-xl w-[100%] mt-5 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                        Đăng nhập bằng Facebook
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login