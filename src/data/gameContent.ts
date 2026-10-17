import { DetectiveQuestion, SentenceQuestion, StructureReview, VocabRound, ReviewMasterChallenge } from '../types/game';

// -------------------------------------------------------------
// LEVEL 1: REVIEW DETECTIVE (10 Questions)
// Identifying the most engaging review hook / introduction
// (Rhetorical Questions, Relatable Problem Statements, Vivid Intriguing Openers)
// -------------------------------------------------------------
export const LEVEL_1_QUESTIONS: DetectiveQuestion[] = [
  {
    id: 'l1-q1',
    topic: 'Cinema / Sci-Fi Blockbuster',
    hookType: 'Rhetorical Question',
    pedagogicalTip: 'A rhetorical question immediately engages the reader by making them imagine a scenario or reflect on their personal taste.',
    options: [
      {
        text: 'Have you ever wondered what would happen if humanity had only 48 hours left to prevent total cosmic extinction?',
        isCorrect: true,
        explanation: 'Hook: Rhetorical question. Grabs reader attention instantly by setting up an intriguing high-stakes premise!'
      },
      {
        text: 'I watched this science fiction film at the mall yesterday with my classmates.',
        isCorrect: false,
        explanation: 'Too mundane and personal. Does not hook the reader or build suspense about the film itself.'
      },
      {
        text: 'In this essay, I will review the movie called Chrono Warp directed by John Smith.',
        isCorrect: false,
        explanation: 'Too formal and essay-like. Avoid announcing "In this essay I will review..." in an informal or semi-formal review.'
      },
      {
        text: 'The film duration is 120 minutes and the cinema hall was quite cold.',
        isCorrect: false,
        explanation: 'Irrelevant detail. Focus on the core excitement or theme of the movie in your introduction.'
      }
    ]
  },
  {
    id: 'l1-q2',
    topic: 'Food / Cozy Neighborhood Cafe',
    hookType: 'Problem Statement',
    pedagogicalTip: 'Starting with a relatable problem connects with readers seeking solutions, such as finding a quiet study sanctuary with quality coffee.',
    options: [
      {
        text: 'Finding a serene sanctuary with artisanal coffee and reliable Wi-Fi in the heart of Kuala Lumpur feels next to impossible.',
        isCorrect: true,
        explanation: 'Relatable Problem Statement: Establishes a common urban struggle and hints at the cafe being the ultimate hidden gem.'
      },
      {
        text: 'I like coffee and my mother also likes drinking coffee in the afternoon.',
        isCorrect: false,
        explanation: 'Too simplistic (A1-A2 level). Lacks descriptive vocabulary and purpose for the review.'
      },
      {
        text: 'There is a cafe near my house that sells drinks and some pastries.',
        isCorrect: false,
        explanation: 'Bland and uninspired. Gives no compelling reason for the reader to continue reading.'
      },
      {
        text: 'Last Saturday, my friends and I were feeling hungry so we walked to a cafe.',
        isCorrect: false,
        explanation: 'Pure narrative recount rather than an engaging review introduction.'
      }
    ]
  },
  {
    id: 'l1-q3',
    topic: 'Technology / Budget Noise-Cancelling Headphones',
    hookType: 'Intriguing Opening',
    pedagogicalTip: 'An intriguing, bold claim challenges standard assumptions (e.g. premium features at a budget price).',
    options: [
      {
        text: 'Premium active noise cancellation usually comes with an eye-watering price tag, but the SonicPro 400 boldly defies that rule.',
        isCorrect: true,
        explanation: 'Intriguing Contrast: Sets up an exciting contrast between high-end features and an accessible price point.'
      },
      {
        text: 'I bought some new black headphones on an online shopping platform last Tuesday.',
        isCorrect: false,
        explanation: 'Bland factual narrative without any engaging evaluation or product appeal.'
      },
      {
        text: 'Headphones are devices people use to listen to music and watch videos.',
        isCorrect: false,
        explanation: 'Dictionary-style definition. The reader already knows what headphones are!'
      },
      {
        text: 'This is my first review about tech gadgets for my school English magazine.',
        isCorrect: false,
        explanation: 'Unnecessary meta-commentary. Jump straight into the subject to hook the audience.'
      }
    ]
  },
  {
    id: 'l1-q4',
    topic: 'Travel / Rainforest Eco-Resort',
    hookType: 'Vivid Sensory Hook',
    pedagogicalTip: 'Sensory imagery transports the reader straight into the destination atmosphere.',
    options: [
      {
        text: 'Imagine waking up to the gentle chorus of hornbills and the crisp, misty aroma of a prehistoric tropical rainforest.',
        isCorrect: true,
        explanation: 'Vivid Sensory Hook: Uses evocative imagery ("gentle chorus of hornbills", "crisp, misty aroma") to immediately immerse the reader.'
      },
      {
        text: 'I will write about a resort that is located in Pahang, Malaysia.',
        isCorrect: false,
        explanation: 'Robotic and formulaic. Does not paint any appealing picture of the destination.'
      },
      {
        text: 'My family packed four suitcases and we drove for three hours on the highway.',
        isCorrect: false,
        explanation: 'Irrelevant travel itinerary detail. Focus on what makes the resort memorable.'
      },
      {
        text: 'Hotels are places where tourists sleep when they are on vacation.',
        isCorrect: false,
        explanation: 'Stating the obvious. Never waste your opening sentence on generic definitions.'
      }
    ]
  },
  {
    id: 'l1-q5',
    topic: 'Books / Psychological Thriller',
    hookType: 'Rhetorical Question',
    pedagogicalTip: 'In book reviews, questioning the reliability of characters or human instincts generates instant suspense.',
    options: [
      {
        text: 'Can you ever truly trust someone who claims they cannot remember the most fateful night of their life?',
        isCorrect: true,
        explanation: 'Suspenseful Rhetorical Question: Hooks the reader by challenging trust and human memory, perfectly matching a psychological mystery.'
      },
      {
        text: 'This book has 350 pages and is written by an author named Sarah Jenkins.',
        isCorrect: false,
        explanation: 'Dry catalog information that belongs in a library database, not a lively review.'
      },
      {
        text: 'I had to read a book because my English teacher asked everyone to do so.',
        isCorrect: false,
        explanation: 'Shows negative reluctant attitude. A review should sound enthusiastic and genuine.'
      },
      {
        text: 'The cover of the book is blue and it has picture of a house.',
        isCorrect: false,
        explanation: 'Superficial physical description with basic grammar; fails to arouse literary interest.'
      }
    ]
  },
  {
    id: 'l1-q6',
    topic: 'Food / Street Food Hawker Stall',
    hookType: 'Vivid Sensory Hook',
    pedagogicalTip: 'Food reviews thrive on evocative adjectives detailing aroma, sizzling sounds, and authentic street energy.',
    options: [
      {
        text: 'Follow the intoxicating aroma of charred garlic and sizzling woks down Petaling Street, and you will discover Uncle Lim\'s legendary Char Kway Teow.',
        isCorrect: true,
        explanation: 'Sensory & Atmospheric: Sets an alluring scene with rich sensory language ("intoxicating aroma", "sizzling woks").'
      },
      {
        text: 'There is a stall selling fried noodles on the side of the road.',
        isCorrect: false,
        explanation: 'Extremely plain; misses the vibrant culinary soul of Malaysian street food.'
      },
      {
        text: 'Noodles are made of flour and usually fried in oil with sauce.',
        isCorrect: false,
        explanation: 'Definition trap! The reader already knows what noodles are.'
      },
      {
        text: 'I was very hungry so I stopped to eat something cheap.',
        isCorrect: false,
        explanation: 'Focuses merely on personal hunger rather than the charm of the eatery.'
      }
    ]
  },
  {
    id: 'l1-q7',
    topic: 'Gaming / Open-World Adventure Game',
    hookType: 'Problem Statement',
    pedagogicalTip: 'Highlighting fatigue with clichéd video games makes your praise of a fresh title much more impactful.',
    options: [
      {
        text: 'In an era overcrowded with copy-paste open-world games, Elden Odyssey arrives as a breathtaking breath of fresh air.',
        isCorrect: true,
        explanation: 'Sharp Problem/Critique Hook: Contrasts generic industry tropes with the standout originality of this game.'
      },
      {
        text: 'I play video games on my computer when I have finished my homework.',
        isCorrect: false,
        explanation: 'Personal routine recount that contributes zero value to the gaming review.'
      },
      {
        text: 'This game requires a graphics card and 16 gigabytes of RAM to install.',
        isCorrect: false,
        explanation: 'Raw technical system specs belong in a footnotes box, not the opening paragraph.'
      },
      {
        text: 'There are many characters in this game and you can press buttons to jump.',
        isCorrect: false,
        explanation: 'Childish and simplistic language below B1/B2 standard.'
      }
    ]
  },
  {
    id: 'l1-q8',
    topic: 'Entertainment / Mystery Escape Room',
    hookType: 'Rhetorical Question',
    pedagogicalTip: 'Adrenaline-pumping rhetorical questions test the reader\'s courage and problem-solving spirit.',
    options: [
      {
        text: 'Do you have the nerve to decipher cryptic hieroglyphs while a countdown timer mercilessly ticks away your final seconds?',
        isCorrect: true,
        explanation: 'Thrilling Rhetorical Hook: Conveys urgency, adrenaline, and mystery with strong verbs ("decipher", "ticks away").'
      },
      {
        text: 'An escape room is a room where people get locked in and try to get out.',
        isCorrect: false,
        explanation: 'Stiff and boring explanation rather than an invitation to excitement.'
      },
      {
        text: 'Last weekend I visited an escape room with four of my cousins.',
        isCorrect: false,
        explanation: 'Weak conversational diary entry.'
      },
      {
        text: 'The price for admission was forty ringgit per person.',
        isCorrect: false,
        explanation: 'Pricing should be woven into the body evaluation or recommendation, not lead the introduction.'
      }
    ]
  },
  {
    id: 'l1-q9',
    topic: 'App / Language Learning Mobile Application',
    hookType: 'Problem Statement',
    pedagogicalTip: 'Framing the universal dread of rote memorization makes gamified learning look enticing.',
    options: [
      {
        text: 'For most teenagers, learning a new language conjures up nightmares of mind-numbing grammar drills and endless vocabulary lists.',
        isCorrect: true,
        explanation: 'Relatable Frustration: Validates the reader\'s pain point before introducing the app as a refreshing antidote.'
      },
      {
        text: 'Smartphones have many apps that can be downloaded from app stores.',
        isCorrect: false,
        explanation: 'Generic common knowledge that fails to stimulate curiosity.'
      },
      {
        text: 'I downloaded this app on Monday because I want to learn French.',
        isCorrect: false,
        explanation: 'Flat personal statement lacking analytical depth.'
      },
      {
        text: 'Language learning is important for international communication.',
        isCorrect: false,
        explanation: 'Sounds like a formal argumentative essay topic sentence rather than an entertaining review hook.'
      }
    ]
  },
  {
    id: 'l1-q10',
    topic: 'Place / Extreme Theme Park Rollercoaster',
    hookType: 'Vivid Sensory Hook',
    pedagogicalTip: 'Putting the reader directly on the edge of the drop stimulates physical excitement.',
    options: [
      {
        text: 'Suspended ninety meters in the air with the ground spinning below, your heart pounds as gravity threatens to take over.',
        isCorrect: true,
        explanation: 'Visceral Sensory Hook: Places the reader on the rollercoaster precipice with heart-racing descriptive language.'
      },
      {
        text: 'Theme parks have rollercoasters and food stalls where people buy snacks.',
        isCorrect: false,
        explanation: 'Flat and uninspired description without emotional resonance.'
      },
      {
        text: 'I went to the theme park during the mid-term school holidays.',
        isCorrect: false,
        explanation: 'Ordinary chronological opening that sounds like a personal diary entry.'
      },
      {
        text: 'Rollercoasters are fast trains that travel on steel rails.',
        isCorrect: false,
        explanation: 'Mechanical definition that kills reader excitement.'
      }
    ]
  }
];

