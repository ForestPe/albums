import {useHttp} from '../../hooks/http.hook'
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { albumsFetching, albumsFetched, albumsFetchingError, albumDeleted } from '../../actions';
import AlbumsListItem from "../albumsListItem/AlbumsListItem";
import Spinner from '../spinner/Spinner';

import './albumsList.scss';

const AlbumsList = () => {
    const {filteredAlbums, albumsLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(albumsFetching());
        request("http://localhost:3001/albums")
            .then(data => dispatch(albumsFetched(data)))
            .catch(() => dispatch(albumsFetchingError()))

            //eslint-disable-next-line
    }, [])

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/albums/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(albumDeleted(id)))
            .catch(err => console.log(err))

            // eslint-disable-next-line  
    }, [request]);

    if (albumsLoadingStatus === 'loading') {
        return <Spinner/>;
    } else if (albumsLoadingStatus === 'error') {
        return <h5 className='text-center mt-5'>Loading error</h5>
    }
    
    const renderAlbumsList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="album">
                    <h5 className='text-center mt-5'>Albums not found</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="album">
                    <AlbumsListItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderAlbumsList(filteredAlbums);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default AlbumsList;