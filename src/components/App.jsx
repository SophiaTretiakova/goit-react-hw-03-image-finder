import { fetchImagesWithQuery } from 'api';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
//import axios from 'axios';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    query: '',
    error: null,
    hasMoreImages: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      if (this.state.query) {
        this.setState({
          images: fetchImagesWithQuery(this.state.query, this.state.page),
        });
        // console.log(`this.state.query`, this.state.query);
      }
      // console.log(`no this.state.query`, this.state.query);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.query !== this.state.query ||
  //     prevState.page !== this.state.page
  //   ) {
  //     const images = await fetchImagesWithQuery(
  //       this.state.query.split('/')[1],
  //       this.state.page
  //     );

  //     if (Array.isArray(images)) {
  //       // console.log(images);
  //       this.setState({
  //         images: [...this.state.images, ...images],
  //         hasMoreImages: true,
  //       });
  //     } else {
  //       console.error(
  //         'fetchImagesWithQuery повернуло не масив:',
  //         typeof images
  //       );
  //     }
  //   }
  // }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const images = await fetchImagesWithQuery(
        this.state.query.split('/')[1],
        this.state.page
      );

      if (Array.isArray(images)) {
        // console.log(images);
        this.setState({
          images: [...this.state.images, ...images],
          hasMoreImages: true,
        });
      } else {
        console.error(
          'fetchImagesWithQuery повернуло не масив:',
          typeof images
        );
      }
    }
  }

  // changeQuery = newQuery => {
  //   this.setState({
  //     query: `${Date.now()}/${newQuery}`,
  //     images: [],
  //     page: 1,
  //     hasMoreImages: false,
  //   });
  // };

  handelSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.elements.query.value}`,
      images: [],
      page: 1,
      hasMoreImages: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handelSubmit} />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ImageGallery images={images} handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
