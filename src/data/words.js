/**
 * NEXUS // WORD DECRYPTION
 * Mission Intelligence Database
 * Segregated into SIMPLE (EASY), MEDIUM, and HARD tiers.
 */

export const DIFFICULTY_TIERS = {
  EASY: {
    label: 'SIMPLE',
    color: '#00ff88',
    multiplier: 1.0,
    maxFailures: 6,
    bonus: 500,
    desc: 'Foundational technology & computing essentials'
  },
  MEDIUM: {
    label: 'MEDIUM',
    color: '#ffb800',
    multiplier: 1.5,
    maxFailures: 6,
    bonus: 750,
    desc: 'Cyber systems, architecture & operational protocol'
  },
  HARD: {
    label: 'HARD',
    color: '#ff0055',
    multiplier: 2.0,
    maxFailures: 5,
    bonus: 1000,
    desc: 'Advanced cryptography, exploits & stealth warfare'
  }
};

export const MISSION_WORDS = [
  // =========================================================================
  // 🟢 TIER 1: SIMPLE (EASY) - 5 QUESTIONS
  // =========================================================================
  {
    id: 'NX-PY',
    word: 'PYTHON',
    category: 'PROGRAMMING',
    difficulty: 'EASY',
    primaryClue: 'A high-level language widely used for artificial intelligence, automation, and backend development.',
    hint1: 'It was named by its creator after the British comedy troupe Monty Python.',
    hint2: 'Its mascot and logo feature two stylized serpents.'
  },
  {
    id: 'NX-FT',
    word: 'FUTURE',
    category: 'CONCEPT & TECH',
    difficulty: 'EASY',
    primaryClue: 'The prospective chronological period projected to unfold beyond the present reality.',
    hint1: 'Envisioned in speculative fiction as dystopian, utopian, or cybernetically augmented.',
    hint2: 'The forward temporal direction opposite to past history.'
  },
  {
    id: 'NX-CD',
    word: 'CODING',
    category: 'DEVELOPMENT',
    difficulty: 'EASY',
    primaryClue: 'The fundamental craft of writing syntactic instructions executed by computational hardware.',
    hint1: 'Commonly known as software engineering, computer programming, or scripting.',
    hint2: 'Translates algorithmic logic and human intent into machine-readable syntax.'
  },
  {
    id: 'NX-SR',
    word: 'SERVER',
    category: 'INFRASTRUCTURE',
    difficulty: 'EASY',
    primaryClue: 'A central computer hardware or software system that delivers data services to client machines.',
    hint1: 'Housed in climate-controlled data centers stacked on metal equipment racks.',
    hint2: 'Pairs with client applications in fundamental web architectures.'
  },
  {
    id: 'NX-RT',
    word: 'ROUTER',
    category: 'NETWORKING',
    difficulty: 'EASY',
    primaryClue: 'A physical networking hardware device that directs data packets between disparate networks.',
    hint1: 'Finds the optimal path for data traveling across local networks and the Internet.',
    hint2: 'In your home, it connects your devices to the internet via Wi-Fi or Ethernet.'
  },

  // =========================================================================
  // 🟡 TIER 2: MEDIUM - 5 QUESTIONS
  // =========================================================================
  {
    id: 'NX-CB',
    word: 'CYBER',
    category: 'SECURITY & NETWORK',
    difficulty: 'MEDIUM',
    primaryClue: 'A foundational prefix relating to computer networks, digital systems, and virtual environments.',
    hint1: 'Derived from the Greek word "kybernetes", meaning steersman, governor, or pilot.',
    hint2: 'Frequently combined with warfare, space, punk, or defense.'
  },
  {
    id: 'NX-MX',
    word: 'MATRIX',
    category: 'SCI-FI & COMPUTING',
    difficulty: 'MEDIUM',
    primaryClue: 'A rectangular arrangement of numbers in rows and columns, or a vast simulated neural reality.',
    hint1: 'Popularized in 1999 as a dystopian simulation masking artificial intelligence rule.',
    hint2: 'Famously characterized by a choice between a blue pill and a red pill.'
  },
  {
    id: 'NX-PK',
    word: 'PACKET',
    category: 'TELECOMMUNICATIONS',
    difficulty: 'MEDIUM',
    primaryClue: 'A discrete unit of formatted data routed between an origin and destination across the Internet.',
    hint1: 'Encapsulates a header with source and destination IP addresses alongside payload data.',
    hint2: 'Deep inspection of this unit is conducted by network firewalls and intrusion sensors.'
  },
  {
    id: 'NX-TR',
    word: 'TROJAN',
    category: 'MALWARE INTEL',
    difficulty: 'MEDIUM',
    primaryClue: 'Malicious software disguised as legitimate utilities that secretly compromises system defenses.',
    hint1: 'Named after an ancient wooden horse deceptive warfare tactic described in classical lore.',
    hint2: 'Often creates covert backdoors for unauthorized remote operator access.'
  },
  {
    id: 'NX-KN',
    word: 'KERNEL',
    category: 'OPERATING SYSTEMS',
    difficulty: 'MEDIUM',
    primaryClue: 'The core foundational component of an OS with complete memory and hardware control.',
    hint1: 'Bridges user-space applications with physical CPU and peripheral processing.',
    hint2: 'Monolithic and micro variants form the low-level architecture of Linux and Unix.'
  },

  // =========================================================================
  // 🔴 TIER 3: HARD - 5 QUESTIONS
  // =========================================================================
  {
    id: 'NX-CP',
    word: 'CIPHER',
    category: 'CRYPTOGRAPHY',
    difficulty: 'HARD',
    primaryClue: 'An algorithmic mathematical function used for performing encryption or decryption on plaintext.',
    hint1: 'Caesar used a classical rotational version of this method to protect military communications.',
    hint2: 'Block and stream variants form the bedrock of modern symmetric security.'
  },
  {
    id: 'NX-QM',
    word: 'QUANTUM',
    category: 'NEXT-GEN COMPUTING',
    difficulty: 'HARD',
    primaryClue: 'A computational paradigm harnessing superposition and entanglement to break classical cryptosystems.',
    hint1: 'Utilizes subatomic qubits instead of standard binary one-and-zero bits.',
    hint2: 'Algorithms like Shor\'s threaten standard RSA encryption keys on this architecture.'
  },
  {
    id: 'NX-XP',
    word: 'EXPLOIT',
    category: 'CYBER THREATS',
    difficulty: 'HARD',
    primaryClue: 'A specialized sequence of commands or payload taking advantage of software vulnerability bugs.',
    hint1: 'Zero-day varieties are weaponized before vendor patches or security advisories exist.',
    hint2: 'Frequently deployed inside automated penetration testing frameworks.'
  },
  {
    id: 'NX-RK',
    word: 'ROOTKIT',
    category: 'STEALTH MALWARE',
    difficulty: 'HARD',
    primaryClue: 'A clandestine collection of stealth software designed to maintain privileged access while evading detection.',
    hint1: 'Hooks deep into operating system API calls to hide processes from task managers.',
    hint2: 'Often requires low-level firmware or bootloader inspection to eradicate.'
  },
  {
    id: 'NX-FW',
    word: 'FIREWALL',
    category: 'NETWORK DEFENSE',
    difficulty: 'HARD',
    primaryClue: 'A network security perimeter barrier monitoring and filtering incoming and outgoing traffic rules.',
    hint1: 'Can operate as stateful inspection hardware or host-based software packet filters.',
    hint2: 'Derives its name from physical architectural barriers designed to prevent fire spread.'
  }
];

export const getWordsByDifficulty = (difficulty) => {
  if (!difficulty || difficulty === 'ALL') {
    return MISSION_WORDS;
  }
  return MISSION_WORDS.filter(w => w.difficulty === difficulty);
};

export const getRandomWord = (difficulty = 'ALL', excludeWords = []) => {
  const pool = getWordsByDifficulty(difficulty);
  const available = pool.filter(w => !excludeWords.includes(w.word));
  const finalPool = available.length > 0 ? available : pool;
  const index = Math.floor(Math.random() * finalPool.length);
  return finalPool[index];
};

export const getRankByScore = (totalCompleted) => {
  if (totalCompleted >= 12) return { rank: 'NEXUS ARCHITECT', level: 4, badgeColor: '#c084fc' };
  if (totalCompleted >= 7) return { rank: 'ELITE OPERATOR', level: 3, badgeColor: '#ff0055' };
  if (totalCompleted >= 3) return { rank: 'CYBER SPECIALIST', level: 2, badgeColor: '#ffb800' };
  return { rank: 'CADET OPERATOR', level: 1, badgeColor: '#00ff88' };
};