// -------------------------------------------------------------
// LEVEL 2: SENTENCE BUILDER (10 Questions)
// Grabbing and arranging floating words into idiomatic B1/B2 review sentences
// -------------------------------------------------------------
export const LEVEL_2_QUESTIONS: SentenceQuestion[] = [
  {
    id: 'l2-q1',
    topic: 'Cafe / Dining Review',
    category: 'Opinion & Reason',
    words: ['Without', 'doubt', 'this', 'cafe', 'exceeded', 'all', 'expectations', 'my', 'a', 'of', 'shadow'],
    correctOrder: ['Without', 'a', 'shadow', 'of', 'doubt', 'this', 'cafe', 'exceeded', 'all', 'my', 'expectations'],
    fullSentence: 'Without a shadow of doubt this cafe exceeded all my expectations.',
    tip: '"Without a shadow of doubt" is a stellar idiomatic phrase for expressing strong conviction!'
  },
  {
    id: 'l2-q2',
    topic: 'Resort / Scenery Review',
    category: 'Description',
    words: ['What', 'panoramic', 'was', 'the', 'struck', 'most', 'view', 'me', 'breathtaking'],
    correctOrder: ['What', 'struck', 'me', 'most', 'was', 'the', 'breathtaking', 'panoramic', 'view'],
    fullSentence: 'What struck me most was the breathtaking panoramic view.',
    tip: 'Using a pseudo-cleft sentence ("What struck me most was...") adds sophisticated emphasis in CEFR B2 writing.'
  },
  {
    id: 'l2-q3',
    topic: 'Movie / Film Review',
    category: 'Recommendation',
    words: ['If', 'is', 'a', 'film', 'you', 'are', 'fan', 'of', 'thrillers', 'this', 'must-watch', 'an', 'absolute'],
    correctOrder: ['If', 'you', 'are', 'a', 'fan', 'of', 'thrillers', 'this', 'film', 'is', 'an', 'absolute', 'must-watch'],
    fullSentence: 'If you are a fan of thrillers this film is an absolute must-watch.',
    tip: 'Targeting specific audience niches ("If you are a fan of...") is essential for SPM review recommendations.'
  },
  {
    id: 'l2-q4',
    topic: 'Tech / Gadget Review',
    category: 'Opinion & Reason',
    words: ['Despite', 'earbuds', 'its', 'hefty', 'the', 'price', 'tag', 'are', 'worth', 'every', 'penny'],
    correctOrder: ['Despite', 'its', 'hefty', 'price', 'tag', 'the', 'earbuds', 'are', 'worth', 'every', 'penny'],
    fullSentence: 'Despite its hefty price tag the earbuds are worth every penny.',
    tip: 'Using concession connectors like "Despite [noun phrase]" demonstrates balanced critical thinking.'
  },
  {
    id: 'l2-q5',
    topic: 'Restaurant / Critical Review',
    category: 'Opinion & Reason',
    words: ['To', 'my', 'utter', 'service', 'dismay', 'the', 'sluggish', 'was', 'food', 'lukewarm', 'and', 'the'],
    correctOrder: ['To', 'my', 'utter', 'dismay', 'the', 'service', 'was', 'sluggish', 'and', 'the', 'food', 'lukewarm'],
    fullSentence: 'To my utter dismay the service was sluggish and the food lukewarm.',
    tip: '"To my utter dismay" expresses polite dissatisfaction far better than simply saying "I was angry".'
  },
  {
    id: 'l2-q6',
    topic: 'Dining / Hospitality Review',
    category: 'Description',
    words: ['The', 'inviting', 'restaurant', 'ambiance', 'boasts', 'an', 'complemented', 'by', 'courteous', 'staff'],
    correctOrder: ['The', 'restaurant', 'boasts', 'an', 'inviting', 'ambiance', 'complemented', 'by', 'courteous', 'staff'],
    fullSentence: 'The restaurant boasts an inviting ambiance complemented by courteous staff.',
    tip: 'Verbs like "boasts" and past participle clauses ("complemented by...") elevate descriptive richness.'
  },
  {
    id: 'l2-q7',
    topic: 'Cinema / Action Film Review',
    category: 'Opinion & Reason',
    words: ['From', 'opening', 'the', 'very', 'scene', 'the', 'movie', 'kept', 'on', 'edge', 'seat', 'my', 'the', 'of', 'me'],
    correctOrder: ['From', 'the', 'very', 'opening', 'scene', 'the', 'movie', 'kept', 'me', 'on', 'the', 'edge', 'of', 'my', 'seat'],
    fullSentence: 'From the very opening scene the movie kept me on the edge of my seat.',
    tip: '"Kept me on the edge of my seat" is a high-scoring idiom for gripping plots and suspense.'
  },
  {
    id: 'l2-q8',
    topic: 'Travel Destination / Holiday Resort',
    category: 'Recommendation',
    words: ['Whether', 'budget', 'or', 'a', 'luxury', 'this', 'hotel', 'has', 'something', 'for', 'you', 'are', 'traveler', 'seeker', 'a', 'everyone'],
    correctOrder: ['Whether', 'you', 'are', 'a', 'budget', 'traveler', 'or', 'a', 'luxury', 'seeker', 'this', 'hotel', 'has', 'something', 'for', 'everyone'],
    fullSentence: 'Whether you are a budget traveler or a luxury seeker this hotel has something for everyone.',
    tip: '"Whether... or..." paired with "has something for everyone" produces an all-inclusive persuasive recommendation.'
  },
  {
    id: 'l2-q9',
    topic: 'Smart Gadget / Objective Critique',
    category: 'Opinion & Reason',
    words: ['One', 'major', 'drawback', 'worth', 'the', 'notoriously', 'noting', 'is', 'battery', 'life', 'short'],
    correctOrder: ['One', 'major', 'drawback', 'worth', 'noting', 'is', 'the', 'notoriously', 'short', 'battery', 'life'],
    fullSentence: 'One major drawback worth noting is the notoriously short battery life.',
    tip: 'Balanced reviews always include constructive criticism using phrases like "One major drawback worth noting is...".'
  },
  {
    id: 'l2-q10',
    topic: 'Book / Final Verdict',
    category: 'Recommendation',
    words: ['All', 'considered', 'I', 'would', 'wholeheartedly', 'novel', 'this', 'recommend', 'to', 'readers', 'things', 'avid'],
    correctOrder: ['All', 'things', 'considered', 'I', 'would', 'wholeheartedly', 'recommend', 'this', 'novel', 'to', 'avid', 'readers'],
    fullSentence: 'All things considered I would wholeheartedly recommend this novel to avid readers.',
    tip: '"All things considered" and "wholeheartedly recommend" form the quintessential review conclusion formula.'
  }
];

