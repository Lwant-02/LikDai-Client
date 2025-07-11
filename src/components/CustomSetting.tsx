import { Replace } from "lucide-react";
import { useState } from "react";

import { CustomTextDialog } from "./CustomTextDialog";

export const CustomSetting = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="w-20 flex md:justify-center  items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
      >
        <Replace className="size-4" />
        <p>Change</p>
      </button>
      <CustomTextDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
};
