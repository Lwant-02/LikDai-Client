import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Lock, Eye, FileText, Mail } from "lucide-react";
import { developerContacts } from "@/constant";
import { POLICY_CONTENT } from "@/content/policy.content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const PolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>{POLICY_CONTENT.metaTitle}</title>
        <meta name="description" content={POLICY_CONTENT.metaDescription} />
      </Helmet>

      <main className="min-h-screen py-20 relative overflow-hidden">
        <motion.div
          className="layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              {POLICY_CONTENT.header.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {POLICY_CONTENT.header.subtitle}
              <span className="text-yellow">{POLICY_CONTENT.likdai}</span>
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.section
              variants={itemVariants}
              className="border-b border-foreground/80 py-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-primary/10 rounded-xl ">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {POLICY_CONTENT.section1.title}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>
                  {POLICY_CONTENT.section1.p1}
                  <span className="text-yellow">{POLICY_CONTENT.likdai}</span>
                  {POLICY_CONTENT.section1.p1b}
                </p>
                <p>
                  {POLICY_CONTENT.section1.p2}
                  <span className="text-yellow">{POLICY_CONTENT.likdai}</span>
                  {POLICY_CONTENT.section1.p2b}
                </p>
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="border-b border-foreground/80 py-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-blue-500/30 rounded-xl ">
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {POLICY_CONTENT.section2.title}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>
                  {POLICY_CONTENT.section2.p1}
                  <span className="text-yellow">{POLICY_CONTENT.likdai}</span>
                  {POLICY_CONTENT.section2.p1b}
                </p>
                <ul className="list-none space-y-2 mt-4">
                  <li className="flex items-start gap-3 bg-background/50 p-4">
                    <span className="text-blue-500 font-bold text-xl mt-1">
                      •
                    </span>
                    <div>
                      <strong className="block mb-1 opacity-80">
                        {POLICY_CONTENT.section2.list1.title}
                      </strong>
                      {POLICY_CONTENT.section2.list1.desc}
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-background/50 p-4">
                    <span className="text-blue-500 font-bold text-xl mt-1">
                      •
                    </span>
                    <div>
                      <strong className="block mb-1 opacity-80">
                        {POLICY_CONTENT.section2.list2.title}
                      </strong>
                      {POLICY_CONTENT.section2.list2.desc}
                    </div>
                  </li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="border-b border-foreground/80 py-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-green-500/30 rounded-xl ">
                  <Lock className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {POLICY_CONTENT.section3.title}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>{POLICY_CONTENT.section3.p1}</p>
                <div className="bg-green-500/5 border-l-4 border-green-500 p-4 rounded-r-xl my-4">
                  <p className="">
                    {POLICY_CONTENT.section3.p2}
                    <span className="text-yellow">{POLICY_CONTENT.likdai}</span>
                    {POLICY_CONTENT.section3.p2b}
                  </p>
                </div>
                <p>{POLICY_CONTENT.section3.p3}</p>
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              className="border-b border-foreground/80 py-7"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-yellow-500/30 rounded-xl ">
                  <Mail className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {POLICY_CONTENT.section4.title}
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>{POLICY_CONTENT.section4.p1}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {developerContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border text-yellow border-foreground/80 px-4 py-2 rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors"
                    >
                      <img
                        src={contact.imagePath}
                        alt={contact.link}
                        className="h-6 w-auto dark:invert"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.div
              variants={itemVariants}
              className="pt-10 pb-6 text-center"
            >
              <div className="inline-block px-4 py-2 rounded-full text-sm border border-green-400/80">
                {POLICY_CONTENT.footer}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
};
