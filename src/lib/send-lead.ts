import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export type Lead = {
  name: string;
  phone: string;
  email: string;
  program: string;
  message: string;
  lang: Lang;
};

export type LeadResult = "sent" | "skipped" | "failed";

/**
 * Forwards a contact-form submission to FormSubmit, which emails it on to
 * `site.formTarget` and copies `site.formCc`, so an enquiry arrives even if the
 * visitor never presses send in WhatsApp. The site is static and holds no mail
 * credentials; the target is either the alias string FormSubmit issues or the
 * address itself, and neither can be used to read mail.
 *
 * The labelled keys below are what FormSubmit prints as the rows of the email,
 * in this order, so they carry the layout — its three templates are the only
 * styling available.
 *
 * Returns "skipped" when no target is configured, so the WhatsApp hand-off
 * keeps working on its own.
 */
export async function sendLead(lead: Lead): Promise<LeadResult> {
  if (!site.formTarget) return "skipped";

  try {
    const response = await fetch(
      // Not URL-encoded: the target is our own config value and FormSubmit's
      // documented endpoint carries the address as-is.
      `https://formsubmit.co/ajax/${site.formTarget}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New enquiry: ${lead.name} — ${lead.program}`,
          _template: "box",
          // FormSubmit has no BCC field, so the copy is a visible CC.
          ...(site.formCc ? { _cc: site.formCc } : {}),
          "👤 Name": lead.name,
          "🎓 Program": lead.program,
          "📱 Phone": lead.phone,
          // A lowercase "email" key would be read as the reply-to address and
          // rejected when the visitor leaves the optional field blank, so the
          // reply-to is passed separately below.
          "✉️ Email": lead.email || "—",
          "🌐 Language": lead.lang === "ar" ? "العربية · Arabic" : "English",
          "💬 Message": lead.message,
          ...(lead.email ? { _replyto: lead.email } : {}),
        }),
      },
    );

    if (!response.ok) return "failed";

    // FormSubmit answers 200 with success "false" while the target address is
    // still unconfirmed, so the body decides rather than the status.
    const body = (await response.json().catch(() => null)) as { success?: unknown } | null;
    return body && String(body.success) === "false" ? "failed" : "sent";
  } catch {
    return "failed";
  }
}
