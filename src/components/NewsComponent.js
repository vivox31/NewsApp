import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";



export default class NewsComponent extends Component {

  article = [];
  static defaultProps = {
    country: 'in',
    pageSize: 9,

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }



  constructor() {
    super();
    this.state = {
      article: this.article,
      loading: false,
      page: 1,
      totalResults: 0

    }
  }

  fetchMoreData = async() => { 
   this.setState({page:this.state.page+1});
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0ab2251a7f64ce2a44be14530d04479&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseData = await data.json();
    //  console.log(parseData);
    this.setState({
      article: this.state.article.concat(parseData.articles),
      loading: false,
      totalResults: parseData.totalResults,
    })
  };

  updateNews = async () => {
    this.props.setProgress(10);
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0ab2251a7f64ce2a44be14530d04479&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(60);

    //  console.log(parseData);
    this.setState({
      article: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults,
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  render() {
    return (
      <>
      
        <h2 className='text-center' style={{ margin: '40px' }}>NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          < div className="container my-3" >
           <div className="row">
          {!this.state.loading && this.state.article.map((element) => {
            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
          </div>
          </div>
        </InfiniteScroll>
       
          {/*  <div className=" container my-3 d-flex justify-content-between">
             <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
               <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
             </div> */}
          
          </>
    )
  }
}
