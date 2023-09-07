import React from 'react'

const NewsItem=(props)=> {
    
    
       
        
        let { title, description, imageUrl, url, author, date, source, clr} = props
        return (
                
                <div className="card my-3 p-1" style={{backgroundColor: "#0f172a", color: "white", border: "2px solid #0f172a"}}>
                    <span className={`position-absolute end-0 badge rounded-pill bg-${clr}`}>{source}</span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small>By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} rel="noreferrer" target='_blank' className="btn btn-sm btn-light">Direct to News</a>
                    </div>
                </div>
                
            
        )
    
}

export default NewsItem