import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Lock, Eye, FileText, Mail } from "lucide-react";
import { developerContacts } from "@/constant";

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
        <title>Privacy Policy - LikDai | ပိူင်ၵၢၼ် လွင်ႈႁူမ်ႇလူမ်ႈ</title>
        <meta
          name="description"
          content="Read the LikDai Privacy Policy and Terms of Service (ပိူင်ၵၢၼ် လွင်ႈႁူမ်ႇလူမ်ႈ လႄႈ လွင်ႈသုၼ်ႇတူဝ်) designed for our Shan / Dai / Tai typing community."
        />
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
              ပိူင်ၵၢၼ် လွင်ႈႁူမ်ႇလူမ်ႈ
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              ၶေႃႈမုၼ်းလႄႈ လွင်ႈႁူမ်ႇလူမ်ႈ လွင်ႈသုၼ်ႇတူဝ် တွၼ်ႈတႃႇ ၽူႈၸႂ်ႉတိုဝ်း{" "}
              <span className="text-yellow">လိၵ်းတႆး</span>
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
                <h2 className="text-2xl md:text-3xl font-bold">1. ၶေႃႈၼမ်း</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>
                  ႁပ်ႉတွၼ်ႈသူၸဝ်ႈ ၸူး{" "}
                  <span className="text-yellow">လိၵ်းတႆး</span> ၶႃႈ။
                  ပိူင်ၵၢၼ်လွင်ႈႁူမ်ႇလူမ်ႈၼႆႉ တေလၢတ်ႈၼႄ လွင်ႈဝႃႈ ႁဝ်းၶႃႈ
                  ၵဵပ်းႁွမ်တွမ်၊ ၸႂ်ႉတိုဝ်း လႄႈ ၵႅတ်ႇၶႄ ပၼ် ၶေႃႈမုၼ်းသူၸဝ်ႈ
                  ၸိူင်ႉႁိုဝ် ၼႆယဝ်ႉ။
                </p>
                <p>
                  မိူဝ်ႈသူၸဝ်ႈ ၸႂ်ႉတိုဝ်း{" "}
                  <span className="text-yellow">လိၵ်းတႆး</span> ၼၼ်ႉ ပွင်ႇဝႃႈ
                  သူၸဝ်ႈ ၽွမ်ႉၸႂ် ၸွမ်းၼင်ႇ ပိူင်ၵၢၼ် ဢၼ်လႆႈတႅမ်ႈဝႆႉ
                  ၼႂ်းၼႃႈလိၵ်ႈၼႆႉယဝ်ႉ။ ၶေႃႈမုၼ်း ၸိူဝ်းၼႆႉ မီးလွင်ႈလမ်ႇလွင်ႈ
                  တႃႇႁႂ်ႈ ၵၢၼ်ၸႂ်ႉတိုဝ်း ၶႅမ်ႉလႅပ်ႈလီ လႄႈ လွတ်ႈၽေးလီငၢမ်း။
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
                  2. ၶေႃႈမုၼ်း ဢၼ်ႁဝ်းၶႃႈ လႆႈၵဵပ်းႁွမ်တွမ်ဝႆႉ
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>
                  တွၼ်ႈတႃႇ တေႁႂ်ႈ ၵၢၼ်ၸႂ်ႉတိုဝ်း{" "}
                  <span className="text-yellow">လိၵ်းတႆး</span> ၶႅမ်ႉလႅပ်ႈလီၼၼ်ႉ
                  ႁဝ်းၶႃႈ လႆႈၵဵပ်းဝႆႉ ၶေႃႈမုၼ်း ၸိူဝ်းၼႆႉ -
                </p>
                <ul className="list-none space-y-2 mt-4">
                  <li className="flex items-start gap-3 bg-background/50 p-4">
                    <span className="text-blue-500 font-bold text-xl mt-1">
                      •
                    </span>
                    <div>
                      <strong className="block mb-1 opacity-80">
                        ၶေႃႈမုၼ်း သုၼ်ႇတူဝ်:
                      </strong>
                      ၸိုဝ်ႈ၊ ဢီးမေးလ် (Email) လႄႈ ၶေႃႈမုၼ်း ဢၼ်ၵဵဝ်ႇလူၺ်ႈ
                      လွင်ႈတိတ်းတေႃႇ တႃႇႁႂ်ႈၸွႆႈထႅမ်လႆႈ။
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-background/50 p-4">
                    <span className="text-blue-500 font-bold text-xl mt-1">
                      •
                    </span>
                    <div>
                      <strong className="block mb-1 opacity-80">
                        ၶေႃႈမုၼ်း လွင်ႈၸႂ်ႉတိုဝ်း:
                      </strong>
                      လွင်ႈလဵၼ်ႈ၊ လွင်ႈၽိုၵ်းၽွၼ်ႉ၊ လွင်ႈၶိုၼ်ႈယႂ်ႇ (Progress)
                      ၼႂ်းၵၢၼ်ၽိုၵ်း ပိုတ်ႉလိၵ်ႈတႆး လႄႈ လွင်ႈမၢႆတွင်း (Score)။
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
                  3. လွၵ်းလၢႆး လွင်ႈၵႅတ်ႇၶႄ ၶေႃႈမုၼ်း
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>
                  ၶေႃႈမုၼ်းသူၸဝ်ႈ ၼၼ်ႉ ႁဝ်းၶႃႈ ဢဝ်ၵႅတ်ႇၶႄဝႆႉ ပၼ်လွတ်ႈၽေးလီငၢမ်း။
                  ႁဝ်းၶႃႈ တေဢမ်ႇဢဝ် ၶေႃႈမုၼ်းသူၸဝ်ႈ ၵႂႃႇၶၢႆပၼ် ၽူႈတၢင်ႇၵေႃႉ
                  ဢမ်ႇၼၼ် ၸုမ်းတၢင်ႇၸုမ်း လႃးလႃး။
                </p>
                <div className="bg-green-500/5 border-l-4 border-green-500 p-4 rounded-r-xl my-4">
                  <p className="">
                    ႁဝ်းၶႃႈ ၸႂ်ႉတိုဝ်း ၶေႃႈမုၼ်း တွၼ်ႈတႃႇ ႁဵတ်းႁႂ်ႈ{" "}
                    <span className="text-yellow">လိၵ်းတႆး</span>{" "}
                    ၶႅမ်ႉလႅပ်ႈမႃးတိၵ်းတိၵ်း လႄႈ တွၼ်ႈတႃႇ ပၼ်တၢင်းၸွႆႈထႅမ်
                    မပ်ႉၽိူမ်ႉထႅမ် ၽူႈၸႂ်ႉတိုဝ်း ၵူၺ်း။
                  </p>
                </div>
                <p>
                  လွင်ႈသိမ်းၶေႃႈမုၼ်းၼၼ်ႉ ႁဝ်းၶႃႈ ၸႂ်ႉတိုဝ်း လွၵ်းလၢႆး
                  ဢၼ်မီးလွင်ႈႁူမ်ႇလူမ်ႈ ၶၼ်ႉသုင် (Security Standards) တွၼ်ႈတႃႇ
                  ၵႅတ်ႇၶႄ လွင်ႈဢဝ်ၶေႃႈမုၼ်းၵႂႃႇၸႂ်ႉတိုဝ်း ၽိတ်းပိူင်။
                </p>
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
                  4. တိတ်းတေႃႇ ႁဝ်းၶႃႈ
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg">
                <p>
                  ပေႃးဝႃႈ ၽူႈၸႂ်ႉတိုဝ်းႁဝ်း မီးၶေႃႈထၢမ် လွင်ႈပိူင်ၵၢၼ်ႁူမ်ႇလူမ်ႈ
                  ဢမ်ႇၼၼ် လွင်ႈတၢင်ႇၸိူဝ်း ၸိုင်ၸၢင်ႈတိတ်းတေႃႇ ႁဝ်းၶႃႈလႆႈ
                  ၵူႈၶၢဝ်းယၢမ်း -
                </p>
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
                        className="h-6 w-auto mix-blend-screen dark:invert"
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
                မႄးမႂ်ႇမႂ်ႇ လႃႈသုတ်း - လိူၼ်မၢတ်ႉၶျ် (March) ၊ ပီႊ 2026
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </>
  );
};
