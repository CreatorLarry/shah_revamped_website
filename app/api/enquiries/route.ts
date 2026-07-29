import { createEnquiry } from "@/db/dashboard";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;

    if (clean(payload.website, 120)) {
      return Response.json({ ok: true }, { status: 201 });
    }

    const parentName = clean(payload.parentName, 120);
    const email = clean(payload.email, 160).toLowerCase();
    const phone = clean(payload.phone, 60);
    const childAge = clean(payload.childAge, 40);
    const yearGroup = clean(payload.yearGroup, 80);
    const message = clean(payload.message, 1200);

    if (
      !parentName ||
      !EMAIL_PATTERN.test(email) ||
      !phone ||
      !childAge ||
      !yearGroup ||
      !message
    ) {
      return Response.json(
        { error: "Please complete every required field correctly." },
        { status: 400 },
      );
    }

    const enquiryId = await createEnquiry({
      parentName,
      email,
      phone,
      childAge,
      yearGroup,
      message,
    });

    return Response.json({ ok: true, enquiryId }, { status: 201 });
  } catch {
    return Response.json(
      {
        error:
          "We could not submit your enquiry. Please call or email the school.",
      },
      { status: 500 },
    );
  }
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
