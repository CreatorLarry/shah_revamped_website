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
  ["/education", /Learning that moves/],
  ["/admissions", /Your family’s journey/],
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
