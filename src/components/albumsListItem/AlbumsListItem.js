const AlbumsListItem = ({name, year, genre, description, onDelete}) => {

    let genreClassName;

    switch (genre) {
        case 'metal':
            genreClassName = 'bg-danger bg-gradient';
            break;
        case 'rock':
            genreClassName = 'bg-secondary bg-gradient';
            break;
        case 'grunge':
            genreClassName = 'bg-primary bg-gradient';
            break;
        case 'psychedelic':
            genreClassName = 'bg-success bg-gradient';
            break;
        default:
            genreClassName = 'bg-warning bg-gradient';
    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${genreClassName}`}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                className="img-fluid w-25 d-inline" 
                alt="unknown hero" 
                style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{year}</p>
                <p className="card-text">{genre}</p>
                <p className="card-text">{description}</p>
            </div>
            <span
                onClick={onDelete}
                className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default AlbumsListItem;