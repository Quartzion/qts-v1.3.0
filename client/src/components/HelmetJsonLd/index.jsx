import React from 'react';
import { Helmet } from 'react-helmet';
import slugify from 'slugify';
import blogs from '../../utils/blogData';
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function HelmetJsonLd() {

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "Quartzion.com",
                "url": baseUrl,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${baseUrl}/?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            ...blogs.map(blog => ({
                "@type": "BlogPosting",
                "headline": blog.title,
                "name": blog.title,
                "description": blog.description || blog.content.slice(0, 160),
                "author": {
                    "@type": "Person",
                    "name": "Peter Smith",
                    "url": `${baseUrl}/#peter-smith`,
                    "image": `${baseUrl}/pete-ceo-2.webp`
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Quartzion Technology Solutions Corp.",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${baseUrl}/qts-icon-2.webp`
                    }
                },
                "articleSection": "Technology",
                "articleBody": blog.content.replace(/[\u2028\u2029]/g, ""),
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/blogs?slug=${slugify(blog.title, { lower: true, strict: true })}`
                },
                "inLanguage": "en-US",
                "keywords": "technology, nonprofit, innovation, Quartzion, community, development, 501c3",
                "datePublished": blog.date || "2025-07-01T14:00:00-04:00",
                "url": `${baseUrl}/blogs?slug=${slugify(blog.title, { lower: true, strict: true })}`,
                "image": `${baseUrl}${blog.img.replace(/^\./, '')}`,
                "wordCount": blog.content.split(/\s+/).length
            }))
        ]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

