import React from 'react';
import slugify from "slugify";
import blogs from "./blogData";
import { Button } from "react-bootstrap";

// Get expanded index from slug
export function getExpandedIdx(slug) {
    return blogs.findIndex(
        blog => slugify(blog.title, { lower: true, strict: true }) === slug
    );
}

// get slug from title
export function getSlug(title) {
    return slugify(title, { lower: true, strict: true });
}

// handle expand/collapse navigation
export function handleToggle(navigate, expandedIdx, idx) {
    if (expandedIdx === idx) {
        // If already expanded, clicking "Show less" should return to root
        navigate('/', { replace: false });
    } else {
        // Otherwise, navigate to show the overlay
        const slug = getSlug(blogs[idx].title);
        navigate(`/blogs?slug=${slug}`, { replace: false });
    }
};

// close overlay
export const closeOverlay = (setSearchParams) => {
    setSearchParams({});
};

// overlay effect logic
export function useOverlayEffect(locatin, expandedIdx, setSearchParams) {
    React.useEffect(() => {
        const currentSlug = new URLSearchParams(location.search).get('slug');
        if (!currentSlug && expandedIdx !== -1) {
            closeOverlay(setSearchParams);
        }


    }, [location, expandedIdx, setSearchParams]);
}

// render blog card
export function renderCard(blog, idx, expandedIdx, cardRefs, handleToggle, isOverlay = false) {
    return (
        <section
            aria-labelledby={`blog-${idx}`}
            ref={el => {
                if (!cardRefs.current) cardRefs.current =[];
                    cardRefs.current[idx] = el;
                }}
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
                </div>
            </article>
        </section>
    );
}