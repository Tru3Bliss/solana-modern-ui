import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: undefined,
  description: "",
};

export default function Page() {
  return (
    <DefaultLayout seo={seo} withHero={true}>
      <PageHero className="container text-center" heroSize="lg">
        <h1 className="text-6xl tracking-normal">
          Your <span className="gradient-solana">Solana</span> homepage
        </h1>

        <p className="max-w-lg mx-auto text-xl text-gray-400">
          Stay up-to-date with the latest updates, learning, and happenings in
          the Solana ecosystem.
        </p>
      </PageHero>

      <section className="container">
        <p>home</p>
      </section>
    </DefaultLayout>
  );
}
