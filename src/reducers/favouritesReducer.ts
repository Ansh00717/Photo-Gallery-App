/**
 * Favourites reducer — manages the list of favourited photo IDs.
 * Extracted into its own file for clean separation of concerns.
 */

export type FavouritesState = {
  favourites: string[];
};

export type FavouritesAction =
  | { type: 'TOGGLE_FAVOURITE'; payload: string }
  | { type: 'SET_FAVOURITES'; payload: string[] };

export const initialFavouritesState: FavouritesState = {
  favourites: [],
};

export function favouritesReducer(
  state: FavouritesState,
  action: FavouritesAction
): FavouritesState {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.favourites.includes(action.payload);
      if (isFavourite) {
        return {
          ...state,
          favourites: state.favourites.filter((id) => id !== action.payload),
        };
      } else {
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
      }
    }
    case 'SET_FAVOURITES':
      return {
        ...state,
        favourites: action.payload,
      };
    default:
      return state;
  }
}
