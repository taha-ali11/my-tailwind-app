// src/app/privacy/page.jsx
//
// Content here is the user-supplied privacy policy template, reproduced
// verbatim. Every [bracketed placeholder] is intentionally left as-is —
// fill these in once you have your official company/legal details:
//   [Date], [Your Company Name], [Your Website URL], [Stripe/PayPal/Other],
//   [Number, e.g., 3], [Number, e.g., 30], [Your Email Address],
//   [Your Physical Business Address]
//
// NOT LEGAL ADVICE — this is a generic template, not reviewed by a lawyer,
// and (as of this draft) it describes some things this site doesn't
// actually do yet: collecting payment/card details, OAuth-connecting to
// Google/Meta ad accounts, and a cookie-consent banner with retargeting
// pixels. Remove those sections or build the matching features before
// publishing this for real — see the "EDIT HERE" notes inline.

import { Lock } from "lucide-react"; // npm install lucide-react
import Navbar from "../privacy/PrivacyNavbar";
import Footer from "../sections/Footer";

export const metadata = {
  title: "Privacy Policy — @DevX",
  description: "Privacy policy for @DevX — how we collect, use, and protect your information.",
};

// Numbered section heading, matching the "SVC-01" catalog-code style used
// in ServicesGrid.jsx, so this page reads as part of the same site.
function PolicySection({ number, title, children }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <span className="font-mono text-xs tracking-wider text-trace">§ {number}</span>
      <h2 className="mt-2 font-display text-xl font-bold text-paper md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

// Lettered sub-heading used inside Section 1 (A / B / C)
function SubSection({ letter, title, children }) {
  return (
    <div className="mt-2">
      <h3 className="font-mono text-xs uppercase tracking-wider text-trace">
        {letter}. {title}
      </h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          {/* Back link */}
          <a href="/" className="font-mono text-xs uppercase tracking-wider text-muted hover:text-paper">
            ← Back to home
          </a>

          {/* Header */}
          <div className="mt-6 flex items-center gap-2">
            <Lock className="h-4 w-4 text-trace" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-trace">Legal</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-paper md:text-4xl">
            Privacy Policy
          </h1>
          {/* EDIT HERE — replace [Date] once this policy is finalized */}
          <p className="mt-3 font-mono text-xs text-muted">Last Updated: [Date]</p>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {/* EDIT HERE — [Your Company Name] / [Your Website URL] */}
            [Your Company Name] ("Company," "we," "us," or "our") is committed to
            protecting the privacy of our clients and their customers. This Privacy
            Policy describes how we collect, use, disclose, and safeguard your
            information when you visit our website [Your Website URL], engage our
            digital services (web development, SEO, marketing, Google Ads
            management), or interact with us.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            By using our services, you agree to the collection and use of
            information in accordance with this policy. We will not use or share
            your information with anyone except as described in this policy.
          </p>

          {/* Policy body */}
          <div className="mt-4">
            <PolicySection number="01" title="Information We Collect">
              <p>
                We collect information to provide, improve, and market our
                services effectively. The types of data we collect depend on
                your interaction with us.
              </p>

              

              <SubSection letter="A" title="Data We Access or Create During Service Delivery">
                <p>
                  To provide web development, SEO, and Google Ads services, we
                  may require access to, or create data within, your accounts:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-paper">Website &amp; Analytics Data:</span>{" "}
                    Google Analytics, Google Search Console, Google Ads, Facebook
                    Ads, CRM, and social media account data (traffic,
                    conversions, audience demographics, keyword rankings). We
                    connect these primarily via OAuth where possible, which
                    means we don't see your password.
                  </li>
                  <li>
                    <span className="font-medium text-paper">
                      Client Customer Data (Data Processor Role):
                    </span>{" "}
                    If we host your website or manage your CRM, we may have
                    incidental access to your end customers' personal data. You
                    are the "Data Controller" of this information, and we act as
                    a "Data Processor" solely on your instructions.
                  </li>
                </ul>
              </SubSection>

              <SubSection letter="B" title="Information Collected Automatically (Website Visitors)">
                <p>When you visit our website, we use standard technologies to collect:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <span className="font-medium text-paper">Usage Data:</span>{" "}
                    IP address, browser type/version, pages visited, time and
                    date of visit, time spent on pages, and referring website
                    address.
                  </li>
                </ul>
              </SubSection>
            </PolicySection>

            <PolicySection number="02" title="How We Use Your Information">
              <p>We use the collected data strictly for legitimate business purposes:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-paper">To Provide &amp; Deliver Services:</span>{" "}
                  To build, host, and maintain your website; run SEO audits; and
                  manage your Google Ads campaigns.
                </li>
                <li>
                  <span className="font-medium text-paper">To Communicate:</span>{" "}
                  To respond to inquiries, send service updates, project
                  milestones, invoices, and technical notices.
                </li>
                <li>
                  <span className="font-medium text-paper">For Marketing &amp; Analytics:</span>{" "}
                  To aggregate anonymized data for industry benchmarks and case
                  studies (with your explicit permission for identifiable data).
                </li>
                <li>
                  <span className="font-medium text-paper">To Improve Our Services:</span>{" "}
                  Analyzing aggregated usage patterns on our own website.
                </li>
                <li>
                  <span className="font-medium text-paper">For Legal &amp; Safety:</span>{" "}
                  To comply with legal obligations, enforce our Master Services
                  Agreement, and prevent fraudulent activity.
                </li>
              </ul>
            </PolicySection>

            <PolicySection number="03" title="How We Share Your Information">
              <p>
                We do not sell, trade, or rent your personal identification
                information. We share data only as follows:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-paper">With Third-Party Service Providers:</span>{" "}
                  We use trusted partners to operate our business, including
                  payment processors, cloud hosting providers (AWS, Google
                  Cloud), project management tools, and email marketing
                  platforms. These parties are contractually obligated to keep
                  your data confidential and secure.
                </li>
                <li>
                  <span className="font-medium text-paper">To Provide Your Services (The "Tools"):</span>{" "}
                  By nature of SEO and Ads management, we connect your data to
                  platforms like Google, Meta, SEMrush, and Ahrefs. Data shared
                  with these platforms is governed by their respective privacy
                  policies.
                </li>
                <li>
                  <span className="font-medium text-paper">Legal Compliance &amp; Protection:</span>{" "}
                  We may disclose information if required by law, subpoena, or
                  to protect our rights, your safety, or the safety of others.
                </li>
                <li>
                  <span className="font-medium text-paper">Business Transfers:</span>{" "}
                  In the event of a merger, acquisition, or asset sale, your
                  data may be transferred. We will provide notice before your
                  data is transferred and becomes subject to a different policy.
                </li>
              </ul>
            </PolicySection>

            <PolicySection number="04" title="Data Security">
              <p>
                We implement a variety of security measures to maintain the
                safety of your personal information:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-paper">Encryption:</span>{" "}
                  Use of SSL/TLS technology to encrypt data in transit. Sensitive
                  stored data is encrypted at rest.
                </li>
                <li>
                  <span className="font-medium text-paper">Access Control:</span>{" "}
                  Strict role-based access to client accounts. Only authorized
                  personnel who need the data to perform a specific job (e.g.,
                  your ad manager or developer) are granted access.
                </li>
                <li>
                  <span className="font-medium text-paper">Authentication:</span>{" "}
                  Use of strong, unique passwords and Multi-Factor
                  Authentication (MFA) on all critical platforms (hosting,
                  Google, domain registrars).
                </li>
                <li>
                  <span className="font-medium text-paper">Vulnerability Management:</span>{" "}
                  Regular security scans on websites we manage to detect malware
                  or vulnerabilities.
                </li>
              </ul>
              <p>
                Despite our efforts, no electronic storage or transmission
                method is 100% secure. We cannot guarantee absolute security.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Data Retention">
              <p>
                We retain your personal data only for as long as necessary to
                fulfill the purposes we collected it for, including satisfying
                any legal, accounting, or reporting requirements.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  {/* EDIT HERE — [Number, e.g., 3] */}
                  <span className="font-medium text-paper">Client Account Data:</span>{" "}
                  Retained for the duration of your active contract and for
                  [Number, e.g., 3] years thereafter for legal and tax purposes.
                </li>
                <li>
                  {/* EDIT HERE — [Number, e.g., 30] */}
                  <span className="font-medium text-paper">Website Backups &amp; Hosting Data:</span>{" "}
                  For clients who cancel, backups and server data are securely
                  deleted within [Number, e.g., 30] days of contract termination.
                </li>
                <li>
                  <span className="font-medium text-paper">Marketing Permissions:</span>{" "}
                  If you unsubscribe from our marketing emails, your contact
                  details are immediately suppressed (not deleted) to ensure we
                  do not email you again.
                </li>
              </ul>
            </PolicySection>

            <PolicySection number="06" title="Your Data Protection Rights">
              <p>
                Depending on your jurisdiction (GDPR for EU/UK, CCPA for
                California, etc.), you may have the following rights:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-paper">Right to Access:</span> Request
                  copies of your personal data.
                </li>
                <li>
                  <span className="font-medium text-paper">Right to Rectification:</span> Correct
                  any inaccurate or incomplete data.
                </li>
                <li>
                  <span className="font-medium text-paper">
                    Right to Erasure ("Right to be Forgotten"):
                  </span>{" "}
                  Request we delete your personal data under certain conditions.
                </li>
                <li>
                  <span className="font-medium text-paper">Right to Restrict Processing:</span>{" "}
                  Request we limit how we process your data.
                </li>
                <li>
                  <span className="font-medium text-paper">Right to Data Portability:</span>{" "}
                  Receive your data in a structured, machine-readable format.
                </li>
                <li>
                  <span className="font-medium text-paper">Right to Object:</span> Object to
                  processing for direct marketing.
                </li>
              </ul>
              <p>
                {/* EDIT HERE — [Your Email Address] */}
                To exercise these rights, contact us at [Your Email Address]. We
                will respond within 30 days. We may need to verify your identity.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Third-Party Links & Services">
              <p>
                Our website may link to third-party sites (e.g., social media,
                partner integrations). We are not responsible for the content or
                privacy practices of these external sites. We encourage you to
                read their privacy policies. This specifically applies to data
                collected by Google Analytics, Google Ads, and Meta Ads; the
                collection and use of that data are governed by the respective
                privacy policies of Google and Meta.
              </p>
            </PolicySection>

            <PolicySection number="08" title="Children's Privacy">
              <p>
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children. If we become aware that a child under 18 has provided
                us with personal data, we will take steps to delete such
                information immediately.
              </p>
            </PolicySection>

            <PolicySection number="09" title="Cookie Policy">
              <p>
                We use cookies and similar technologies for website
                functionality, analytics, and marketing retargeting.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <span className="font-medium text-paper">Essential Cookies:</span> Necessary
                  for site operation.
                </li>
                <li>
                  <span className="font-medium text-paper">Analytics Cookies:</span> Google
                  Analytics (to understand traffic). We anonymize IP addresses
                  where possible.
                </li>
                
              </ul>
              <p>
                You can manage your preferences in your browser settings or
                through our cookie consent banner. Opting out does not mean you
                will no longer see ads; it means the ads will not be tailored to
                your interests.
              </p>
            </PolicySection>

            <PolicySection number="10" title="Changes to This Policy">
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last Updated" date. For material
                changes, we will provide a more prominent notice (e.g., email
                notification).
              </p>
            </PolicySection>

            <PolicySection number="11" title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy or wish to
                make a complaint about how we handle your data, please contact
                our Data Protection Officer / Privacy Team:
              </p>
              {/* EDIT HERE — [Your Email Address] / [Your Physical Business Address] */}
              <p>Email: [Your Email Address]</p>
              <p>Mailing Address: [Your Physical Business Address]</p>
            </PolicySection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
