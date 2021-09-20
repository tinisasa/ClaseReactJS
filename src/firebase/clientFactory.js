import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from '../K';

const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
    return app;
}

export function getFirestore() {
    return firebase.firestore();
}

export function getList(collection, id) {
    let query = getFirestore().collection(collection)
    switch (collection) {
        case "categories":
            query = query.orderBy("name", "asc");
            break;
        case "items":
            query = id ? query.where('categoryId', '==', id) : query;
            break;
        default:
            return null;
    }

    return new Promise((resolve, reject) => {
        query.limit(20).get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                console.log('No results!');
                return resolve([]);
            }
            else {
                return resolve(querySnapshot.docs.map(doc => {
                    const obj = { id: doc.id, ...doc.data() }
                    return obj;
                }))
            }
        }).catch((error) => {
            reject(error)
            console.log('error searching items', error);
        })

    })

}

export function getById(collection, id) {
    let query = getFirestore().collection(collection).doc(id);
    return new Promise((resolve, reject) => {
        query.get().then((doc) => {
            if (!doc.exists) {
                return reject('notFound');
            }
            else {
                return resolve({ id: doc.id, ...doc.data() })
            }
        }).catch((error) => {
            reject(error)
            console.log('error getting item', error);
        })

    })
}