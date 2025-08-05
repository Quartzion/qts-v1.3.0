import React from 'react';

import ConnectWithUs from '../ConnectWithUs';
export default function Services() {
    return (
        <section className="services-section" role="region" aria-label="Services">
            <header className="services-header">
                <h1>Services</h1>
            </header>
            <section className="services-content">
                <article className="service-card">
                    <picture>
                        <source srcSet='./Services_1.webp' type='image/webp'/>
                        <img 
                            src='./Services_1.jpg' 
                            alt='stock photo for technical analysis' 
                            className="service-image" 
                            loading='lazy'
                        />
                    </picture>
                    <div className="service-card-content">
                    <h2>Technical Analysis</h2>
                    <p>Submit your follow-up request below to learn more</p>
                    </div>
                </article>
                <article className="service-card">
                    <picture>
                        <source srcSet='./Services_2.webp' type='image/webp'/>
                        <img 
                            src='./Services_2.jpg' 
                            alt='stock photo for troubleshooting' 
                            className="service-image"
                            loading='lazy'
                        />
                    </picture>
                    <div className="service-card-content">
                    <h2>Troubleshooting Session</h2>
                    <p>Submit your follow-up request below to learn more</p>
                    </div>
                </article>
                <article className="service-card">
                    <picture>
                        <source srcSet='./Services_3.webp' type='image/webp'/>
                        <img 
                            src='./Services_3.jpg' 
                            alt='stock photo for solution development' 
                            className="service-image" 
                            loading='lazy'
                        />
                    </picture>
                    <div className="service-card-content">
                        <h2>Solution Development</h2>
                        <p>Submit your follow-up request below to learn more</p>
                    </div>
                </article>
            </section>
            <ConnectWithUs />
        </section>

    );
};