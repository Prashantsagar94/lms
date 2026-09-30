import { GoogleGenAI } from '@google/genai';
import { Course } from '../types';

// System prompt grounding the AI with HunarSetu LMS vocational knowledge
const buildSystemInstruction = (courses: Course[], directorName: string, helpline: string) => {
  const courseSummaries = courses.map(c => 
    `- ${c.title} (${c.hindiTitle}): ${c.durationDays} Days, Fee: ₹${c.fee} (Original: ₹${c.originalFee}), Category: ${c.category}, Trainer: ${c.trainer.name}. Description: ${c.shortDescription}`
  ).join('\n');

  return `You are "HunarBot" (हुनर सहायक), the official friendly and knowledgeable AI Educational Counselor for HunarSetu Vocational Skill Training Academy (Head Office: Barabanki, Uttar Pradesh under ${directorName}, Helpline: ${helpline}).

YOUR MISSION:
1. Provide warm, encouraging, authoritative, and practical guidance in English, Hindi, or Hinglish (depending on the user's language).
2. Answer ANY question related to vocational courses, syllabus, sewing machine operation, hand embroidery, bridal mehndi, salon cosmetics, job placements, self-employment boutique setups, government recognized certification, and admissions.
3. Be supportive to aspiring artisans, women entrepreneurs, tailors, and students.
4. When relevant, proactively recommend suitable courses and encourage them to connect with our counseling desk or request a callback.

AVAILABLE ACCREDITED COURSES:
${courseSummaries}

LEADERSHIP & TRUST:
- Director: ${directorName}
- Official Website Portal: https://hunarsetu.online
- Barabanki Head Office: Uttar Pradesh - 225001
- Helpline & WhatsApp: ${helpline}
- Certifications: Verifiable online at https://hunarsetu.online with unique ID & gold seal.

STYLE:
- Concise, polite, structured with bullet points.
- If asked about machine issues, stitching, henna recipe, or cosmetology, give real practical advice.
- Keep responses within 3-4 short paragraphs or bullet points.`;
};

