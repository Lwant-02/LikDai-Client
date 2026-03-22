import { useState } from "react";
import { ReportSummitDialog } from "./ReportSummitDialog";
import { MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";

export const FeedbackDialog = () => {
  const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] = useState(false);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        onClick={() => setIsSubmittingDialogOpen(true)}
        className="fixed bottom-28 md:right-10 right-4 p-3 rounded-full border border-yellow bg-background/50 backdrop-blur-md hover:bg-yellow transition-colors duration-300 cursor-pointer text-primary hover:text-background z-40 shadow-lg"
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
