import AlbumsList from '../albumsList/AlbumsList';
import AlbumsAddForm from '../albumsAddForm/AlbumsAddForm';
import AlbumsFilters from '../albumsFilters/AlbumsFilters';

import './app.scss';

const App = () => {
    return (
        <main className='app'>
            <div className="content">
                <AlbumsList/>
                <div className="content__interactive">
                    <AlbumsAddForm/>
                    <AlbumsFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;