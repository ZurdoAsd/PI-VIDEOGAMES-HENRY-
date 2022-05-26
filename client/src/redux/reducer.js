import {
  GET_VIDEOGAMES,
  GET_GAME_DETAIL,
  GET_GENRES,
  POST_GAME,
  GET_VIDEOGAMES_NAME,
  SORT_VIDEOGAMES,
  ORDER_BY,
  ORDER_BY_R,
  SORT_GENRE,
  CLEAR
} from "./actionTypes";

let initialState = {
  videogames: [],
  videojuegos:[],
  gameDetail: {},
  genres: [],
  gameAdded: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    //traer info//
    case GET_VIDEOGAMES:
      return {
        ...state,
        videojuegos: action.payload,// nunca va a cambiar 
        videogames: action.payload,// va ir camcabiando
      };

    case GET_VIDEOGAMES_NAME:
      return {
        ...state,
        videogames: action.payload,
      };

    case GET_GAME_DETAIL:
      return {
        ...state,
        gameDetail: action.payload,
      };
      case CLEAR:
        return {
          ...state,
          gameDetail:{},
        };

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
//POST//      
    case POST_GAME:
      return {
        ...state,
        gameAdded: action.payload,
      };
//filtros//
    //********* cREATED*********//
    case SORT_VIDEOGAMES:
      let videogames2 = state.videojuegos;

      if (action.payload === "Created") {
        let filterByOrigin = videogames2.filter((e) => {
          return typeof e.id === "string";
        });
        return {
          ...state,
          videogames: filterByOrigin,
        };
      }
      if (action.payload === "Existing") {
        let filterByOrigin = videogames2.filter((e) => {
          return typeof e.id === "number";
        });
        return {
          ...state,
          videogames: filterByOrigin,
        };
      }

      return {
        ...state,
        videogames: videogames2,
      };

    //********* GENRES*********//
    case SORT_GENRE:
      const videogames5 = state.videojuegos;
      let filtreGenre = videogames5.filter((e) =>
        e.genres.includes(action.payload)
      );

      return {
        ...state,
        videogames: action.payload === "123" ? videogames5 : filtreGenre,
      };

    //-------A z------//
    case ORDER_BY:
      let videogames3 = [...state.videogames];
      let orderAlpha = videogames3.sort((a, b) => {
        if (action.payload === "A-Z") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return {
        ...state,
        videogames: [...orderAlpha],
      };

    //-----rating---//
    case ORDER_BY_R:
      let videogames4 = [...state.videogames];
     
      let orderRating = videogames4.sort((a, b) => {
        if (a.rating > b.rating) {
          return action.payload === "MaRating" ? -1 : 1;
        }
        if (a.rating < b.rating) {
          return action.payload === "MaRating" ? 1 : -1;
        }
        return 0;
      });
      return { ...state, videogames: [...orderRating] };
    default:
      return state;
  }
}
