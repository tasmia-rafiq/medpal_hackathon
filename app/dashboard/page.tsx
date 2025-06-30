// app/dashboard/page.tsx
import { connectToDatabase } from "@/lib/database";
import User from "@/models/User";
import Report from "@/models/Report";
import { auth } from "@/auth";
import PdfReport from "@/models/PdfReport";
import PdfViewer from "@/components/PdfViewer";

const Page = async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    return <div>Please sign in to view your dashboard.</div>;
  }

  await connectToDatabase();

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return <div>User not found.</div>;
  }

  // Fetch reports for this user
  // const reports = await Report.find({ userId: user._id }).sort({ createdAt: -1 });
  const reports = await PdfReport.find({ userId: user._id })
    .sort({ createdAt: -1 });

  return (
    <div className="p-6">
      <h1>{user._id.toString()}</h1>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Your Reports</h2>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report: any) => (
            <li key={report._id} className="p-4 border rounded shadow">
              <div>
                <h3 className="font-semibold text-xl">{report.filename}</h3>
                <p className="text-sm text-black-200">
                  Uploaded on: <span className="text-gray-500">{new Date(report.createdAt).toLocaleString()}</span>
                </p>
              </div>

              <div className="mt-2">
                <strong>PDF Preview:</strong>
                <br /> <br />
                <a
                  href={`/api/pdf/${report._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View PDF
                  </a>

                  <PdfViewer reportId={report._id.toString()} />
                {/* <img
                  src={report.image}
                  alt="Uploaded Report"
                  className="mt-1 max-w-xs border rounded"
                /> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
