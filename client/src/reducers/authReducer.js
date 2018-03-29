<<<<<<< HEAD
export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
}
=======
import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
>>>>>>> 636e17baf590683782d446709d5271123627c3ac
