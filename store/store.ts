import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(intitialState: Object) {
  // Be sure to ONLY add this middleware in development!
  const middleware =
    process.env.NODE_ENV !== "production"
      ? [require("redux-immutable-state-invariant").default(), thunk]
      : [thunk];
  return createStore(
    rootReducer,
    intitialState,
    applyMiddleware(...middleware)
  );
}
