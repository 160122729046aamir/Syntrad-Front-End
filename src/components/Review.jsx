import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Wayne W.',
    title: 'Surround sound speakers buzzing',
    review:
      'He knows his stuff as he is taking my old one away and bringing me a refurb at a good price.',
    stars: 5,
    image: 'https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg',
  },
  {
    id: 2,
    name: 'Karen B.',
    title: 'Treadmill service',
    review:
      'Carried out a service. Fixed the sound and belt. Great communication and price. Good advice given for future maintenance.',
    stars: 5,
    image: 'https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg',
  },
  {
    id: 3,
    name: 'Netsai R.',
    title: 'Electrician',
    review:
      'He has done a good job .He explained everything he was going to do .Happy customer. Will recommend',
    stars: 5,
    image: 'https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg',
  },
  {
    id: 4,
    name: 'Marnela C.',
    title: 'We have a blocked grinder on a Delonghi Eletta.',
    review:
      'Our issue for call out was successfully resolved within minutes of his arrival and ended up servicing the machine with the available time. He communicated when was he was caught in traffic.',
    stars: 5,
    image: 'https://i.pinimg.com/736x/99/d0/7f/99d07f72ea74f29fe21833964704cdc9.jpg',
  },
];

export default function ReviewCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? reviews.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + visibleCount >= reviews.length ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-black min-h-fit flex flex-col justify-center items-center text-white px-4 py-10">
      <h2 className="text-2xl font-bold mb-8 text-center text-white uppercase tracking-wide">
        Stories of Success
      </h2>

      <div className="flex items-center gap-4 max-w-6xl w-full">
        <button onClick={handlePrev}>
          <ChevronLeft className="text-red-500 hover:text-white w-8 h-8" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          {reviews
            .slice(startIndex, startIndex + visibleCount)
            .map(({ id, name, title, review, stars, image }) => (
              <div
                key={id}
                className="bg-[#1a1a1a] p-6 rounded-xl border border-red-600 shadow-lg flex flex-col"
              >
                <div className="flex items-center mb-4 gap-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 rounded-full border-2 border-red-500"
                  />
                  <div>
                    <p className="text-red-400 font-semibold">{name}</p>
                    <p className="text-sm text-gray-400">{title}</p>
                  </div>
                </div>
                <div className="flex text-red-500 mb-2">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-200 text-sm flex-1">{review}</p>
              </div>
            ))}
        </div>

        <button onClick={handleNext}>
          <ChevronRight className="text-red-500 hover:text-white w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
