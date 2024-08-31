import React, { useState, useEffect } from 'react';

const FrasesAleatoria = () => {
  const frases = [
   "It always seems impossible until it's done (Nelson Mandela)",
  "Motivation is what gets you started. Habit is what keeps you going (Jim Ryun)",
  "There is no substitute for hard work (Thomas Edison)",
  "Your talents and skills will improve over time, but you have to start (Martin Luther King)",
  "Perseverance can turn failure into an extraordinary achievement (Matt Biondi)",
  "Energy and persistence conquer all things (Benjamin Franklin)",
  "Never give up! Failure and rejection are only the first step towards success (Jim Valvano)",
  "It does not matter how slowly you go as long as you do not stop (Confucius)",
  "You may encounter defeats, but you must not be defeated (Maya Angelou)",
  "80% of success is simply showing up (Woody Allen)",
  "I’ve always believed that if you put in the work, the results will come eventually (Michael Jordan)",
  "Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength (Arnold Schwarzenegger)",
  "Strength does not come from physical capacity. It comes from an indomitable will (Mahatma Gandhi)",
  "You can always be better (Tiger Woods)",
  "The highest education is that which does not merely give us information but makes our life in harmony with all existence (Mahatma Gandhi)",
  "Put all your efforts in, even when the odds are against you (Arnold Palmer)",
  "The best way to predict the future is to create it (Peter Drucker)",
  "Push yourself to the limit. What you plant today will bear fruit tomorrow (Og Mandino)",
  "Don’t let what you cannot do interfere with what you can do (John R. Wooden)",
  "Quality is never an accident; it is always the result of intelligent effort (John Ruskin)",
  "The wonderful thing about learning something is that no one can take it away from you (B. B. King)",
  "The man who is prepared has half won the battle (Miguel de Cervantes)",
  "Success depends on effort (Sophocles)",
  "Make each day a masterpiece (John Wooden)",
  "Don’t watch the clock; do what it does. Keep going (Sam Levenson)",
  "We all know something. We all ignore something. That’s why we always learn (Paulo Freire)",
  "Ask yourself if what you’re doing today is getting you closer to where you want to be tomorrow (Walt Disney)",
  "You have power over your mind, not outside events. Realize this, and you will find strength (Marcus Aurelius)"
  ];

  const [fraseActual, setFraseActual] = useState("");

  useEffect(() => {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    setFraseActual(frases[indiceAleatorio]);
  }, []);

  return (
    <div >
      <h3 style={{ textAlign: 'center', fontStyle: 'italic' }}>{fraseActual}</h3>
    </div>
  );
};

export default FrasesAleatoria;