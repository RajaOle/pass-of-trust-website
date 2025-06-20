
import { CodeBlock } from "@/components/CodeBlock";

const Authentication = () => {
  const apiKeyExample = `// Using API Key in headers
const response = await fetch('https://api.goodpass.id/v1/inquiries', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    subject_id: 'user123',
    inquiry_type: 'credit_check'
  })
});`;

  const curlExample = `curl -X POST https://api.goodpass.id/v1/inquiries \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject_id": "user123",
    "inquiry_type": "credit_check"
  }'`;

  const errorResponseExample = `{
  "error": {
    "code": "invalid_api_key",
    "message": "The API key provided is invalid or has been revoked",
    "type": "authentication_error"
  }
}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h1>
        <p className="text-lg text-gray-600">
          All API requests must be authenticated using API keys. Learn how to authenticate 
          your requests securely.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Keys</h2>
          <p className="text-gray-600 mb-4">
            API keys are used to authenticate requests to the Goodpass API. You can obtain your API keys 
            from the developer dashboard. Keep your API keys secure and never expose them in client-side code.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Security Note:</strong> Never expose your API keys in client-side code or public repositories. 
                  Always use them server-side or in secure environments.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3">Authentication Header</h3>
          <p className="text-gray-600 mb-4">
            Include your API key in the Authorization header using the Bearer token format:
          </p>
          <CodeBlock code={apiKeyExample} language="javascript" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">cURL Example</h2>
          <p className="text-gray-600 mb-4">Here's how to authenticate using cURL:</p>
          <CodeBlock code={curlExample} language="bash" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Key Types</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prefix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Environment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Live API Key
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded">gp_live_</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Production
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Production applications
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Test API Key
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded">gp_test_</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Sandbox
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Development and testing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Error Responses</h2>
          <p className="text-gray-600 mb-4">
            If authentication fails, the API will return a 401 Unauthorized status with an error response:
          </p>
          <CodeBlock code={errorResponseExample} language="json" className="mb-6" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
              <h4 className="font-medium text-blue-900 mb-2">Store API Keys Securely</h4>
              <p className="text-blue-700 text-sm">
                Use environment variables or secure key management systems to store your API keys.
              </p>
            </div>
            <div className="border-l-4 border-green-400 bg-green-50 p-4">
              <h4 className="font-medium text-green-900 mb-2">Rotate Keys Regularly</h4>
              <p className="text-green-700 text-sm">
                Regularly rotate your API keys and revoke unused keys from the dashboard.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
              <h4 className="font-medium text-purple-900 mb-2">Monitor Usage</h4>
              <p className="text-purple-700 text-sm">
                Monitor your API key usage in the dashboard to detect unusual activity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authentication;
