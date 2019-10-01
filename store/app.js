import axios from "axios";
import firebase from "firebase/app";

export const state = () => ({
  allClothes: PRENDAS,
  user: null,
  selected: null,
  searchResult: null,
  searchParams: null,
  openedModal: false,
  smallDevice: null,
  showMenu: true,
  showProductRegister: false,
  alert: {
    visible: false,
    type: null,
    msg: null
  },
  loading: false
})

export const mutations = {
  // Add all clothes to state
  addClothes(state, payload) {
    state.allClothes = payload;
  },
  // The params will be used as search filter
  setSearchParams(state, params) {
    state.searchParams = params;
  },

  setSearchResult(state, result) {
    state.searchResult = result
  },
  //Product details modal
  toggleModal(state) {
    state.openedModal = !state.openedModal
  },
  //Set the state with a selected product
  selectProduct(state, product) {
    state.selected = product
  },
  //Set the prop according to viewport size, if xs or sm then true
  setDevice(state, isSmall) {
    state.smallDevice = isSmall
  },
  toggleMenu(state) {
    state.showMenu = !state.showMenu
  },
  // Update details of selected product
  updateProduct(state, payload) {
    for (const key in state.allClothes) {
      if (payload.code == state.allClothes[key].code) {
        state.allClothes[key] = payload;
        break
      }
    };
  },
  toggleProductRegisterSheet(state) {
    state.showProductRegister = !state.showProductRegister
  },
  addNewClothe(state, payload)  {
    state.allClothes = { ... state.allClothes, payload}
  },
  setAlert(state, payload) {
    state.alert = {...payload}
  },
  clearAlert(state) {
    state.alert.visible = false
  },
  setUser(state, payload) {
    state.user = payload
  },
  clearUser(state, payload) {
    state.user = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  }
};

export const getters = {
  doubleCount (state) {
    return state.count * 2
  },
  isAuthenticated(state) {
    if (state.user != null && state.user != undefined) {
      return true
    } else {
      return false
    }
  }

};

export const actions = {

  getClothes({commit}) {
    commit('setLoading', true);
    axios.get('https://chiprestore19.firebaseio.com/products.json')
    .then( resp => {
      // store.commit('addClothes',Object.values(resp.data));
      // store.commit('addClothes', Object.values(PRENDAS))
      console.log('getClothes');
      commit('setLoading', false);

    });
  },
  searchClothes(store, params) {
    store.commit('setSearchParams', params);
    store.dispatch('filterClothes');
  },
  filterClothes(store) {
    const result = [];
    // For each params in searchParams, find the same value in the object clothe and return true value in some coincidence
    for (const clothe of Object.values( store.state.allClothes)) {
      result.push(clothe);
      let matchCode = true;
      let matchName = true;
      let matchBrand = true;
      let matchColor = true;
      if ( store.state.searchParams.code !== undefined
        && store.state.searchParams.code.length > 0
        && store.state.searchParams.code !== clothe.code) {
          matchCode = false;
      }
      if (store.state.searchParams.clothe !== undefined
        && store.state.searchParams.clothe !== '' 
        && store.state.searchParams.clothe !== clothe.clothe) {
          const arrMatchName = store.state.searchParams.clothe.split(' ');
          //False until find one coincidence, if not find then remove last element in result
          matchName = false;
          for (const str of arrMatchName) {
            const exp = new RegExp(str);
            if (exp.test(clothe.clothe)) {
              matchName = true;
              break;
            }
          }
      }
      if (store.state.searchParams.brand !== undefined
        && store.state.searchParams.brand !== '' 
        && store.state.searchParams.brand !== clothe.brand) {
        matchBrand = false;
      }
      if (store.state.searchParams.color !== undefined
        && store.state.searchParams.color !== '' 
        && store.state.searchParams.color !== clothe.color) {
        matchColor = false;
      }
      if (!(matchCode && matchName && matchBrand && matchColor)) {
        result.pop();
      }
    }
    store.commit('setSearchResult', result);
    console.log(result);
    // return store.state.searchResult
    
  
  },

  updateProduct(store, payload) {
    // axios.post('url', payload)
    //   .then(
    //     // Should return all clothes and update the state
    //   );
    store.commit('updateProduct', payload)    
  },

  createProduct(store, payload) {
    
    store.commit('clearAlert');
    store.commit('setLoading', true);
    // const url = "https://chiprestore19.firebaseio.com/products.json";
    // return axios.post(url, payload)
    return firebase.database().ref('products').push(payload)
      .then( resp => {
        payload.code = resp.key;
        store.commit('addNewClothe', payload);
        const alert = {
          visible: true,
          type: 'info',
          msg: 'Guardado con éxito. Código: '+ resp.key
        };
        store.commit('setLoading', false);
        store.commit('setAlert', alert);

        return resp.data
      })
      .catch( err => {
        const alert = {
          visible: true,
          type: 'error',
          msg: 'Problema al cargar el producto. Reintentar.'
        };
        store.commit('setLoading', false);
        store.commit('setAlert', alert);
        console.log(' reject in store');
        return Promise.reject(new Error(alert.msg))
      })

  },
  signIn({commit}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.user, payload.password)
      .then( user => {
        commit('setUser', user.user.uid);
      })
      .catch(error =>{
        console.log(error);
        });
  },
  signUp({commit}, payload){
    return true
  }

}


