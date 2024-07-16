import React, { useEffect, useState } from 'react';
import chatting from '../../assets/Chatting.jpg'
import therapy from '../../assets/therapy.png'
import search from '../../assets/search.png'

const AutoSlidingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    search,
    chatting,
    therapy,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2500); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden h-96">
      <div className="carousel-inner relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-transform ease-in-out duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
          >
            <div className="flex justify-center items-center h-full">
              <img 
                src={slide} 
                className="h-full object-center object-cover mx-auto" 
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlidingCarousel;
