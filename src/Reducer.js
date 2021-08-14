export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);
// reduce 메소드는 배열의 모든 요소에 대해서 지정된 콜백 함수를 호출하는 것
// amount 는 초기 값이자 앞으로 축적될 값들이 저장될 인수, 0 은 처음 값
// item 현재의 아이템의 속성이 들어가는데 item.price 장바구니 아이템의 가격
// reduce 배열의 모든 값을 합산할 때 사용
// basket 배열에서 item 의 price 를 합산하기 위해 reduce 사용

const reducer = (state, action) => {

  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

      case 'EMPTY_BASKET':
        return {
          ...state,
          basket:[]
        }

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket]; // splice 를 사용해야하는데 원본을 건드릴 수 없으니 새로 만들어 준 것임

      if (index >= 0) {
        // 위치가 정해져 있다면
        newBasket.splice(index, 1); // splice(제거를 시작할 인덱스, 몇개를 제거할 것 인가)
      } else {
        // 아무것도 안 들어 있으면
        console.warn(`(id` + action.id + `)이 장바구니에 존재하지 않습니다.`);
      }

      return {
        ...state,
        basket: newBasket,
      };

    case 'SET_USER':
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default reducer;