// -------------------------------------------------------------
// LEVEL 3: REVIEW STRUCTURE (10 Reviews)
// Mixed-up sentences that must be dragged into 4 structural sections:
// [Introduction], [Description], [Opinion & Reasons], [Recommendation]
// -------------------------------------------------------------
export const LEVEL_3_REVIEWS: StructureReview[] = [
  {
    id: 'l3-r1',
    title: 'The Rustic Kettle (Artisan Cafe)',
    category: 'Restaurant',
    items: [
      {
        id: 'l3-r1-intro',
        section: 'Introduction',
        text: 'Are you craving a warm cup of handcrafted brew away from the deafening city traffic? Tucked quietly behind Bangsar\'s bustling streets lies The Rustic Kettle.',
        hint: 'Hooks the reader with a rhetorical question and introduces the venue name and location.'
      },
      {
        id: 'l3-r1-desc',
        section: 'Description',
        text: 'The cafe is adorned with exposed red-brick walls, lush indoor ferns, and an open bar counter where baristas roast Colombian beans in plain view.',
        hint: 'Paints a factual sensory picture of decor, layout, and setting.'
      },
      {
        id: 'l3-r1-opin',
        section: 'Opinion',
        text: 'Their signature salted caramel latte had a silky texture and balanced sweetness, although the blueberry cheesecake was slightly on the dry side.',
        hint: 'Evaluates taste and quality with specific pros and cons.'
      },
      {
        id: 'l3-r1-recom',
        section: 'Recommendation',
        text: 'I would rate it four out of five stars and suggest visiting on weekday mornings when the atmosphere is ideal for unwinding with a novel.',
        hint: 'Gives star rating and advises who should visit and when.'
      }
    ],
    explanation: {
      Introduction: 'Starts with a rhetorical question hook and identifies the cafe.',
      Description: 'Paints the scene: brickwork, greenery, and coffee roasting counter.',
      Opinion: 'Critiques the latte and cheesecake with balanced feedback.',
      Recommendation: 'Supplies star rating and clear practical visiting advice.'
    }
  },
  {
    id: 'l3-r2',
    title: 'Galaxy Runner 2099 (Sci-Fi Film)',
    category: 'Movie',
    items: [
      {
        id: 'l3-r2-intro',
        section: 'Introduction',
        text: 'Could a cybernetic bounty hunter truly possess a conscience? Director Elena Vance tackles this profound dilemma in her latest cinematic masterpiece, Galaxy Runner 2099.',
        hint: 'Hook that presents the central theme and introduces movie title and director.'
      },
      {
        id: 'l3-r2-desc',
        section: 'Description',
        text: 'Set in a neon-drenched dystopian metropolis in the 22nd century, the plot follows Jax, a retired operative forced out of hiding by a mysterious transmission.',
        hint: 'Summarizes premise, setting, and main protagonist without spoilers.'
      },
      {
        id: 'l3-r2-opin',
        section: 'Opinion',
        text: 'The visual effects and heart-thumping orchestral soundtrack are nothing short of phenomenal, though the pacing drags noticeably during the second act.',
        hint: 'Weighs cinematic strengths against narrative weakness.'
      },
      {
        id: 'l3-r2-recom',
        section: 'Recommendation',
        text: 'Earning a solid four and a half stars, this is an unmissable spectacle on IMAX for enthusiasts of thought-provoking science fiction.',
        hint: 'States rating, recommended viewing format (IMAX), and target fan base.'
      }
    ],
    explanation: {
      Introduction: 'Presents the thematic hook and names the film/director.',
      Description: 'Outlines the dystopian backdrop and plot premise.',
      Opinion: 'Analyses the audio-visuals and narrative pacing.',
      Recommendation: 'Offers high rating and recommends the IMAX experience.'
    }
  },
  {
    id: 'l3-r3',
    title: 'AuraSound Aero 3 (Wireless Earbuds)',
    category: 'Gadget',
    items: [
      {
        id: 'l3-r3-intro',
        section: 'Introduction',
        text: 'If you are tired of tangled cables snapping during morning jogs, the newly launched AuraSound Aero 3 promises freedom without draining your wallet.',
        hint: 'Identifies common user frustration and announces the product name.'
      },
      {
        id: 'l3-r3-desc',
        section: 'Description',
        text: 'Weighing barely four grams per earpiece, the device features ergonomic silicone tips, IPX5 water resistance, and a compact matte-black pebble charging case.',
        hint: 'Lists concrete specifications, weight, build materials, and dimensions.'
      },
      {
        id: 'l3-r3-opin',
        section: 'Opinion',
        text: 'The bass response is surprisingly punchy and vocals remain crystal clear, but the companion touch gestures proved somewhat finicky when adjusting volume.',
        hint: 'Discusses audio performance alongside control responsiveness.'
      },
      {
        id: 'l3-r3-recom',
        section: 'Recommendation',
        text: 'At under RM150, these earbuds offer remarkable value for money and come wholeheartedly recommended for high school students and fitness lovers.',
        hint: 'Highlights price-to-performance ratio and target demographic.'
      }
    ],
    explanation: {
      Introduction: 'Connects problem (tangled wires) to solution (product).',
      Description: 'Details design, comfort, silicone tips, and water resistance.',
      Opinion: 'Assesses audio quality against touch sensor responsiveness.',
      Recommendation: 'Concludes with pricing value and target customer group.'
    }
  },
  {
    id: 'l3-r4',
    title: 'Rainforest Canopy Lodge (Eco-Retreat)',
    category: 'Place of Interest',
    items: [
      {
        id: 'l3-r4-intro',
        section: 'Introduction',
        text: 'Ever dreamed of escaping digital notifications and slumbering high amidst ancient treetop canopies? Rainforest Canopy Lodge in Pahang makes that dream reality.',
        hint: 'Evocative rhetorical hook inviting the reader to unplug.'
      },
      {
        id: 'l3-r4-desc',
        section: 'Description',
        text: 'Constructed from sustainably sourced timber, the resort features twenty stilt chalets connected by suspension bridges over crystalline river streams.',
        hint: 'Describes architecture, materials, and natural surroundings.'
      },
      {
        id: 'l3-r4-opin',
        section: 'Opinion',
        text: 'The guided nocturnal nature walk was exhilarating and deeply educational, although the absence of air conditioning might deter travelers sensitive to humidity.',
        hint: 'Balances outdoor activity excitement with environmental trade-offs.'
      },
      {
        id: 'l3-r4-recom',
        section: 'Recommendation',
        text: 'A resounding five stars for nature enthusiasts; be sure to book at least two months ahead as weekend slots fill up swiftly.',
        hint: 'Clear final rating with crucial booking advice.'
      }
    ],
    explanation: {
      Introduction: 'Hooks reader on unplugging and names the eco-lodge.',
      Description: 'Describes stilt chalets and wooden bridges.',
      Opinion: 'Praises the night trek while noting lack of air conditioning.',
      Recommendation: 'Awards five stars and warns about early booking.'
    }
  },
  {
    id: 'l3-r5',
    title: 'The Silent Whispers (Mystery Novel)',
    category: 'Book',
    items: [
      {
        id: 'l3-r5-intro',
        section: 'Introduction',
        text: 'Can a forgotten journal unravel a decades-old seaside mystery? Author Clara Brooks delivers an enthralling page-turner in The Silent Whispers.',
        hint: 'Intriguing question introducing mystery genre, author, and book.'
      },
      {
        id: 'l3-r5-desc',
        section: 'Description',
        text: 'Narrated through dual timelines between 1945 and modern day, the story follows archivist Maya as she investigates an abandoned lighthouse keeper\'s records.',
        hint: 'Explains narrative structure, timeline, and main character goal.'
      },
      {
        id: 'l3-r5-opin',
        section: 'Opinion',
        text: 'Brooks masterfully plants subtle clues that keep readers guessing, though the sudden resolution in the final chapter felt somewhat rushed.',
        hint: 'Evaluates author\'s plotting skill and critiques ending.'
      },
      {
        id: 'l3-r5-recom',
        section: 'Recommendation',
        text: 'I give this novel four out of five stars and urge anyone who appreciates intricate detective plots to add it to their holiday reading list.',
        hint: 'Provides score and suggests adding to reading lists.'
      }
    ],
    explanation: {
      Introduction: 'Hook introducing author Clara Brooks and title.',
      Description: 'Describes dual timeline and archival mystery premise.',
      Opinion: 'Commends plot clues while pointing out rushed climax.',
      Recommendation: 'Ratings and recommendation for mystery fans.'
    }
  },
  {
    id: 'l3-r6',
    title: 'Smash Burger Yard (Food Truck Haven)',
    category: 'Restaurant',
    items: [
      {
        id: 'l3-r6-intro',
        section: 'Introduction',
        text: 'Looking for gourmet street food that won\'t burn a hole in your pocket? Smash Burger Yard has quickly become the hottest culinary talk of the town.',
        hint: 'Rhetorical question tapping into budget-friendly foodie cravings.'
      },
      {
        id: 'l3-r6-desc',
        section: 'Description',
        text: 'Stationed beside Taman Tasik, the bright yellow food truck operates under festoon fairy lights with open-air picnic tables and upbeat indie music.',
        hint: 'Details location, truck appearance, outdoor seating, and vibe.'
      },
      {
        id: 'l3-r6-opin',
        section: 'Opinion',
        text: 'The caramelized smash patties were exceptionally juicy with crisp lacey edges, yet the wait time exceeded thirty-five minutes during peak dinner hours.',
        hint: 'Contrasts outstanding burger flavor with lengthy waiting queues.'
      },
      {
        id: 'l3-r6-recom',
        section: 'Recommendation',
        text: 'Worth every single ringgit despite the crowd; I recommend arriving right before 6:30 PM to beat the inevitable dinner rush.',
        hint: 'Definitive recommendation with timing tip.'
      }
    ],
    explanation: {
      Introduction: 'Catchy idiom ("burn a hole in your pocket") opening.',
      Description: 'Atmospheric setting with fairy lights and picnic tables.',
      Opinion: 'Praises burger meat but criticizes long waiting queue.',
      Recommendation: 'Strong endorsement with strategic timing advice.'
    }
  },
  {
    id: 'l3-r7',
    title: 'Apex FitPulse Smartwatch',
    category: 'Gadget',
    items: [
      {
        id: 'l3-r7-intro',
        section: 'Introduction',
        text: 'Can a budget wearable compete with flagship giants costing three times as much? The Apex FitPulse aims to disrupt the fitness tracker industry.',
        hint: 'Poses provocative comparison between budget and flagship tech.'
      },
      {
        id: 'l3-r7-desc',
        section: 'Description',
        text: 'The watch features a vivid 1.4-inch AMOLED display, aircraft-grade aluminum bezel, and comprehensive sensors tracking heart rate, sleep, and SpO2 levels.',
        hint: 'Covers physical screen tech, chassis material, and sensor suite.'
      },
      {
        id: 'l3-r7-opin',
        section: 'Opinion',
        text: 'Battery stamina is remarkably enduring, lasting over nine full days per charge, although the companion mobile app occasionally suffers sync delays.',
        hint: 'Reviews real-world battery performance against software glitch.'
      },
      {
        id: 'l3-r7-recom',
        section: 'Recommendation',
        text: 'Overall, it scores 4/5 stars and represents an unbeatable entry-level companion for student athletes tracking daily training metrics.',
        hint: 'Numeric score and ideal user recommendation.'
      }
    ],
    explanation: {
      Introduction: 'Bold market comparison question introducing the watch.',
      Description: 'Summarizes screen display, casing, and health sensors.',
      Opinion: 'Applauds 9-day battery life while noting app sync delay.',
      Recommendation: 'Solid 4/5 verdict for student athletes.'
    }
  },
  {
    id: 'l3-r8',
    title: 'Shadows in the Mist (Horror Film)',
    category: 'Movie',
    items: [
      {
        id: 'l3-r8-intro',
        section: 'Introduction',
        text: 'If cheap jump scares leave you cold and you crave genuine psychological dread, Shadows in the Mist is guaranteed to haunt your sleep.',
        hint: 'Conditional hook contrasting cheap tropes with true atmosphere.'
      },
      {
        id: 'l3-r8-desc',
        section: 'Description',
        text: 'Filmed in misty highlands, the narrative centers on an eccentric folklore researcher probing unexplained disappearances in a secluded colonial village.',
        hint: 'Setting and character motivation overview.'
      },
      {
        id: 'l3-r8-opin',
        section: 'Opinion',
        text: 'The eerie cinematography and sound design build unbearable tension, though the cryptic final twist left several plot threads unresolved.',
        hint: 'Praises tension building while noting ambiguous ending.'
      },
      {
        id: 'l3-r8-recom',
        section: 'Recommendation',
        text: 'A compelling four-star horror experience that I wholeheartedly advise watching in a darkened room with fellow brave friends.',
        hint: 'Rating and ideal viewing conditions.'
      }
    ],
    explanation: {
      Introduction: 'Appeals to fans of psychological horror over cheap jumps.',
      Description: 'Introduces highland colonial village and folklore premise.',
      Opinion: 'Analyses cinematography, audio tension, and ending twist.',
      Recommendation: 'Recommends viewing in dark setting with friends.'
    }
  },
  {
    id: 'l3-r9',
    title: 'The Great Paper Chase (School Board Game)',
    category: 'Place of Interest',
    items: [
      {
        id: 'l3-r9-intro',
        section: 'Introduction',
        text: 'Who would have thought that studying for national examinations could be transformed into a hilarious, cutthroat competitive tabletop game?',
        hint: 'Surprising rhetorical hook turning a serious topic into fun.'
      },
      {
        id: 'l3-r9-desc',
        section: 'Description',
        text: 'Designed for 3 to 6 players, the board consists of modular school corridors where players trade revision notes, dodge pop quizzes, and outsmart rivals.',
        hint: 'Player count, modular board mechanics, and game premise.'
      },
      {
        id: 'l3-r9-opin',
        section: 'Opinion',
        text: 'The event cards spark non-stop laughter and playful sabotage, but mastering the rulebook requires at least two practice rounds.',
        hint: 'Humor and entertainment value weighed against learning curve.'
      },
      {
        id: 'l3-r9-recom',
        section: 'Recommendation',
        text: 'Earning an enthusiastic 4.8 stars, this is the definitive ice-breaker board game for secondary school study clubs during weekend gatherings.',
        hint: 'High score and tailored recommendation for student clubs.'
      }
    ],
    explanation: {
      Introduction: 'Engaging hook turning study stress into game excitement.',
      Description: 'Outlines player count, board setup, and core mechanics.',
      Opinion: 'Praises laughter and replayability while noting rule complexity.',
      Recommendation: 'Awards 4.8 stars as a must-have study group game.'
    }
  },
  {
    id: 'l3-r10',
    title: 'Skyline Overlook Park (Urban Lookout)',
    category: 'Place of Interest',
    items: [
      {
        id: 'l3-r10-intro',
        section: 'Introduction',
        text: 'Searching for the ultimate sunset vantage point without shelling out exorbitant rooftop cocktail prices? Skyline Overlook Park is Kuala Lumpur\'s best-kept secret.',
        hint: 'Problem-solving opening promising luxury views for free.'
      },
      {
        id: 'l3-r10-desc',
        section: 'Description',
        text: 'Perched on a forested ridge, the public park features a wooden cantilevered viewing deck, jogging loops, and illuminated glass balustrades.',
        hint: 'Details ridge terrain, wooden deck, trails, and modern railings.'
      },
      {
        id: 'l3-r10-opin',
        section: 'Opinion',
        text: 'The 360-degree panorama of illuminated skyscrapers is truly breathtaking, though parking spots are notoriously scarce on weekend evenings.',
        hint: 'Spectacular cityscape praise contrasted with parking difficulty.'
      },
      {
        id: 'l3-r10-recom',
        section: 'Recommendation',
        text: 'An undisputed five-star gem; take public transit or carpool to fully savor an unforgettable evening skyline.',
        hint: 'Five-star verdict paired with practical transportation tip.'
      }
    ],
    explanation: {
      Introduction: 'Promises sensational views without high costs.',
      Description: 'Outlines cantilevered deck, trails, and forest ridge.',
      Opinion: 'Marvels at skyline beauty while pointing out parking scarcity.',
      Recommendation: 'Gives 5 stars with practical transit advice.'
    }
  }
];

