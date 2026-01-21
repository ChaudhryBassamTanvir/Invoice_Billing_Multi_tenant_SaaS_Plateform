import {
  FiGlobe,
  FiSettings,
  FiTrendingUp,
  FiHeadphones,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const features = [
  {
    icon: <FiGlobe size={24} />,
    title: "Globally Recognized",
    desc: "Nimbus is trusted worldwide for building fast, modern, and scalable applications.",
  },
  {
    icon: <FiSettings size={24} />,
    title: "Easily Customizable",
    desc: "Built with clean architecture so you can adapt Nimbus to your needs effortlessly.",
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: "Built for Impact",
    desc: "Optimized performance and accessibility to help your product grow confidently.",
  },
  {
    icon: <FiHeadphones size={24} />,
    title: "Worldwide Support",
    desc: "Our community and documentation are available anytime, anywhere.",
  },
  {
    icon: <FiStar size={24} />,
    title: "Awesome Design",
    desc: "Carefully crafted UI using modern design principles and best practices.",
  },
  {
    icon: <FiUsers size={24} />,
    title: "Handled by Experts",
    desc: "Designed by experienced engineers who know what production apps need.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white border-t-violet-600 border-t-2 mt-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why <span className="text-violet-600">choose</span> us
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Discover why Nimbus is the perfect choice for building
            modern and scalable web applications.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item:any, index:any) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-8 text-center hover:shadow-lg transition"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                {item.icon}
              </div>

              <h3 className="text-lg font-medium text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
