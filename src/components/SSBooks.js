import Book from './Book'
import React, { Component } from 'react'


export default class SSBooks extends Component {



    render() {
        return (
            <div className="bookshelf">
                <ol className="books-grid">

                 
                      { this.props.loadSearch ? (

                         this.props.booksFromSearch.map((book)=>(
        
                         <Book key={book.id}  book={book} changeShelf={this.props.changeShelf}/>
        
                         ))
                     ): (
                         this.props.booksFromSearch
                     )
                 }
                </ol>
             
            </div>  
    )
       
    }
}
