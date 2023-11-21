
import { Component } from 'react'
import Modal from '../Modal/Modal'
import getImages from '../Api/imageApi';
import ImageGallery from '../ImageGallery/ImageGallery'
import Searchbar from '../Searchbar/Searchbar'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import css from './app.module.css'
import Container from '../Container/Container'



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
      this.setState({ loading: true });
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
      this.setState({
        error: error.response?.data ?? 'Error fetching images',
        loading: false,
      });
    }
  };

  onLoadMoreClick = () => {
    this.handleImages();
  };

  handleSubmit = ({ query }) => {
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

  scrollUp = () => {
    const cardHeight = '300px'
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      })
    }
  

  render() {
    const { showModal, loading, error, images, loadMore, largeImageURL, tags } =
      this.state;
    return (
      <Container>
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
        {loadMore && this.state.query.trim() !== '' && (
          <LoadMoreBtn
            onClick={this.onLoadMoreClick}
            onScrollUp={this.scrollUp}
          />
        )}
      </Container>
    );
  }
}




export default App;




// Вся основна логіка повинна бути в Арр.
// Для запиту використовуємо метод життєвого циуклу класового компонента componentDidUpdate. Робити запит на бекенд потрібно в Арр, достатньо однієї умови для запиту:
// componentDidUpdate(prevProps, prevState){
//  if(this.state.page !== prevState.page || this.state.query!== prevState.query ){
//    fetch()
//  }
// }
// Функція для запиту повинна бути в окремому файлі, в Арр її лише викликаємо.
// Коли на бекенді закінчилися фото, приховуємо кнопку “Load more”.
// Для перевірки можна використовувати слова для пошуку “min” “max”.
// Один із варіантів реалізації приховування кнопки “Load more”
// this.steState(prev =>({
//  images: [...prev.images, ...hits],
//  loadMore: this.state.page < Math.ceil(totalHits / 12 )
// }))
// Не забуваємо коректно опрацьовувати слухача для клавіатури в компоненті модального вікна.