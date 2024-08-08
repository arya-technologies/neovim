import settingsSlice from "@/features/slices/settingsSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const settingsConfig = {
  key: "settings",
  storage: ExpoFileSystemStorage,
};

const rootReducer = combineReducers({
  settings: persistReducer(settingsConfig, settingsSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
