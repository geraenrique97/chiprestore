import axios from "axios";

export const state = () => ({
  allClothes: PRENDAS,
  user: null,
  selected: null,
  searchResult: null,
  searchParams: null,
  openedModal: false,
  smallDevice: null,
  showMenu: true
})

export const mutations = {
  addClothes(state, payload) {
    state.allClothes = payload;
  },

  setSearchParams(state, params) {
    state.searchParams = params;
  },

  setSearchResult(state, result) {
    state.searchResult = result
  },
  toggleModal(state) {
    state.openedModal = !state.openedModal
  },
  selectProduct(state, product) {
    state.selected = product
  },
  setDevice(state, isSmall) {
    state.smallDevice = isSmall
  },
  toggleMenu(state) {
    state.showMenu = !state.showMenu
  },
  updateProduct(state, payload) {
    for (const key in state.allClothes) {
      if (payload.code == state.allClothes[key].code) {
        state.allClothes[key] = payload;
        break
      }
    };
  }

  

};

export const getters = {
  doubleCount (state) {
    return state.count * 2
  },
  // searchClothesById(state, id) {
  //   return state.allClothes.filter( clothe => clothe.id == id);
  // }

};

export const actions = {

  getClothes(store) {
    axios.get('https://chiprestore19.firebaseio.com/prendas.json')
    .then( resp => {
      // store.commit('addClothes',Object.values(resp.data));
      // store.commit('addClothes', Object.values(PRENDAS))
      console.log(resp.data)
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

  saveProductChanges(store, payload) {
    // axios.post('url', payload)
    //   .then(
    //     // Should return all clothes and update the state
    //   );
    store.commit('updateProduct', payload)    
  }
}


export const PRENDAS = {
  prenda1: {
    clothe: 'remera',
    brand: 'abercombrie & fitch ',
    color: 'azul',

    code: '1',
    img: ['img1.png'],
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
    img: [`img2.png`],
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
    img: [`img3.png`],
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
    img: [`img4.png`],
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
    img: [`img5.png`],
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
    img: [`img6.png`],
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
    img: [`img7.png`],
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
    img: [`img8.png`],
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
    img: [`img9.png`],
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
    img: [`img10.png`],
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
    img: [`img11.png`],
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
    img: [`img12.png`],
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
    img: [`img13.png`],
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
    img: [`img14.png`],
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
    img: [`img15.png`],
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
    img: [`img16.png`],
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
    img: [`img17.png`],
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
    img: [`img18.png`],
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
    img: [`img19.png`],
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
    img: [`img20.png`],
    buyPrice: 300.00,
    sellPrice: 500.00,
    stock: [
      {size: 's', quantity: 3},
      {size: 'm', quantity: 2},
    ]
  },
};


