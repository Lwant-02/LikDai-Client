import { useState } from "react";
import { ReportSummitDialog } from "./ReportSummitDialog"; 
import { MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";

export const FeedbackDialog = () => {
  const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        onClick={() => setIsSubmittingDialogOpen(true)}
        className="fixed bottom-28 md:right-10 right-2 p-3 rounded-full border border-yellow hover:bg-yellow/80 transition-colors duration-300 cursor-pointer text-primary z-50"
      >
        <MessagesSquare className="size-6" />
      </motion.div>
      <ReportSummitDialog
        isOpen={isSubmittingDialogOpen}
        setIsOpen={setIsSubmittingDialogOpen}
      />
    </>
  );
};