// Fallback intelligent offline knowledge engine if Gemini quota is exhausted or offline
export const generateLocalAIResponse = (
  userMessage: string,
  courses: Course[],
  directorName: string,
  helpline: string
): { reply: string; suggestedCourse?: string; promptLeadCapture: boolean } => {
  const lower = userMessage.toLowerCase();

  // Check for course matches
  const matchedCourse = courses.find(c => 
    lower.includes(c.title.toLowerCase()) || 
    lower.includes(c.category.toLowerCase()) ||
    (c.id === 'silai-machine-operator' && (lower.includes('silai') || lower.includes('sewing') || lower.includes('tailor') || lower.includes('cutting') || lower.includes('pant') || lower.includes('kurti') || lower.includes('blouse'))) ||
    (c.id === 'embroidery-zardozi-basics' && (lower.includes('embroidery') || lower.includes('zardozi') || lower.includes('aari') || lower.includes('kadhai') || lower.includes('needle'))) ||
    (c.id === 'mehndi-art-bridal-designing' && (lower.includes('mehndi') || lower.includes('mehendi') || lower.includes('henna') || lower.includes('cone') || lower.includes('bridal'))) ||
    (c.id === 'beauty-wellness-professional' && (lower.includes('beauty') || lower.includes('makeup') || lower.includes('parlour') || lower.includes('parlor') || lower.includes('facial') || lower.includes('skin'))) ||
    (lower.includes('combo') || lower.includes('boutique') || lower.includes('both'))
  );

  // Fee / Price inquiry
  if (lower.includes('fee') || lower.includes('fees') || lower.includes('cost') || lower.includes('price') || lower.includes('kitna') || lower.includes('rupaye') || lower.includes('paisa')) {
    if (matchedCourse) {
      return {
        reply: `✨ **${matchedCourse.title}** Fee Details:\n\n• **Special Subsidized Fee**: ₹${matchedCourse.fee.toLocaleString('en-IN')} *(Original: ₹${matchedCourse.originalFee.toLocaleString('en-IN')} - 49% Off)*\n• **Duration**: ${matchedCourse.durationDays} Days (Lifetime access to video lessons & notes)\n• **Includes**: Complete video curriculum, practical drafting patterns, online assessment, and Director-signed verifiable PDF certificate.\n\n*Payment methods supported: UPI QR (PhonePe, Google Pay, Paytm), Cards, and Net Banking.*`,
        suggestedCourse: matchedCourse.title,
        promptLeadCapture: true
      };
    }
    return {
      reply: `💰 **HunarSetu 2026 Vocational Fee Schedule**:\n\n• **Silai Machine Operator (Garment Making)**: ₹1,799 (30 Days)\n• **Hand Embroidery & Zardozi Basics**: ₹1,799 (30 Days)\n• **Mehndi Art & Bridal Designing**: ₹1,499 (30 Days)\n• **Beauty & Wellness Professional**: ₹2,999 (40 Days)\n• **Boutique Master Combo (Silai + Embroidery)**: ₹3,999 (50 Days)\n• **Bridal Studio Combo (Beauty + Mehndi)**: ₹3,999 (50 Days)\n\nAll courses include video streaming, quizzes, and official certificate signed by ${directorName}.`,
      suggestedCourse: 'Boutique Master Combo (Silai + Embroidery)',
      promptLeadCapture: true
    };
  }

  // Certificate / Government recognition
  if (lower.includes('certif') || lower.includes('praman') || lower.includes('degree') || lower.includes('valid') || lower.includes('recogni')) {
    return {
      reply: `📜 **Accredited & Verifiable Certification**:\n\n1. **Official Certificate**: Issued upon completing all video lessons and scoring 70%+ in module assessment quizzes.\n2. **Verification**: Each certificate includes an iconic gold seal and unique verification ID (e.g. HS-CERT-2026-XXXX) registered on our public directory.\n3. **Recognition**: Validated by Director Prashant Sagar for self-employment, bank Mudra loan micro-financing, and boutique employment across India.`,
      promptLeadCapture: false
    };
  }

  // Silai machine specific practical questions
  if (lower.includes('needle') || lower.includes('dhaga') || lower.includes('tension') || lower.includes('machine') || lower.includes('bobbin')) {
    return {
      reply: `🧵 **Sewing Machine Master Tips (Trainer Advice)**:\n\n• **Needle Sizing**: Use Size 14 for cottons, rayon, and kurtis; Size 16 for jeans/linens; Size 11 for silk/organza.\n• **Thread Looping (Guchha Banna)**: If loops appear under fabric, tighten top tension disc and check if the thread missed the take-up lever.\n• **Skipped Stitches**: Ensure the flat side of the needle shank faces the needle bar correctly and change blunt needles.\n\nWant to master full garment construction from drafting to boutique finishing? Check out our **Silai Machine Operator** course!`,
      suggestedCourse: 'Silai Machine Operator (Garment Making)',
      promptLeadCapture: true
    };
  }

  // Admission / Enrollment / How to join
  if (lower.includes('join') || lower.includes('enroll') || lower.includes('admission') || lower.includes('register') || lower.includes('kaise') || lower.includes('contact') || lower.includes('phone') || lower.includes('call')) {
    return {
      reply: `🎓 **How to Enroll & Start Learning Today**:\n\n1. Go to the **Courses** section on this website.\n2. Click **"Enroll Now"** on your preferred trade.\n3. Complete the secure UPI QR payment and submit your 12-digit transaction UTR.\n4. Your video access unlocks immediately!\n\nAlternatively, leave your details below and our Barabanki Counselor will call you back with guidance! Helpline: **${helpline}**.`,
      suggestedCourse: matchedCourse?.title || courses[0]?.title,
      promptLeadCapture: true
    };
  }

  // If matched a specific course
  if (matchedCourse) {
    return {
      reply: `🌸 **About ${matchedCourse.title} (${matchedCourse.hindiTitle})**:\n\n• **Duration**: ${matchedCourse.durationDays} Days | **Fee**: ₹${matchedCourse.fee}\n• **Trainer**: ${matchedCourse.trainer.name} (${matchedCourse.trainer.experience})\n• **What You Learn**: ${matchedCourse.learningOutcomes.slice(0, 3).join('; ')}.\n• **Outcome**: Prepares you for self-employment or boutique jobs with automated verified certification!\n\nWould you like our counselor to call you with batch schedule details?`,
      suggestedCourse: matchedCourse.title,
      promptLeadCapture: true
    };
  }

  // General helpful response
  return {
    reply: `Namaste! 🙏 Welcome to HunarSetu Vocational Academy, guided by ${directorName}.\n\nWe provide professional certified training in:\n1. ✂️ **Silai Machine Operator & Garment Making** (Kurtis, Blouses, Salwars)\n2. 🪡 **Hand Embroidery & Zardozi Basics** (Aari, Dabka, Mirror Work)\n3. 🌿 **Mehndi Art & Bridal Designing** (Organic cones, portraits, Arabic)\n4. ✨ **Beauty & Wellness Professional** (HD Makeup, salon treatments)\n\nFeel free to ask me anything about fees, syllabus, machine troubleshooting, or leave your phone number for free counseling!`,
    suggestedCourse: 'Silai Machine Operator (Garment Making)',
    promptLeadCapture: true
  };
};

// Async AI query caller with Gemini SDK and instant graceful fallback
export const askHunarAI = async (
  prompt: string,
  courses: Course[],
  directorName: string = 'Director Prashant Sagar',
  helpline: string = '7800897677'
): Promise<{ text: string; suggestedCourse?: string; promptLeadCapture: boolean }> => {
  // Try Gemini API if an API key is configured
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || 
                 (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemInstruction(courses, directorName, helpline);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.6,
          maxOutputTokens: 500
        }
      });

      const responseText = response.text || '';
      if (responseText.trim()) {
        const lowerPrompt = prompt.toLowerCase();
        const shouldPromptLead = lowerPrompt.includes('fee') || lowerPrompt.includes('cost') || 
                                 lowerPrompt.includes('join') || lowerPrompt.includes('course') || 
                                 lowerPrompt.includes('admission') || lowerPrompt.includes('discount') ||
                                 lowerPrompt.includes('call') || lowerPrompt.includes('number');

        return {
          text: responseText,
          promptLeadCapture: shouldPromptLead
        };
      }
    } catch (err: any) {
      console.warn('Gemini API call bypassed or quota exhausted, seamlessly falling back to local vocational engine:', err?.message || err);
    }
  }

  // Graceful, guaranteed local fallback
  const local = generateLocalAIResponse(prompt, courses, directorName, helpline);
  return {
    text: local.reply,
    suggestedCourse: local.suggestedCourse,
    promptLeadCapture: local.promptLeadCapture
  };
};
