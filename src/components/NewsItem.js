import React from 'react'

const NewsItem = (props)=> {
 

    let {title , description , imageURL , newsUrl,author, date} = props;
    return (
      <div className='mx-5'><div className="card" id='news-card'>
      <img src={imageURL?imageURL:'https://media.newstrack.in/uploads/lifestyle-health/health-tips/Dec/28/big_thumb/2024-goals_658d4482ad7a9.JPG'} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p class="card-text"><small class="text-body-secondary">By {author? author: 'Unknown'} On {new Date(date).toUTCString() }</small></p>

        <a href={newsUrl} target='_blank' id='read-more-btn' className="btn btn-sm btn-primary">Read more</a>
      </div>
    </div></div>
    )
  }
  export default NewsItem;

