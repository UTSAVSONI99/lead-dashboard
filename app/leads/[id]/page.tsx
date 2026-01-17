// Fetch lead details by ID from backend

export default function LeadDetails() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Lead Details</h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>
          <strong>Name:</strong> Aman soni
        </p>
        <p>
          <strong>Email:</strong> amanl@test.com
        </p>
        <p>
          <strong>Status:</strong> Converted
        </p>
        <p>
          <strong>Source:</strong> Website
        </p>
      </div>
    </div>
  );
}