// -------------------------------------------------------------
// LEVEL 4: VOCABULARY CATCHER (10 Rounds)
// Catching stellar review adjectives/idioms, rejecting filler/bland words
// -------------------------------------------------------------
export const LEVEL_4_ROUNDS: VocabRound[] = [
  {
    id: 'l4-r1',
    theme: 'Sensational & Breathtaking Experiences (Praise)',
    targetCount: 4,
    instruction: 'Grab 4 high-impact positive review adjectives! Avoid bland filler words.',
    words: [
      { id: 'w1', word: 'breathtaking', isReviewWord: true, tone: 'positive', definition: 'Astonishing or awe-inspiring in beauty or scale.', example: 'The cliffside offered a breathtaking panorama.' },
      { id: 'w2', word: 'exceeded my expectations', isReviewWord: true, tone: 'positive', definition: 'Surpassed what was anticipated in quality.', example: 'The dessert course exceeded my expectations.' },
      { id: 'w3', word: 'mouth-watering', isReviewWord: true, tone: 'positive', definition: 'Smelling or looking delicious.', example: 'A mouth-watering aroma wafted from the kitchen.' },
      { id: 'w4', word: 'impeccable', isReviewWord: true, tone: 'positive', definition: 'Flawless; without any faults or shortcomings.', example: 'The hotel staff provided impeccable service.' },
      { id: 'w5', word: 'good', isReviewWord: false, tone: 'neutral', definition: 'Very generic adjective; lacks descriptive nuance.', example: 'Replace "good" with "superb" or "exceptional".' },
      { id: 'w6', word: 'nice', isReviewWord: false, tone: 'neutral', definition: 'Overused, vague adjective that scores poorly in exams.', example: 'Replace "nice" with "charming" or "delightful".' },
      { id: 'w7', word: 'thing', isReviewWord: false, tone: 'neutral', definition: 'Vague noun; avoid in descriptive writing.', example: 'Use specific nouns like "aspect", "feature", or "dish".' }
    ]
  },
  {
    id: 'l4-r2',
    theme: 'Expressing Constructive Criticism & Flaws',
    targetCount: 4,
    instruction: 'Catch 4 sophisticated critical review expressions describing shortcomings.',
    words: [
      { id: 'w8', word: 'disappointing', isReviewWord: true, tone: 'negative', definition: 'Failing to fulfill expectations or hopes.', example: 'The plot twist proved thoroughly disappointing.' },
      { id: 'w9', word: 'sluggish service', isReviewWord: true, tone: 'negative', definition: 'Slow-moving and unenthusiastic customer service.', example: 'We waited 40 minutes due to sluggish service.' },
      { id: 'w10', word: 'steep price tag', isReviewWord: true, tone: 'negative', definition: 'Excessively expensive or costly.', example: 'Despite its steep price tag, build quality felt flimsy.' },
      { id: 'w11', word: 'underwhelming', isReviewWord: true, tone: 'negative', definition: 'Failing to impress or satisfy.', example: 'The anticlimactic final battle was rather underwhelming.' },
      { id: 'w12', word: 'bad', isReviewWord: false, tone: 'neutral', definition: 'Basic A1 adjective; lacks specificity.', example: 'Use "subpar", "dreadful", or "unsatisfactory".' },
      { id: 'w13', word: 'angry', isReviewWord: false, tone: 'neutral', definition: 'Emotional reaction rather than objective evaluation.', example: 'Focus on evaluating the product rather than personal rage.' },
      { id: 'w14', word: 'not good', isReviewWord: false, tone: 'neutral', definition: 'Weak phrasing lacking CEFR B2 vocabulary range.', example: 'Use "mediocre" or "lacking in substance".' }
    ]
  },
  {
    id: 'l4-r3',
    theme: 'High Recommendation & Value for Money',
    targetCount: 4,
    instruction: 'Catch 4 persuasive expressions used in review conclusions.',
    words: [
      { id: 'w15', word: 'highly recommended', isReviewWord: true, tone: 'recommendation', definition: 'Strongly advocated or endorsed.', example: 'This cafe is highly recommended for digital nomads.' },
      { id: 'w16', word: 'worth visiting', isReviewWord: true, tone: 'recommendation', definition: 'Meriting the time and effort to travel there.', example: 'The ancient botanical garden is definitely worth visiting.' },
      { id: 'w17', word: 'value for money', isReviewWord: true, tone: 'recommendation', definition: 'Well worth the financial expenditure.', example: 'Portions are huge, offering tremendous value for money.' },
      { id: 'w18', word: 'must-watch', isReviewWord: true, tone: 'recommendation', definition: 'Something so outstanding it should not be missed.', example: 'This documentary is an essential must-watch.' },
      { id: 'w19', word: 'you can buy it', isReviewWord: false, tone: 'neutral', definition: 'Colloquial and weak conversational phrase.', example: 'Use "I wholeheartedly advise purchasing..."' },
      { id: 'w20', word: 'I tell you', isReviewWord: false, tone: 'neutral', definition: 'Informal spoken filler unsuitable for writing.', example: 'Avoid conversational spoken crutches in reviews.' },
      { id: 'w21', word: 'money', isReviewWord: false, tone: 'neutral', definition: 'Isolated noun without review context.', example: 'Use "cost-effective" or "budget-friendly".' }
    ]
  },
  {
    id: 'l4-r4',
    theme: 'Movie & Storytelling Praise',
    targetCount: 4,
    instruction: 'Catch 4 top-tier cinema and storytelling praise terms.',
    words: [
      { id: 'w22', word: 'gripping storyline', isReviewWord: true, tone: 'positive', definition: 'Holding attention completely through tension.', example: 'A gripping storyline that never lets go.' },
      { id: 'w23', word: 'stellar performance', isReviewWord: true, tone: 'positive', definition: 'Exceptionally brilliant acting.', example: 'The lead actress gave a stellar performance.' },
      { id: 'w24', word: 'mind-bending twist', isReviewWord: true, tone: 'positive', definition: 'An ingenious and unexpected plot turn.', example: 'The climax features a mind-bending twist.' },
      { id: 'w25', word: 'visually stunning', isReviewWord: true, tone: 'positive', definition: 'Visually remarkable and gorgeous.', example: 'CGI scenes were visually stunning.' },
      { id: 'w26', word: 'fun', isReviewWord: false, tone: 'neutral', definition: 'Basic everyday word lacking descriptive precision.', example: 'Try "exhilarating", "entertaining", or "captivating".' },
      { id: 'w27', word: 'film actors', isReviewWord: false, tone: 'neutral', definition: 'Generic noun label, not an evaluative adjective.', example: 'Focus on evaluating their performance.' },
      { id: 'w28', word: 'television', isReviewWord: false, tone: 'neutral', definition: 'Just a physical object.', example: 'Irrelevant to review vocabulary.' }
    ]
  },
  {
    id: 'l4-r5',
    theme: 'Atmosphere & Hospitality Descriptors',
    targetCount: 4,
    instruction: 'Catch 4 atmospheric adjectives that bring venues to life.',
    words: [
      { id: 'w29', word: 'inviting ambiance', isReviewWord: true, tone: 'positive', definition: 'Warm, pleasant, and welcoming atmosphere.', example: 'Fairy lights created an inviting ambiance.' },
      { id: 'w30', word: 'courteous staff', isReviewWord: true, tone: 'positive', definition: 'Polite, respectful, and considerate service team.', example: 'We were greeted warmly by courteous staff.' },
      { id: 'w31', word: 'cozy retreat', isReviewWord: true, tone: 'positive', definition: 'Comfortable, sheltered, and snug refuge.', example: 'A cozy retreat from the rain.' },
      { id: 'w32', word: 'picturesque', isReviewWord: true, tone: 'positive', definition: 'Visually charming and quaint, like a picture.', example: 'Set in a picturesque hillside hamlet.' },
      { id: 'w33', word: 'place', isReviewWord: false, tone: 'neutral', definition: 'Generic noun.', example: 'Use "sanctuary", "establishment", or "venue".' },
      { id: 'w34', word: 'people', isReviewWord: false, tone: 'neutral', definition: 'Vague noun.', example: 'Use "patrons", "guests", or "staff".' },
      { id: 'w35', word: 'big room', isReviewWord: false, tone: 'neutral', definition: 'Simple A1 descriptor.', example: 'Use "spacious dining hall" or "airy lounge".' }
    ]
  },
  {
    id: 'l4-r6',
    theme: 'Critiquing Overhyped Products & Venues',
    targetCount: 4,
    instruction: 'Catch 4 sharp analytical terms for reviewing overhyped subjects.',
    words: [
      { id: 'w36', word: 'overrated', isReviewWord: true, tone: 'negative', definition: 'Valued more highly than is warranted by reality.', example: 'The viral bakery turned out to be sorely overrated.' },
      { id: 'w37', word: 'lacking in substance', isReviewWord: true, tone: 'negative', definition: 'Superficial; missing depth or genuine quality.', example: 'Flashy graphics but lacking in substance.' },
      { id: 'w38', word: 'exorbitant prices', isReviewWord: true, tone: 'negative', definition: 'Unreasonably high or outrageous charges.', example: 'Portions hardly justify the exorbitant prices.' },
      { id: 'w39', word: 'clichéd dialogue', isReviewWord: true, tone: 'negative', definition: 'Trite, predictable, and overused character lines.', example: 'Ruined by cringeworthy, clichéd dialogue.' },
      { id: 'w40', word: 'boring', isReviewWord: false, tone: 'neutral', definition: 'Overused simple word.', example: 'Use "tedious", "monotonous", or "uninspired".' },
      { id: 'w41', word: 'expensive', isReviewWord: false, tone: 'neutral', definition: 'Common baseline word.', example: 'Try "pricey", "steep", or "exorbitantly priced".' },
      { id: 'w42', word: 'no like', isReviewWord: false, tone: 'neutral', definition: 'Broken conversational grammar.', example: 'Unacceptable in formal SPM writing.' }
    ]
  },
  {
    id: 'l4-r7',
    theme: 'Culinary Flavor & Texture Mastery',
    targetCount: 4,
    instruction: 'Catch 4 rich sensory descriptors for unforgettable food reviews.',
    words: [
      { id: 'w43', word: 'succulent', isReviewWord: true, tone: 'positive', definition: 'Tender, juicy, and tasty (especially meats).', example: 'The grilled chicken was succulent and aromatic.' },
      { id: 'w44', word: 'richly seasoned', isReviewWord: true, tone: 'positive', definition: 'Expertly flavored with balanced spices.', example: 'A richly seasoned broth brimming with herbs.' },
      { id: 'w45', word: 'melt-in-the-mouth', isReviewWord: true, tone: 'positive', definition: 'So tender that it dissolves effortlessly.', example: 'The braised beef had a melt-in-the-mouth texture.' },
      { id: 'w46', word: 'crisp and golden', isReviewWord: true, tone: 'positive', definition: 'Perfect frying texture and visual appeal.', example: 'Fried to a crisp and golden perfection.' },
      { id: 'w47', word: 'yummy', isReviewWord: false, tone: 'neutral', definition: 'Childish slang unsuitable for B1/B2 academic writing.', example: 'Use "delectable", "sumptuous", or "scrumptious".' },
      { id: 'w48', word: 'delicious', isReviewWord: false, tone: 'neutral', definition: 'While correct, it is often overused; push for higher variety.', example: 'Try "mouth-watering", "savory", or "exquisite".' },
      { id: 'w49', word: 'cooked', isReviewWord: false, tone: 'neutral', definition: 'Simple state description with no qualitative nuance.', example: 'Specify how it was cooked: "char-grilled", "simmered".' }
    ]
  },
  {
    id: 'l4-r8',
    theme: 'Tech & Gadget Evaluation',
    targetCount: 4,
    instruction: 'Catch 4 tech review terms that demonstrate gadget expertise.',
    words: [
      { id: 'w50', word: 'seamless connectivity', isReviewWord: true, tone: 'positive', definition: 'Flawless pairing and stable wireless link.', example: 'Bluetooth paired with seamless connectivity.' },
      { id: 'w51', word: 'intuitive interface', isReviewWord: true, tone: 'positive', definition: 'Easy to navigate and understand instinctively.', example: 'Even beginners will appreciate the intuitive interface.' },
      { id: 'w52', word: 'impressive battery stamina', isReviewWord: true, tone: 'positive', definition: 'Long-lasting power endurance.', example: 'Boasting impressive battery stamina for two days.' },
      { id: 'w53', word: 'flimsy build quality', isReviewWord: true, tone: 'negative', definition: 'Cheap, fragile, and poorly constructed casing.', example: 'The hinge exhibited flimsy build quality.' },
      { id: 'w54', word: 'machine', isReviewWord: false, tone: 'neutral', definition: 'Generic noun.', example: 'Use "hardware", "gadget", or "device".' },
      { id: 'w55', word: 'works', isReviewWord: false, tone: 'neutral', definition: 'Vague verb.', example: 'Use "operates smoothly" or "functions reliably".' },
      { id: 'w56', word: 'plastic', isReviewWord: false, tone: 'neutral', definition: 'Neutral material noun.', example: 'Use "durable polycarbonate" or "cheap casing".' }
    ]
  },
  {
    id: 'l4-r9',
    theme: 'Literary & Book Review Mastery',
    targetCount: 4,
    instruction: 'Catch 4 sophisticated phrases for critiquing books and novels.',
    words: [
      { id: 'w57', word: 'page-turner', isReviewWord: true, tone: 'positive', definition: 'A book so gripping you cannot stop reading it.', example: 'A pulse-pounding page-turner from start to finish.' },
      { id: 'w58', word: 'thought-provoking', isReviewWord: true, tone: 'positive', definition: 'Stimulating careful consideration and reflection.', example: 'A thought-provoking exploration of artificial intelligence.' },
      { id: 'w59', word: 'masterfully crafted', isReviewWord: true, tone: 'positive', definition: 'Constructed with consummate skill and artistry.', example: 'Featuring masterfully crafted prose and characters.' },
      { id: 'w60', word: 'predictable plot', isReviewWord: true, tone: 'negative', definition: 'Lacking surprise; easily guessed beforehand.', example: 'Hampered by an unfortunately predictable plot.' },
      { id: 'w61', word: 'story', isReviewWord: false, tone: 'neutral', definition: 'Plain noun.', example: 'Use "narrative", "chronicle", or "plot".' },
      { id: 'w62', word: 'reading', isReviewWord: false, tone: 'neutral', definition: 'General verb/gerund.', example: 'Focus on evaluating the writing quality.' },
      { id: 'w63', word: 'words', isReviewWord: false, tone: 'neutral', definition: 'Basic noun.', example: 'Use "prose", "dialogue", or "diction".' }
    ]
  },
  {
    id: 'l4-r10',
    theme: 'Final Verdict & Summary Signposts',
    targetCount: 4,
    instruction: 'Catch 4 top-tier transitional phrases for your review conclusion.',
    words: [
      { id: 'w64', word: 'all things considered', isReviewWord: true, tone: 'recommendation', definition: 'Taking everything into account.', example: 'All things considered, this resort is an idyllic escape.' },
      { id: 'w65', word: 'wholeheartedly recommend', isReviewWord: true, tone: 'recommendation', definition: 'Endorse with complete sincerity and conviction.', example: 'I wholeheartedly recommend this bookstore to literature fans.' },
      { id: 'w66', word: 'worth every penny', isReviewWord: true, tone: 'recommendation', definition: 'Justifying every unit of currency spent.', example: 'The VIP concert pass was worth every penny.' },
      { id: 'w67', word: 'an absolute must-visit', isReviewWord: true, tone: 'recommendation', definition: 'A destination that is essential to experience.', example: 'The historical museum is an absolute must-visit.' },
      { id: 'w68', word: 'in conclusion', isReviewWord: false, tone: 'neutral', definition: 'Overly formal academic cliché; avoid in engaging reviews.', example: 'Use "All in all", "All things considered", or "The final verdict".' },
      { id: 'w69', word: 'the end', isReviewWord: false, tone: 'neutral', definition: 'Storybook ending phrase; never use in reviews.', example: 'Finish with a punchy recommendation and star rating.' },
      { id: 'w70', word: 'bye bye', isReviewWord: false, tone: 'neutral', definition: 'Informal slang.', example: 'Unacceptable in written exam reviews.' }
    ]
  }
];

