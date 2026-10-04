// src/features/contact/topics.ts
// The "What's this about?" options. Values are what Web3Forms receives as the subject.

export const topics = [
  { value: "freelance", label: "Freelance" },
  { value: "consulting", label: "Consulting" },
  { value: "speaking", label: "Speaking" },
  { value: "just-saying-hi", label: "Just saying hi" },
] as const;

export type TopicValue = (typeof topics)[number]["value"];

export const topicValues = topics.map((t) => t.value) as [TopicValue, ...TopicValue[]];
