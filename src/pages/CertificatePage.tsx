import { ArrowLeft, Download } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCertificate } from "@/hook/useUser";
import { formatJoinedDate } from "@/util/formatJoinedDate";

export const CertificatePage = () => {
  const { certificate, isFetchingCertificate } = useGetCertificate();
  const navigate = useNavigate();

  if (isFetchingCertificate) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      {/* Interactive Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <p className="text-3xl  font-bold mb-2">
          🎉 Congratulations on your achievement! 🎉
        </p>
        <p className="text-sm opacity-70">
          You can now download your certificate by clicking the button below.
        </p>
      </motion.div>
      {/* Certificate Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 w-full max-w-xl rounded-md bg-gradient-to-r from-blue via-green to-yellow py-10 mt-6"
      >
        <div className="flex justify-center items-center gap-4  flex-col">
          <img src="/svg/certificate.svg" alt="badge" className="size-36 " />
          <div className="flex flex-col justify-center items-center gap-2 text-center">
            <p className="text-2xl font-bold">Certificate of Achievement</p>
            <p className="text-sm opacity-90">
              This certificate is presented to
            </p>
            <p className="text-2xl font-bold">{certificate.fullName}</p>
            <p className="text-sm opacity-90 ">
              For unlocking all achievements and demonstrating exceptional
              typing proficiency.
            </p>
            <p className="text-sm opacity-90">
              Issued Date: {formatJoinedDate(certificate.createdAt)}
            </p>
            <p className="text-sm opacity-90">
              Issued by <span className="font-bold italic">LikDai-Pro</span>
            </p>
            <p className="text-sm opacity-90">
              Website -{" "}
              <span className="font-bold italic">http://localhost:3001</span>
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full flex justify-center items-center gap-4"
      >
        <Button
          onClick={() => navigate("/account")}
          className="bg-transparent hover:bg-yellow hover:text-background w-40 text-white border border-foreground flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Back to Account
        </Button>
        <Button
          // onClick={() => navigate("/")}
          className="bg-yellow hover:bg-yellow/80 text-background flex items-center gap-2 cursor-pointer"
        >
          <Download className="size-4" />
          Download Certificate
        </Button>
      </motion.div>
    </div>
  );
};
