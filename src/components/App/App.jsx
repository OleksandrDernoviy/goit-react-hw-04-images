
  import { useState, useEffect, useCallback } from 'react';
  import Modal from '../Modal/Modal';
  import getImages from '../Api/imageApi';
  import ImageGallery from '../ImageGallery/ImageGallery';
  import Searchbar from '../Searchbar/Searchbar';
  import LoadMoreBtn from '../Button/Button';
  import Loader from '../Loader/Loader';
  import css from './app.module.css';
  import Container from '../Container/Container';
  import {ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


  const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [modalImage, setModalImage] = useState(null);

 
  const handleImages = useCallback(async () => {
    try {
      setLoading(true);
      setLoadMore(false);
      const data = await getImages(query, page);
      const { hits, totalHits } = data;
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(prevPage => prevPage < Math.ceil(totalHits / 12));
      setPage(prevPage => prevPage + 1);
      setError('');
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Помилка запиту!');
      } else {
        setError(error.response?.data ?? 'Error fetching images');
      }
      setLoading(false);
      setLoadMore(false);
    }    
  }, [query, page]);

  
  useEffect(() => {
    if (query.trim() !== '' && query !== lastQuery) {
      setLastQuery(query);
      setPage(1); 
      setImages([]); 
      setLoadMore(false); 
      handleImages();
    }
  }, [query, lastQuery, handleImages]);
  
  const onLoadMoreClick = () => {
    handleImages();
  };

  const handleSubmit = ({ query }) => {
    if (query.trim() === '') {
      toast('Ви нічого не ввели. ');
      return;
    }

    if (query.trim() === lastQuery.trim()) {
      toast('Ви вже зробили аналогічний запит');
      return;
    }
    setQuery(query);
    setPage(1);
    setImages([]);
    setLoadMore(true);
    // console.log('query:', query);    
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleImageClick = ({ largeImageURL, tags }) => {
    setModalImage({ largeImageURL, tags });
    setShowModal(true);
  };

  return (
    <Container>
      <Searchbar className={css.searchbar} submit={handleSubmit} />
      <ToastContainer />
      {images && <ImageGallery images={images} openModal={handleImageClick} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage.largeImageURL} alt={modalImage.tags} />
        </Modal>
      )}
      {loading && <Loader />}
      {error && <p className={css.error}>{error}</p>}
      {loadMore && query.trim() !== '' && (
        <LoadMoreBtn onClick={onLoadMoreClick} />
      )}
    </Container>
  );
};

export default App;
  


  