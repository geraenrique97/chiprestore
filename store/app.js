import axios from "axios";

export const state = () => ({
  allClothes: PRENDAS,
  user: null,
  selected: null,
  searchResult: null,
  searchParams: null,
  openedModal: false,
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

  getClothes(state) {
    axios.get('https://chiprestore19.firebaseio.com/prendas.json')
    .then( resp => {
      // state.commit('addClothes',Object.values(resp.data));
      // state.commit('addClothes', Object.values(PRENDAS))
      console.log(resp.data)
    });
  },
  searchClothes(state, params) {
    state.commit('setSearchParams', params);
    state.dispatch('filterClothes');

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
        && store.state.searchParams.code !== clothe.codigo) {
          matchCode = false;
      }
      if (store.state.searchParams.clothe !== undefined
        && store.state.searchParams.clothe !== '' 
        && store.state.searchParams.clothe !== clothe.nombre) {
          const arrMatchName = store.state.searchParams.clothe.split(' ');
          //False until find one coincidence, if not find then remove last element in result
          matchName = false;
          for (const str of arrMatchName) {
            const exp = new RegExp(str);
            if (exp.test(clothe.nombre)) {
              matchName = true;
              break;
            }
          }
      }
      if (store.state.searchParams.brand !== undefined
        && store.state.searchParams.brand !== '' 
        && store.state.searchParams.brand !== clothe.marca) {
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
    
  
  }
}


export const PRENDAS = {
  prenda1: {
    nombre: 'remera',
    marca: 'abercombrie & fitch ',
    color: 'azul',

    codigo: '1',
    img: ['img1.png'],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'L', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
    prenda2: {
    nombre: 'camisa',
    marca: 'polo',
    color: 'salmon',

    codigo: '2',
    img: [`img2.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda3: {
    nombre: 'remera',
    marca: 'tommy hilfiger',
    color: 'blanca',

    codigo: '3',
    img: [`img3.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda4: {
    nombre: 'sueter',
    marca: 'abercombrie & fitch',
    color: 'naranja',

    codigo: '4',
    img: [`img4.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda5  : {
    nombre: 'remera',
    marca: 'abercombrie & fitch',
    color: 'roja',

    codigo: '5',
    img: [`img5.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda6  : {
    nombre: 'buzo femenino',
    marca: 'adidas',
    color: 'amarillo',

    codigo: '6',
    img: [`img6.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda7  : {
    nombre: 'sueter',
    marca: 'abercombrie & fitch',
    color: 'celeste',

    codigo: '7',
    img: [`img7.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda8  : {
    nombre: 'remera bordado rojo',
    marca: 'abercombrie & fitch',
    color: 'gris',

    codigo: '8',
    img: [`img8.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda9  : {
    nombre: 'remera a rayas',
    marca: 'lacoste',
    color: 'gris blanco rojo negro',

    codigo: '9',
    img: [`img9.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda10  : {
    nombre: 'remera bordada',
    marca: 'abercombrie & fitch',
    color: 'rosa',

    codigo: '10',
    img: [`img10.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda11  : {
    nombre: 'remera',
    marca: 'tommy hilgifer',
    color: 'roja',

    codigo: '11',
    img: [`img11.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda12  : {
    nombre: 'short verano',
    marca: 'polo',
    color: 'rosado',

    codigo: '12',
    img: [`img12.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda13  : {
    nombre: 'remera',
    marca: 'polo',
    color: 'azul',

    codigo: '13',
    img: [`img13.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda14  : {
    nombre: 'camisa pintadas',
    marca: 'tommy hilfiger',
    color: 'blanca',

    codigo: '14',
    img: [`img14.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda15  : {
    nombre: 'camisa jeans',
    marca: 'polo',
    color: 'azul',

    codigo: '15',
    img: [`img15.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 'm', cant: 2},
    ]
  },
  prenda16  : {
    nombre: 'short verano',
    marca: 'lacoste',
    color: 'negro',

    codigo: '16',
    img: [`img16.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 'm', cant: 2},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda17  : {
    nombre: 'remera lisa',
    marca: 'polo',
    color: 'negro',

    codigo: '17',
    img: [`img17.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda18  : {
    nombre: 'short bermuda',
    marca: 'penguin',
    color: 'marron',

    codigo: '18',
    img: [`img18.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 'xxl', cant: 1}
    ]
  },
  prenda19  : {
    nombre: 'remera estampa indio',
    marca: 'abercombrie & fitch',
    color: 'gris',

    codigo: '19',
    img: [`img19.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 'm', cant: 2},
    ]
  },
  prenda20  : {
    nombre: 'remera estampada',
    marca: 'abercombrie & fitch',
    color: 'azul',

    codigo: '20',
    img: [`img20.png`],
    pCosto: 300.00,
    pVenta: 500.00,
    disp: [
      {talle: 's', cant: 3},
      {talle: 'm', cant: 2},
    ]
  },
};


