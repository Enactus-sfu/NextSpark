import { Link } from "react-router-dom";
import heroRender from "@/assets/renders/hero.webp";

const VARIANTS = [
  {
    path: "/v/editorial",
    name: "Editorial",
    tag: "Most shippable",
    blurb:
      "Two-column hero with the generator contained and spinnable, then a calm editorial flow down the page. Fixes the contrast problem on the current hero.",
  },
  {
    path: "/v/teardown",
    name: "Teardown",
    tag: "Most ambitious",
    blurb:
      "A sticky section where the kit comes apart as you scroll, with the three program steps driven off the teardown's progress.",
  },
  {
    path: "/v/spec",
    name: "Spec Sheet",
    tag: "For teachers and funders",
    blurb:
      "The kit documented as engineering: parts manifest, measured dimensions and numbered callouts on the exploded view.",
  },
];

const VariantIndex = () => (
  <div className="min-h-screen gradient-subtle">
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-14">
        <p className="text-sm font-semibold text-primary-dark mb-3">NextSpark · landing page directions</p>
        <h1 className="mb-6">Three ways to show the kit</h1>
        <p className="text-xl text-muted-foreground">
          Same content and the same renders, three different arguments. Open each one, then tell me which to keep.
        </p>
      </div>

      <ul role="list" className="grid md:grid-cols-3 gap-8">
        {VARIANTS.map((v) => (
          <li key={v.path}>
            <Link
              to={v.path}
              className="group block h-full bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <img src={heroRender} alt="" aria-hidden="true" className="w-28 h-auto mb-6 opacity-80" />
              <div className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground bg-secondary/25 rounded-full px-3 py-1 inline-block mb-4">
                {v.tag}
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-base">{v.name}</h2>
              <p className="text-muted-foreground">{v.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-14 text-muted-foreground">
        The live site is still at <Link to="/" className="text-primary font-semibold underline underline-offset-4">/</Link>.
      </p>
    </div>
  </div>
);

export default VariantIndex;
