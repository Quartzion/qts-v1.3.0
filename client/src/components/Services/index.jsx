import React from 'react';
import { useRef } from "react";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import ReactDOM from "react-dom";
import Overlay from "../Overlay";
import qtsServices from '../../utils/servicesData';
import {
    getExpandedIdx,
    handleToggle,
    closeOverlay,
    useOverlayEffect,
    renderCard
} from '../../utils/blogUtils';

export default function Services() {

    const [searchParams, setSearchParams] = useSearchParams();
    const slug = searchParams.get('slug');
    const cardRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    
    const expandedIdx = getExpandedIdx(qtsServices, slug);

    // overlay effect imported from utils
    useOverlayEffect(location, expandedIdx, setSearchParams);
      
    // toggle handler
    const handleToggleFn = (idx) => handleToggle(qtsServices, navigate, expandedIdx, idx, "services");

    return (
        <section className="services-section" role="region" aria-label="Services">
            <header className="services-header">
                <h1 id="services">Services</h1>
            </header>
            <section className="services-content">
                
                {qtsServices.map((service, idx) => {

                    const isExpanded = expandedIdx === idx;
                    return expandedIdx !== -1 & isExpanded 
                    ? (
                        <div key={idx} style={{visibility: "hidden", height: 0}} />
                    )
                    : renderCard (service, idx, expandedIdx, cardRefs, handleToggleFn, false, "service");
                    })}
            </section> 
            {expandedIdx !== -1 && 
                ReactDOM.createPortal(
                    <Overlay
                        className="card-overlay-bg"
                        onClose={() => closeOverlay(searchParams)}
                    >
                        {renderCard(qtsServices[expandedIdx], expandedIdx, expandedIdx, cardRefs, handleToggleFn, true)}
                    </Overlay>,
                    document.body
                )}
        </section>
    );
};