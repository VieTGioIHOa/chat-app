import React from "react"
import {db} from '../firebase/config'
import { onSnapshot, query,collection, orderBy, where} from "firebase/firestore";

const useFireStore = (collectionName, condition) => {
    const [document, setDocument] = React.useState([])

    React.useEffect(() => {
        let collectionRef = query(collection(db, collectionName))
        
        if(condition) {
            if(!condition.compareValue || condition.compareValue.length === 0) return
            collectionRef = query(collection(db, collectionName), 
            where(condition.fieldName, condition.operator, condition.compareValue),
            orderBy('createAt')
            )
        }
        
        const unsubcribe = onSnapshot(collectionRef, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocument(data)
        })
        return () => unsubcribe;
    }, [collectionName, condition])
    return document
}



export default useFireStore