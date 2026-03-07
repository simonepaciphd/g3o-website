export const bestPractices = [
  {
    id: 'bp-transparency',
    title: 'Require Public Disclosure of GenAI Use',
    category: 'Transparency',
    summary: 'Public institutions should disclose which services, processes, or communications involve generative AI, including the tool, vendor, and scope of use.',
  },
  {
    id: 'bp-governance',
    title: 'Establish Institutional AI Governance Frameworks',
    category: 'Governance',
    summary: 'Agencies should adopt formal governance frameworks that define approval processes, risk assessment protocols, and oversight mechanisms for GenAI deployment.',
  },
  {
    id: 'bp-safeguards',
    title: 'Implement Human-in-the-Loop Safeguards',
    category: 'Safeguards',
    summary: 'High-stakes decisions should require meaningful human review before GenAI outputs are acted upon, with clear escalation pathways.',
  },
  {
    id: 'bp-audit',
    title: 'Enable Independent Auditing',
    category: 'Accountability',
    summary: 'Government GenAI systems should be designed to allow independent auditing of inputs, outputs, and decision processes.',
  },
  {
    id: 'bp-procurement',
    title: 'Adopt Responsible Procurement Standards',
    category: 'Procurement',
    summary: 'Procurement processes for GenAI tools should include transparency requirements, data residency standards, and interoperability clauses.',
  },
];

export const highlightedCases = [
  {
    id: 'case-nyc',
    title: 'NYC MyCity Chatbot',
    country: 'United States',
    summary: 'New York City deployed a public-facing chatbot for constituent services — one of the first large-scale municipal GenAI deployments. It drew both praise for innovation and scrutiny for accuracy.',
    lessons: 'Early public deployment requires robust testing, clear disclaimers, and rapid error correction mechanisms.',
  },
  {
    id: 'case-sg',
    title: 'Singapore Pair Platform',
    country: 'Singapore',
    summary: 'GovTech Singapore built a government-wide GenAI platform for civil servants, covering document drafting, translation, and research with strict data classification controls.',
    lessons: 'Centralized platforms with clear classification frameworks can enable broad adoption while maintaining security boundaries.',
  },
  {
    id: 'case-fr',
    title: 'France\'s Albert Sovereign LLM',
    country: 'France',
    summary: 'France developed a sovereign language model for public administration, ensuring data residency and reducing dependence on foreign vendors.',
    lessons: 'Sovereign AI approaches can address data sovereignty concerns, but require sustained investment and technical capacity.',
  },
];

export const legislativeTemplate = {
  title: 'Model Legislation: Government GenAI Transparency Act',
  preamble: 'This model legislation provides a template for legislative bodies seeking to mandate disclosure and transparency around the use of generative AI in government operations.',
  sections: [
    {
      heading: 'Section 1: Definitions',
      content: 'For purposes of this Act: (a) "Generative AI system" means any artificial intelligence system capable of generating text, images, audio, video, code, or other content in response to prompts or inputs. (b) "Government entity" means any department, agency, office, court, legislature, or instrumentality of [jurisdiction]. (c) "Public-facing use" means any deployment of a generative AI system that directly interacts with or produces outputs visible to members of the public.',
    },
    {
      heading: 'Section 2: Disclosure Requirements',
      content: 'Each government entity that deploys or contracts for the use of a generative AI system shall: (a) maintain a public register of all generative AI systems in use, (b) disclose the purpose, scope, vendor, and safeguards for each system, (c) update the register no less than quarterly, (d) make the register available in a machine-readable format.',
    },
    {
      heading: 'Section 3: Public-Facing Transparency',
      content: 'Any public-facing use of a generative AI system by a government entity shall include clear and conspicuous notice to the public that generative AI is being used, including the nature of the AI involvement.',
    },
    {
      heading: 'Section 4: Oversight and Reporting',
      content: 'Each government entity shall designate a responsible official for AI oversight and submit an annual report to [oversight body] covering: (a) all GenAI systems in use, (b) risk assessments conducted, (c) incidents or errors reported, (d) safeguards in place.',
    },
    {
      heading: 'Section 5: Effective Date',
      content: 'This Act shall take effect [180 days / 1 year] after enactment.',
    },
  ],
};

export const disclosureTemplate = {
  title: 'Model Government GenAI Disclosure Template',
  description: 'This template provides a standardized format for government entities to publicly disclose their use of generative AI. Governments can publish this on their websites or in official registers.',
  fields: [
    { label: 'Institution Name', example: 'Department of [X]' },
    { label: 'Jurisdiction', example: 'City of [X] / State of [X] / Federal' },
    { label: 'System Name', example: 'e.g., MyCity Chatbot, Internal Drafting Assistant' },
    { label: 'Vendor / Provider', example: 'e.g., OpenAI, Microsoft Azure, In-house' },
    { label: 'Model(s) Used', example: 'e.g., GPT-4, Claude, Custom fine-tuned model' },
    { label: 'Purpose / Use Case', example: 'e.g., Citizen inquiries, Document summarization' },
    { label: 'Public-Facing?', example: 'Yes / No' },
    { label: 'Scope of Deployment', example: 'e.g., Pilot, Department-wide, Agency-wide' },
    { label: 'Date of Deployment', example: 'YYYY-MM-DD' },
    { label: 'Safeguards in Place', example: 'e.g., Human review, Bias audit, Data classification' },
    { label: 'Data Handling', example: 'e.g., Data residency requirements, Retention policy' },
    { label: 'Oversight Contact', example: 'Name and email of responsible official' },
    { label: 'Last Updated', example: 'YYYY-MM-DD' },
  ],
};
