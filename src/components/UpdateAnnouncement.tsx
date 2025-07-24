import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UpdateAnnouncement = () => {
  const isUserClosed = localStorage.getItem("isUpdateAnnouncementClosed");
  const [isVisible, setIsVisible] = useState<boolean>(!isUserClosed);

  //Show update message
  useEffect(() => {
    if (isUserClosed) return;
    setIsVisible(true);
    // Hide after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("isUpdateAnnouncementClosed", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed h-16 flex justify-center items-center bottom-1 md:w-[390px] w-96 z-50 -translate-x-1/2 left-1/2 right-0 transform  px-4 py-2 rounded-lg bg-foreground text-yellow shadow-lg transition-transform duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <X
        onClick={() => {
          setIsVisible(false);
          localStorage.setItem("isUpdateAnnouncementClosed", "true");
        }}
        className="absolute top-2 right-2 size-4 cursor-pointer "
      />
      <div>
        🚀 We’ve just launched a new update! Check out{" "}
        <Link to="/about" className="underline text-blue">
          Here.
        </Link>{" "}
      </div>
    </div>
  );
};
