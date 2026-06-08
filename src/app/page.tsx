import { SummerPhotoDayExperience } from "@/components/summer-photo-day-experience";
import { getImagesFromPublicFolder } from "@/lib/media";
import { siteContent } from "@/lib/site-content";

export default function Home() {
  const marqueeImages = getImagesFromPublicFolder("media/marquee");
  const topicImages = {
    style: getImagesFromPublicFolder("media/mood"),
    photo: getImagesFromPublicFolder("media/photo"),
    picnic: getImagesFromPublicFolder("media/picnic"),
  };

  return (
    <SummerPhotoDayExperience
      content={siteContent}
      marqueeImages={marqueeImages}
      topicImages={topicImages}
    />
  );
}
