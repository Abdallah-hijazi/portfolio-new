"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/lib/site";

/**
 * Static-site friendly contact form: composes a mailto: draft with the
 * visitor's message. No backend, no third-party form service.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      topic ? `[Portfolio] ${topic}` : "[Portfolio] New inquiry",
    );
    const body = encodeURIComponent(
      `Hi Abdallah,\n\n${message}\n\n— ${name || "Anonymous"}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
            Your name
          </label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="contact-topic" className="mb-2 block text-sm font-medium">
            Topic
          </label>
          <Input
            id="contact-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Project, role, training…"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message <span className="text-terminal-red">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building?"
          rows={6}
          className="flex w-full rounded-xl border border-line bg-surface-2 px-3.5 py-3 text-sm text-foreground transition-colors placeholder:text-muted/70 focus-visible:border-accent/60 focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit">
          <Send aria-hidden /> Compose email
        </Button>
        <p className="text-xs text-muted">
          Opens your email client with the message pre-filled — this site has no
          backend and stores nothing.
        </p>
      </div>
    </form>
  );
}
