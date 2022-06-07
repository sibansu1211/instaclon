// src={require(`./${PostImage}`)}

import React from 'react';
import './Card.css';

export default function Card({ people }) {
  return people.map((person, index) => {
    return (
      <div className='card' key={index}>
        <div className='info'>
          <div className='name'>
            <div className='author-name'>{person.author}</div>
            <div className='location-name'>{person.location}</div>
          </div>
          <div className='dots'>
            <img src='/images/three_dots.jpg' alt='' />
          </div>
        </div>

        <div className='image'>
          <img
            src={process.env.REACT_APP_API + '/image/' + person.postImage}
            alt='Not Found'
          />
        </div>

        <div className='details'>
          <div className='like'>
            <img src='/images/like_image.png' alt='' />
          </div>
          <div className='share'>
            <img src='/images/share_image.png' alt='' />
          </div>
          <div className='date'>{person.date}</div>
        </div>

        <div className='likeCounts'>
          <p>{person.likes} likes</p>
        </div>

        <div className='description'>
          <p>{person.description}</p>
        </div>
      </div>
    );
  });
}
