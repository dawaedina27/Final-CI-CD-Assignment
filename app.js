const express = require('express');
const path = require('path');

const app = express();

// serve the static file (html)

app.use(express.static(path.join(__dirname, 'public')));

// explicit root route in case static serving is bypassed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/greet', (req, res) => {
  const rawName = req.query.name || 'Guest';
  const tone = (req.query.tone || 'friendly').toString();
  const language = (req.query.language || 'en').toString();
  const useTime = req.query.time === '1' || req.query.time === 'true';
  const useEmoji = req.query.emoji === '1' || req.query.emoji === 'true';

  const name = rawName
    .toString()
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, 60) || 'Guest';

  const GREETINGS = {
    en: {
      base: 'Hello',
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      evening: 'Good evening',
      night: 'Good night'
    },
    es: {
      base: 'Hola',
      morning: 'Buenos días',
      afternoon: 'Buenas tardes',
      evening: 'Buenas tardes',
      night: 'Buenas noches'
    },
    fr: {
      base: 'Bonjour',
      morning: 'Bonjour',
      afternoon: 'Bon après-midi',
      evening: 'Bonsoir',
      night: 'Bonne nuit'
    },
    sw: {
      base: 'Habari',
      morning: 'Habari za asubuhi',
      afternoon: 'Habari za mchana',
      evening: 'Habari za jioni',
      night: 'Lala salama'
    },
    de: {
      base: 'Hallo',
      morning: 'Guten Morgen',
      afternoon: 'Guten Tag',
      evening: 'Guten Abend',
      night: 'Gute Nacht'
    }
  };

  const TONE_SUFFIXES = {
    friendly: 'Great to see you!',
    professional: 'How may I assist you today?',
    playful: "Let's make today fun!",
    grateful: 'Thanks for stopping by!'
  };

  const EMOJIS = {
    friendly: ['😊', '👋', '🌟'],
    professional: ['🤝', '🧭', '📌'],
    playful: ['🎉', '😄', '✨'],
    grateful: ['🙏', '💛', '🌻'],
    default: ['🙂', '👋', '✨']
  };

  const now = new Date();
  const hour = now.getHours();
  const timeKey = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 21 ? 'evening' : 'night';
  const greetingSet = GREETINGS[language] || GREETINGS.en;
  const opener = useTime ? greetingSet[timeKey] : greetingSet.base;
  const suffix = TONE_SUFFIXES[tone] || TONE_SUFFIXES.friendly;

  let message = `${opener}, ${name}! ${suffix}`;

  if (useEmoji) {
    const pool = EMOJIS[tone] || EMOJIS.default;
    const emoji = pool[Math.floor(Math.random() * pool.length)];
    message = `${message} ${emoji}`;
  }

  res.json({
    message,
    meta: {
      timeKey,
      tone,
      language
    }
  });
});

module.exports = app;
