import { ArrowLeft, Download, Award, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { useGetCertificate } from "@/hooks/useUser";
import { formatJoinedDate } from "@/util/formatJoinedDate";

export const CertificatePage = () => {
  const { certificate, isFetchingCertificate } = useGetCertificate();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const websiteLink = import.meta.env.VITE_WEBSITE_URL;

  if (isFetchingCertificate) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  if (!certificate.fullName) {
    return <Navigate to="/account" replace />;
  }

  const handleDownloadCertificate = () => {
    if (certificateRef.current) {
      htmlToImage
        .toPng(certificateRef.current)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.download = `${certificate.fullName}_certificate.png`; // Set filename
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          toast("❌️ Oops!", {
            description: (
              <p className="text-white">
                Something went wrong. Please try again.
              </p>
            ),
          });
          console.error("oops, something went wrong!", error);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Certificate | LikDai - Pro</title>
        <meta
          name="description"
          content="Download your certificate of achievement."
        />
      </Helmet>
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8">
        {/* Interactive Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-6 md:mb-8 px-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
            <Trophy className="size-6 sm:size-8 text-yellow animate-bounce" />
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
              Congratulations on your achievement!
            </p>
            <Trophy className="size-6 sm:size-8 text-yellow animate-bounce sm:flex hidden" />
          </div>
          <p className="text-sm sm:text-base md:text-lg opacity-70 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            You have successfully completed all typing challenges and earned
            this certificate of excellence. Download your certificate to
            showcase your typing mastery!
          </p>
        </motion.div>

        {/* Certificate Display */}
        <motion.div
          ref={certificateRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative w-full max-w-4xl bg-white text-gray-900  shadow-2xl overflow-hidden aspect-[3/5] sm:aspect-[4/3] md:aspect-[4/3] sm:block hidden"
        >
          {/* Decorative Border */}
          <div className="absolute inset-2 md:inset-4 border-2 md:border-4 border-yellow rounded-lg md:rounded-xl">
            <div className="absolute inset-1 md:inset-2 border md:border-2 border-blue rounded-md md:rounded-lg">
              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 md:w-8 md:h-8">
                <Star className="size-3 md:size-6 text-yellow fill-yellow" />
              </div>
              <div className="absolute top-0 right-0 w-4 h-4 md:w-8 md:h-8">
                <Star className="size-3 md:size-6 text-yellow fill-yellow" />
              </div>
              <div className="absolute bottom-0 left-0 w-4 h-4 md:w-8 md:h-8">
                <Star className="size-3 md:size-6 text-yellow fill-yellow" />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 md:w-8 md:h-8">
                <Star className="size-3 md:size-6 text-yellow fill-yellow" />
              </div>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 text-center">
            {/* Header with Logo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 md:mb-6">
              <img
                src="/svg/Logo.svg"
                alt="LikDai-Pro Logo"
                className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue">
                  LikDai-Pro
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Shan Typing Excellence
                </p>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="mb-4 md:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue mb-2">
                Certificate of Achievement
              </h2>
              <div className="w-16 sm:w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-yellow to-blue mx-auto rounded-full"></div>
            </div>

            {/* Award Icon */}
            <div className="mb-3 md:mb-6">
              <div className="relative">
                <Award className="size-12 sm:size-16 md:size-20 lg:size-24 text-yellow fill-yellow/20" />
              </div>
            </div>

            {/* Recipient Information */}
            <div className="mb-4 md:mb-8">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-2 md:mb-4">
                This certificate is proudly presented to
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue mb-2 md:mb-4 border-b border-yellow pb-1 md:pb-2 inline-block">
                {certificate.fullName}
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 max-w-xs sm:max-w-md md:max-w-2xl leading-relaxed px-2">
                For demonstrating exceptional typing proficiency in Shan
                language, completing all challenges, and achieving mastery in
                digital literacy.
              </p>
            </div>

            {/* Footer Information */}
            <div className="flex flex-row justify-between items-center sm:items-end w-full mt-auto gap-2 sm:gap-4">
              <div className="text-center sm:text-left order-1">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Issued Date:
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue">
                  {formatJoinedDate(certificate.createdAt)}
                </p>
              </div>

              <div className="text-center order-2">
                <div className="w-16 sm:w-24 md:w-32 h-0.5 bg-gray-400 mb-1 md:mb-2 mx-auto" />
                <p className="text-xs sm:text-sm font-semibold text-blue">
                  LikDai-Pro Team
                </p>
                <p className="text-xs text-gray-600">Digital Signature</p>
              </div>

              <div className="text-center sm:text-right order-3">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Website:
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue break-all ">
                  {websiteLink}
                </p>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 md:top-10 md:left-10 w-8 h-8 md:w-20 md:h-20 border md:border-2 border-blue rounded-full"></div>
            <div className="absolute top-8 right-8 md:top-20 md:right-20 w-6 h-6 md:w-16 md:h-16 border md:border-2 border-yellow rounded-full"></div>
            <div className="absolute bottom-8 left-8 md:bottom-20 md:left-20 w-4 h-4 md:w-12 md:h-12 border md:border-2 border-green rounded-full"></div>
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-10 h-10 md:w-24 md:h-24 border md:border-2 border-purple rounded-full"></div>
          </div>
        </motion.div>
        {/* Action Buttons - Desktop Only (md and above) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden md:flex w-full justify-center items-center gap-6 mt-8"
        >
          <Button
            onClick={() => navigate("/account")}
            variant="outline"
            size="lg"
            className="bg-transparent hover:bg-blue hover:text-white border-2 border-blue text-blue font-semibold px-8 py-3 rounded-md cursor-pointer transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="size-5 mr-2" />
            Back to Account
          </Button>
          <Button
            onClick={handleDownloadCertificate}
            size="lg"
            className="bg-gradient-to-r from-yellow to-orange hover:from-yellow/90 hover:to-orange/90 text-white font-semibold px-8 py-3 rounded-md cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <Download className="size-5 mr-2" />
            Download Certificate
          </Button>
        </motion.div>

        {/* Mobile Message - Show only on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="md:hidden w-full flex flex-col items-center gap-4 mt-6"
        >
          <div className="bg-blue/10 border border-blue/20 rounded-xl p-6 text-center max-w-md mx-4">
            <div className="flex items-center justify-center mb-3">
              <Download className="size-6 text-blue mr-2" />
              <h3 className="text-lg font-semibold text-blue">
                Download on Desktop
              </h3>
            </div>
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              For the best certificate viewing and downloading experience,
              please access this page on a larger screen (tablet or desktop).
            </p>
            <p className="text-xs text-gray-600">
              Your certificate will be available in high quality for download
              and sharing.
            </p>
          </div>

          <Button
            onClick={() => navigate("/account")}
            variant="outline"
            className="w-full max-w-xs bg-transparent hover:bg-blue hover:text-white border-2 border-blue text-blue font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Account
          </Button>
        </motion.div>

        {/* Additional Info - Desktop Only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="hidden md:block text-center mt-6 opacity-70"
        >
          <p className="text-sm">
            Share your achievement on social media and inspire others to learn
            Shan typing!
          </p>
        </motion.div>
      </div>
    </>
  );
};
