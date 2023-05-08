import { useState } from "react";

import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import { albumCreated } from "../../actions";

const AlbumsAddForm = () => {
    const [albumName, setAlbumName] = useState('');
    const [albumYear, setAlbumYear] = useState('');
    const [albumGenre, setAlbumGenre] = useState('');
    const [albumDescr, setAlbumDescr] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state);

    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newAlbum = {
            id: uuidv4(),
            name: albumName,
            year: albumYear,
            genre: albumGenre,
            descr: albumDescr
        }

        request("http://localhost:3001/albums", "POST", JSON.stringify(newAlbum))
            .then(res => console.log(res, 'Ok'))
            .then(dispatch(albumCreated(newAlbum)))
            .catch(err => console.log(err))

        setAlbumName('')
        setAlbumYear('')
        setAlbumGenre('')
        setAlbumDescr('')
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading genres</option>
        }   else if (status === 'error') {
            return <option>Loading error</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                // Один из фильтров тут не нужен
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New album name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={albumName}
                    placeholder="What the album?"
                    onChange={(e) => setAlbumName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">New album year</label>
                <input 
                    required
                    type="text" 
                    name="text" 
                    className="form-control" 
                    id="text"
                    value={albumYear}
                    placeholder="date of burn"
                    onChange={(e) => setAlbumYear(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Album Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text"
                    value={albumDescr} 
                    placeholder="About this album"
                    style={{"height": '130px'}}
                    onChange={e => setAlbumDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Enter album genre</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={albumGenre}
                    onChange={(e) => setAlbumGenre(e.target.value)}>
                    <option value=''>Album genre is...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    )
}

export default AlbumsAddForm;