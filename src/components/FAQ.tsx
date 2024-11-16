import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I share my notes?",
    answer: "Simply create an account, click on the 'Upload Notes' button, and follow the simple steps to share your study materials with the community."
  },
  {
    question: "Is StudyShare free to use?",
    answer: "Yes! Basic features are completely free. We also offer a premium subscription for advanced features and unlimited downloads."
  },
  {
    question: "How is content quality maintained?",
    answer: "All uploaded content goes through a community review process. Notes are rated by users, and the best content rises to the top."
  },
  {
    question: "Can I download notes offline?",
    answer: "Yes, all notes can be downloaded for offline use. Premium users get unlimited downloads, while free users have a monthly download limit."
  },
  {
    question: "How do I report incorrect or inappropriate content?",
    answer: "Each note has a 'Report' button. Our moderation team reviews all reports within 24 hours."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex justify-between items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="mt-2 p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}