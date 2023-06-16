import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BlurImage from "@/components/ui/BlurImage";
import AboutUsBannerJPG from "@/public/images/aboutus/01.jpg";

export const metadata: Metadata = {
  title: "About us | HIKER",
};

const AboutUsPage = () => {
  return (
    <main className="mb-16">
      <div className="container">
        <PageHeader>
          <PageHeader.Title>About us</PageHeader.Title>
          <PageHeader.Breadcrumbs>
            <PageHeader.Link href="/">Home</PageHeader.Link>
            <PageHeader.Link disabled>About us</PageHeader.Link>
          </PageHeader.Breadcrumbs>
        </PageHeader>
      </div>

      <div className="mt-16 h-[12.5rem] md:h-[18.75rem]">
        <picture>
          <source srcSet="/images/aboutus/01.avif" type="image/avif" />
          <BlurImage
            src={AboutUsBannerJPG}
            alt="A mountaineer smiles."
            className="h-full object-cover"
            decoding="async"
          />
        </picture>
      </div>

      <div className="container mt-16 grid grid-cols-12 gap-y-4">
        <div className="heading-xl col-span-12 md:col-span-4">
          Mountain Equipment
        </div>
        <div className="text-body1 col-span-12 md:col-span-8">
          It&apos;s not our job to try to tell people why they go to the wild
          places and mountains. It’s our job to make the very best gear in the
          world.
          <br />
          <br />
          Since Mountain Equipment began in 1961 we have participated in
          countless ascents of the world’s highest peaks, supported climbers
          establishing ever more adventurous routes and equipped world record
          setting trips to the North and South Poles.
          <br />
          <br />
          We have been making gear for the most inhospitable places on the
          planet for over 50 years. You learn a lot here. And all we have
          learned, lives in our gear.
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
