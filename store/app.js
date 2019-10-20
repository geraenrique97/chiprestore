// import axios from "axios";
import firebase from "../plugins/firebase";

export const state = () => ({
  allClothes: {},
  user: null,
  selected: null,
  searchResult: null,
  searchParams: null,
  openedModal: false,
  smallDevice: null,
  showMenu: true,
  showProductRegister: false,
  showStockBottomSheet: false,
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
  selectProduct(state, payload) {
    state.selected = {...payload};
    state.selected.stock = [...payload.stock];
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
    state.allClothes[payload.code] = {...payload};
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
  },
  // Open or close bottom sheet component to update selected product stock
  toggleStockBottomSheet(state, payload) {
    state.showStockBottomSheet = payload
  },
  // Change stock of selected product, only in selectedProduct prop
  updateSelectedStock(state, payload) {
    state.selected.stock = [...payload];
  },
  clearClothes(state) {
    state.allClothes = {};
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

  getClothes({commit, state}) {
    commit('clearClothes');
    commit('setLoading', true);
    firebase.database().ref('products').once('value')
    .then( resp => {
      for (const key in resp.val()) {
        commit('addNewClothe', { ...resp.val()[key], code: key } );
      }
      commit('setLoading', false);
    })
    .catch(err => {
      const alert = {
        visible: true,
        type: 'error',
        msg: err
      };
      commit('setAlert', alert)
      console.log(err);
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
    // return store.state.searchResult
    
  
  },

  updateProduct({commit}, payload) {
    firebase.database().ref('products').child(payload.code)
      .update(payload, function() {
        const alert = {
          visible: true,
          type: 'info',
          msg: 'Producto actualizado'
        };
        commit('setAlert', alert);
        commit('updateProduct', {...payload});
      })
        
  },

  createProduct(store, payload) {
    
    store.commit('clearAlert');
    store.commit('setLoading', true);
    let product = {...payload};
    
    delete product.imgFiles;
    product.imgURLs = [];
    let files = [...payload.imgFiles];
    let key;
    return firebase.database().ref('products').push(product)
      .then( resp => {
        key = resp.key;
        product.code = resp.key;
        return key
      })

      .then( key => {
        const fileName = files[0].name;
        const extension = fileName.slice(fileName.lastIndexOf('.'));
        return firebase.storage().ref('products/'+key+'.'+extension).put(files[0])
      })

      .then(fileData => {
        return fileData.ref.getDownloadURL()
      })      

      .then(url => {
        product.imgURLs.push(url);
        return firebase.database().ref('products').child(key).update({imgURLs: product.imgURLs})
      })
        
      .then( res => {
        store.commit('addNewClothe', product);
        const alert = {
          visible: true,
          type: 'info',
          msg: 'Guardado con éxito. Código: '+ key
        };
        store.commit('setLoading', false);
        store.commit('setAlert', alert);
      })

      .catch( err => {
        console.log(err);
        const alert = {
          visible: true,
          type: 'error',
          msg: 'Problema al cargar el producto. Reintentar.'
        };
        store.commit('setLoading', false);
        store.commit('setAlert', alert);
        return Promise.reject(new Error(alert.msg))
      })

  },

  deleteProduct({commit, dispatch}, payload) {
    
    return firebase.database().ref('products').child(payload).remove()
      .then( () => {
        const alert = {
          visible: true,
          type: 'success',
          msg: 'Eliminado con exito'
        };
        commit('setAlert', alert);
        dispatch('getClothes');
        
        return Promise.resolve()
      })
      .catch( () => {
        const alert = {
          visible: true,
          type: 'error',
          msg: 'Problema al eliminar'
        };
        commit('setAlert', alert);
        return Promise.reject()
      });
  },

  signIn({commit}, payload) {
    commit('setLoading', true);
    return firebase.auth().signInWithEmailAndPassword(payload.user, payload.password)
      .then( user => {
        commit('setUser', user.user.uid);
        commit('setLoading', false);
        return true
      })
      .catch(error =>{
        const alert = {
          visible: true,
          type: 'error',
          msg: error.message
        };
        commit('setLoading', false);
        commit('setAlert', alert);
        return false
      });
  },
  logout({commit}) {
    return firebase.auth().signOut()
      .then(res => {
        commit('setUser', null);
        return Promise.resolve(true)
      })
      .catch(err => {
        const alert = {
          visible: true,
          type: 'error',
          msg: error.message
        };
        commit('setLoading', false);
        commit('setAlert', alert);
        return Promise.reject(false)
      })
  },
  signUp({commit}, payload){
    return true
  },

}