export const PRENDAS = {
  prenda1: {
    clothe: 'remera',
    brand: 'abercombrie & fitch ',
    color: 'azul',

    code: '1',
    imgURLs: ['img1.png'],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'L', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
    prenda2: {
    clothe: 'camisa',
    brand: 'polo',
    color: 'salmon',

    code: '2',
    imgURLs: [`img2.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda3: {
    clothe: 'remera',
    brand: 'tommy hilfiger',
    color: 'blanca',

    code: '3',
    imgURLs: [`img3.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda4: {
    clothe: 'sueter',
    brand: 'abercombrie & fitch',
    color: 'naranja',

    code: '4',
    imgURLs: [`img4.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda5  : {
    clothe: 'remera',
    brand: 'abercombrie & fitch',
    color: 'roja',

    code: '5',
    imgURLs: [`img5.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda6  : {
    clothe: 'buzo femenino',
    brand: 'adidas',
    color: 'amarillo',

    code: '6',
    imgURLs: [`img6.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda7  : {
    clothe: 'sueter',
    brand: 'abercombrie & fitch',
    color: 'celeste',

    code: '7',
    imgURLs: [`img7.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda8  : {
    clothe: 'remera bordado rojo',
    brand: 'abercombrie & fitch',
    color: 'gris',

    code: '8',
    imgURLs: [`img8.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda9  : {
    clothe: 'remera a rayas',
    brand: 'lacoste',
    color: 'gris blanco rojo negro',

    code: '9',
    imgURLs: [`img9.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda10  : {
    clothe: 'remera bordada',
    brand: 'abercombrie & fitch',
    color: 'rosa',

    code: '10',
    imgURLs: [`img10.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda11  : {
    clothe: 'remera',
    brand: 'tommy hilgifer',
    color: 'roja',

    code: '11',
    imgURLs: [`img11.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda12  : {
    clothe: 'short verano',
    brand: 'polo',
    color: 'rosado',

    code: '12',
    imgURLs: [`img12.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda13  : {
    clothe: 'remera',
    brand: 'polo',
    color: 'azul',

    code: '13',
    imgURLs: [`img13.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda14  : {
    clothe: 'camisa pintadas',
    brand: 'tommy hilfiger',
    color: 'blanca',

    code: '14',
    imgURLs: [`img14.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda15  : {
    clothe: 'camisa jeans',
    brand: 'polo',
    color: 'azul',

    code: '15',
    imgURLs: [`img15.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 'm', quantity: 2},
    ]
  },
  prenda16  : {
    clothe: 'short verano',
    brand: 'lacoste',
    color: 'negro',

    code: '16',
    imgURLs: [`img16.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 'm', quantity: 2},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda17  : {
    clothe: 'remera lisa',
    brand: 'polo',
    color: 'negro',

    code: '17',
    imgURLs: [`img17.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda18  : {
    clothe: 'short bermuda',
    brand: 'penguin',
    color: 'marron',

    code: '18',
    imgURLs: [`img18.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 'xxl', quantity: 1}
    ]
  },
  prenda19  : {
    clothe: 'remera estampa indio',
    brand: 'abercombrie & fitch',
    color: 'gris',

    code: '19',
    imgURLs: [`img19.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 'm', quantity: 2},
    ]
  },
  prenda20  : {
    clothe: 'remera estampada',
    brand: 'abercombrie & fitch',
    color: 'azul',

    code: '20',
    imgURLs: [`img20.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
    ]
  },
};


