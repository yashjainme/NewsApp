import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import NavBar from './NavBar.js'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {


  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState([])

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }




  document.title = `${capitalize(props.category)} - NewsTurtle`



  const updateNews = async () => {
    console.log('cdm')
    props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&Page=1&Pagesize=${props.Pagesize}`
    setLoading(true)
    
    props.setProgress(30)
    let data = await fetch(url);
    let parsedData = await data.json();
    // props.setProgress(70)
    console.log(parsedData)

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)


    props.setProgress(100)
  }


  useEffect(() => {

    updateNews()
    
  }, [])





  // handlePrevClick = async () => {
  //   console.log("This is Previous")
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=64f0c8639b3f446cba97c72073716ee5&Page=${this.state.page - 1}&Pagesize=${props.Pagesize}`
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData)
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   }

  //   )
  //   // {this.setState({loading: false})}
  //   // window.scrollTo(0, 0);
  // }


  // handleNextClick = async () => {

  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.Pagesize))) {

  //     console.log("This is Next")
  //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=64f0c8639b3f446cba97c72073716ee5&Page=${this.state.page + 1}&Pagesize=${props.Pagesize}`
  //     this.setState({ loading: true })
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     console.log(parsedData)
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     })

  //   }


  // }

  const fetchMoreData = async () => {
    setPage(page + 1)


    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&Page=${page + 1}&Pagesize=${props.Pagesize}`

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)


  };








  return (

    <div>
      <NavBar />

      <InfiniteScroll
        dataLength={articles.length}
        // dataLength={this.state.articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >


        <div className="container my-3">

          <h1 className='text-center' style={{marginTop: '64px'}}>NewTurtle - Top {capitalize(props.category)} Headlines</h1>
          {/* {this.state.loading && <Spinner/>} */}

          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={!element.urlToImage ? "https://cdn-icons-png.flaticon.com/512/21/21601.png" : element.urlToImage} url={element.url} date={element.publishedAt} author={!element.author ? "Unknown" : element.author} source={element.source.name}
                  clr={props.category === "business" ? "dark" : props.category === "entertainment" ? "success" : props.category === "health" ? "danger" : props.category === "science" ? "primary" : props.category === "technology" ? "info" : props.category === "sports" ? "secondary" : "warning"} />
              </div>
            })}




          </div>

          {/* <div className="container d-flex justify-content-between mt-3" >
              <button disabled={this.state.page <= 1} id='previous' className="btn btn-dark m-2" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.Pagesize)} id='next' className="btn btn-dark m-2" onClick={this.handleNextClick}>Next &rarr;</button>


            </div> */}

        </div>
      </InfiniteScroll>

    </div>

  )


}

News.defaultProptypes = {
  country: "in",
  pageSize: 8,
  category: "general"

}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News