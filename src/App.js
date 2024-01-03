
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress});
  }
  render() {
    let pageSize = 9;
    let apiKey = process.env.REACT_APP_NEWS_API;
    //  let apiKey ='e0ab2251a7f64ce2a44be14530d04479'
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        
        height={3}
        color='#f11946'
        progress={this.state.progress}
       
      />
        <Routes>
        <Route path='/' element={<NewsComponent setProgress={this.setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country='in' category='general' />}></Route>
          <Route path='/sports' element={<NewsComponent setProgress={this.setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country='in' category='sports' />} ></Route>
          <Route path='/entertainment' element={<NewsComponent setProgress={this.setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country='in' category='entertainment' />} ></Route>
          <Route path='/health' element={<NewsComponent setProgress={this.setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country='in' category='health' />} ></Route>
          <Route path='/science' element={<NewsComponent setProgress={this.setProgress}apiKey={apiKey}  key="science" pageSize={pageSize} country='in' category='science' />} ></Route>
          <Route path='/technology' element={<NewsComponent setProgress={this.setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country='in' category='technology' />} ></Route>
          <Route path='/business' element={<NewsComponent setProgress={this.setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country='in' category='business' />} ></Route>
        </Routes>
           
        </BrowserRouter>
                 
        </div>
    )
  }
}

