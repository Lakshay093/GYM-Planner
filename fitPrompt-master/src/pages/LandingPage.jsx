import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/custom/Navbar";
import { Button } from "../components/ui/button";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  // Mock testimonials data since we can't import LandingContent
  const testimonials = [
    {
      quote: "FitPrompt transformed my fitness journey completely!",
      name: "Sarah",
      age: 28,
      profession: "Software Engineer"
    },
    {
      quote: "The AI-powered workouts are exactly what I needed.",
      name: "Mike",
      age: 34,
      profession: "Marketing Manager"
    },
    {
      quote: "Best fitness app I've ever used. Highly recommended!",
      name: "Emma",
      age: 25,
      profession: "Designer"
    }
  ];

  return (
    <div className="font-[Poppins] flex flex-col min-h-screen w-full pt-4 bg-black text-white">
      <Navbar user={user} />

      {/* Hero section */}
      <div className="w-4/5 h-full mx-auto relative mt-40 mb-80 text-center">
        <h2 className="font-bold text-5xl bg-gradient-to-b from-[#FFFFFF] to-[#555555] bg-clip-text text-transparent mb-4">
          Achieve Your Fitness Goals with
        </h2>
        <h2 className="font-bold text-5xl bg-gradient-to-b from-[#FFFFFF] to-[#555555] bg-clip-text text-transparent mb-6">
          AI-Powered Workout Plans
        </h2>
        <p className="text-lg mb-8 text-[#ffffff72]">
          Get personalized workout plans tailored to your fitness level and goals. Transform your body with AI-powered fitness coaching.
        </p>

        <div className="flex items-center gap-6 justify-center">
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="bg-[#D55900] hover:bg-[#B54800] py-3 px-8 rounded-full text-white font-semibold text-lg transition-colors flex items-center gap-2"
          >
            <span>🤖</span>
            {isAuthenticated ? "Dashboard" : "Get Started"}
          </Link>
          <button className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2">
            <span>▶️</span>
            How it works
          </button>
        </div>
      </div>

      {/* Features section */}
      <div className="py-20 text-center">
        <h3 className="text-4xl font-semibold mb-4">How it Works</h3>
        <p className="text-neutral-400 mb-16">Generate your personalized plan by completing 3 steps.</p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8 relative">
          {/* Decorative arrows using CSS */}
          <div className="absolute -top-8 left-1/4 text-4xl text-orange-500 transform -rotate-12 hidden md:block">↗️</div>
          <div className="absolute -bottom-8 right-1/4 text-4xl text-orange-500 transform rotate-12 hidden md:block">↘️</div>

          <div className="bg-[#111111] hover:bg-[#121212] transition-all duration-300 hover:rotate-3 p-6 rounded-xl">
            <h4 className="text-2xl font-semibold text-[#ec6504] mb-4">Step 1</h4>
            <h5 className="text-xl font-semibold mb-4">Create Your Profile</h5>
            <p className="text-neutral-400">Tell us your fitness level, goals, and training preferences.</p>
          </div>

          <div className="bg-[#111111] hover:bg-[#121212] transition-all duration-300 hover:-rotate-3 p-6 rounded-xl">
            <h4 className="text-2xl font-semibold text-[#D55900] mb-4">Step 2</h4>
            <h5 className="text-xl font-semibold mb-4">Generate Your Plan</h5>
            <p className="text-neutral-400">Our AI crafts a weekly workout schedule tailored to your body.</p>
          </div>

          <div className="bg-[#D55900] hover:bg-[#d55900e7] transition-all duration-300 hover:rotate-3 p-6 rounded-xl">
            <h4 className="text-2xl font-semibold text-white mb-4">Step 3</h4>
            <h5 className="text-xl font-semibold text-black mb-4">Track & Improve</h5>
            <p className="text-neutral-800">Log workouts, adjust focus areas, and progress over time.</p>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="py-20 overflow-hidden">
        <h3 className="text-4xl font-semibold text-center mb-4">Testimonials</h3>
        <p className="text-neutral-400 text-center mb-16">What people are saying about us.</p>

        <div className="relative">
          <div className="absolute z-10 left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute z-10 right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent" />

          <div className="flex gap-6 animate-pulse">
            {testimonials.concat(testimonials).map((entry, index) => (
              <div
                key={index}
                className="relative bg-[#111111] w-[300px] h-[200px] p-6 rounded-xl flex-shrink-0 flex flex-col justify-between"
              >
                <div className="absolute -top-3 left-6 text-2xl">💬</div>
                <p className="text-sm text-neutral-400 flex-1 mt-4">{entry.quote}</p>
                <p className="text-xs text-right mt-4 text-neutral-500">
                  {entry.name}, {entry.age}, {entry.profession}
                </p>
              </div>
            ))}

            <div className="flex flex-col text-center items-center justify-center bg-[#111111] w-[300px] h-[200px] rounded-xl flex-shrink-0 p-6">
              <div className="text-4xl mb-4">👥</div>
              <p className="text-sm text-[#D55900] font-semibold">100+ People transformed through Fitprompt</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-20">
        <h3 className="text-4xl font-bold mb-4">
          <span className="text-white">Ready to Transform Your </span>
          <span className="text-[#F8501B]">Fitness Journey?</span>
        </h3>
        <p className="text-neutral-400 mb-8">Start your personalized fitness journey today and see real results.</p>
        <Button className="bg-[#BB4D00] hover:bg-[#A04000] text-white px-8 py-3 text-lg rounded-full">
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center gap-2">
            <span>🤖</span>
            {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
          </Link>
        </Button>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-5xl font-bold mb-6">Our Mission</h3>
          <p className="text-neutral-400 text-lg leading-relaxed">
            We're a team of developers, trainers, and AI engineers on a mission to make fitness accessible, 
            personalized, and effective for everyone. No gym? No problem. We help you stay fit – anytime, anywhere.
          </p>
        </div>
        <div className="text-center">
          <div className="bg-gradient-to-br from-[#D55900] to-[#F8501B] w-64 h-64 rounded-full flex items-center justify-center mx-auto text-6xl">
            💪
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#111111] mt-20">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-2xl font-bold text-[#D55900] mb-4">FitPrompt</h4>
              <p className="text-neutral-400">Your AI-powered fitness companion</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="text-neutral-400 space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">About us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Terms of service</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Connect With Us</h5>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="text-2xl hover:scale-110 transition-transform">📷</a>
                <a href="#" className="text-2xl hover:scale-110 transition-transform">👥</a>
                <a href="#" className="text-2xl hover:scale-110 transition-transform">📧</a>
                <a href="#" className="text-2xl hover:scale-110 transition-transform">🐦</a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
            <p className="text-neutral-400">&copy; 2024 Fitprompt. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