// -------------------------------------------------------------
// LEVEL 5: REVIEW MASTER (10 Challenges)
// Complete authentic reviews by selecting and placing the missing section
// -------------------------------------------------------------
export const LEVEL_5_CHALLENGES: ReviewMasterChallenge[] = [
  {
    id: 'l5-c1',
    title: 'The Alchemist\'s Cafe: A Cozy Haven',
    category: 'Restaurant',
    reviewType: 'Cafe Review',
    missingSection: 'Opinion',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'Have you ever wished you could sip artisanal tea in a secret room straight out of a fantasy novel? Hidden along a sleepy heritage lane, The Alchemist\'s Cafe turns that daydream into reality.'
      },
      {
        section: 'Description',
        text: 'The interior is styled like an antique potion apothecary, lined with vintage brass kettles, dark mahogany bookshelves, and warm amber lantern lighting that glows softly over wooden tables.'
      },
      {
        section: 'Opinion',
        text: '[MISSING OPINION SECTION: Insert the most balanced and vivid critical evaluation here!]',
        isBlank: true
      },
      {
        section: 'Recommendation',
        text: 'Earning an enthusiastic 4.5 out of 5 stars, this enchanting hideaway is a must-visit for bookworms, creative writers, and couples seeking an intimate conversation spot.'
      }
    ],
    candidates: [
      {
        id: 'c1',
        text: 'Their signature rose-infused chamomile brew was delightfully soothing with subtle floral undertones, although their lavender scones were slightly crumbly and could have used more clotted cream.',
        isCorrect: true,
        reason: 'Provides a vivid, sensory evaluation of a specific beverage and pastry, offering balanced praise and constructive critique (essential B2 writing!).'
      },
      {
        id: 'c1-wrong1',
        text: 'I ordered some tea and then I drank it while looking at my smartphone because there was free Wi-Fi.',
        isCorrect: false,
        reason: 'Far too simple and mundane; does not evaluate the culinary quality or flavor.'
      },
      {
        id: 'c1-wrong2',
        text: 'The cafe opens at 10 AM on weekdays and closes at 9 PM on weekends, and parking is free for two hours.',
        isCorrect: false,
        reason: 'This is factual logistical information, not a personal critical opinion.'
      },
      {
        id: 'c1-wrong3',
        text: 'You should definitely visit this cafe right now because the owner is my father\'s best friend.',
        isCorrect: false,
        reason: 'Biased personal statement that sounds like an aggressive recommendation rather than an evaluation.'
      }
    ],
    modelReviewSummary: 'This model review seamlessly demonstrates the 4-part SPM structure: Hook -> Apothecary Description -> Balanced Taste Evaluation -> Target Audience Recommendation.'
  },
  {
    id: 'l5-c2',
    title: 'Echoes of the Deep: Cinematic Triumph',
    category: 'Film',
    reviewType: 'Movie Review',
    missingSection: 'Introduction',
    paragraphs: [
      {
        section: 'Introduction',
        text: '[MISSING INTRODUCTION HOOK: Insert the most captivating opening hook here!]',
        isBlank: true
      },
      {
        section: 'Description',
        text: 'Set aboard a research submarine exploring the Mariana Trench, the story follows marine biologist Dr. Kayla Torres after an uncharted thermal surge severs their communications.'
      },
      {
        section: 'Opinion',
        text: 'Director Samuel Vance builds nail-biting suspense using deep ocean silence and bioluminescent lighting, though the third-act pacing rushes towards a slightly predictable conclusion.'
      },
      {
        section: 'Recommendation',
        text: 'All in all, I rate it four stars out of five. It is an exhilarating thriller that I wholeheartedly recommend watching on the biggest cinema screen possible.'
      }
    ],
    candidates: [
      {
        id: 'c2',
        text: 'What lies buried in the pitch-black abyss where sunlight has never dared to tread? Director Samuel Vance plunges audiences into heart-stopping underwater claustrophobia in Echoes of the Deep.',
        isCorrect: true,
        reason: 'Uses a poetic rhetorical question hook ("Where sunlight has never dared to tread") followed by director and movie title introduction.'
      },
      {
        id: 'c2-wrong1',
        text: 'I went to cinema last night and bought a large popcorn with my friend Kevin.',
        isCorrect: false,
        reason: 'Trivial personal recount that fails to hook the reader onto the film\'s thrilling subject.'
      },
      {
        id: 'c2-wrong2',
        text: 'In this essay, I will tell you whether this movie is good or bad according to my opinion.',
        isCorrect: false,
        reason: 'Stiff academic essay introduction. Reviews should be lively and semi-formal.'
      },
      {
        id: 'c2-wrong3',
        text: 'Submarines are large vessels designed to travel beneath the surface of the sea.',
        isCorrect: false,
        reason: 'Dictionary definition. Never open an engaging review with elementary definitions.'
      }
    ],
    modelReviewSummary: 'A stellar movie review opening that instantly pulls the audience into the mysterious deep-sea atmosphere.'
  },
  {
    id: 'l5-c3',
    title: 'PowerGlide X-Fold: The Future of Commuting?',
    category: 'Gadget',
    reviewType: 'Tech Gadget Review',
    missingSection: 'Recommendation',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'Sick of getting stranded in suffocating morning traffic jams? The PowerGlide X-Fold promises to transform urban commuting with ultra-portable electric agility.'
      },
      {
        section: 'Description',
        text: 'Crafted from aerospace-grade carbon fiber, this electric scooter weighs just nine kilograms, folds in under three seconds, and sports integrated LED turn signals.'
      },
      {
        section: 'Opinion',
        text: 'Acceleration is delightfully responsive and handling through tight city corners feels rock-solid, though its solid rubber tires transmit noticeable vibration over rough cobblestone streets.'
      },
      {
        section: 'Recommendation',
        text: '[MISSING RECOMMENDATION: Insert the most persuasive, well-rounded recommendation here!]',
        isBlank: true
      }
    ],
    candidates: [
      {
        id: 'c3',
        text: 'Priced competitively at RM1,200, this scooter scores a solid four stars and is an absolute game-changer for tertiary students and urban commuters tackling the final mile.',
        isCorrect: true,
        reason: 'Contains price justification, numerical star rating, and specifies target demographics (students and commuters).'
      },
      {
        id: 'c3-wrong1',
        text: 'I do not know if you want to buy it, but my uncle says electric scooters are dangerous.',
        isCorrect: false,
        reason: 'Indecisive, hearsay-based, and lacks a definitive reviewer verdict.'
      },
      {
        id: 'c3-wrong2',
        text: 'In conclusion, transportation is an important aspect of modern urban society.',
        isCorrect: false,
        reason: 'Irrelevant essay cliché that fails to give actionable consumer buying advice.'
      },
      {
        id: 'c3-wrong3',
        text: 'Buy it right now because carbon fiber is a composite material made of carbon atoms.',
        isCorrect: false,
        reason: 'Bizarre imperative accompanied by unnecessary chemical trivia.'
      }
    ],
    modelReviewSummary: 'Features a clear price-performance rating and tailored target audience recommendation.'
  },
  {
    id: 'l5-c4',
    title: 'The Mangrove Sanctuary: Untamed Wilderness',
    category: 'Travel Destination',
    reviewType: 'Travel Review',
    missingSection: 'Description',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'Looking for a tranquil coastal sanctuary where untouched nature outshines commercial tourist traps? The Kuala Sepetang Mangrove Sanctuary offers an unforgettable breath of fresh air.'
      },
      {
        section: 'Description',
        text: '[MISSING DESCRIPTION: Insert the most evocative, factually descriptive paragraph here!]',
        isBlank: true
      },
      {
        section: 'Opinion',
        text: 'Gliding along the river at dusk to witness thousands of synchronized fireflies sparkling in the mangrove branches was truly magical, although the wooden boardwalk has a few slippery planks that require careful footing.'
      },
      {
        section: 'Recommendation',
        text: 'Awarding this hidden sanctuary a well-deserved five stars, I highly advise taking the evening boat cruise and donning sturdy trekking shoes for the trail.'
      }
    ],
    candidates: [
      {
        id: 'c4',
        text: 'Spanning over forty thousand hectares, the wetland reserve features an elevated kilometer-long timber boardwalk winding through dense mangrove roots, traditional charcoal kilns, and bird-watching towers.',
        isCorrect: true,
        reason: 'Accurately and vividly details the physical environment: reserve size, timber boardwalk, charcoal kilns, and wildlife towers.'
      },
      {
        id: 'c4-wrong1',
        text: 'I loved the mangroves so much and my brother also thought the trees were very green.',
        isCorrect: false,
        reason: 'Repetitive personal sentiment rather than informative spatial description.'
      },
      {
        id: 'c4-wrong2',
        text: 'Mangrove trees are biologically classified as halophytes because they tolerate saline water.',
        isCorrect: false,
        reason: 'Sounds like a biology exam answer, not an engaging travel review description.'
      },
      {
        id: 'c4-wrong3',
        text: 'You should buy tickets at the front counter before entering the gate.',
        isCorrect: false,
        reason: 'Merely a logistical instruction that fails to paint the scenery.'
      }
    ],
    modelReviewSummary: 'Exemplifies rich environmental description that brings a Malaysian ecotourism destination alive.'
  },
  {
    id: 'l5-c5',
    title: 'Chronicles of the Clockwork City',
    category: 'Book',
    reviewType: 'Book Review',
    missingSection: 'Opinion',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'What happens when a Victorian detective discovers that time itself is being systematically stolen by a shadowy guild? Author Liam Sterling delivers an electrifying steampunk mystery.'
      },
      {
        section: 'Description',
        text: 'Set amidst smog-filled cobblestone alleys powered by towering brass gear towers, the plot follows Inspector Arthur Finch as he tracks down an elusive pocketwatch known as the Chronos Key.'
      },
      {
        section: 'Opinion',
        text: '[MISSING OPINION: Insert the most nuanced literary critique here!]',
        isBlank: true
      },
      {
        section: 'Recommendation',
        text: 'Earning four out of five stars, this captivating page-turner is wholeheartedly recommended for anyone captivated by clever puzzle-solving and atmospheric fantasy worlds.'
      }
    ],
    candidates: [
      {
        id: 'c5',
        text: 'Sterling\'s world-building is undeniably brilliant and the witty banter between Finch and his clockmaker apprentice sparkles with charm, though the complex time-travel mechanics occasionally bog down the second half.',
        isCorrect: true,
        reason: 'Critiques world-building, dialogue charm, and temporal mechanics with sophisticated balanced prose.'
      },
      {
        id: 'c5-wrong1',
        text: 'I read this book in my bedroom over three days because I had nothing else to do.',
        isCorrect: false,
        reason: 'Boring diary entry providing zero insight into the quality of writing.'
      },
      {
        id: 'c5-wrong2',
        text: 'The book was published in London in 2024 by Penguin Books and has twelve chapters.',
        isCorrect: false,
        reason: 'Bibliographic publishing data, not critical reviewer opinion.'
      },
      {
        id: 'c5-wrong3',
        text: 'Steampunk is a subgenre of science fiction that incorporates retrofuturistic technology.',
        isCorrect: false,
        reason: 'Genre definition rather than personal literary critique.'
      }
    ],
    modelReviewSummary: 'Shows students how to balance praise for witty dialogue with critique of intricate plot mechanics.'
  },
  {
    id: 'l5-c6',
    title: 'The Sizzling Skillet: Authentic Korean BBQ',
    category: 'Restaurant',
    reviewType: 'Food Review',
    missingSection: 'Recommendation',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'Craving the irresistible aroma of marinated meats sizzling over authentic charcoal briquettes? The Sizzling Skillet brings the vibrant energy of Seoul\'s night markets straight to your table.'
      },
      {
        section: 'Description',
        text: 'The bustling eatery features built-in smoke exhaust hoods above stainless steel tables, accompanied by complimentary banchan side dishes and upbeat K-pop music.'
      },
      {
        section: 'Opinion',
        text: 'The marinated beef short ribs were melt-in-the-mouth tender with a delightful caramelization, though the ventilation struggled slightly to handle the heavy dinner rush smoke.'
      },
      {
        section: 'Recommendation',
        text: '[MISSING RECOMMENDATION: Insert the most practical and persuasive final verdict!]',
        isBlank: true
      }
    ],
    candidates: [
      {
        id: 'c6',
        text: 'Garnering a stellar 4.8 out of 5 stars, this barbecue joint is an absolute must-visit for meat lovers and friend gatherings; just remember to make reservations well in advance!',
        isCorrect: true,
        reason: 'Provides a clear numeric rating (4.8/5), target audience (meat lovers/friends), and an essential reservation tip.'
      },
      {
        id: 'c6-wrong1',
        text: 'Eating meat provides protein which is beneficial for muscle development and growth.',
        isCorrect: false,
        reason: 'Nutritional science fact that belongs in a health textbook, not a restaurant review.'
      },
      {
        id: 'c6-wrong2',
        text: 'I don\'t know if my friends liked it, but we paid with a credit card at the cashier.',
        isCorrect: false,
        reason: 'Aimless conversational detail without an evaluative recommendation.'
      },
      {
        id: 'c6-wrong3',
        text: 'In summary, restaurants in Malaysia are very diverse and reflect our culture.',
        isCorrect: false,
        reason: 'Vague essay generalization that fails to give a verdict on this specific restaurant.'
      }
    ],
    modelReviewSummary: 'A quintessential SPM restaurant recommendation with clear stars and insider advice on reservations.'
  },
  {
    id: 'l5-c7',
    title: 'Lumix Nova Pro: Photography Reimagined',
    category: 'Gadget',
    reviewType: 'Smartphone Camera Review',
    missingSection: 'Introduction',
    paragraphs: [
      {
        section: 'Introduction',
        text: '[MISSING INTRODUCTION: Insert the sharpest tech comparison hook!]',
        isBlank: true
      },
      {
        section: 'Description',
        text: 'Boasting a 1-inch 50MP sensor co-engineered with Leica, the sleek phone showcases curved ceramic glass, titanium edges, and a dedicated dual-stage shutter button.'
      },
      {
        section: 'Opinion',
        text: 'Low-light photos capture breathtaking natural contrast without artificial over-sharpening, yet the substantial camera bump causes the device to wobble when laid flat on a desk.'
      },
      {
        section: 'Recommendation',
        text: 'Scoring 4.5 stars, this is the definitive dream device for aspiring mobile photographers and content creators who prioritize image quality over slimness.'
      }
    ],
    candidates: [
      {
        id: 'c7',
        text: 'Can a pocket-sized smartphone truly render bulky DSLR cameras obsolete? The Lumix Nova Pro makes a shockingly compelling case that it just might.',
        isCorrect: true,
        reason: 'Hooks readers with an ambitious tech rivalry question ("render DSLR cameras obsolete?") before unveiling the product.'
      },
      {
        id: 'c7-wrong1',
        text: 'Smartphones are electronic items that almost every teenager carries to school these days.',
        isCorrect: false,
        reason: 'Trite general observation that excites no one.'
      },
      {
        id: 'c7-wrong2',
        text: 'My father gave me this phone for my birthday because my old phone was broken.',
        isCorrect: false,
        reason: 'Personal narrative recount with no analytical focus.'
      },
      {
        id: 'c7-wrong3',
        text: 'I am writing this review to fulfill my English writing assignment for teacher approval.',
        isCorrect: false,
        reason: 'Breaks the fourth wall and ruins the authenticity of the review format.'
      }
    ],
    modelReviewSummary: 'Teaches students how to pose ambitious industry comparison hooks that score top marks in CEFR B2.'
  },
  {
    id: 'l5-c8',
    title: 'Skyline Rollercoaster: Velocity Unleashed',
    category: 'Travel Destination',
    reviewType: 'Theme Park Attraction Review',
    missingSection: 'Opinion',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'Do your knuckles turn white at the mere thought of a ninety-degree vertical drop at breakneck speeds? Genting Horizon\'s latest thrill ride, Velocity, beckons the truly fearless.'
      },
      {
        section: 'Description',
        text: 'Spanning one thousand meters of twisting steel track, the coaster propels riders from zero to one hundred kilometers per hour in just 2.8 seconds using magnetic propulsion.'
      },
      {
        section: 'Opinion',
        text: '[MISSING OPINION: Insert the most visceral sensory feedback paragraph!]',
        isBlank: true
      },
      {
        section: 'Recommendation',
        text: 'Awarding an undisputed five stars, Velocity is an exhilarating must-ride for thrill-seekers; just ensure you secure all loose belongings in the lockers beforehand!'
      }
    ],
    candidates: [
      {
        id: 'c8',
        text: 'The sheer zero-gravity sensation over the apex delivers an electrifying rush of pure adrenaline, although the safety restraints pressed somewhat uncomfortably against taller riders\' shoulders during the final braking loop.',
        isCorrect: true,
        reason: 'Uses visceral sensory vocabulary ("zero-gravity sensation", "electrifying rush of pure adrenaline") alongside a fair safety restraint critique.'
      },
      {
        id: 'c8-wrong1',
        text: 'I was very scared and screamed loudly while closing my eyes throughout the ride.',
        isCorrect: false,
        reason: 'Childish personal reaction without objective descriptive or technical evaluation.'
      },
      {
        id: 'c8-wrong2',
        text: 'The ride operates from 10:00 AM until 6:00 PM subject to weather conditions and maintenance.',
        isCorrect: false,
        reason: 'Operating hours schedule, not a review opinion.'
      },
      {
        id: 'c8-wrong3',
        text: 'Steel rollercoasters were first invented in the twentieth century to entertain tourists.',
        isCorrect: false,
        reason: 'Historical trivia irrelevant to the actual ride experience.'
      }
    ],
    modelReviewSummary: 'Demonstrates how to evaluate physical thrill sensations with sophisticated B2 vocabulary.'
  },
  {
    id: 'l5-c9',
    title: 'Lost in Translation: Language Learning App',
    category: 'Gadget',
    reviewType: 'App Review',
    missingSection: 'Description',
    paragraphs: [
      {
        section: 'Introduction',
        text: 'Tired of robotic flashcards and tedious textbook drills that leave you tongue-tied when ordering food abroad? PolyGlot Go promises to make language acquisition addictive.'
      },
      {
        section: 'Description',
        text: '[MISSING DESCRIPTION: Insert the most comprehensive feature and interface overview!]',
        isBlank: true
      },
      {
        section: 'Opinion',
        text: 'The interactive speech recognition engine offers instantaneous and forgiving pronunciation feedback, though the grammar explanations can feel overly abbreviated for advanced learners.'
      },
      {
        section: 'Recommendation',
        text: 'With its generous free tier and rewarding streak mechanics, I wholeheartedly give it 4.5 stars and suggest spending 15 minutes daily on your commute.'
      }
    ],
    candidates: [
      {
        id: 'c9',
        text: 'Structured like a role-playing adventure, the app features bite-sized five-minute conversational quests, vibrant character animations, and a gamified XP leaderboard for competing with friends.',
        isCorrect: true,
        reason: 'Excellently describes how the app functions: RPG format, 5-minute quests, animated characters, and social XP leaderboard.'
      },
      {
        id: 'c9-wrong1',
        text: 'My friends and I both downloaded it from the Google Play Store on our phones last week.',
        isCorrect: false,
        reason: 'Download logistics; fails to describe the app\'s interactive interface and features.'
      },
      {
        id: 'c9-wrong2',
        text: 'Languages have different grammars and vocabularies that require consistent practice.',
        isCorrect: false,
        reason: 'Generic educational philosophy rather than an app feature description.'
      },
      {
        id: 'c9-wrong3',
        text: 'It is very good and you should download it immediately because it is free.',
        isCorrect: false,
        reason: 'Crude promotional statement lacking descriptive detail.'
      }
    ],
    modelReviewSummary: 'A model app review that clearly details gamification, UI features, and micro-learning modules.'
  },
  {
    id: 'l5-c10',
    title: 'The Whispering Pines Camp: Forest Haven',
    category: 'Travel Destination',
    reviewType: 'Eco-Campsite Review',
    missingSection: 'Introduction',
    paragraphs: [
      {
        section: 'Introduction',
        text: '[MISSING INTRODUCTION: Insert the most evocative sensory nature hook!]',
        isBlank: true
      },
      {
        section: 'Description',
        text: 'Nestled beside a rushing mountain stream, the glamping site offers furnished canvas safari tents with comfortable cot beds, solar-powered lanterns, and private campfire pits.'
      },
      {
        section: 'Opinion',
        text: 'Falling asleep to the gentle babbling of the brook and waking up to stargazing decks was therapeutic, although the shared outdoor showers had lukewarm water early in the morning.'
      },
      {
        section: 'Recommendation',
        text: 'Rating it a well-deserved four stars, Whispering Pines is the ultimate weekend recharge for stressed students needing an authentic digital detox.'
      }
    ],
    candidates: [
      {
        id: 'c10',
        text: 'Imagine trading buzzing smartphone alarms for the crisp mountain breeze and the crackle of pine logs beneath a canopy of stars. Whispering Pines Camp offers precisely that restorative magic.',
        isCorrect: true,
        reason: 'Uses the "Imagine [contrast]..." technique to paint an idyllic sensory picture before introducing the campsite.'
      },
      {
        id: 'c10-wrong1',
        text: 'Camping is an outdoor activity where people sleep in tents during holidays.',
        isCorrect: false,
        reason: 'Dry dictionary definition that destroys all reader excitement.'
      },
      {
        id: 'c10-wrong2',
        text: 'My family likes going to the hills because the weather is not too hot.',
        isCorrect: false,
        reason: 'Simple informal conversation with no hook.'
      },
      {
        id: 'c10-wrong3',
        text: 'In this review paper, I will discuss the advantages and disadvantages of camping.',
        isCorrect: false,
        reason: 'Sounds like a formal argumentative essay prompt.'
      }
    ],
    modelReviewSummary: 'Sensory contrast hook ("trading smartphone alarms for mountain breeze") leads straight into an engaging eco-review.'
  }
];
