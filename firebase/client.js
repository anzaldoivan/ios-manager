import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCOZBl8jb3BgjbzOSrmK1SOFFqQbxUZrhI",
  authDomain: "ios-manager-9c89e.firebaseapp.com",
  databaseURL: "https://ios-manager-9c89e.firebaseio.com",
  projectId: "ios-manager-9c89e",
  storageBucket: "ios-manager-9c89e.appspot.com",
  messagingSenderId: "53942874512",
  appId: "1:53942874512:web:ce4bf0b2ecc12f019bc315",
  measurementId: "G-6T9PB38LTS",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null

    onChange(normalizedUser)
  })
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const addPost = ({ avatar, content, img, userId, userName }) => {
  return db.collection("posts").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

// se puede agregar .limit(10) para sacar los ultimos 10
export const fetchLatestDevits = () => {
  return db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
