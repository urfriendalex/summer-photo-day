import { SummerPhotoDayExperience } from "@/components/summer-photo-day-experience";
import { getImagesFromPublicFolder } from "@/lib/media";
import { siteContent } from "@/lib/site-content";

export default function Home() {
  const marqueeImages = getImagesFromPublicFolder("media/marquee");
  const topicImages = {
    picnic: getImagesFromPublicFolder("media/picnic"),
    photo: getImagesFromPublicFolder("media/photo"),
    mood: getImagesFromPublicFolder("media/mood"),
  };

  return (
    <SummerPhotoDayExperience
      content={siteContent}
      marqueeImages={marqueeImages}
      topicImages={topicImages}
    />
  );
}
