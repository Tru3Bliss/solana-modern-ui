import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";
import PageHero from "@/components/core/PageHero";

import HomeCategoryCards from "@/components/home/HomeCategoryCards";
import HomeResourceCards from "@/components/home/HomeResourceCards";
import LargeCTACard from "@/components/core/LargeCTACard";
import FeaturedContentCards from "@/components/core/FeaturedContentCards";
import ContentCard from "@/components/core/ContentCard";

import { FEATURED_CONTENT_CARDS } from "@/lib/constants/home";
import { PLAYLIST_KEYS } from "@/lib/constants/playlists";
import {
  getChangelogRecords,
  getNewsletterRecords,
  getRecordsForPlaylist,
} from "@/lib/queries";

// define the on-page seo metadata
const seo: NextSeoProps = {
  title: undefined,
  description: "",
};

export async function getStaticProps() {
  // init an array of posts to display in the "Latest" section
  const latestPosts: ContentRecord[] = [];

  // fetch all the latest content from each of the major content sections
  const [
    newsletters,
    changelog,
    coreCommunityCalls,
    superteamEcosystemCalls,
    // validatorCommunityCalls,
  ] = await Promise.all([
    await getNewsletterRecords(),
    await getChangelogRecords(),
    await getRecordsForPlaylist(PLAYLIST_KEYS.coreCommunityCalls),
    await getRecordsForPlaylist(PLAYLIST_KEYS.superteamEcosystemCalls),
    // await getRecordsForPlaylist(PLAYLIST_KEYS.validatorCommunityCalls),
  ]);
  // TODO: update API to allow for better filtering and pagination

  // force update the `Url` to be local urls for the desired pages
  changelog[0].Url = `/changelog/${changelog[0].SK}`;
  newsletters[0].Url = `/newsletter/${newsletters[0].SK}`;
  coreCommunityCalls[0].Url = `/library/playlist/${"core-community-calls"}/${
    coreCommunityCalls[0].SK
  }`;
  superteamEcosystemCalls[0].Url = `/library/playlist/${"superteam-ecosystem-calls"}/${
    superteamEcosystemCalls[0].SK
  }`;
  // validatorCommunityCalls[0].Url = `/library/playlist/${"validator-community-discussions"}/${
  //   validatorCommunityCalls[0].SK
  // }`;

  // extract the latest record from each of the datasets
  // NOTE: the order of these will be the order they will be displayed on the page
  latestPosts.push(
    changelog[0],
    newsletters[0],
    coreCommunityCalls[0],
    superteamEcosystemCalls[0],
    // validatorCommunityCalls[0],
  );

  return {
    props: {
      latestPosts,
    },
    revalidate: 3600,
  };
}

type PageProps = {
  latestPosts: ContentRecord[];
};

export default function Page({ latestPosts }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      <PageHero className="container py-20 mb-16" heroSize="lg">
        <h1>
          Your <span className="gradient-solana">Solana</span> homepage
        </h1>

        <p className="max-w-lg text-lg md:text-xl">
          Stay up-to-date with the latest updates, learning, and happenings in
          the Solana ecosystem.
        </p>
      </PageHero>

      <section className="py-8 space-y-8">
        <HomeCategoryCards className="-mt-24" />

        <FeaturedContentCards title="Featured">
          {FEATURED_CONTENT_CARDS.map((item, id) => (
            <ContentCard
              key={id}
              className="lg:max-w-full w-72 max-w-[70%]"
              href={item.href}
              title={item.title}
              authorLabel={item.authorLabel}
              imageSrc={item.imageSrc}
              description={item.description}
            />
          ))}
        </FeaturedContentCards>

        <LargeCTACard
          title="Changelog"
          text="Weekly updates on the Solana ecosystem"
          ctaLabel="Get caught up"
          ctaHref="/changelog"
          backgroundImage="/img/cta/changelog.svg"
        />

        <FeaturedContentCards title="Latest" className="lg:grid-cols-5">
          {latestPosts.length > 0 &&
            latestPosts.map((post, id: number) => (
              <ContentCard
                key={id}
                href={post.Url}
                title={post.Title}
                authorLabel={post.Author}
                // authorHref="#"
                imageSrc={post.Img}
                description={post.Description}
                // tags=""
              />
            ))}
        </FeaturedContentCards>

        <HomeResourceCards className="" />
      </section>
    </DefaultLayout>
  );
}
