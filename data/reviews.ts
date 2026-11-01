// Real Google reviews only, copied verbatim from the Google Business Profile.
// Add new ones as they come in; never edit wording or invent reviews.
export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO date the review was posted
  text: string;
  source: 'Google';
};

export const REVIEWS: Review[] = [
  {
    author: 'Homeowner, Central Florida',
    rating: 5,
    date: '2026-10-31',
    text: 'They made what seemed like a monumental task feel so easy, from beginning to end. Very professional, honest, and easy to communicate with. Instead of just telling us there was a problem, he would say, ‘There’s a problem, and this is what we’re going to do to fix it.’ That’s exactly what a homeowner wants to hear, especially when you live on the other side of the country and can’t be there in person.',
    source: 'Google',
  },
  {
    author: 'Cris Karabin',
    rating: 5,
    date: '2026-09-28',
    text: 'Daniel’s work was beyond amazing. Him and his crew came on time, gave a great quote, and took care of everything based on an AI picture I made! They blew it out of the park, definitely worth the money, and the 5 stars.',
    source: 'Google',
  },
  {
    author: 'Armando',
    rating: 5,
    date: '2026-09-25',
    text: 'Daniel is very talented professional, with attention to details and always finds solutions and alternatives when needed. Very competitive price. Strongly recommended.',
    source: 'Google',
  },
];
