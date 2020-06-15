import {
  GET_ALL_KAPAL_ERROR,
  GET_ALL_KAPAL_PENDING,
  GET_ALL_KAPAL_SUCCESS,
  POST_KAPAL_ERROR,
  POST_KAPAL_PENDING,
  POST_KAPAL_SUCCESS
} from "../actions";
import { Action, KapalState } from "../types";

const initialState: KapalState = {
  kapal: {
    isLoading: false,
    list: []
  },
  detailKapal: {
    isLoading: false,
    data: {}
  },
  addKapal: {
    isLoading: false
  }
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    // get all kapal
    case GET_ALL_KAPAL_PENDING:
      return {
        ...state,
        kapal: { ...state.kapal, isLoading: true }
      };
    case GET_ALL_KAPAL_SUCCESS:
      return {
        ...state,
        kapal: { ...state.kapal, isLoading: false, list: payload.data }
      };
    case GET_ALL_KAPAL_ERROR:
      return {
        ...state,
        kapal: { ...state.kapal, isLoading: false }
      };

    // post kapal
    case POST_KAPAL_PENDING:
      return {
        ...state,
        addKapal: { ...state.addKapal, isLoading: true }
      };
    case POST_KAPAL_SUCCESS:
      return {
        ...state,
        addKapal: { ...state.addKapal, isLoading: false },
        kapal: { ...state.kapal, list: [payload.data, ...state.kapal.list] }
      };
    case POST_KAPAL_ERROR:
      return {
        ...state,
        addKapal: { ...state.addKapal, isLoading: false }
      };

    default:
      return state;
  }
};
