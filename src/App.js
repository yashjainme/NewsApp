
import './App.css';

import React, { Component } from 'react'
// import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {
  Pagesize = 21;
  apiKey = process.env.REACT_APP_NEWS_API


  state = {
    progress:0
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
  }
  render() {
    
    
    
    
    return (
      <>
       <Router>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
       
      />
   
   
   
   
   
   <Routes> 
    {/* <Route element={<NavBar/>} /> */}
   
  
   <Route exact path="/"  element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="general" Pagesize={this.Pagesize} country="in" category="general"/>} />
   <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="business"  Pagesize={this.Pagesize} country="in" category="business"/>} />
   <Route exact path="/entertainment"element={<News setProgress={this.setProgress} apiKey = {this.apiKey}   key="entertainment"  Pagesize={this.Pagesize} country="in" category="entertainment"/>} />
   <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey = {this.apiKey}   key="health" Pagesize={this.Pagesize} country="in" category="health"/>} />
   <Route exact path="/science"  element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="science" Pagesize={this.Pagesize} country="in" category="science"/>} />
   <Route exact path="/sports"  element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="sports" Pagesize={this.Pagesize} country="in" category="sports"/>} />
   <Route exact path="/technology"  element={<News setProgress={this.setProgress} apiKey = {this.apiKey}  key="technology" Pagesize={this.Pagesize} country="in" category="technology"/>} />
   
   </Routes>
  </Router> 
      {/* <div>
        <NavBar/>
        <News Pagesize={this.Pagesize} country="in" category="technology"/>
      </div> */}
      </>
    );
  }
}

