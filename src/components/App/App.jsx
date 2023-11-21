import { Component } from 'react';
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
    executedQueries: [],
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
      this.setState(
        prev => ({
          images: [...prev.images, ...hits],
          loadMore: prev.page < Math.ceil(totalHits / 12),
          page: prev.page + 1,
          error: '',
          loading: false,
        }),
        () => {
          if (this.state.loadMore) {
            this.scrollUp();
          }
        }
      );
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

  scrollUp = () => {
    const cardHeight = 300;
    window.scrollTo({
      top: window.scrollY + cardHeight * 2,
      behavior: 'smooth',
    });
  };

  onLoadMoreClick = () => {
    this.handleImages();
  };


  handleSubmit = async ({ query }) => {
    if (!query.trim()) {
      toast.error('Ви нічого не ввели !');
      return;
    }

    if (
      this.state.executedQueries.length > 0 &&
      this.state.executedQueries[
        this.state.executedQueries.length - 1
      ].toLowerCase() !== query.toLowerCase()
    ) {
      this.setState({
        executedQueries: [],
      });
    }

    if (this.state.executedQueries.includes(query.toLowerCase())) {
      toast.error("Ви вже зробили запит з таким ім'ям.");
      return;
    }

    this.setState(prevState => ({
      query,
      images: [],
      page: 1,
      loadMore: true,
      executedQueries: [...prevState.executedQueries, query.toLowerCase()],
    }));

    await this.handleImages();
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
        )}
      </Container>
    );
  }
}

export default App;
