const initialState = {
    albums: [],
    albumsLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredAlbums: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        //ALBUMS

        case 'ALBUMS_FETCHING':
            return {
                ...state,
                albumsLoadingStatus: 'loading'
            }
        case 'ALBUMS_FETCHED':
            return {
                ...state,
                albums: action.payload,
                filteredAlbums: state.activeFilter === 'all' ?
                                action.payload :
                                action.payload.filter(item => item.genre === state.activeFilter),
                albumsLoadingStatus: 'idle'
            }
        case 'ALBUMS_FETCHING_ERROR':
            return {
                ...state,
                albumsLoadingStatus: 'error'
            }
        case 'ALBUM_DELETED':
            const newAlbumsList = state.albums.filter(item => item.id !== action.payload);
            return {
                ...state,
                albums: newAlbumsList,
                filteredAlbums: state.activeFilter === 'all' ?
                                newAlbumsList :
                                newAlbumsList.filter(item => item.genre === state.activeFilter)
            }
        case 'ALBUM_CREATED':
            const newCreatedAlbumList = [...state.albums, action.payload]; 
            return {
                ...state,
                albums: newCreatedAlbumList,
                filteredAlbums: state.activeFilter === 'all' ?
                                newCreatedAlbumList :
                                newCreatedAlbumList.filter(item => item.genre === state.activeFilter)
            }
        //FILTERS

        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredAlbums: action.payload === 'all' ?
                                state.albums :
                                state.albums.filter(item => item.genre === action.payload)
            }
        default: return state
    }
}

export default reducer;