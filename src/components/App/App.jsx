
import { Component } from 'react'
import Modal from '../Modal/Modal'
import getImages from '../Api/imageApi';
import ImageGallery from '../ImageGallery/ImageGallery'
import Searchbar from '../Searchbar/Searchbar'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import css from './app.module.css'
import Container from '../Container/Container'
import {ToastContainer, toast } from 'react-toastify';
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
      const { query, page } = this.state;
      if (!query.trim()) {
        toast.error('Ви нічого не ввели!');
        return;
      }

      this.setState({ loading: true });
      const data = await getImages(query, page);
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
        toast.error('Помилка запиту! Спробуйте ввести інше значення.');
        this.setState({
          loading: false,
          loadMore: false,
        });
      } else {
        this.setState({
          error: error.response?.data ?? 'Error fetching images',
          loading: false,
        });
      }
    }
  };

  onLoadMoreClick = () => {
    this.handleImages();
  };

 
  handleSubmit = ({ query }) => {
    if (!query.trim()) {
      toast.error('Ви нічого не ввели !');
      return;
    }

    this.setState({ query, images: [], page: 1, loadMore: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImageClick = ({ largeImageURL, tags }) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };


  // scrollUp = () => {
  //   const cardHeight = '300px';
  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: 'smooth',
  //   });
  // };

  render() {
    const { showModal, loading, error, images, loadMore, largeImageURL, tags } =
      this.state;
    return (
      <Container>
        <ToastContainer />
        <Searchbar className={css.searchbar} submit={this.handleSubmit} />
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
        {loadMore && !loading && this.state.query.trim() !== '' && (
          <LoadMoreBtn onClick={this.onLoadMoreClick} />
          // <LoadMoreBtn onClick={this.onLoadMoreClick}  onScrollUp={this.scrollUp} />
        )}
      </Container>
    );
  }
}

export default App;