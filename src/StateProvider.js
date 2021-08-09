import { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();
// context 를 만들어서 statecontext에 담겠다. 데이터 레이어을 준비하는 것

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
  // app 을 래핑하고 데이터 레이어을 제공하는 부분을 완성함
);

// 각 컴포넌트에 전달할 수 있는 메서드가 필요함
// 데이터 레이어 정보를 가져올 수 있는 메서드가 필요함
export const useStateValue = () => useContext(StateContext);

// 글로벌 데이터를 공유할 때 사용하는 것이 context 이다
