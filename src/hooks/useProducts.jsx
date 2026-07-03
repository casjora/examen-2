import { useReducer } from "react"; 

const initialState = {
    products: null,
    loading: true,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, products: null, loading: false, error: action.payload };
        case "FETCH_LOADING":
            return { ...state, loading: true, error: null };
        default:
            return state;
    }
};

/**
 * Hook personalizado para manejar el estado y la lógica de la obtención de datos desde una URL.
 *
 * @function useProducts
 * @param {string} url - La URL desde donde se obtendrán los datos.
 * @returns {Object} state - El estado actual del hook, que incluye:
 *   - `loading` (boolean): Indica si los datos están siendo cargados.
 *   - `data` (any): Los datos obtenidos de la URL.
 *   - `error` (string|null): El mensaje de error en caso de que ocurra un fallo.
 *
 * @description
 * Este hook utiliza `useReducer` para manejar el estado de la solicitud de datos.
 * Realiza una solicitud HTTP GET a la URL proporcionada utilizando Axios.
 * El estado incluye tres fases principales:
 *   - `FETCH_LOADING`: Cuando la solicitud está en progreso.
 *   - `FETCH_SUCCESS`: Cuando los datos se obtienen exitosamente.
 *   - `FETCH_ERROR`: Cuando ocurre un error durante la solicitud.
 *
 * @example
 * const { loading, data, error } = useProducts("https://api.example.com/products");
 *
 * @requires useReducer
 * @requires useEffect
 * @requires axios
 */
 const useProducts = (url) => { // Definimos el hook useProducts que recibe una URL como parámetro
    const [ state, dispatch ] = useReducer(reducer, initialState);

    const fetchData = async () => {
        dispatch({ type: "FETCH_LOADING" }); // Despachamos la acción FETCH_LOADING para indicar que la carga ha comenzado
        try {
            const response = await axios.get(url); // Realizamos la solicitud GET a la URL proporcionada
            dispatch({ type: "FETCH_SUCCESS", payload: response.data }); // Despachamos la acción FETCH_SUCCESS con los datos obtenidos
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message }); // Despachamos la acción FETCH_ERROR con el mensaje de error
        }
    };

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url]);
    const { loading, products, error } = state; // Desestructuramos el estado para obtener loading, products y error
    return { loading, products, error };// Devolvemos un objeto con loading, products y error
};

export default useProducts;