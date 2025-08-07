import React from 'react';
import qtsServices from '../../utils/servicesData';

export default function Services() {
    return (
        <section className="services-section" role="region" aria-label="Services">
            <header className="services-header">
                <h1>Services</h1>
            </header>
            <section className="services-content">
                
                {qtsServices.map((service, idx) => (
                    <article className='service-card' key={idx}>
                        <picture>
                            <source srcSet={service.image.webp}/>
                            <img 
                                src={service.image.jpg}
                                alt={`stock photo for ${service.title}`}
                                className='service-image'
                                loading='lazy'
                            />
                        </picture>
                        <div className='service-card-content'>
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </div>
                    </article>
                ))}
                
            </section> 
        </section>
    );
};