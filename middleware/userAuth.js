import { auth } from "firebase";

export default function({store, redirect}) {
  console.log(auth().currentUser);

  if (store.state.app.user == null || store.state.app.user == undefined) {
    console.log('user not in store')
    auth().onAuthStateChanged(user => {
      if (user) {
        store.commit('app/setUser', auth().currentUser.uid);
      } else {
        return redirect('/signIn');
      }
    })
  }
}