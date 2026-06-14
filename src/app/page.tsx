import { SummerPhotoDayExperience } from "@/components/summer-photo-day-experience";
import { getImagesFromPublicFolder } from "@/lib/media";
import { siteContent } from "@/lib/site-content";

export default function Home() {
  const marqueeImages = getImagesFromPublicFolder("media/marquee");
  const styleImages = getImagesFromPublicFolder("media/style");
  const topicImages = {
    style: styleImages,
    photo: getImagesFromPublicFolder("media/photo"),
    makeup: getImagesFromPublicFolder("media/makeup"),
  };

  return (
    <SummerPhotoDayExperience
      content={siteContent}
      marqueeImages={marqueeImages}
      topicImages={topicImages}
      picnicImages={["/media/picnic.JPG"]}
    />
  );
}
