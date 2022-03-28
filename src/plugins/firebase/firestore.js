import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const getCollection = (collectionPath, db) => new Promise((resolve, reject)=>{
    getDocs(collection(db, collectionPath))
        .then((snapshot)=>{
            const tmp = [];
            snapshot.forEach((doc)=>{
               tmp.push({
                   ...doc.data(),
                   id: doc.ref.id,
                   path: doc.ref.path
               });
            });
            resolve(tmp);
        })
        .catch((error)=>{
            console.log("Error fetching data.");
            console.log(error);
            reject(error);
        })
});

const getDocument = (docPath, db) => new Promise((resolve, reject)=>{
    getDoc(doc(db, docPath))
        .then((docSnapshot)=>{
            const tmp = {
                ...docSnapshot.data(),
                id: docSnapshot.ref.id,
                path: docSnapshot.ref.path
            };
            resolve(tmp);
        })
        .catch((error)=>{
            console.log("Error fetching data.");
            console.log(error);
            reject(error);
        })
});

export default function firestoreFactory(db) {
    return {
        getCollection: (collectionPath) => getCollection(collectionPath, db),
        getDocument: (documentPath) => getDocument(documentPath, db)
    }
}
