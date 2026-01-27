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
    title: "Multi-Tenant Ready",
    desc: "Nimbus is built to serve multiple businesses securely from a single platform.",
  },
  {
    icon: <FiSettings size={24} />,
    title: "Fully Configurable",
    desc: "Customize invoices, billing cycles, taxes, and branding to match your business.",
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: "Scales With Growth",
    desc: "Designed to handle growing clients, invoices, and transactions effortlessly.",
  },
  {
    icon: <FiHeadphones size={24} />,
    title: "Reliable Support",
    desc: "Clear documentation and support to help you manage billing without friction.",
  },
  {
    icon: <FiStar size={24} />,
    title: "Clean & Professional UI",
    desc: "Modern, intuitive interface focused on clarity, speed, and usability.",
  },
  {
    icon: <FiUsers size={24} />,
    title: "Built for Businesses",
    desc: "Engineered for startups, agencies, and enterprises managing multiple clients.",
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
