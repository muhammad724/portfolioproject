import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalContacts,
    unreadContacts,
    totalFeedback,
    approvedFeedback,
  ] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({
      where: {
        isRead: false,
      },
    }),
    prisma.feedback.count(),
    prisma.feedback.count({
      where: {
        approved: true,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#02120D] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Welcome back! Here's your portfolio overview.
            </p>
          </div>

          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-[#4A6F7D] hover:opacity-90 transition"
          >
            Back to Portfolio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="rounded-xl bg-[#0B1E18] p-6 border border-[#4A6F7D]/40">
            <h2 className="text-gray-400">Total Contacts</h2>
            <p className="text-4xl font-bold mt-3">
              {totalContacts}
            </p>
          </div>

          <div className="rounded-xl bg-[#0B1E18] p-6 border border-[#4A6F7D]/40">
            <h2 className="text-gray-400">Unread Contacts</h2>
            <p className="text-4xl font-bold mt-3">
              {unreadContacts}
            </p>
          </div>

          <div className="rounded-xl bg-[#0B1E18] p-6 border border-[#4A6F7D]/40">
            <h2 className="text-gray-400">Total Feedback</h2>
            <p className="text-4xl font-bold mt-3">
              {totalFeedback}
            </p>
          </div>

          <div className="rounded-xl bg-[#0B1E18] p-6 border border-[#4A6F7D]/40">
            <h2 className="text-gray-400">Approved Feedback</h2>
            <p className="text-4xl font-bold mt-3">
              {approvedFeedback}
            </p>
          </div>

        </div>

        <div className="mt-12 rounded-xl bg-[#0B1E18] border border-[#4A6F7D]/40 p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/contacts"
              className="rounded-lg bg-[#4A6F7D] px-5 py-3 hover:opacity-90 transition"
            >
              View Contacts
            </Link>

            <Link
              href="/admin/feedback"
              className="rounded-lg bg-[#4A6F7D] px-5 py-3 hover:opacity-90 transition"
            >
              View Feedback
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}