import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";



const NewsComponent  = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);



 const  fetchMoreData = async() => { 
   setPage(page+1);
   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0ab2251a7f64ce2a44be14530d04479&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parseData = await data.json();
    //  console.log(parseData);
    setArticles(articles.concat(parseData.articles));
    setLoading(false)
    setTotalResults(parseData.totalResults);
    
  };

 const  updateNews = async () => {
    props.setProgress(10);
    setLoading(true)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);

    setArticles(parseData.articles);
    setLoading(false)
    setTotalResults(parseData.totalResults);
    props.setProgress(100);
  }
  
 useEffect(() => {
   updateNews();
 
 }, [])
 

 const handleNextClick = async () => {
     setPage(page+1) 
     updateNews();
  }

 const handlePreviousClick = async () => {
    setPage(page-1)
    updateNews();
  }

  
    return (
      <>
      
        <h2 className='text-center' style={{ margin: '40px' }}>NewsMonkey - Top Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          < div className="container my-3" >
           <div className="row">
          {!loading && articles.map((element) => {
            return <div className="col-md-4 my-3" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                imageURL={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
          </div>
          </div>
        </InfiniteScroll>
           {/* in case you i want next Previous button system        */}
          {/*  <div className=" container my-3 d-flex justify-content-between">
             <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
               <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
             </div> */}
          
          </>
    )
}


 NewsComponent.defaultProps = {
  country: 'in',
  pageSize: 9,

}

NewsComponent.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default  NewsComponent;