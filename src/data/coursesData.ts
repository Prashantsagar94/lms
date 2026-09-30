import { Course, Enrollment, EmailNotification, LeaderboardLearner, CustomPage, WebsiteManualSettings, LeadRecord } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'silai-machine-operator',
    title: 'Silai Machine Operator (Garment Making)',
    hindiTitle: 'सिलाई मशीन ऑपरेटर एवं गारमेंट मेकिंग प्रशिक्षण',
    category: 'Garment Making',
    durationDays: 30,
    fee: 1799,
    originalFee: 3499,
    level: 'Beginner to Pro',
    rating: 4.9,
    reviewsCount: 428,
    enrolledStudentsCount: 1850,
    shortDescription: 'Master industrial and domestic sewing machines, body measurement taking, draft cutting, stitching, and finishing of basic to designer apparel.',
    fullDescription: 'Comprehensive hands-on vocational program designed according to national apparel skilling standards. Covers machine maintenance, single needle lockstitch operation, straight seam control, neckline finishing, kurti tailoring, blouse cutting, and garment quality inspection for self-employment or boutique jobs.',
    learningOutcomes: [
      'Operate domestic and industrial high-speed lockstitch sewing machines safely',
      'Accurate body measurements and paper pattern drafting techniques',
      'Stitching classic kurtis, salwar suits, trousers, and designer collars',
      'Zipper attachment, piping, interlock finishing, and hem stitching',
      'Machine troubleshooting, bobbin tension adjustment, and maintenance'
    ],
    prerequisites: ['No prior experience required', 'Access to a standard sewing machine recommended'],
    trainer: {
      name: 'Master Tailor Ramesh Sharma',
      designation: 'Senior Apparel Master & NIFT Vocational Advisor',
      experience: '18+ Years in Garment Manufacturing',
      specialization: 'Pattern Drafting & Commercial Stitching'
    },
    modules: [
      {
        id: 'silai-m1',
        title: 'Module 1: Machine Setup, Needles & Thread Tension',
        lessons: [
          {
            id: 'silai-l1',
            title: '1.1 Domestic vs Industrial Sewing Machines & Components',
            durationMinutes: 18,
            videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
            keyNotes: [
              'Understand hand-wheel rotation, pressure foot lever, and feed dog mechanism.',
              'Thread path: spool pin -> tension discs -> take-up lever -> needle eye.',
              'Safety standard: keep fingers 2 inches clear of needle plate during pedal push.'
            ],
            isPreview: true
          },
          {
            id: 'silai-l2',
            title: '1.2 Needle Sizing (14/16/18) & Bobbin Winding Mastery',
            durationMinutes: 22,
            videoUrl: 'https://www.youtube.com/embed/RrvhF4lQ3H4',
            keyNotes: [
              'Size 14 needle for cotton/crepe; Size 16 for denim and heavy linens.',
              'Even bobbin winding prevents bottom loop stitching errors.',
              'Checking bobbin case spring tension using drop-test technique.'
            ]
          },
          {
            id: 'silai-l3',
            title: '1.3 Straight Seam & Curve Sewing Paper Practice Exercises',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/O7i3K90a78A',
            keyNotes: [
              'Run unthreaded needle across ruled sheet paper to train foot speed.',
              'Pivot needle at corners: leave needle down, lift presser foot, turn fabric 90 degrees.',
              'Maintain consistent 0.5-inch seam allowance along throat plate lines.'
            ]
          }
        ],
        quiz: {
          id: 'silai-q1',
          title: 'Module 1 Assessment: Machine Fundamentals',
          passingScorePercent: 70,
          questions: [
            {
              id: 'sq1',
              question: 'Which needle size is most suitable for sewing medium-weight cotton fabric?',
              options: ['Size 9 (Organza)', 'Size 14 or 16 (Medium Cotton)', 'Size 22 (Heavy Leather)', 'Size 8 (Silk)'],
              correctIndex: 1,
              explanation: 'Size 14 is the standard all-purpose needle for light-to-medium cottons and rayon.'
            },
            {
              id: 'sq2',
              question: 'When pivoting at a 90-degree fabric corner, what is the mandatory position of the needle?',
              options: ['Needle completely up', 'Needle completely down into fabric', 'Needle halfway removed', 'Presser foot removed'],
              correctIndex: 1,
              explanation: 'Leaving the needle down inside the fabric anchors the pivot point without losing seam alignment.'
            },
            {
              id: 'sq3',
              question: 'What causes loose looped threads on the underside of your fabric?',
              options: ['Bobbin inserted backward', 'Top thread tension too loose or unthreaded tension disc', 'Dull scissors', 'Wrong fabric color'],
              correctIndex: 1,
              explanation: 'Bottom loops indicate insufficient top thread tension or missed take-up lever.'
            }
          ]
        }
      },
      {
        id: 'silai-m2',
        title: 'Module 2: Body Measurement, Drafting & Kurti Tailoring',
        lessons: [
          {
            id: 'silai-l4',
            title: '2.1 Standard Measurement Chart for Bust, Waist, Hip & Armhole',
            durationMinutes: 28,
            videoUrl: 'https://www.youtube.com/embed/fD5CqP2U_a8',
            keyNotes: [
              'Chest round measurement with 2 fingers ease allowance.',
              'Shoulder to apex point measurement for correct bust dart placement.',
              'Calculate armhole depth formula: (Chest / 4) - 0.75 inch.'
            ]
          },
          {
            id: 'silai-l5',
            title: '2.2 Paper Pattern Drafting for A-Line & Straight Kurti',
            durationMinutes: 34,
            videoUrl: 'https://www.youtube.com/embed/PkWb3G7eUQI',
            keyNotes: [
              'Front neck depth: 6 to 6.5 inches; Back neck depth: 3 to 4 inches.',
              'Add 1.5 inches side seam margin for future alteration.',
              'Cut front armhole deeper by 0.5 inches than back armhole to prevent chest wrinkles.'
            ]
          },
          {
            id: 'silai-l6',
            title: '2.3 Neckline Canvas Pasting, Piping & Dori Stitching',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
            keyNotes: [
              'Fuse fusible bukram canvas on neckline facing with warm iron.',
              'Clip notch curves before turning inside out for a crisp knife-edge border.',
              'Top-stitch at 1/16th inch edge margin.'
            ]
          }
        ],
        quiz: {
          id: 'silai-q2',
          title: 'Module 2 Assessment: Drafting & Garment Assembly',
          passingScorePercent: 70,
          questions: [
            {
              id: 'sq4',
              question: 'Why is the front armhole curve cut 0.5 inches deeper than the back armhole?',
              options: ['To look decorative', 'To accommodate natural forward arm movement and prevent chest bunching', 'To save fabric', 'It is optional and not recommended'],
              correctIndex: 1,
              explanation: 'The front chest curve accommodates the pectorals and forward arm swing, eliminating excess fabric folds.'
            },
            {
              id: 'sq5',
              question: 'What is the purpose of clipping small V-notches along curved neckline seams before turning?',
              options: ['To prevent thread breakage', 'To relieve tension and allow smooth, flat curvature without bunching', 'To make it loose', 'To mark the center point'],
              correctIndex: 1,
              explanation: 'Notching releases circumference tension, allowing fabric seams to lay flat and smooth inside.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'hand-embroidery-zardozi',
    title: 'Hand Embroidery & Zardozi Basics',
    hindiTitle: 'हस्त कढ़ाई एवं ज़रदोज़ी क्राफ्ट बेसिक्स',
    category: 'Embroidery',
    durationDays: 30,
    fee: 1799,
    originalFee: 3200,
    level: 'Beginner to Pro',
    rating: 4.85,
    reviewsCount: 312,
    enrolledStudentsCount: 1420,
    shortDescription: 'Learn traditional Indian hand embroidery stitches, Aari needle work, metallic Zari threads, Dabka, Sitara, and bridal motifs.',
    fullDescription: 'Unveil the royal art of Zardozi and heritage needlework. This comprehensive 30-day curriculum guides learners from foundational stitches (French knots, satin stitch, herringbone, mirror work) to intricate bridal Zardozi employing metallic Dabka, Nakshi, sequins, and pearls on wooden Adda and hoop frames.',
    learningOutcomes: [
      'Master 25+ classic hand embroidery stitches (Kantha, Phulkari, Kashida motifs)',
      'Handling Aari hook needle for high-speed chain stitch and beadwork',
      'Cutting, threading, and tacking metallic French wire (Dabka and Nakshi)',
      'Designing bridal blouse borders, dupatta edges, and royal motifs',
      'Material sourcing, pricing your handmade products, and client orders'
    ],
    prerequisites: ['Embroidery wooden hoop (8-10 inches)', 'Needles No. 9 and Aari hook', 'Zari metallic threads'],
    trainer: {
      name: 'Ustad Farooq Akhtar',
      designation: 'Master Craftsman & National Handicrafts Awardee',
      experience: '22+ Years in Royal Zardozi Atelier',
      specialization: 'Heritage Lucknowi & Bridal Zardozi'
    },
    modules: [
      {
        id: 'emb-m1',
        title: 'Module 1: Traditional Surface Stitches & Hooping Technique',
        lessons: [
          {
            id: 'emb-l1',
            title: '1.1 Fabric Tensioning on Wooden Ring & Thread Stranding',
            durationMinutes: 20,
            videoUrl: 'https://www.youtube.com/embed/qFq4W9kR9_o',
            keyNotes: [
              'Wrap inner wooden ring with cotton twill tape for drum-tight grip.',
              'Separate Anchor 6-strand floss cleanly without knotting.',
              'Use beeswax or thread conditioner for smooth glide on raw silk.'
            ],
            isPreview: true
          },
          {
            id: 'emb-l2',
            title: '1.2 French Knots, Bullion Roses & Satin Stitch Perfection',
            durationMinutes: 32,
            videoUrl: 'https://www.youtube.com/embed/NnL7P5Gq4B4',
            keyNotes: [
              'Double wrap needle for crisp French knot; hold working thread taut while pulling through.',
              'Bullion rose petals: wrap 8-10 coils around milliner needle.',
              'Satin stitch angle consistency: stitch in parallel slants for light reflection.'
            ]
          }
        ],
        quiz: {
          id: 'emb-q1',
          title: 'Module 1 Assessment: Stitch Anatomy',
          passingScorePercent: 70,
          questions: [
            {
              id: 'eq1',
              question: 'Why should the inner hoop ring be wrapped with cotton tape before mounting silk?',
              options: ['To look colorful', 'To prevent fabric slippage and protect delicate fibers from splinters', 'To make the hoop heavier', 'To absorb moisture'],
              correctIndex: 1,
              explanation: 'Twill tape padding grips fabric evenly like a drum skin and protects delicate silk threads.'
            },
            {
              id: 'eq2',
              question: 'Which needle type is ideal for crafting smooth Bullion knot roses?',
              options: ['Tapestry needle with blunt tip', 'Milliner / Straw needle with uniform eye and shank diameter', 'Thick darning needle', 'Sewing machine needle'],
              correctIndex: 1,
              explanation: 'Milliner needles have equal shaft and eye thickness, allowing wound coils to slide through smoothly.'
            }
          ]
        }
      },
      {
        id: 'emb-m2',
        title: 'Module 2: Royal Zardozi, Dabka & Sitara Embellishment',
        lessons: [
          {
            id: 'emb-l3',
            title: '2.1 Working with Metallic Dabka, Nakshi & Spring Wires',
            durationMinutes: 35,
            videoUrl: 'https://www.youtube.com/embed/Xq-K9yQZt64',
            keyNotes: [
              'Cut Dabka precisely with curved micro scissors to avoid flattening coils.',
              'Thread fine beading needle (No. 10 or 12) through Dabka segments.',
              'Padded underlay using cotton thick cord creates dramatic 3D relief.'
            ]
          },
          {
            id: 'emb-l4',
            title: '2.2 Real Pearl & Cut-Dana Beading Borders for Bridal Wear',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
            keyNotes: [
              'Lock beads with backstitch cadence (every 3 beads lock back 1).',
              'Sequins (Sitara) locking with center glass bead anchor.',
              'Final finishing: paste water-soluble gum on reverse side to secure ends.'
            ]
          }
        ],
        quiz: {
          id: 'emb-q2',
          title: 'Module 2 Assessment: Zardozi & Embellishments',
          passingScorePercent: 70,
          questions: [
            {
              id: 'eq3',
              question: 'How do you prevent cut glass beads (cut-dana) from cutting the embroidery thread?',
              options: ['Use bonded nylon or waxed polyester beading thread', 'Use regular paper thread', 'Never use needles', 'Boil the beads'],
              correctIndex: 0,
              explanation: 'Bonded nylon/polyester thread resists the sharp internal edges of cut-dana beads.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'mehndi-art-bridal-designing',
    title: 'Mehndi Art & Bridal Designing',
    hindiTitle: 'मेहंदी आर्ट एवं ब्राइडल डिज़ाइनिंग कोर्स',
    category: 'Mehndi Art',
    durationDays: 30,
    fee: 1499,
    originalFee: 2999,
    level: 'Beginner to Pro',
    rating: 4.95,
    reviewsCount: 512,
    enrolledStudentsCount: 2200,
    shortDescription: 'From organic henna cone preparation and basic strokes to full bridal figures, lotus jaal, Arabic motifs, and dark stain techniques.',
    fullDescription: 'Become a certified professional bridal Mehndi artist with high-earning wedding season booking skills. Learn organic henna paste formulation for deep mahogany stains, cone holding mechanics, intricate negative spaces, peacock and bride-groom portraits, and contemporary gulf-style fusion.',
    learningOutcomes: [
      'Formulate silky, stringy 100% organic henna paste with essential oils (Eucalyptus/Tea tree)',
      'Roll leak-proof cellophane cones with ultra-fine tips (0.38mm)',
      'Master fundamental elements: swirls, humps, vines, leaves, checks, and dots',
      'Draw expressive Radha-Krishna, Dulha-Dulhan portrait figures and wedding instruments',
      'Client consultation, aftercare instructions, and bridal package pricing'
    ],
    prerequisites: ['Triple-filtered Rajasthani Sojat Henna Powder', 'Cello sheet / Florist film', 'Essential oils'],
    trainer: {
      name: 'Sunita Mehra',
      designation: 'Celebrity Bridal Henna Artist & Academy Founder',
      experience: '14+ Years in Luxury Destination Weddings',
      specialization: 'Intricate Bridal Figures & Moroccan Fusion'
    },
    modules: [
      {
        id: 'meh-m1',
        title: 'Module 1: Henna Chemistry, Cone Crafting & Core Strokes',
        lessons: [
          {
            id: 'meh-l1',
            title: '1.1 Organic Henna Paste Mixing for 48-Hour Peak Dye Release',
            durationMinutes: 24,
            videoUrl: 'https://www.youtube.com/embed/V9x6G8v2T8I',
            keyNotes: [
              'Use 100g Sojat Henna + 30ml Tea Tree/Cajeput oil + 30g sugar.',
              'Rest covered at 25-28°C for 8-12 hours until surface turns deep brown.',
              'Stocking filter method to remove microscopic fiber clumps.'
            ],
            isPreview: true
          },
          {
            id: 'meh-l2',
            title: '1.2 Hand Ergonomics, Cone Pressure & Line Control Practice',
            durationMinutes: 28,
            videoUrl: 'https://www.youtube.com/embed/1JkL6N8v_3U',
            keyNotes: [
              'Hold cone like a precision stylus; thumb exerts controlled fluid pressure.',
              'Never touch cone tip to skin: drape paste in air for laser-sharp lines.',
              'Mastering double-outline humps and micro-shading.'
            ]
          }
        ],
        quiz: {
          id: 'meh-q1',
          title: 'Module 1 Assessment: Henna Fundamentals',
          passingScorePercent: 70,
          questions: [
            {
              id: 'mq1',
              question: 'Why is sugar added to natural henna paste?',
              options: ['To make it smell sweet', 'To keep the paste moist on skin and prevent premature flaking', 'To change the color to green', 'To make it dry instantly'],
              correctIndex: 1,
              explanation: 'Sugar acts as a humectant that retains skin moisture, allowing Lawsonia inermis dye to penetrate skin layers.'
            },
            {
              id: 'mq2',
              question: 'Which technique yields the cleanest, unbroken Mehndi lines?',
              options: ['Dragging the cone tip hard across the skin', 'Draping the henna thread in the air slightly above the skin surface', 'Using watery thin paste', 'Pushing backward with finger'],
              correctIndex: 1,
              explanation: 'Extruding paste and letting gravity drape the fine thread ensures smooth, uniform line width without wobbles.'
            }
          ]
        }
      },
      {
        id: 'meh-m2',
        title: 'Module 2: Bridal Elements, Negative Space & Dulhan Figures',
        lessons: [
          {
            id: 'meh-l3',
            title: '2.1 Drawing Royal Peacocks, Elephants & Lotus Jaal Frameworks',
            durationMinutes: 38,
            videoUrl: 'https://www.youtube.com/embed/K8eN9r4D2s0',
            keyNotes: [
              'Grid alignment: marking symmetrical geometric jaal lines.',
              'Lotus negative fill: outline petals first, fill background with dense paste.',
              'Royal elephant saddle detailing and kalash motifs.'
            ]
          },
          {
            id: 'meh-l4',
            title: '2.2 Bridal Figures: Doli, Varmala & Dulha-Dulhan Facial Proportions',
            durationMinutes: 45,
            videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
            keyNotes: [
              'Facial oval division: eye-line, nose tip, and lip spacing ratios.',
              'Traditional Indian jewelry detailing (Maang tikka, Nath, Jhumkas).',
              'Deep stain aftercare: Clove steam (laung dhuni) and mustard oil massage.'
            ]
          }
        ],
        quiz: {
          id: 'meh-q2',
          title: 'Module 2 Assessment: Bridal Architecture',
          passingScorePercent: 70,
          questions: [
            {
              id: 'mq3',
              question: 'What is the recommended method to remove dried bridal mehndi after 8-12 hours?',
              options: ['Wash thoroughly with hot soapy water', 'Scrape gently with butter knife/card, apply coconut/mustard oil, avoid water for 12 hours', 'Use chemical bleach', 'Rub with ice cubes'],
              correctIndex: 1,
              explanation: 'Water exposure halts the henna oxidation. Scraping followed by natural oil seals the pores and produces deep reddish-brown color.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'beauty-wellness-professional',
    title: 'Beauty & Wellness Professional',
    hindiTitle: 'ब्यूटी एवं वेलनेस प्रोफेशनल सर्टिफिकेशन कोर्स',
    category: 'Beauty & Wellness',
    durationDays: 40,
    fee: 2999,
    originalFee: 5999,
    level: 'Beginner to Pro',
    rating: 4.92,
    reviewsCount: 680,
    enrolledStudentsCount: 3100,
    shortDescription: 'Complete professional cosmetology, skin anatomy, custom facial therapies, salon hair treatments, makeup artistry, and hygiene protocols.',
    fullDescription: 'Launch a thriving beauty salon or freelance bridal styling business. This rigorous 40-day vocational diploma provides extensive training in skin diagnostic analysis, threading, painless waxing, classic to hydra-facial steps, bleach application safety, blow-dry styling, and flawless HD bridal makeup.',
    learningOutcomes: [
      'Skin type diagnosis (Fitzpatrick scale, oily, dry, sensitive, acne-prone)',
      'Precision eyebrow threading and painless liposoluble cartridge waxing',
      'Step-by-step professional facial massage manipulation techniques',
      'Color correction, HD foundation matching, contouring, and false lash application',
      'Sanitization, autoclave sterilization, client consultation cards, and salon management'
    ],
    prerequisites: ['Basic skin care kit', 'Facial tools & sponges', 'Makeup brushes set'],
    trainer: {
      name: 'Dr. Pratibha Joshi',
      designation: 'CIDESCO Gold Medalist & Aesthetic Clinic Director',
      experience: '16+ Years in Professional Cosmetology',
      specialization: 'Clinical Skincare & Bridal HD Artistry'
    },
    modules: [
      {
        id: 'bty-m1',
        title: 'Module 1: Skin Science, Threading & Professional Waxing',
        lessons: [
          {
            id: 'bty-l1',
            title: '1.1 Epidermis Anatomy, Skin Typing & Client Consultation',
            durationMinutes: 26,
            videoUrl: 'https://www.youtube.com/embed/kR7Xk0b9w8Q',
            keyNotes: [
              'Identifying dry vs dehydrated skin barrier deficiencies.',
              'Conducting 24-hour patch test prior to bleach and chemical treatments.',
              'Contraindications: active herpes simplex, open lesions, retinoid use.'
            ],
            isPreview: true
          },
          {
            id: 'bty-l2',
            title: '1.2 Eyebrow Threading Control (Neck holding & Mouth loop method)',
            durationMinutes: 30,
            videoUrl: 'https://www.youtube.com/embed/8eW0m7_Q0vM',
            keyNotes: [
              'No. 40 organic cotton anti-bacterial thread looping.',
              'Arch mapping: nostril-to-pupil line creates natural high arch peak.',
              'Antiseptic astringent soothing post-service to close follicles.'
            ]
          }
        ],
        quiz: {
          id: 'bty-q1',
          title: 'Module 1 Assessment: Esthetics & Sanitation',
          passingScorePercent: 70,
          questions: [
            {
              id: 'bq1',
              question: 'What is the mandatory hygiene protocol for facial extraction tools between clients?',
              options: ['Rinse with tap water', 'Submerge in hospital-grade disinfectant / UV autoclave sterilization', 'Wipe with dry tissue', 'Spray with perfume'],
              correctIndex: 1,
              explanation: 'Metal extraction tools require medical-grade chemical immersion or autoclave heat sterilization to eliminate pathogens.'
            },
            {
              id: 'bq2',
              question: 'When waxing body hair, in which direction should the wax strip be pulled off?',
              options: ['In the direction of hair growth', 'Straight up towards the ceiling', 'Parallel and close to the skin against hair growth direction', 'In circular motions'],
              correctIndex: 2,
              explanation: 'Pulling parallel against hair growth removes roots cleanly without breaking hair shafts or bruising skin.'
            }
          ]
        }
      },
      {
        id: 'bty-m2',
        title: 'Module 2: Deep Cleansing Facials & HD Bridal Makeup',
        lessons: [
          {
            id: 'bty-l3',
            title: '2.1 7-Step Classical Facial: Effleurage, Petrissage & Lymphatic Drain',
            durationMinutes: 40,
            videoUrl: 'https://www.youtube.com/embed/0X9Y8_Kk7sQ',
            keyNotes: [
              'Cleansing -> Exfoliating steam -> Blackhead extraction -> Serum ampoule.',
              'Effleurage stroke direction: always upward and outward along jawline and cheekbones.',
              'Rubberizing peel-off modeling mask setting time and peel technique.'
            ]
          },
          {
            id: 'bty-l4',
            title: '2.2 HD Airbrush-Look Bridal Makeup, Color Correction & Setting',
            durationMinutes: 48,
            videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
            keyNotes: [
              'Orange corrector for dark circles; peach corrector for pigmented spots.',
              'Damp microfiber sponge bounce technique for sheer second-skin finish.',
              'Baking T-zone with micro-fine translucent silica powder for sweat resistance.'
            ]
          }
        ],
        quiz: {
          id: 'bty-q2',
          title: 'Module 2 Assessment: Skincare & Bridal Glamour',
          passingScorePercent: 70,
          questions: [
            {
              id: 'bq3',
              question: 'Which color corrector neutralizes dark blue/purple under-eye circles on warm Indian skin tones?',
              options: ['Green corrector', 'Orange or Peach corrector', 'White concealer', 'Yellow shimmer'],
              correctIndex: 1,
              explanation: 'Orange/Peach sits opposite blue-violet on the color wheel, effectively neutralizing melanin hyperpigmentation.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'boutique-master-combo',
    title: 'Boutique Master Combo (Silai + Embroidery)',
    hindiTitle: 'बुटीक मास्टर कॉम्बो (सिलाई + हस्त कशीदाकारी)',
    category: 'Combo Package',
    durationDays: 50,
    fee: 3999,
    originalFee: 6998,
    level: 'Advanced Masterclass',
    rating: 4.98,
    reviewsCount: 890,
    enrolledStudentsCount: 4500,
    shortDescription: 'Dual-specialization flagship package: Complete Garment Making & Industrial Tailoring combined with Heritage Hand Embroidery & Zardozi craft.',
    fullDescription: 'The ultimate entrepreneurial training package designed for women and aspiring boutique entrepreneurs. Learn to create finished designer ethnic wear from raw cloth: cut, stitch, and personally embellish luxury bridal lehengas, Anarkalis, and designer blouses with royal Zardozi and mirror work.',
    learningOutcomes: [
      'Full syllabus of Silai Machine Operator (Garment Making)',
      'Full syllabus of Hand Embroidery & Zardozi Basics',
      'Integrated boutique project: Design, cut, stitch, and embroider a bridal crop top & lehenga',
      'Cost calculation, fabric sourcing from wholesale hubs, and pricing for profit margins',
      'Dual Diploma Certification qualifying for commercial boutique licensing'
    ],
    prerequisites: ['Sewing machine', 'Embroidery hoop and Zari supplies'],
    trainer: {
      name: 'Ramesh Sharma & Ustad Farooq',
      designation: 'Joint Faculty: Master Couturier & Heritage Embroidery Maestro',
      experience: '35+ Combined Years',
      specialization: 'Complete Boutique Production & Bridal Couture'
    },
    modules: [
      {
        id: 'bmc-m1',
        title: 'Module 1: Tailoring & Structural Garment Engineering',
        lessons: [
          {
            id: 'bmc-l1',
            title: '1.1 Industrial Machine Operation & Seam Mastery',
            durationMinutes: 25,
            videoUrl: 'https://www.youtube.com/embed/5-b0j91c0bI',
            keyNotes: [
              'Operating direct-drive servo motor machines with silent needle stop positioning.',
              'French seams, flat felled seams, and bias binding edge treatments.'
            ],
            isPreview: true
          },
          {
            id: 'bmc-l2',
            title: '1.2 Princess Cut Blouse & Kalidar Lehenga Drafting',
            durationMinutes: 42,
            videoUrl: 'https://www.youtube.com/embed/PkWb3G7eUQI',
            keyNotes: [
              'Padded cups insertion technique inside lining panels.',
              '16-kali lehenga flare geometric drafting and canvas hem border.'
            ]
          }
        ],
        quiz: {
          id: 'bmc-q1',
          title: 'Module 1 Assessment: Boutique Garment Construction',
          passingScorePercent: 70,
          questions: [
            {
              id: 'bq1',
              question: 'In a princess-cut blouse, why are padded cups anchored to the inner lining rather than the outer silk fabric?',
              options: ['To allow seamless movement without visible stitches on outer silk', 'To save thread', 'It does not matter', 'To make it loose'],
              correctIndex: 0,
              explanation: 'Anchoring cups to the interior structural lining keeps the outer fashion fabric smooth and unblemished.'
            }
          ]
        }
      },
      {
        id: 'bmc-m2',
        title: 'Module 2: Integrated Zardozi Embellishment & Boutique Launch',
        lessons: [
          {
            id: 'bmc-l3',
            title: '2.1 Direct-on-Garment Zardozi Neckline & Border Stenciling',
            durationMinutes: 38,
            videoUrl: 'https://www.youtube.com/embed/Xq-K9yQZt64',
            keyNotes: [
              'Tracing paper pinprick & kerosene-chalk paste stenciling on velvet and silk.',
              'Executing heavy Dabka and Kasab work within stitched neckline frames.'
            ]
          },
          {
            id: 'bmc-l4',
            title: '2.2 Pricing Formula, Wholesale Sourcing & Client Fitting Records',
            durationMinutes: 35,
            videoUrl: 'https://www.youtube.com/embed/qFq4W9kR9_o',
            keyNotes: [
              'Formula: Raw Materials + (Artisan Labor Hours x Rate) + 30% Boutique Overhead.',
              'Customer trial fitting checklist: shoulder drop, bust ease, waist comfort.'
            ]
          }
        ],
        quiz: {
          id: 'bmc-q2',
          title: 'Module 2 Assessment: Boutique Enterprise',
          passingScorePercent: 70,
          questions: [
            {
              id: 'bq2',
              question: 'What is the standard profit margin markup recommended for custom bridal couture boutiques?',
              options: ['2% to 3%', '25% to 40% over direct material and labor cost', '0%', '200% loss'],
              correctIndex: 1,
              explanation: 'A 25% to 40% margin covers operational studio expenses, rent, alteration buffers, and business reinvestment.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'bridal-studio-combo',
    title: 'Bridal Studio Combo (Beauty + Mehndi)',
    hindiTitle: 'ब्राइडल स्टूडियो कॉम्बो (ब्यूटी + मेहंदी आर्ट)',
    category: 'Combo Package',
    durationDays: 50,
    fee: 3999,
    originalFee: 6498,
    level: 'Advanced Masterclass',
    rating: 4.97,
    reviewsCount: 760,
    enrolledStudentsCount: 3890,
    shortDescription: 'Dual-specialization bridal empire package: Professional Beauty & Cosmetology diploma coupled with Advanced Bridal Mehndi Artistry.',
    fullDescription: 'Become an all-in-one bridal beauty artist sought after for destination weddings. Offer complete high-ticket bridal makeovers: skin rejuvenation facials, HD bridal glamour, hair updos with fresh flowers, dupatta draping, and intricate royal bridal henna for both hands and feet.',
    learningOutcomes: [
      'Complete Beauty & Wellness Professional curriculum',
      'Complete Mehndi Art & Bridal Designing curriculum',
      'Complete Bridal Day Workflow: Time management from mehndi night to wedding day glam',
      'Bridal hair styling (Russian braids, floral buns, front puff variations) & Dupatta setting',
      'Dual Specialization Certificate qualifying as Lead Bridal Stylist'
    ],
    prerequisites: ['Beauty salon kit', 'Organic henna supplies', 'Hair styling mannequin or tools'],
    trainer: {
      name: 'Sunita Mehra & Dr. Pratibha Joshi',
      designation: 'Joint Bridal Master Faculty: Celebrity Henna Artist & Aesthetician',
      experience: '30+ Combined Years',
      specialization: 'Luxury Bridal Studio Transformations'
    },
    modules: [
      {
        id: 'bsc-m1',
        title: 'Module 1: Pre-Bridal Skincare & Bridal Glamour',
        lessons: [
          {
            id: 'bsc-l1',
            title: '1.1 30-Day Pre-Bridal Skin Transformation Regimen',
            durationMinutes: 32,
            videoUrl: 'https://www.youtube.com/embed/0X9Y8_Kk7sQ',
            keyNotes: [
              'Custom timeline: Body polish 5 days prior, gold collagen facial 3 days prior.',
              'Preventing breakout flareups right before wedding festivities.'
            ],
            isPreview: true
          },
          {
            id: 'bsc-l2',
            title: '1.2 Waterproof HD Bridal Makeup & 18-Hour Setting Technique',
            durationMinutes: 44,
            videoUrl: 'https://www.youtube.com/embed/kR7Xk0b9w8Q',
            keyNotes: [
              'Layering waterproof sweat-proof primers and high-pigment creams.',
              'Tear-proof eyelash glue and water-resistant gel eyeliner tightlining.'
            ]
          }
        ],
        quiz: {
          id: 'bsc-q1',
          title: 'Module 1 Assessment: Bridal Artistry',
          passingScorePercent: 70,
          questions: [
            {
              id: 'bsq1',
              question: 'How many days before the wedding should intensive chemical peels or deep extractions be avoided?',
              options: ['At least 10 to 14 days prior', '1 hour prior', 'Never avoid it', 'During the wedding'],
              correctIndex: 0,
              explanation: 'Aggressive treatments require 10-14 days to fully heal and prevent post-inflammatory erythema under wedding lights.'
            }
          ]
        }
      },
      {
        id: 'bsc-m2',
        title: 'Module 2: Complete Bridal Mehndi & Dupatta Draping Masterclass',
        lessons: [
          {
            id: 'bsc-l3',
            title: '2.1 Full-Arm & Feet Traditional Bridal Henna Architecture',
            durationMinutes: 46,
            videoUrl: 'https://www.youtube.com/embed/K8eN9r4D2s0',
            keyNotes: [
              'Symmetrical wrist cuff transitions and floral mandala centerpieces.',
              'Speed-drills: completing both hands up to elbows in under 3.5 hours.'
            ]
          },
          {
            id: 'bsc-l4',
            title: '2.2 Royal Dupatta Draping Styles & Hair Bun Styling',
            durationMinutes: 36,
            videoUrl: 'https://www.youtube.com/embed/V9x6G8v2T8I',
            keyNotes: [
              'Gujarati front pallu, royal double-dupatta anchoring with hairpins.',
              'Secure head-veil placement with safety anchor threads to avoid tugging.'
            ]
          }
        ],
        quiz: {
          id: 'bsc-q2',
          title: 'Module 2 Assessment: Complete Bridal Presentation',
          passingScorePercent: 70,
          questions: [
            {
              id: 'bsq2',
              question: 'How should a heavy embroidered bridal head dupatta be anchored securely?',
              options: ['With a single sewing needle', 'Using criss-crossed bobby pins anchored to a hidden back hair teasing cushion', 'With tape only', 'Leaving it loose'],
              correctIndex: 1,
              explanation: 'Criss-crossing pins into a solid back-combed hair foundation distributes weight evenly without straining the bride’s scalp.'
            }
          ]
        }
      }
    ]
  }
];

export const INITIAL_STUDENT = {
  id: 'std_9024',
  name: 'Pooja Verma',
  email: 'pooja.verma@example.com',
  phone: '+91 98765 43210',
  role: 'student' as const,
  joinedAt: '2026-09-01T10:00:00.000Z',
  avatarUrl: ''
};

export const INITIAL_ENROLLMENT: Enrollment = {
  id: 'enr_8820',
  studentId: 'std_9024',
  studentName: 'Pooja Verma',
  studentEmail: 'pooja.verma@example.com',
  courseId: 'silai-machine-operator',
  courseTitle: 'Silai Machine Operator (Garment Making)',
  amountPaid: 1799,
  paymentMethod: 'UPI_QR',
  transactionRef: 'UPI/2026/894210348712',
  enrolledAt: '2026-09-02T11:30:00.000Z',
  status: 'ACTIVE',
  completedLessonIds: ['silai-l1', 'silai-l2'],
  passedQuizIds: ['silai-q1']
};

export const DIRECTOR_INFO = {
  name: 'Prashant Sagar',
  designation: 'Director & Head of Vocational Skilling Council',
  organization: 'HunarSetu Vocational Skill Training Academy',
  headOffice: 'Barabanki Head Office, Uttar Pradesh - 225001, India',
  phone: '7800897677',
  email: 'prashantsagarmepl@gmail.com'
};

export const FRANCHISE_INFO = {
  title: 'Become a HunarSetu Franchise / Training Center Partner',
  subtitle: 'Partner with India’s leading vocational skilling mission. Launch a certified training center in your district or block.',
  phone: '7800897677',
  whatsappUrl: 'https://wa.me/917800897677?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20HunarSetu%20Franchise%20Partner%20Training%20Center.',
  benefits: [
    'Government curriculum alignment & LMS platform access',
    'Certified training kits, sewing machinery vendor tie-ups & study materials',
    'Automated online examinations & instant verifiable PDF certificates',
    'Full marketing, banner design, and student admission lead support'
  ],
  headOffice: 'Barabanki Head Office, Uttar Pradesh'
};

export interface JobRoleInfo {
  id: string;
  roleTitle: string;
  category: string;
  salaryRange: string;
  demandLevel: 'High' | 'Very High' | 'Top Trend';
  icon: string;
  skillsRequired: string[];
  hiringPartners: string;
  description: string;
}

export const JOB_ROLES: JobRoleInfo[] = [
  {
    id: 'jr-1',
    roleTitle: 'Industrial Garment Machine Operator',
    category: 'Garment Making',
    salaryRange: '₹18,000 - ₹28,000 / month',
    demandLevel: 'High',
    icon: '✂️',
    skillsRequired: ['Single Needle Lockstitch', 'Overlock Machine', 'Speed Seam Control'],
    hiringPartners: 'Garment Export Houses, Shahi Exports, Arvind Mills',
    description: 'High employment demand in textile hubs, garment manufacturing units, and industrial apparel factories across UP, Noida, and NCR.'
  },
  {
    id: 'jr-2',
    roleTitle: 'Independent Designer Boutique Owner',
    category: 'Silai + Embroidery Combo',
    salaryRange: '₹40,000 - ₹90,000+ / month',
    demandLevel: 'Top Trend',
    icon: '👗',
    skillsRequired: ['Pattern Drafting', 'Blouse & Kurti Tailoring', 'Client Fitting & Billing'],
    hiringPartners: 'Self-Employed Entrepreneurship',
    description: 'Establish your own ladies tailoring boutique or customized ethnic wear atelier in your local town or market.'
  },
  {
    id: 'jr-3',
    roleTitle: 'Heritage Zardozi & Aari Hand Craftsman',
    category: 'Hand Embroidery',
    salaryRange: '₹25,000 - ₹45,000 / month',
    demandLevel: 'High',
    icon: '🪡',
    skillsRequired: ['Aari Needle Hook', 'Dabka & Nakshi Wire', 'Bridal Blouse Borders'],
    hiringPartners: 'Couture Design Studios, Lucknowi Chikan Houses, Sabyasachi Ateliers',
    description: 'Work with luxury fashion houses or take direct export orders for bridal lehengas, sherwanis, and ornate ethnic garments.'
  },
  {
    id: 'jr-4',
    roleTitle: 'Professional Bridal Mehndi Artist',
    category: 'Mehndi Art',
    salaryRange: '₹5,000 - ₹25,000 per bridal booking',
    demandLevel: 'Top Trend',
    icon: '🌿',
    skillsRequired: ['Organic Henna Formulation', 'Dulha-Dulhan Figures', 'Arabic & Lotus Jaal'],
    hiringPartners: 'Wedding Event Planners, Freelance Bridal Bookings',
    description: 'Top-tier earning potential during wedding and festive seasons (Karva Chauth, Teej, Weddings) with zero material overhead.'
  },
  {
    id: 'jr-5',
    roleTitle: 'Certified Beauty & Cosmetology Stylist',
    category: 'Beauty & Wellness',
    salaryRange: '₹22,000 - ₹45,000 / month',
    demandLevel: 'Very High',
    icon: '✨',
    skillsRequired: ['HD Bridal Makeup', 'Hydra Facial Therapies', 'Sanitization & Skin Care'],
    hiringPartners: 'Jawed Habib, Naturals Salon, VLCC, Urban Company Freelance',
    description: 'Work as senior beautician or start your own home-service bridal makeover studio with high customer retention.'
  },
  {
    id: 'jr-6',
    roleTitle: 'Bridal Makeover Studio Entrepreneur',
    category: 'Beauty + Mehndi Combo',
    salaryRange: '₹60,000 - ₹1,50,000+ / wedding season',
    demandLevel: 'Top Trend',
    icon: '👑',
    skillsRequired: ['Complete Bridal Glamour', 'Full Hand Mehndi', 'Hair Styling & Saree Draping'],
    hiringPartners: 'Exclusive Bridal Studio Owner',
    description: 'The complete high-ticket package for modern brides offering one-stop hair, skin, makeup, and royal henna transformations.'
  }
];

export interface StudentTestimonial {
  id: string;
  name: string;
  city: string;
  courseTaken: string;
  avatarUrl: string;
  rating: number;
  currentRole: string;
  incomeImpact: string;
  quote: string;
}

export const STUDENT_TESTIMONIALS: StudentTestimonial[] = [
  {
    id: 't-1',
    name: 'Sushila Devi',
    city: 'Barabanki, UP',
    courseTaken: 'Silai Machine Operator (Garment Making)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    currentRole: 'Boutique Owner, Sushila Tailors',
    incomeImpact: 'Now earning ₹32,000/month',
    quote: 'Sir Prashant Sagar’s vocational training in Barabanki gave me the confidence to buy two commercial sewing machines. The video lessons and pattern drafting lessons were so clear. My certificate is framed in my shop!'
  },
  {
    id: 't-2',
    name: 'Priya Sharma',
    city: 'Lucknow, UP',
    courseTaken: 'Mehndi Art & Bridal Designing',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    currentRole: 'Freelance Bridal Mehndi Artist',
    incomeImpact: 'Earned ₹85,000 last wedding season',
    quote: 'I learned organic henna making and figure drawings. Earlier I could only do simple vines, now I take ₹7,000 for each full bridal order. The automated certificate proved my professionalism to high-profile clients.'
  },
  {
    id: 't-3',
    name: 'Anjali Verma',
    city: 'Kanpur, UP',
    courseTaken: 'Beauty & Wellness Professional',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    currentRole: 'Senior Stylist at Premium Salon',
    incomeImpact: 'Secured ₹28,000/month job',
    quote: 'The video modules on skin anatomy and HD foundation matching helped me crack my salon interview on the first try. Thank you HunarSetu and Director Prashant Sagar for such high quality skilling.'
  },
  {
    id: 't-4',
    name: 'Kavita Rawat',
    city: 'Faizabad / Ayodhya, UP',
    courseTaken: 'Boutique Master Combo (Silai + Embroidery)',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=160&h=160&q=80',
    rating: 5,
    currentRole: 'Ethnic Wear Designer',
    incomeImpact: 'Monthly revenue ₹45,000+',
    quote: 'Combining machine sewing with Zardozi embroidery was the best decision. I stitch designer blouses with Dabka work and sell them to customers across Lucknow and Barabanki.'
  }
];

export const INITIAL_EMAILS: EmailNotification[] = [
  {
    id: 'eml-101',
    recipientEmail: 'pooja.verma@example.com',
    recipientName: 'Pooja Verma',
    subject: 'Welcome to Silai Machine Operator Training - HunarSetu LMS',
    type: 'ENROLLMENT_CONFIRMATION',
    sentAt: '2026-09-02T11:31:00.000Z',
    body: 'Dear Pooja Verma, Congratulations on your enrollment in the Silai Machine Operator (Garment Making) 30-Day Training Programme. Your registration for ₹1,799 has been verified by the Barabanki Head Office. You can now access all learning modules, video lessons, and interactive assessments.'
  },
  {
    id: 'eml-102',
    recipientEmail: 'pooja.verma@example.com',
    recipientName: 'Pooja Verma',
    subject: 'Tax Invoice & Payment Receipt #HS-INV-2026-8820',
    type: 'PAYMENT_RECEIPT',
    sentAt: '2026-09-02T11:32:00.000Z',
    body: 'Thank you for your payment of ₹1,799 to HunarSetu Skill Development Trust, Barabanki Head Office. Course: Silai Machine Operator (Garment Making). Director: Prashant Sagar.'
  }
];

export const INITIAL_TOP_LEARNERS: LeaderboardLearner[] = [
  {
    id: 'lrn-1',
    rank: 1,
    name: 'Sunita Maurya',
    city: 'Barabanki, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'silai-machine-operator',
    courseTitle: 'Silai Machine Operator (Garment Making)',
    category: 'Garment Making',
    completionDays: 19,
    totalCourseDays: 30,
    quizScorePercent: 100,
    lessonsCompleted: 9,
    totalLessons: 9,
    badge: 'Master Tailor Distinction 🥇',
    kudosCount: 142
  },
  {
    id: 'lrn-2',
    rank: 2,
    name: 'Afsana Khatoon',
    city: 'Lucknow, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'embroidery-zardozi-basics',
    courseTitle: 'Hand Embroidery & Zardozi Basics',
    category: 'Embroidery',
    completionDays: 22,
    totalCourseDays: 30,
    quizScorePercent: 98,
    lessonsCompleted: 9,
    totalLessons: 9,
    badge: 'Royal Zardozi Gold Star 🥈',
    kudosCount: 118
  },
  {
    id: 'lrn-3',
    rank: 3,
    name: 'Meera Soni',
    city: 'Varanasi, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'mehndi-art-bridal-designing',
    courseTitle: 'Mehndi Art & Bridal Designing',
    category: 'Mehndi Art',
    completionDays: 20,
    totalCourseDays: 30,
    quizScorePercent: 97,
    lessonsCompleted: 8,
    totalLessons: 8,
    badge: 'Bridal Art Specialist 🥉',
    kudosCount: 96
  },
  {
    id: 'lrn-4',
    rank: 4,
    name: 'Rekha Yadav',
    city: 'Kanpur, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'beauty-wellness-professional',
    courseTitle: 'Beauty & Wellness Professional',
    category: 'Beauty & Wellness',
    completionDays: 28,
    totalCourseDays: 40,
    quizScorePercent: 95,
    lessonsCompleted: 10,
    totalLessons: 10,
    badge: 'Salon Pro Stylist ⭐',
    kudosCount: 84
  },
  {
    id: 'lrn-5',
    rank: 5,
    name: 'Shabnam Ansari',
    city: 'Mau, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'boutique-master-combo',
    courseTitle: 'Boutique Master Combo (Silai + Embroidery)',
    category: 'Combo Package',
    completionDays: 36,
    totalCourseDays: 50,
    quizScorePercent: 94,
    lessonsCompleted: 14,
    totalLessons: 14,
    badge: 'Boutique Master Leader',
    kudosCount: 71
  },
  {
    id: 'lrn-6',
    rank: 6,
    name: 'Deepa Sharma',
    city: 'Faizabad / Ayodhya, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'bridal-studio-combo',
    courseTitle: 'Bridal Studio Combo (Beauty + Mehndi)',
    category: 'Combo Package',
    completionDays: 39,
    totalCourseDays: 50,
    quizScorePercent: 93,
    lessonsCompleted: 15,
    totalLessons: 15,
    badge: 'Bridal Studio Master',
    kudosCount: 65
  },
  {
    id: 'lrn-7',
    rank: 7,
    name: 'Sangeeta Kashyap',
    city: 'Sitapur, UP',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    courseId: 'silai-machine-operator',
    courseTitle: 'Silai Machine Operator (Garment Making)',
    category: 'Garment Making',
    completionDays: 24,
    totalCourseDays: 30,
    quizScorePercent: 92,
    lessonsCompleted: 9,
    totalLessons: 9,
    badge: 'Garment Specialist',
    kudosCount: 52
  }
];

export const INITIAL_CUSTOM_PAGES: CustomPage[] = [
  {
    id: 'page-1',
    slug: 'practical-workshops',
    title: 'Hands-on Practical Workshops 2026',
    hindiTitle: 'व्यावहारिक प्रशिक्षण कार्यशालाएं',
    category: 'Workshops',
    author: 'Director Prashant Sagar',
    isPublished: true,
    showInHeader: true,
    showInFooter: true,
    bannerImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Quarterly state-wide hands-on workshops in garment drafting, zardozi work, and bridal cosmetology conducted at Barabanki & partner centers.',
    content: `## Hands-on Vocational Workshops 2026

Under the leadership of **Director Prashant Sagar**, HunarSetu conducts monthly intensive physical workshops across regional training facilities.

### Workshop Focus Areas:
1. **Apparel Cutting & Industrial Juki Machine Operation**:
   - Master straight line, curve, and reverse feed stitching.
   - Needle replacement, safety finger guards, and presser foot tension adjustments.
2. **Gold Thread & Zardozi Hand Embroidery**:
   - Traditional frame (Adda) mounting and tensioning.
   - Aari needle work with metallic wire (Salma, Sitara, and Dabka).
3. **Bridal Make-up & High Definition Contouring**:
   - Skin prep, undertone analysis, bridal hairstyle pinning, and waterproof finish.
4. **Boutique Entrepreneurship & Micro-Financing**:
   - Setting up a home boutique with ₹15,000–₹25,000 initial capital.
   - PMMY (Mudra Loan) assistance and government subsidy filing.

### Certification & Materials Provided:
Every registered student receives a physical toolkit, sample cloth pack, and attendance credentials verified on the HunarSetu state portal.`,
    createdAt: '2026-01-10',
    updatedAt: '2026-03-01'
  },
  {
    id: 'page-2',
    slug: 'syllabus-curriculum',
    title: 'Official Skill Curriculum & Framework',
    hindiTitle: 'आधिकारिक कौशल पाठ्यक्रम एवं रूपरेखा',
    category: 'Syllabus',
    author: 'Curriculum Development Board',
    isPublished: true,
    showInHeader: true,
    showInFooter: true,
    bannerImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'National occupational standards aligned vocational curriculum for self-employment, garment manufacturing, and beauty wellness industries.',
    content: `## HunarSetu Vocational Skilling Curriculum Standard

Our vocational syllabus is crafted to bridge the gap between rural/semi-urban aspirations and viable market livelihoods.

### Key Highlights of our Learning Matrix:
- **30% Theory & Visual Anatomy**: Machine mechanisms, fabric science, hygiene, and tools.
- **70% Hands-on Practical Projects**: Real garment construction, client draping, pattern grading, and bridal application.
- **Encrypted High-Definition Video Modules**: Watermarked video lessons available 24/7 for step-by-step revision.
- **Objective Multi-level Assessment**: 70% passing threshold for accredited government-recognized certificate.

### Industry Recognition:
Graduates are awarded an official certificate bearing a tamper-proof QR code and unique verification key recognized by boutique unions and regional apparel clusters.`,
    createdAt: '2026-01-15',
    updatedAt: '2026-02-20'
  },
  {
    id: 'page-3',
    slug: 'success-stories',
    title: 'Student Success Stories & Self-Reliance',
    hindiTitle: 'सफल छात्रों की कहानियां एवं आत्मनिर्भरता',
    category: 'Success Stories',
    author: 'Student Welfare Cell',
    isPublished: true,
    showInHeader: false,
    showInFooter: true,
    bannerImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    metaDescription: 'Inspiring stories of women and youths who started self-owned tailoring shops, embroidery centers, and beauty studios after HunarSetu training.',
    content: `## Transforming Lives Through Practical Vocational Skills

More than 12,400+ students across Uttar Pradesh and neighboring states have graduated from HunarSetu programs under **Director Prashant Sagar**.

### Featured Success Highlights:
- **Pooja Verma (Lucknow, UP)**: Started *Shri Ram Designer Boutique* after completing the Silai Machine Operator program. She now employs 3 local women and earns ₹35,000+ monthly.
- **Shabnam Ansari (Mau, UP)**: Enrolled in the Boutique Master Combo and opened an Aari-Zardozi handcraft studio catering to wholesale bridal orders.
- **Kavita Devi (Barabanki, UP)**: Started mobile bridal makeup and mehndi services, generating income for her family while managing household responsibilities.`,
    createdAt: '2026-02-01',
    updatedAt: '2026-03-15'
  }
];

export const INITIAL_WEBSITE_SETTINGS: WebsiteManualSettings = {
  customDomain: 'hunarsetu.online',
  websiteUrl: 'https://hunarsetu.online',
  announcementTicker: '⚡ Admissions Open for 2026 Batch! Government Recognized Skill Certification · Call Barabanki Head Office: 7800897677',
  heroHeadline: 'हुनर से रोज़गार तक — A Skill Bridge for Self-Reliance',
  heroSubheadline: 'Empowering youths, women artisans, and entrepreneurs with certified vocational training in Garment Making, Embroidery, Bridal Mehndi, and Beauty Wellness.',
  helplinePhone: '7800897677',
  helplineEmail: 'prashantsagarmepl@gmail.com',
  headOfficeAddress: 'Barabanki Head Office, Uttar Pradesh - 225001, India',
  directorName: 'Director Prashant Sagar',
  directorMessage: 'Our mission is to ensure every Indian household has a self-reliant skilled artisan capable of sustaining dignified livelihood.',
  statsTrainedStudents: 12450,
  statsPlacementRate: 88,
  statsPartnerCenters: 42,
  statsSkillCertificates: 11800,
  bannerAlertActive: true
};

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'lead-1',
    name: 'Suman Rawat',
    phone: '9876501234',
    email: 'suman.r@gmail.com',
    city: 'Barabanki',
    interestedCourseId: 'silai-machine-operator',
    interestedCourseTitle: 'Silai Machine Operator (Garment Making)',
    learningGoal: 'Want to open a tailoring boutique at home',
    source: 'AI_BOT',
    status: 'NEW',
    notes: 'Interested in morning batch timings and machine requirements',
    capturedAt: '2026-03-27 14:30',
    aiSuggestedCourse: 'Silai Machine Operator (Garment Making)'
  },
  {
    id: 'lead-2',
    name: 'Mohammad Farooq',
    phone: '9811223344',
    email: 'farooq.tailors@yahoo.com',
    city: 'Lucknow',
    interestedCourseId: 'boutique-master-combo',
    interestedCourseTitle: 'Boutique Master Combo (Silai + Embroidery)',
    learningGoal: 'Upgrade bridal blouse cutting and zardozi finishing for shop',
    source: 'AI_BOT',
    status: 'CONTACTED',
    notes: 'Called on 28th March, shared syllabus PDF',
    capturedAt: '2026-03-26 11:15',
    aiSuggestedCourse: 'Boutique Master Combo'
  },
  {
    id: 'lead-3',
    name: 'Renu Chaurasia',
    phone: '9935112244',
    city: 'Ayodhya',
    interestedCourseId: 'mehndi-art-bridal-designing',
    interestedCourseTitle: 'Mehndi Art & Bridal Designing',
    learningGoal: 'Professional bridal cone making and bridal orders',
    source: 'WEBSITE_HERO',
    status: 'ENROLLED',
    notes: 'Enrolled via UPI QR payment directly',
    capturedAt: '2026-03-25 16:45',
    aiSuggestedCourse: 'Mehndi Art & Bridal Designing'
  }
];




