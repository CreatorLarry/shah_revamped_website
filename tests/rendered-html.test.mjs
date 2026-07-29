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
  });
}

test("main navigation exposes every audited official-site detail page", async () => {
  const response = await render("/");
  const html = await response.text();
  const detailRoutes = [
    "/our-school/about-us",
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
});

test("sitemap includes the audited official-site detail pages", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();

  assert.match(xml, /https:\/\/shahlalji\.ac\.ke\/our-school\/about-us/);
  assert.match(xml, /https:\/\/shahlalji\.ac\.ke\/education\/igcse/);
  assert.match(xml, /https:\/\/shahlalji\.ac\.ke\/admissions\/fee-structure/);
});
