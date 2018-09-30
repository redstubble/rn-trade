import { UPDATE_CALCULATOR_STATE } from '../redux-actions';

const initialAppState = {
  formFields: {
    makerFee: 0.1,
    takerFee: 0.2,
  },
};

function documents(state = initialAppState, action) {
  switch (action.type) {
    case UPDATE_CALCULATOR_STATE:
      return {
        ...state,
        formFields: action.state.formFields,
      };
    default:
      return state;
  }
}

export default documents;
