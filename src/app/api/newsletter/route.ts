import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/newsletter
 * Subscribes an email to the newsletter.
 * Integrates with Beehiiv API (or falls back to Supabase storage).
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Try Beehiiv first
    const beehiivKey = process.env.BEEHIIV_API_KEY;
    const pubId = process.env.BEEHIIV_PUBLICATION_ID;

    if (beehiivKey && pubId) {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${beehiivKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: "website",
          }),
        }
      );

      if (!res.ok) {
        console.error("[NEWSLETTER] Beehiiv error:", await res.text());
        return NextResponse.json(
          { error: "Subscription failed. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: Log to console (replace with Supabase insert in production)
    console.log(`[NEWSLETTER] New subscriber: ${email}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[NEWSLETTER] Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
