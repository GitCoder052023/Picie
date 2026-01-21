"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Github, 
  Download, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Cookie, 
  BookOpen, 
  Scale
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CopyCommand } from "@/components/copy-command"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-lg">
              🥧
            </div>
            <span className="text-xl font-bold tracking-tight">Picie</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/GitCoder052023/Picie" target="_blank">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com/GitCoder052023/Picie/archive/refs/heads/main.zip">
              <Button size="sm" className="hidden sm:flex rounded-full gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium border-primary/20 bg-primary/5 text-primary">
                v1.0.0 Now Available
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                The AI Legal Assistant <br />
                <span className="text-muted-foreground">for the Modern Web</span>
              </h1>
              <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
                Picie makes the web's fine print digestible. Summarize complex Terms & Conditions, 
                Privacy Policies, and handle Cookie Consent pop-ups intelligently with Gemini AI.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="https://github.com/GitCoder052023/Picie/archive/refs/heads/main.zip">
                  <Button size="lg" className="rounded-full px-8 text-md h-12 gap-2 shadow-lg shadow-primary/20">
                    <Download className="h-5 w-5" />
                    Download Picie
                  </Button>
                </Link>
                <Link href="#getting-started">
                  <Button size="lg" variant="outline" className="rounded-full px-8 text-md h-12 gap-2">
                    <BookOpen className="h-5 w-5" />
                    Documentation
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
                <span className="text-sm font-medium text-muted-foreground">Or install via Git</span>
                <CopyCommand command="git clone https://github.com/GitCoder052023/Picie.git" />
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_50%_120%,var(--color-primary)_0%,transparent_50%)] opacity-10" />
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need</h2>
              <p className="mt-4 text-muted-foreground">Built for transparency, privacy, and speed.</p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div variants={item}>
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur">
                  <CardHeader>
                    <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Zap className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">One-Click Summaries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Instantly condense lengthy Terms of Service and Privacy Policies into easy-to-read "TL;DR" points.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur">
                  <CardHeader>
                    <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Cookie className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Smart Cookies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automatically detects cookie consent pop-ups and suggests decisions based on your privacy preferences.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full border-border/50 bg-background/50 backdrop-blur">
                  <CardHeader>
                    <div className="mb-2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Scale className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">AI-Powered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Leverages the power of Google Gemini 2.0 for high-accuracy text analysis and legal reasoning.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="getting-started" className="py-24">
          <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Getting Started</h2>
              <p className="mt-4 text-muted-foreground">Follow these steps to get Picie running in your browser.</p>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                <div className="space-y-4 flex-1">
                  <h3 className="text-2xl font-bold">Obtain the Source Code</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-6 rounded-xl border border-border bg-muted/30">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Download className="h-4 w-4 text-primary" />
                        For Normal Users
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">The easiest way to get started.</p>
                      <Link href="https://github.com/GitCoder052023/Picie/archive/refs/heads/main.zip">
                        <Button variant="secondary" className="w-full rounded-lg">Download ZIP</Button>
                      </Link>
                    </div>
                    <div className="p-6 rounded-xl border border-border bg-muted/30">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" />
                        For Developers
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">Clone using Git and contribute.</p>
                      <CopyCommand command="git clone https://github.com/GitCoder052023/Picie.git" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Load the Extension</h3>
                  <ol className="space-y-4 text-muted-foreground list-decimal pl-4">
                    <li>Open Chrome (or any Chromium browser like Brave, Edge, or Vivaldi).</li>
                    <li>Go to the extensions page by typing <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm text-foreground">chrome://extensions</code> in the address bar.</li>
                    <li>Enable <strong>Developer mode</strong> using the toggle in the top-right corner.</li>
                    <li>Click the <strong>Load unpacked</strong> button.</li>
                    <li>Select the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm text-foreground">extension</code> folder from the directory where you downloaded/cloned Picie.</li>
                    <li><strong>Success!</strong> Picie is now ready. Pin it to your browser for quick access.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="container mx-auto" />

        {/* Contributing Section */}
        <section className="py-24 bg-muted/10">
          <div className="container mx-auto px-4 sm:px-8 max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Open Source & Community</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We welcome contributions from the community! Whether it's adding support for more legal document types, 
              improving the UI, or optimizing AI prompts, your help is appreciated.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="https://github.com/GitCoder052023/Picie" target="_blank">
                <Button className="rounded-full gap-2">
                  <Github className="h-4 w-4" />
                  Fork on GitHub
                </Button>
              </Link>
              <Link href="https://github.com/GitCoder052023/Picie/blob/main/LICENSE" target="_blank">
                <Button variant="outline" className="rounded-full">
                  MIT License
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥧</span>
              <span className="font-bold">Picie</span>
              <span className="text-sm text-muted-foreground ml-2">© 2026</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="https://github.com/GitCoder052023/Picie" className="hover:text-foreground transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ by the Open Source Community
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
