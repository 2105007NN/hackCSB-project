import FeatureBlock from "../../components/helperComponents/FeatureBlock.jsx";
import Banner from "./Banner.jsx";

const features = [
  {
    title: "Educational Resources",
    description: "Regularly updated articles, videos, and infographics on mental health topics.",
    imageUrl: "https://images.pexels.com/photos/4052198/pexels-photo-4052198.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Interactive Tools",
    description: "Mood tracker, self-assessment tests, progress journals, and more.",
    imageUrl: "https://img.freepik.com/premium-vector/vector-illustration-about-exam-concept-with-characters-character-filling-survey-form_675567-3661.jpg?size=626&ext=jpg"
  },
  {
    title: "Professional Support",
    description: "Access to licensed therapists for virtual counseling sessions.",
    imageUrl: "https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Community Support",
    description: "Forums, discussion boards, and peer mentorship programs.",
    imageUrl: "https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Personalization",
    description: "Personalized content recommendations and customizable dashboard.",
    imageUrl: "https://img.freepik.com/free-vector/content-aggregator-abstract-concept-illustration_335657-3687.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=sph"
  },
  {
    title: "Privacy & Security",
    description: "Data protection, anonymity options, and secure communication channels.",
    imageUrl: "https://img.freepik.com/free-vector/secure-sockets-layer-illustration_23-2149238126.jpg?size=626&ext=jpg&ga=GA1.1.2119322207.1720886354&semt=ais_user"
  },
];

const Home = () => {
  return (<>
   <Banner></Banner>
    <div className="max-w-screen-2xl m-auto mt-20">
      <div className="feature-container flex flex-wrap h-full w-full gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-blocks w-5/6 h-1/3 p-5 ${
              index % 2 !== 0 ? "ml-auto" : "mr-auto"
            }`}
          >
            <FeatureBlock
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default Home;
