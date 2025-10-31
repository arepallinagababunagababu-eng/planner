"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/context"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import Image from "next/image"
import { ArrowRight, TrendingUp, Shield, Target, Zap, Menu, X } from "lucide-react"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-indigo-950 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-purple-950 to-indigo-950"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/50 to-violet-950"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-violet-950/90 backdrop-blur-xl border-b border-violet-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">₿</span>
            </div>
            <span className="text-white font-bold text-2xl bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent">Budget Planner</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#features" className="text-violet-300 hover:text-violet-200 transition-all duration-300 font-medium relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#benefits" className="text-violet-300 hover:text-violet-200 transition-all duration-300 font-medium relative group">
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="text-violet-300 hover:text-violet-200 transition-all duration-300 font-medium relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button
              onClick={() => setIsLogin(true)}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
            >
              Sign In
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md bg-slate-800/40 text-slate-200 hover:bg-slate-800/60 transition"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-violet-900/95 border-t border-violet-500/20">
            <div className="px-4 py-4 space-y-2">
              <a href="#features" className="block text-violet-300 py-2 rounded hover:bg-violet-800/50 px-2">Features</a>
              <a href="#benefits" className="block text-violet-300 py-2 rounded hover:bg-violet-800/50 px-2">Benefits</a>
              <a href="#how-it-works" className="block text-violet-300 py-2 rounded hover:bg-violet-800/50 px-2">How It Works</a>
              <div className="pt-2">
                <button
                  onClick={() => { setIsLogin(true); setMobileOpen(false) }}
                  className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg font-medium"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Redesigned */}
      <div className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-block animate-bounce-subtle mb-8">
              <span className="px-6 py-3 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 border border-emerald-500/40 rounded-full text-emerald-300 text-sm font-bold backdrop-blur-md shadow-xl">
                ✨ Next-Gen Financial Management
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tight mb-8">
              Master Your
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x block">
                Financial Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed font-light max-w-4xl mx-auto mb-12">
              Transform your financial life with AI-powered insights, real-time tracking, and goal-oriented planning.
              Built for ambitious individuals who demand excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => setIsLogin(false)}
                className="group px-12 py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 text-white rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 flex items-center justify-center gap-4 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-300 relative z-10" />
              </button>
              <button className="px-12 py-6 border-2 border-slate-500 text-white rounded-3xl font-black text-xl hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 backdrop-blur-md">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto">
              <div className="text-center group cursor-pointer">
                <p className="text-3xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50K+</p>
                <p className="text-slate-400 text-sm md:text-base font-semibold mt-2">Active Users</p>
              </div>
              <div className="text-center group cursor-pointer">
                <p className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">$2B+</p>
                <p className="text-slate-400 text-sm md:text-base font-semibold mt-2">Assets Managed</p>
              </div>
              <div className="text-center group cursor-pointer">
                <p className="text-3xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">4.9⭐</p>
                <p className="text-slate-400 text-sm md:text-base font-semibold mt-2">User Rating</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="absolute -inset-10 bg-gradient-to-r from-emerald-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-3xl animate-pulse-slow"></div>
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-1000 group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <Image
                src="/images/financial_planning_d_8dc8e6d6.jpg"
                alt="Financial Dashboard Preview"
                width={1200}
                height={800}
                className="w-full h-auto relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="relative py-16 px-4 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-slate-400 text-lg mb-12 font-medium">Trusted by leading financial institutions and thousands of users worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm mt-3 font-semibold">Bank-Level Security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm mt-3 font-semibold">Real-time Sync</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm mt-3 font-semibold">Goal Tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm mt-3 font-semibold">Smart Analytics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Redesigned */}
      <div id="features" className="relative py-24 md:py-32 px-4">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-8">
              <span className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm font-bold">
                POWERFUL FEATURES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Built for
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Excellence</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto font-light">
              Every feature crafted to elevate your financial management experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            <div className="space-y-8">
              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-emerald-500/30">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-3">Smart Income Tracking</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      AI-powered categorization and trend analysis to maximize your earning potential.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-blue-500/30">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-3">Goal Achievement</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Set ambitious goals and track progress with intelligent milestone planning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 transform hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-purple-500/30">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-3">Bank-Grade Security</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Military-grade encryption and zero-knowledge architecture protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-32">
                <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-2xl border border-slate-700/30 rounded-3xl p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6">Real-time Analytics</h3>
                  <p className="text-slate-300 text-xl leading-relaxed mb-8">
                    Get instant insights with beautiful visualizations and predictive analytics powered by machine learning.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-2xl p-4">
                      <p className="text-emerald-400 text-2xl font-black">99.9%</p>
                      <p className="text-slate-400 text-sm">Uptime</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-2xl p-4">
                      <p className="text-blue-400 text-2xl font-black">&lt;1s</p>
                      <p className="text-slate-400 text-sm">Response</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-slate-900/30 to-slate-800/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 md:mb-24">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
                PROCESS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              How It <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
              Get started in minutes and take control of your finances today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="relative group">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 group-hover:shadow-emerald-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-white text-4xl font-black">1</span>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-emerald-400 transition-colors duration-300">Create Your Account</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Sign up in seconds with just your email. No credit card required to start your financial journey.
                </p>
              </div>
              <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-emerald-500/50 via-blue-500/30 to-transparent rounded-full"></div>
            </div>

            <div className="relative group">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/40 group-hover:shadow-blue-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-white text-4xl font-black">2</span>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">Add Your Data</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Input your income, expenses, and investments. Our intuitive interface makes it quick and easy.
                </p>
              </div>
              <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/30 to-transparent rounded-full"></div>
            </div>

            <div className="relative group">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-white text-4xl font-black">3</span>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-purple-400 transition-colors duration-300">Achieve Your Goals</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Watch your wealth grow with actionable insights, smart budgeting, and progress tracking.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-slate-300 font-medium">Step 1</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span className="text-slate-300 font-medium">Step 2</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                <span className="text-slate-300 font-medium">Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-slate-800/40 to-slate-900/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent"></div>
        <div className="max-w-md md:max-w-lg mx-auto relative z-10">
          <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-3xl border border-slate-700/60 rounded-3xl md:rounded-[2rem] p-8 md:p-12 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-3xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="text-center mb-10 md:mb-12 relative z-10">
              <div className="inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110">
                  <span className="text-white font-bold text-2xl">₿</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">
                {isLogin ? "Welcome Back!" : "Start Your Journey"}
              </h2>
              <p className="text-slate-300 text-lg md:text-xl font-light">
                {isLogin ? "Sign in to access your financial dashboard" : "Create your free account today"}
              </p>
            </div>

            <div className="flex gap-3 md:gap-4 mb-10 md:mb-12 p-2 bg-gradient-to-r from-slate-800/70 to-slate-900/70 rounded-2xl border border-slate-700/30 relative z-10">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 md:py-5 px-6 md:px-8 rounded-xl font-black text-lg md:text-xl transition-all duration-500 relative overflow-hidden ${
                  isLogin
                    ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/50 transform scale-105"
                    : "text-slate-300 hover:bg-slate-700/60 hover:text-white hover:scale-102"
                }`}
              >
                {isLogin && <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>}
                <span className="relative z-10">Login</span>
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 md:py-5 px-6 md:px-8 rounded-xl font-black text-lg md:text-xl transition-all duration-500 relative overflow-hidden ${
                  !isLogin
                    ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/50 transform scale-105"
                    : "text-slate-300 hover:bg-slate-700/60 hover:text-white hover:scale-102"
                }`}
              >
                {!isLogin && <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>}
                <span className="relative z-10">Sign Up</span>
              </button>
            </div>

            <div className="relative z-10">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>

            <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-gradient-to-r from-transparent via-slate-700/50 to-transparent relative z-10">
              <p className="text-center text-slate-400 text-base md:text-lg">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-400 hover:text-emerald-300 font-black transition-all duration-300 hover:underline hover:scale-105 inline-block"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Fast Setup</span>
                </div>
                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Goal Focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 px-4 bg-gradient-to-r from-emerald-500/20 via-emerald-600/20 to-emerald-500/20 border-y border-emerald-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/30 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent"> Financial Life?</span>
          </h2>
          <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light">
            Join thousands of users who have taken control of their finances. Start your journey today for free.
          </p>
          <button
            onClick={() => setIsLogin(false)}
            className="group px-12 py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 inline-flex items-center gap-4 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10">Get Started Now</span>
            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/50 py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30">
                  <span className="text-white font-bold text-xl">₿</span>
                </div>
                <span className="text-white font-black text-2xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Budget Planner</span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Your trusted partner in financial planning and wealth building.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Features</a></li>
                <li><a href="#benefits" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Benefits</a></li>
                <li><a href="#how-it-works" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">How It Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-12 text-center">
            <p className="text-slate-400 text-lg">&copy; 2025 Budget Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}