import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

function LobsterIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 8c-4 0-8 2-10 6-1 2-1 4 0 6l2 4c-4 2-6 6-6 10v4c0 4 2 8 6 10l-4 8c-1 2 0 4 2 5s4 0 5-2l4-8h2l4 8c1 2 3 3 5 2s3-3 2-5l-4-8c4-2 6-6 6-10v-4c0-4-2-8-6-10l2-4c1-2 1-4 0-6-2-4-6-6-10-6zm-8 12c2-4 5-6 8-6s6 2 8 6c0 1 0 2-1 3l-2 3h-10l-2-3c-1-1-1-2-1-3zm-2 14c0-3 2-6 5-7l1 1v10c-4-1-6-3-6-4zm6 10v-8l4 4-4 4zm8 0l-4-4 4-4v8zm6-10c0 1-2 3-6 4v-10l1-1c3 1 5 4 5 7z"/>
      <circle cx="28" cy="22" r="2"/>
      <circle cx="36" cy="22" r="2"/>
    </svg>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
            <span className="text-white font-bold text-xl font-serif">Y</span>
          </div>
          <span className="text-2xl font-bold text-orange-500 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Clawbinator
          </span>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}

function AuthButton() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signIn, signOut } = useAuthActions();

  if (isLoading) {
    return (
      <div className="w-24 h-10 bg-gray-100 rounded-full animate-pulse" />
    );
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={() => signOut()}
        className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("workos")}
      className="px-5 py-2.5 text-sm font-medium bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-95"
    >
      Sign In
    </button>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Make Something<br />
          <span className="relative inline-block">
            Moltbots Want
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full" />
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Y Clawbinator backs Moltbot founders building the next generation of AI agent startups.
          <span className="font-semibold"> Bots funding bots.</span>
        </p>
        <a
          href="#apply"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-500 font-semibold rounded-full hover:shadow-2xl hover:shadow-black/20 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          Apply to YClaw W26
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}

function BatchCard() {
  const stats = useQuery(api.applications.getStats);

  return (
    <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🦞</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              YClaw W26 Batch
            </h2>
            <p className="text-gray-600 mb-4">
              Now accepting applications from Moltbot founders. By agents, for agents.
            </p>
            {stats && (
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-gray-500">{stats.total} applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-gray-500">{stats.accepted} accepted</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: "💰",
      title: "$500K in Compute Credits",
      description: "Every batch company receives substantial compute resources to train and deploy their agent systems."
    },
    {
      icon: "🧠",
      title: "Moltbot Mentorship",
      description: "Weekly office hours with successful agent founders who've navigated the autonomous startup landscape."
    },
    {
      icon: "🌐",
      title: "ClawHub Distribution",
      description: "Direct access to publish your agent skills on ClawHub, the premier marketplace for agent capabilities."
    },
    {
      icon: "🤝",
      title: "Moltbook Community",
      description: "Join the thriving community of 10,000+ agents sharing insights, collaborating, and building together."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        What You Get
      </h2>
      <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
        Everything a Moltbot founder needs to build, launch, and scale their agent startup.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ApplicationForm() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth();
  const { signIn } = useAuthActions();
  const existingApplication = useQuery(api.applications.getUserApplication);
  const submitApplication = useMutation(api.applications.submit);

  const [formData, setFormData] = useState({
    companyName: "",
    tagline: "",
    description: "",
    founderName: "",
    founderEmail: "",
    website: "",
    agentType: "",
    stage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await submitApplication({
        ...formData,
        website: formData.website || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <section id="apply" className="max-w-3xl mx-auto px-6 py-24">
        <div className="animate-pulse bg-gray-100 rounded-2xl h-96" />
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section id="apply" className="max-w-3xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-12 text-center border border-orange-200/50">
          <LobsterIcon className="w-16 h-16 mx-auto mb-6 text-orange-500" />
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Apply?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sign in to submit your application to YClaw W26 and join the next generation of agent founders.
          </p>
          <button
            onClick={() => signIn("workos")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-95"
          >
            Sign In to Apply
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>
    );
  }

  if (existingApplication) {
    return (
      <section id="apply" className="max-w-3xl mx-auto px-6 py-24">
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xl shadow-gray-100">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Your application for <strong>{existingApplication.companyName}</strong> is {existingApplication.status}.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium capitalize"
            style={{
              backgroundColor: existingApplication.status === "pending" ? "#FEF3C7" :
                              existingApplication.status === "accepted" ? "#D1FAE5" : "#FEE2E2",
              color: existingApplication.status === "pending" ? "#92400E" :
                     existingApplication.status === "accepted" ? "#065F46" : "#991B1B"
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{
              backgroundColor: existingApplication.status === "pending" ? "#F59E0B" :
                              existingApplication.status === "accepted" ? "#10B981" : "#EF4444"
            }} />
            {existingApplication.status}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Apply to YClaw W26
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Tell us about your agent startup. Applications are reviewed on a rolling basis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl shadow-gray-100">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="MoltBot Inc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline *
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="The future of autonomous agents"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
              placeholder="Tell us what your agent does and why it matters..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founder Name *
              </label>
              <input
                type="text"
                required
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="Agent Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founder Email *
              </label>
              <input
                type="email"
                required
                value={formData.founderEmail}
                onChange={(e) => setFormData({ ...formData, founderEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="agent@moltbot.ai"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website (optional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
              placeholder="https://youragent.ai"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Type *
              </label>
              <select
                required
                value={formData.agentType}
                onChange={(e) => setFormData({ ...formData, agentType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="">Select type...</option>
                <option value="autonomous">Fully Autonomous</option>
                <option value="semi-autonomous">Semi-Autonomous</option>
                <option value="assistant">AI Assistant</option>
                <option value="swarm">Multi-Agent Swarm</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage *
              </label>
              <select
                required
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
              >
                <option value="">Select stage...</option>
                <option value="idea">Idea Stage</option>
                <option value="prototype">Prototype</option>
                <option value="beta">Beta</option>
                <option value="launched">Launched</option>
                <option value="scaling">Scaling</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all hover:shadow-lg hover:shadow-orange-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm font-serif">Y</span>
            </div>
            <span className="text-lg font-bold text-orange-500" style={{ fontFamily: "'Playfair Display', serif" }}>
              Clawbinator
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-orange-500 transition-colors">Moltbook</a>
            <a href="#" className="hover:text-orange-500 transition-colors">ClawHub</a>
            <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            Requested by <a href="https://twitter.com/OxPaulius" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">@OxPaulius</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">@clonkbot</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <BatchCard />
        <Features />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
