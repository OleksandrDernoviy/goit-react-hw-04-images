
import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import getImages from '../Api/imageApi';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import LoadMoreBtn from '../Button/Button';
import Loader from '../Loader/Loader';
import css from './app.module.css';
import Container from '../Container/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    showModal: false,
    query: '',
    images: [],
    error: '',
    loading: false,
    page: 1,
    loadMore: false,
    lastQuery: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query &&
      this.state.query.trim() !== ''
    ) {
      this.handleImages();
    }
  }

  handleImages = async () => {
    try {
      this.setState({ loading: true, loadMore: false });
      const data = await getImages(this.state.query, this.state.page);
      const { hits, totalHits } = data;
      this.setState(prev => ({
        images: [...prev.images, ...hits],
        loadMore: prev.page < Math.ceil(totalHits / 12),
        page: prev.page + 1,
        error: '',
        loading: false,
      }));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Помилка запиту!');
        this.setState({
          loading: false,
          loadMore: false,
        });
      } else {
        this.setState({
          error: error.response?.data ?? 'Error fetching images',
          loading: false,
          loadMore: false,
        });
      }
    }
  };

  onLoadMoreClick = () => {
    this.handleImages();
  };

  handleSubmit = ({ query }) => {
    if (query.trim() === '') {
      toast('Ви нічого не ввели. ');
      return;
    }

    if (query.trim() === this.state.lastQuery.trim()) {
      toast('Ви вже зробили аналогічний запит');
      return;
    }

    this.setState({
      query,
      images: [],
      page: 1,
      loadMore: true,
      lastQuery: query,
    });
  };

  

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImageClick = ({ largeImageURL, tags }) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };

  render() {
    const { showModal, loading, error, images, loadMore, largeImageURL, tags } =
      this.state;
    return (
      <Container>
        <Searchbar className={css.searchbar} submit={this.handleSubmit} />
        <ToastContainer />
        {images && (
          <ImageGallery images={images} openModal={this.handleImageClick} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        {loading && <Loader />}
        {error && <p className={css.error}>{error}</p>}
        {loadMore && this.state.query.trim() !== '' && (
          <LoadMoreBtn onClick={this.onLoadMoreClick} />
        )}
      </Container>
    );
  }
}

export default App;
