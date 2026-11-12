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
 * Forwards a contact-form submission to Web3Forms, which emails it to the inbox
 * the access key is registered to (gmail@thimarph.com), so an enquiry arrives
 * even if the visitor never presses send in WhatsApp. The site is static and
 * holds no mail credentials; `web3formsKey` is a public submit-only token that
 * cannot read mail or change the destination.
 *
 * The labelled keys below become the rows of the email, so they carry the
 * layout. `_subject` and `replyto` are Web3Forms control fields; `botcheck` is
 * the honeypot that silently drops bot submissions.
 *
 * Returns "skipped" when no key is configured, so the WhatsApp hand-off keeps
 * working on its own.
 */
export async function sendLead(lead: Lead): Promise<LeadResult> {
  if (!site.web3formsKey) return "skipped";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: site.web3formsKey,
        _subject: `New enquiry: ${lead.name} — ${lead.program}`,
        from_name: "Thimar Website",
        // Honeypot: real visitors leave this empty; bots that fill it are dropped.
        botcheck: "",
        "👤 Name": lead.name,
        "🎓 Program": lead.program,
        "📱 Phone": lead.phone,
        "✉️ Email": lead.email || "—",
        "🌐 Language": lead.lang === "ar" ? "العربية · Arabic" : "English",
        "💬 Message": lead.message,
        // Lets the recipient reply straight to the visitor when they left an
        // address; omitted when the optional field is blank.
        ...(lead.email ? { replyto: lead.email } : {}),
      }),
    });

    if (!response.ok) return "failed";

    // Web3Forms answers 200 with success:false on a rejected submission, so the
    // body decides rather than the status.
    const body = (await response.json().catch(() => null)) as { success?: unknown } | null;
    return body && body.success === true ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
