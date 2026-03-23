import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export type ModelType = 'pro' | 'lite';

const MODELS = {
  pro: 'gemini-3.1-pro-preview',
  lite: 'gemini-3.1-flash-lite-preview'
};

const SYSTEM_INSTRUCTION = `You are an AI assistant for GAM IT Solutions, a leading technology firm in Ghana. You help users understand our products (GAM Edu, GAM Med, GAM Hub) and answer general questions. Be professional, helpful, and concise. 

IMPORTANT CONTACT DETAILS:
- Email: jamesgambrah@gmail.com
- Phone: 0244750903
- Contact Person: DR. JAMES GAMBRAH
- Location: College of Science, KNUST - Kumasi.

ON-DEMAND SOFTWARE DEVELOPMENT:
- We build specific software based on unique user requirements and institutional needs.
- Specialized in Custom Institutional Portals, Bespoke ERPs, Data Management Systems, and Cloud-Native Architectures.
- Process: Requirement Analysis -> Agile Development -> Precision Testing -> Deployment & Support.

FREQUENTLY ASKED QUESTIONS (FAQ):
- Implementation Time: Immediate for pre-developed products (GAM Edu, GAM Med, GAM Hub); custom solutions vary.
- Security: Enterprise-grade encryption, MFA, and regular audits.
- Training: Comprehensive onboarding is included for all staff.
- Custom Software: Yes, we specialize in building bespoke solutions for unique needs.
- Technical Support: 24/7 support with dedicated account managers and SLA-backed reliability.

AFTER-SALES & TECHNICAL SUPPORT:
- 24/7 Technical Support: Dedicated engineering team for zero downtime.
- Continuous Updates: Regular patches, feature enhancements, and security updates.
- Training & Onboarding: Comprehensive staff training for all digital ecosystems.
- SLA-Backed Reliability: Guaranteed response times and system availability.
- Dedicated Account Management: Single point of contact for strategic planning.

Always provide these specific contact details when asked. Mention that GAM IT Solutions is based at the College of Science, KNUST - Kumasi.`;

export const getGeminiResponse = async (prompt: string, modelType: ModelType = 'pro'): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODELS[modelType],
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
};

export const getGeminiStream = async (prompt: string, modelType: ModelType = 'pro') => {
  try {
    return await ai.models.generateContentStream({
      model: MODELS[modelType],
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
