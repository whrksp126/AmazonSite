import firebase from 'firebase';

// 현재 사용자의 개인적인 정보
const firebaseConfig = {
  apiKey: 'AIzaSyBXQGC7ulj4LZ4J3WSbVuNZXjZz3lZcQ88',
  authDomain: 'gh-ddc43.firebaseapp.com',
  projectId: 'gh-ddc43',
  storageBucket: 'gh-ddc43.appspot.com',
  messagingSenderId: '437329629079',
  appId: '1:437329629079:web:df7fc525ceb39931c1fed2',
  measurementId: 'G-3L9BNQS0WB',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// 데이터베이스 구축
const db = firebaseApp.firestore();
// 회원가입을 위한
const auth = firebase.auth();

export { db, auth };
