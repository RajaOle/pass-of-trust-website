
import { CodeBlock } from "@/components/CodeBlock";

const Inquiries = () => {
  const createInquiryExample = `// Create a new inquiry
const response = await fetch('https://api.goodpass.id/v1/inquiries', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    subject_id: 'user_12345',
    inquiry_type: 'credit_check',
    purpose: 'loan_application',
    amount: 50000,
    metadata: {
      loan_term: '12_months',
      interest_rate: 8.5
    }
  })
});

const inquiry = await response.json();
console.log('Inquiry ID:', inquiry.id);
console.log('Reputation Score:', inquiry.reputation_score);`;

  const inquiryResponseExample = `{
  "id": "inq_1234567890",
  "subject_id": "user_12345",
  "inquiry_type": "credit_check",
  "purpose": "loan_application",
  "status": "completed",
  "reputation_score": 785,
  "risk_level": "low",
  "created_at": "2025-01-20T10:30:00Z",
  "completed_at": "2025-01-20T10:30:02Z",
  "details": {
    "payment_history": "excellent",
    "credit_utilization": "low",
    "account_age": "established",
    "recent_inquiries": 2
  },
  "metadata": {
    "loan_term": "12_months",
    "interest_rate": 8.5
  }
}`;

  const getInquiryExample = `// Retrieve an inquiry by ID
const response = await fetch('https://api.goodpass.id/v1/inquiries/inq_1234567890', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const inquiry = await response.json();`;

  const listInquiriesExample = `// List all inquiries with pagination
const response = await fetch('https://api.goodpass.id/v1/inquiries?limit=10&offset=0', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const { data: inquiries, total, has_more } = await response.json();`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Making Inquiries</h1>
        <p className="text-lg text-gray-600">
          Learn how to create and manage reputation inquiries to assess financial trustworthiness 
          for lending decisions.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create an Inquiry</h2>
          <p className="text-gray-600 mb-4">
            Submit a reputation inquiry to assess a user's financial trustworthiness. 
            The API will return a reputation score and risk assessment.
          </p>
          
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              POST
            </span>
            <code className="ml-2 text-sm text-gray-700">/v1/inquiries</code>
          </div>

          <CodeBlock code={createInquiryExample} language="javascript" className="mb-6" />

          <h3 className="text-lg font-medium text-gray-900 mb-3">Request Parameters</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parameter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    subject_id
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Required</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Unique identifier for the subject being inquired about
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    inquiry_type
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">Required</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Type of inquiry: credit_check, loan_application, etc.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    purpose
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Optional</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Purpose of the inquiry for better context
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    amount
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">number</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Optional</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Loan amount being considered
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    metadata
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">object</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Optional</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    Additional context data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3">Response</h3>
          <CodeBlock code={inquiryResponseExample} language="json" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Retrieve an Inquiry</h2>
          <p className="text-gray-600 mb-4">
            Retrieve details of a previously created inquiry using its ID.
          </p>

          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              GET
            </span>
            <code className="ml-2 text-sm text-gray-700">/v1/inquiries/{'{inquiry_id}'}</code>
          </div>

          <CodeBlock code={getInquiryExample} language="javascript" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">List Inquiries</h2>
          <p className="text-gray-600 mb-4">
            Retrieve a paginated list of all inquiries associated with your account.
          </p>

          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              GET
            </span>
            <code className="ml-2 text-sm text-gray-700">/v1/inquiries</code>
          </div>

          <CodeBlock code={listInquiriesExample} language="javascript" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reputation Score Ranges</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Excellent (750-850)</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  Low Risk
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Exceptional credit history with minimal risk factors
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Good (650-749)</span>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                  Moderate Risk
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Good credit history with some minor risk factors
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Fair (550-649)</span>
                <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                  Higher Risk
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Limited credit history or some negative factors
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Poor (300-549)</span>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                  High Risk
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Significant credit issues or limited history
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inquiries;
