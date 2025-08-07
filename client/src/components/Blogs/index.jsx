import React from 'react';
import {Button} from 'react-bootstrap';
import {useRef, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import ReactDOM from "react-dom";
import Overlay from "../Overlay";
import blogs from '../../utils/blogData';
import {
    getExpandedIdx,
    handleToggle,
    closeOverlay,
    useOverlayEffect,
    renderCard
} from '../../utils/blogUtils';

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get('slug');
  const cardRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const expandedIdx = getExpandedIdx(slug);

  // overlay effect imported from utils
  useOverlayEffect(location, expandedIdx, setSearchParams);

  // toggle handler
  const handleToggleFn = (idx) => handleToggle(navigate, expandedIdx, idx);


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
            : renderCard(blog, idx, expandedIdx, cardRefs, handleToggleFn);
        })}
      </div>
      {expandedIdx !== -1 &&
        ReactDOM.createPortal(
          <Overlay
            className="blog-overlay-bg"
            onClose={() => closeOverlay(setSearchParams)}
          >
            {renderCard(blogs[expandedIdx], expandedIdx, expandedIdx, cardRefs, handleToggleFn, true)}
          </Overlay>,
          document.body
        )
      }
    </section>
  );
};
