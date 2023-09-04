import { configureStore } from "redux";

import rootReducer from "./reducer";

const store = configureStore(rootReducer);
export default store;
