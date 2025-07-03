import { useState } from "react";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

import { MobileTestSettingDialog } from "./MobileTestSettingDialog";

export const MobileTestSetting = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setIsDialogOpen(true)}
        className="py-2 px-6 flex w-auto justify-center items-center gap-2 rounded-lg bg-foreground md:hidden cursor-pointer"
      >
        <Settings className="size-4" />
        <p className="text-sm">Test Settings</p>
      </motion.button>
      <MobileTestSettingDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
};
