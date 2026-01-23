import Link from "next/link";
import { Github, MousePointer2, Code, Zap } from "lucide-react";

export default function PsigmaLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Navbar Section */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Home / Brand */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <span className="text-xl font-bold tracking-tight">Psigma</span>
          </div>

          {/* Right: Navigation & Actions */}
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/mindspirex"
              className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              About Me
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Github</span>
            </Link>
            <Link href="/login">
              <button className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-105 active:scale-95">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-8 border border-purple-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Public Beta is Live (expect minor bugs)
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
            Design at the speed of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
              possibility.
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Psigma is the open-source design tool that feels familiar but moves
            faster. Built for the web, powered by Next.js.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <button className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-purple-200">
                Start Designing for Free
              </button>
            </Link>
            <Link href="https://github.com/mindspirex/psigma">
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-semibold text-lg transition-all">
                View Source Code
              </button>
            </Link>
          </div>
        </div>

        {/* Feature Grid Mockup */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: MousePointer2,
              title: "Easy to Use",
              desc: "Intuitive interface designed for rapid prototyping without the learning curve.",
            },
            // Updated Feature Item
            {
              icon: Code,
              title: "Full CSS Control",
              desc: "Edit CSS manually. You have absolute control over the styling properties.",
            },
            {
              icon: Zap,
              title: "Instant Export",
              desc: "Export assets in CSS, SVG, or PNG instantly.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-purple-100 hover:shadow-sm transition-all"
            >
              <feature.icon className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
