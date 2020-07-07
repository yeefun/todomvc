import {useState, useEffect} from 'react';

export {isEnter, useStateWithCallback};

function useStateWithCallback(initialState, callback, deps = []) {
  const [state, seState] = useState(initialState);

  useEffect(() => {
    callback(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, ...deps]);

  return [state, seState];
}

function isEnter(evt) {
  return evt.key === 'Enter' || evt.keyCode === 13;
}
