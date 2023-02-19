import styles from "@/styles/ImageCTACard.module.css";
import ImageCTACard from "@/components/core/ImageCTACard";

type ComponentProps = {
  className?: string;
};

export default function HomeResourceCards({ className }: ComponentProps) {
  return (
    <section className={`container-inner ${styles.container} ${className}`}>
      <ImageCTACard
        title="Jobs"
        isExternal={true}
        href="https://earn.superteam.fun/opportunities/category/jobs"
        imageSrc="/img/cta/4.jpg"
        text="By Superteam"
      />
      <ImageCTACard
        title="Bounties"
        isExternal={true}
        href="https://earn.superteam.fun/opportunities/category/bounties"
        imageSrc="/img/cta/0.jpg"
        text="By Superteam"
      />
      <ImageCTACard
        title="Grants"
        isExternal={true}
        href="https://earn.superteam.fun/opportunities/category/grants"
        imageSrc="/img/cta/1.jpg"
        text="By Superteam"
      />
    </section>
  );
}
