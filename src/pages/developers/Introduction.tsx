
import { CodeBlock } from "@/components/CodeBlock";

const Introduction = () => {
  const quickStartCode = `// Install the Goodpass SDK
npm install @goodpass/sdk

// Initialize the client
import { GoodpassClient } from '@goodpass/sdk';

const client = new GoodpassClient({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'sandbox'
});

// Make your first inquiry
const inquiry = await client.inquiries.create({
  subject_id: 'user123',
  inquiry_type: 'credit_check'
});

console.log('Reputation Score:', inquiry.reputation_score);`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Goodpass API Documentation
        </h1>
        <p className="text-xl text-gray-600">
          Welcome to the Goodpass API. Build trust-based financial applications with our secure, 
          developer-friendly API for financial reputation data.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-6">
            The Goodpass API allows you to integrate financial reputation data into your applications. 
            You can make reputation inquiries, submit financial reports, and receive real-time updates 
            via webhooks.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Base URL:</strong> <code className="bg-blue-100 px-2 py-1 rounded">https://api.goodpass.id/v1</code>
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Start</h3>
          <CodeBlock code={quickStartCode} language="javascript" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Reputation Inquiries</h3>
              <p className="text-gray-600 text-sm">
                Check financial reputation scores and credit history for loan decisions.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Reports</h3>
              <p className="text-gray-600 text-sm">
                Submit loan reports and payment history to build reputation profiles.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Webhooks</h3>
              <p className="text-gray-600 text-sm">
                Receive instant notifications for reputation updates and new reports.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Multiple SDKs</h3>
              <p className="text-gray-600 text-sm">
                Official libraries for JavaScript, Python, PHP, and more languages.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rate Limits</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Free Tier:</span>
                <p className="text-gray-600">100 requests/hour</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Pro Tier:</span>
                <p className="text-gray-600">1,000 requests/hour</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Enterprise:</span>
                <p className="text-gray-600">Custom limits</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Introduction;
