import React from 'react';


export default function AppInfo(props) {
  return (
    <div className="book">
      <h2>{ props.App }</h2>
      <div className="book_author">Genre: { props.Genres }</div>
      <div className="book_publisher">
        Rating: { props.Rating }
      </div>
      <div className="book_description">File size: { props.Size }</div>
    </div>
  );
}