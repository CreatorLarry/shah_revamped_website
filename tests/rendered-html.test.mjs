import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

const routes = [
  ["/", /An Education That Inspires/],
  ["/our-school", /A community with a/],
  ["/our-school/about-us", /Leadership grounded in/],
  ["/our-school/board-chair-message", /A shared commitment to/],
  ["/our-school/school-administrator-message", /A safe place to learn/],
  ["/our-school/senior-management-team", /Leadership across/],
  ["/education", /Learning that moves/],
  ["/education/school-profile", /A Nakuru legacy with a/],
  ["/education/nursery", /Curiosity starts/],
  ["/education/junior-school", /Strong foundations for/],
  ["/education/senior-school", /Depth, direction and/],
  ["/education/igcse", /Globally recognised/],
  ["/education/a-level", /Focused study/],
  ["/education/homework-policy", /Purposeful practice/],
  ["/admissions", /Your family’s journey/],
  ["/admissions/fee-structure", /Clear information for/],
  ["/school-life", /Space to discover/],
  ["/stories", /Experiences that shape/],
  ["/stories/learning-through-discovery", /Learning Through Discovery/],
  ["/stories/confidence-to-compete", /Confidence to Compete/],
  ["/stories/learning-beyond-the-classroom", /Learning Beyond the Classroom/],
  ["/gallery", /Moments that tell the/],
  ["/contact", /Let’s begin the/],
  ["/dashboard", /School Desk/],
];

for (const [pathname, heading] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, /Shah Lalji Nangpar Academy/i);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
    assert.doesNotMatch(html, /https?:\/\/shahlalji\.ac\.ke/i);
  });
}

test("main navigation exposes every public detail page", async () => {
  const response = await render("/");
  const html = await response.text();
  const detailRoutes = [
    "/our-school/about-us",
    "/our-school/board-chair-message",
    "/our-school/school-administrator-message",
    "/our-school/senior-management-team",
    "/education/school-profile",
    "/education/nursery",
    "/education/junior-school",
    "/education/senior-school",
    "/education/igcse",
    "/education/a-level",
    "/education/homework-policy",
    "/admissions/fee-structure",
  ];

  for (const route of detailRoutes) {
    assert.match(html, new RegExp(`href="${route}"`));
  }

  assert.doesNotMatch(html, /https?:\/\/shahlalji\.ac\.ke/i);
  assert.match(html, /Created by/);
  assert.match(html, /Mwangi Ngugi/);
});

test("sitemap is host-configurable and includes every leadership page", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();

  assert.match(xml, /http:\/\/localhost:3000\/our-school\/about-us/);
  assert.match(xml, /http:\/\/localhost:3000\/our-school\/board-chair-message/);
  assert.match(
    xml,
    /http:\/\/localhost:3000\/our-school\/school-administrator-message/,
  );
  assert.match(
    xml,
    /http:\/\/localhost:3000\/our-school\/senior-management-team/,
  );
  assert.match(xml, /http:\/\/localhost:3000\/education\/igcse/);
  assert.doesNotMatch(xml, /shahlalji\.ac\.ke/i);
});
