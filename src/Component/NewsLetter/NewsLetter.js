import React from 'react';
import "./newsLetter.css";
import { HiOutlineSpeakerphone } from "react-icons/hi";


const NewsLetter = () => {
  return (
    <div className="news_letter">
      <div className="news_letter_content">
            <div className="news_letter_text">
                <div>
                    <HiOutlineSpeakerphone className="speaker"/>
                </div>
                <div className="content">
                    <h4>Want to get the latest travel news and deals?</h4>
                    <p>Enter your email and we'll send them your way.</p>
                </div>
            </div>
            <div className="news_letter_field">
                <input type="email" placeholder="achagoodness@gmail.com"/><button>Subscribe</button>
            </div>
      </div>
    </div>
  )
}

export default NewsLetter
