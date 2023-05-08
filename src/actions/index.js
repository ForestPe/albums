//ALBUMS

export const albumsFetching = () => {
    return {
        type: 'ALBUMS_FETCHING'
    }
}

export const albumsFetched = (albums) => {
    return {
        type: 'ALBUMS_FETCHED',
        payload: albums
    }
}

export const albumsFetchingError = () => {
    return {
        type: 'ALBUMS_FETCHING_ERROR'
    }
}

export const albumDeleted = (id) => {
    return {
        type: 'ALBUM_DELETED',
        payload: id
    }
}

export const albumCreated = (album) => {
    return {
        type: 'ALBUM_CREATED',
        payload: album
    }
}

//FILTERS

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}
