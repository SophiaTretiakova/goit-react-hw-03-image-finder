import { fetchImagesWithQuery } from 'api';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
//import axios from 'axios';

export class App extends Component {
  // // async componentDidMount() {
  // //   this.setState({ isLoading: true });

  // //   try {
  // //     if (this.state.query) {
  // //       const imagesData = await fetchImagesWithQuery(
  // //         this.state.query,
  // //         this.state.page
  // //       );
  // //       this.setState({ images: imagesData });
  // //       // console.log(`this.state.query`, this.state.query);
  // //     }
  // //     // console.log(`no this.state.query`, this.state.query);
  // //   } catch (error) {
  // //     this.setState({ error });
  // //   } finally {
  // //     this.setState({ isLoading: false });
  // //   }
  // // }
  // async componentDidMount() {
  //   this.setState({ isLoading: true });

  //   try {
  //     if (this.state.query) {
  //       const imagesData = await fetchImagesWithQuery(
  //         this.state.query,
  //         this.state.page
  //       );
  //       this.setState({ images: imagesData });
  //     }
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }
  state = {
    images: [],
    isLoading: false,
    page: 1,
    query: '',
    error: false,
    hasMoreImages: false,
  };

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
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          isLoading: true,
          error: false,
          hasMoreImages: false,
        });

        const { images, totalHits } = await fetchImagesWithQuery(
          this.state.query.split('/')[1],
          this.state.page
        );

        if (!images.length) {
          this.setState({
            hasMoreImages: false,
            isLoading: false,
          });
          console.log('There is no images for query like that.');
          return;
        }
        this.setState({
          images: [...this.state.images, ...images],
          hasMoreImages: this.state.page * 12 < totalHits ? true : false,
        });
      } catch (error) {
        console.log('Oops there is an error ocurred! Try to reload the page.');
        this.setState({
          error: true,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { images, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handelSubmit} />
        {/* {isLoading ? (
          <p>Loading...</p>
        ) : ()} */}
        <ImageGallery images={images} handleLoadMore={this.handleLoadMore} />
        {this.state.hasMoreImages && (
          <button onClick={this.handleLoadMore}>Load more</button>
        )}
      </div>
    );
  }
}
