"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { contactWhatsappLink } from "@/lib/site";

/**
 * Formulaire de contact — cahier des charges §17.
 *
 * En V1, aucun backend n'est requis : le formulaire compose un message WhatsApp
 * prérempli, canal commercial principal d'Avis+. Lors du branchement de Supabase,
 * la soumission pourra être envoyée à une route serveur puis enregistrée en base.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({
    name: "",
    company: "",
    phone: "",
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Bonjour Avis+, je vous contacte depuis le site.",
      "",
      `Nom : ${values.name}`,
      values.company ? `Entreprise : ${values.company}` : null,
      `Téléphone : ${values.phone}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(contactWhatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Votre nom" htmlFor="contact-nom" required>
          <Input
            id="contact-nom"
            name="nom"
            autoComplete="name"
            required
            placeholder="Ex. Awa Traoré"
            value={values.name}
            onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
          />
        </Field>

        <Field label="Nom de votre entreprise" htmlFor="contact-entreprise">
          <Input
            id="contact-entreprise"
            name="entreprise"
            autoComplete="organization"
            placeholder="Ex. Le Terroir"
            value={values.company}
            onChange={(event) => setValues((v) => ({ ...v, company: event.target.value }))}
          />
        </Field>
      </div>

      <Field label="Téléphone ou WhatsApp" htmlFor="contact-telephone" required>
        <Input
          id="contact-telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="Ex. +226 70 00 00 00"
          value={values.phone}
          onChange={(event) => setValues((v) => ({ ...v, phone: event.target.value }))}
        />
      </Field>

      <Field label="Votre message" htmlFor="contact-message" required>
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder="Décrivez votre besoin : type de commerce, support souhaité, ville…"
          value={values.message}
          onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          icon={<Send size={18} strokeWidth={1.8} aria-hidden="true" />}
        >
          Envoyer mon message
        </Button>
        <p className="text-caption text-avis-muted">
          Le message s&apos;ouvre dans WhatsApp, prêt à envoyer.
        </p>
      </div>

      {sent ? (
        <p
          role="status"
          className="flex items-center gap-2 rounded-md bg-avis-success-bg px-4 py-3 text-body-sm font-medium text-avis-success-text"
        >
          <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
          WhatsApp s&apos;est ouvert avec votre message. Envoyez-le et nous vous répondons
          rapidement.
        </p>
      ) : null}
    </form>
  );
}
