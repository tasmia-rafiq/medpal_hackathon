import Link from "next/link";
import OcrReader from "@/components/OcrReader";
import Image from "next/image";
import { ArrowRight, Brain, FileText, Shield, TrendingUp } from "lucide-react";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/Card";

const Home = async () => {
  const session = await auth();

  const features = [
    {
      icon: FileText,
      title: "Centralized Records",
      description:
        "Keep all your medical reports, lab results, and prescriptions in one secure place",
    },
    {
      icon: Brain,
      title: "AI Health Insights",
      description:
        "Get personalized health insights and track trends from your medical data",
    },
    {
      icon: TrendingUp,
      title: "Health Tracking",
      description:
        "Monitor your health progress over time with interactive charts and analytics",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your medical data is encrypted and secure with bank-level security protocols",
    },
  ];
  return (
    <main className="min-h-screen bg-white text-black font-poppins">
      {/* Hero Section */}
      <section className="relative h-auto bg-[url('/bg-image.png')] bg-no-repeat bg-center bg-cover text-white py-24 px-12 overflow-hidden">
        <div className="absolute top-0 right-0">
          <Image
            src="/illustration.png"
            alt="Bg Image"
            width={400}
            height={400}
          />
        </div>

        <div className="w-xl text-left relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            All Your Medical Reports, In One Place.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Upload and manage your reports securely — accessible anytime,
            anywhere.
          </p>

          <div className="mt-8">
            <Link
              href={session?.user ? "/dashboard" : "/signin"}
              className="primary_btn bg-white! text-black! flex items-center w-fit gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">
              Everything You Need to Manage Your Health
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple, secure, and intelligent health record management
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-[#e2e8f0] bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 medical-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Upload Your Reports
              </h3>
              <p className="text-black-300">
                Simply drag and drop your medical reports, lab results, or
                prescriptions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Organizes Everything
              </h3>
              <p className="text-gray-600">
                Our AI automatically categorizes and extracts key information
                from your documents
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Track Your Health
              </h3>
              <p className="text-gray-600">
                View trends, get insights, and share reports with your
                healthcare providers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Start managing your health smarter today
        </h2>
        <p className="mb-6 text-white/80">
          Create your MedPal account and get instant access to your own secure
          health vault.
        </p>
        <Link
          href={session?.user ? "/dashboard" : "/signin"}
          className="primary_btn bg-secondary! text-black! px-6 py-3 rounded-lg font-medium inline-flex gap-2 items-center"
        >
          <span>Launch Dashboard</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
};

export default Home;
