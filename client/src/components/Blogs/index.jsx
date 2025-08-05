import React from 'react';
import {Button} from 'react-bootstrap';
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { FaEye, FaHeart } from "react-icons/fa";
import ReactDOM from "react-dom";
import Overlay from "../Overlay";
import blogs from '../../utils/blogData';

export default function Blogs() {
  const [hearts, setHearts] = useState([137, 61, 745]);
  const [views, setViews] = useState([123, 98, 76]);
  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const cardRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const expandedIdx = blogs.findIndex(
    blog => slugify(blog.title, { lower: true, strict: true }) === slug
  );

  const handleHeartClick = (index) => {
    setHearts((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  const handleToggle = (index) => {
    if (expandedIdx === index) {
      // If already expanded, clicking "Show less" should return to root
      navigate('/', { replace: false });
    } else {
      // Otherwise, navigate to show the overlay
      const slug = slugify(blogs[index].title, { lower: true, strict: true });
      navigate(`/blogs?slug=${slug}`, { replace: false });
    }
  };


  const closeOverlay = () => {
    setSearchParams({});
  };

  // Allow browser back button to close overlay
  useEffect(() => {
    const currentSlug = new URLSearchParams(location.search).get('slug');
    if (!currentSlug && expandedIdx !== -1) {
      closeOverlay();
    }
  }, [location, expandedIdx]);

  const renderCard = (blog, idx, isOverlay = false) => (
    <section
      aria-labelledby={`blog-${idx}`}
      ref={el => cardRefs.current[idx] = el}
      className={`blog-card${expandedIdx !== -1 && expandedIdx !== idx ? " blurred" : ""}${expandedIdx === idx ? " expanded" : ""}${isOverlay ? " overlay" : ""}`}
      key={idx}
    >
      <img
        src={blog.img}
        alt={`Thumbnail for blog-${idx}`}
        className="blog-image"
        loading='lazy'
      />
      <article id={`blog-${idx}`} className="blog-card-content">
        <header>
          <h4>{blog.title}</h4>
        </header>
        <p>
          {expandedIdx === idx
            ? blog.content
            : blog.content.slice(0, 250) + (blog.content.length > 250 ? "..." : "")}
        </p>
        <div className="blog-card-footer">
          <Button
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handleToggle(idx);
            }}
            aria-label={`Read more about ${blog.title}`}
          >
            {expandedIdx === idx ? "Show less" : `Click to expand`}
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FaEye /> {views[idx]}
            </span>
            <button
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
              onClick={() => handleHeartClick(idx)}
              aria-label="Like"
            >
              <FaHeart color="red" /> {hearts[idx]}
            </button>
          </div>
        </div>
      </article>
    </section>
  );

  return (
    <section className="blogs-section" role="region" aria-labelledby="blogs">
      <header className="blogs-header">
        <h3 id="blogs">blogs</h3>
      </header>
      <div className="blogs-content">
        {blogs.map((blog, idx) => {
          const isExpanded = expandedIdx === idx;
          return expandedIdx !== -1 && isExpanded
            ? (
              // Hide the background copy of the expanded blog
              <div key={idx} style={{ visibility: "hidden", height: 0 }} />
            )
            : renderCard(blog, idx);
        })}
      </div>
      {expandedIdx !== -1 &&
        ReactDOM.createPortal(
          <Overlay
            className="blog-overlay-bg"
            onClose={() => closeOverlay()}
          >
            {renderCard(blogs[expandedIdx], expandedIdx, true)}
          </Overlay>,
          document.body
        )
      }
    </section>
  );
};
