import { motion } from "framer-motion";
import {
  Keyboard,
  Award,
  UserCog,
  Globe,
  CloudDownload,
  Code,
  Trophy,
  MonitorDown,
} from "lucide-react";

import {
  anotherSupporterContacts,
  developerContacts,
  supporterContacts,
} from "@/constant";
import { itemVariants } from "@/pages/AboutPage";
import { FeatureCard } from "./FeatureCard";

export const AllInformation = ({
  handleInstallClick,
}: {
  handleInstallClick: () => void;
}) => {
  const keyfeatures = [
    {
      title: "ၵမ်ႉထႅမ်သွင်ၽႃႇသႃႇ",
      description: "ၽိုၵ်းပေႃႉလိၵ်ႈ ဢိင်းၵလဵတ်ႈ လႄႈ လိၵ်ႈတႆး သွင်ၽႃႇသႃႇ",
      icon: <Globe className="size-7 text-yellow" />,
    },
    {
      title: "ၵၢၼ်ၽိုၵ်းတႅမ်ႈၼမ်လၢႆ",
      description:
        "ၽိုၵ်းပေႃႉလိၵ်ႈ လူၺ်ႈၵၢၼ်ၽိုၵ်းလၢႆလၢႆဢၼ် မိူၼ်ၼင်ႇ ၸၼ်ႉဢွၼ်ႇ၊ ၸၼ်ႉၵၢင်၊ ၸၼ်ႉသုင် လႄႈ ၵႂၢမ်းၵပ်းထုၵ်ႇ",
      icon: <Award className="size-7 text-blue" />,
    },
    {
      title: "လွင်ႈဢွင်ႇမၢၼ်",
      description:
        "လႆႈႁပ်ႉပၢႆႉလႄႈ ပိုတ်ႇပၼ်လွင်ႈဢွင်ႇမၢၼ် မိူဝ်ႈၸဝ်ႈၵဝ်ႇ ႁဵတ်းႁႂ်ႈ လွင်ႈပေႃႉလိၵ်ႈ ဝႆးလိူဝ်မႃး",
      icon: <Code className="size-7 text-green" />,
    },
    {
      title: "ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
      description:
        "ၶေႉၶဵင်ႇၵၼ်တင်းတၢင်ႇၵေႃႉ တီႈၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ် တႃႇတေႁူႉဝႃႈ ၽႂ်ဝႆး တႅတ်ႈၼႅတ်ႈ လိူဝ်ၵၼ်။",
      icon: <Trophy className="size-7 text-purple" />,
    },
    {
      title: "ၵမ်ႉထႅမ်ပၼ် ၶီးပူတ်ႉ",
      description:
        "ၵမ်ႉထႅမ်ပၼ် ၶီးပူတ်ႉ 4 ဢၼ် မိူၼ်ၼင်ႇ ၼမ်ႉၶူင်း၊ ပၢင်လူင်၊ ယုင်းၶဵဝ် လႄႈ လၵ်းၸဵင်",
      icon: <Keyboard className="size-7 text-orange" />,
    },
    {
      title: "Progressive Web App (PWA)",
      description: "လူတ်ႇဢဝ်ဢႅပ်ႉၼႆႉသေ ၸႂ်ႉတိုဝ်းၼႂ်းၶိူင်ႈၸဝ်ႈၵဝ်ႇၵမ်းသိုဝ်ႈ။",
      icon: <CloudDownload className="size-7 text-red" />,
    },
  ];

  return (
    <>
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          လိၵ်ႈတႆး
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          ပေႃႉလိၵ်ႈတႆး လူၺ်ႈလၢႆးတႅတ်ႈတေႃးလႄႈဝႆး
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Open Source Section */}
        <motion.section
          variants={itemVariants}
          className="border-b border-foreground/80 py-7"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 bg-blue-500/30 rounded-xl">
              <Code className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              1. တိုၵ်ႉႁႅင်း Hackathon
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg mb-8">
            <p>
              <span className="font-bold text-yellow">လိၵ်ႈတႆး </span> ၼႆႉ
              ပဵၼ်ၽူႈလႆႈသူး တီႈပၢင်ၶေႉၶဵင်ႇ{" "}
              <span className="text-yellow">တိုၵ်ႉႁႅင်း Hackathon</span>, လႄႈ
              ၸုမ်းဢၼ်ၸတ်းႁဵတ်းၼၼ်ႉၵေႃႈပဵၼ် ၸုမ်း{" "}
              <a
                href="https://www.haohaa.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow hover:underline"
              >
                Hao Haa
              </a>{" "}
              ၼႆၶႃႈ။ ၶူင်းၵၢၼ်ဢၼ်ၼႆႉ လႆႈၵေႃႇသၢင်ႈမႃး လူၺ်ႈတၢင်းမုင်ႈမွင်း
              တႃႇပူၵ်းပွင်ပၢႆးပၺ်ႇၺႃႇ ၵၢၼ်ပေႃႉလိၵ်ႈ ၽႃႇသႃႇတႆး လႄႈ မုင်ႈမွင်းဝႃႈ
              တေႁဵတ်းႁႂ်ႈမၼ်းပၼ်ၽွၼ်းလီ တႃႇၽူႈလဵပ်ႈႁဵၼ်းၽႃႇသႃႇတႆးႁဝ်း။
            </p>
          </div>

          <div className="bg-background/50 border border-blue-500/20 p-6 rounded-xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-500">
              ယိူင်းဢၢၼ်းႁဝ်းၶႃႈ
            </h3>
            <ul className="list-none space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl mt-1">•</span>
                <span className="opacity-90 leading-relaxed">
                  <span className="font-bold text-yellow">လိၵ်ႈတႆး </span>{" "}
                  ၼႆႉၶူင်ႊသၢင်ႈဝႆႉ တႃႇပဵၼ်လွင်ႈၵမ်ႉထႅမ်
                  ၼႂ်းၵၢၼ်ၽိုၵ်းတႅမ်ႈလိၵ်ႈတႆး ႁႂ်ႈလူင်ႉလႅၼ်ႇ လႄႈ လႅတ်းၽႆးယဝ်ႉ။
                  ငဝ်ႈတိုၼ်း{" "}
                  <span className="font-bold text-yellow">လိၵ်ႈတႆး </span>{" "}
                  ၼႆႉဢိင်ဢဝ်တီႈ MonkeyType သေၶူင်ႊသၢင်ႈပဵၼ်မႃးယဝ်ႉ၊ ပီႈၼွင်ႉႁဝ်း
                  ၽိုၵ်းတႅမ်ႈလိၵ်ႈတႆး လႄႈ လိၵ်ႈဢိင်းၵလဵတ်ႈ ၼႂ်း{" "}
                  <span className="font-bold text-yellow">လိၵ်ႈတႆး </span>{" "}
                  ၼႆႉလႆႈယဝ်ႉဢေႃႈ။
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl mt-1">•</span>
                <span className="opacity-90 leading-relaxed">
                  ယိူင်းဢၢၼ်းႁဝ်းၶႃႈတႄႉ တႃႇထိင်းသိမ်း လႄႈ ယုၵ်ႉမုၼ်း လိၵ်ႈတႆး
                  လိူၺ်ႈလၢႆးတၢင်းပၢႆးၸၢင်ႈ၊ ၼင်ႇႁိုဝ်ပီႈၼွင်ႉတႆး လႄႈ
                  ၽူႈလဵပ်ႈႁဵၼ်းလိၵ်ႈတႆး လႆႈၽိုၵ်းၼမ်ႉၵတ်ႉပၢႆးၸၢင်ႈၵႂႃႇ။
                </span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={itemVariants}
          className="border-b border-foreground/80 py-7"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 bg-green-500/30 rounded-xl flex-shrink-0">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              2. ၾၢင်ႁၢင်ႊပိူင်လူင်
            </h2>
          </div>
          <p className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg mb-8">
            ၵူႊလွင်ႈလွင်ႈတႃႇမေႃပေႃႉလိၵ်ႈ ဢိင်းၵလဵတ်ႈ လႄႈ လိၵ်ႈတႆးသွင်ၽႃႇသႃႇ
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyfeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </motion.section>

        {/* Download Section */}
        <motion.section
          variants={itemVariants}
          id="download"
          className="border-b border-foreground/80 py-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-purple/30 rounded-xl flex-shrink-0">
              <CloudDownload className="w-6 h-6 text-purple" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              3. ၸၼ်ဢဝ်ဢႅပ်ႉသႂ်ႇၼႂ်းၶွမ်း
            </h2>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-yellow/10 via-background to-purple/5 border border-foreground p-8 lg:p-12">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Content Area */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow/10 border border-yellow/20 text-yellow font-semibold text-sm mb-2">
                  <CloudDownload className="size-4" />
                  <span>Progressive Web App</span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mt-4">
                  တိတ်ႉတင်ႈ လိၵ်ႈတႆး ပဵၼ် PWA သေ ၸႂ်ႉတိုဝ်းလႆႈငၢႆႈငၢႆႈ။
                  ဢမ်ႇတၢပ်ႈလူဝ်ႇ ၶဝ်ႈ Browser သေ ၸႂ်ႉလႆႈ လူၺ်ႈၶဝ်ႈ
                  ဢႅပ်ႉတီႈၶွမ်းဢဝ်။
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-background p-3 rounded-xl border border-foreground/5 shadow-sm">
                    <div className="p-2 bg-blue/10 text-blue rounded-lg">
                      <Trophy className="size-4" />
                    </div>
                    <span className="text-sm font-medium">Native Vibe</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background p-3 rounded-xl border border-foreground/5 shadow-sm">
                    <div className="p-2 bg-orange/10 text-orange rounded-lg">
                      <Code className="size-4" />
                    </div>
                    <span className="text-sm font-medium">Lightweight</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="group relative inline-flex items-center gap-3 text-background bg-primary btn shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <CloudDownload className="size-6 relative z-10 group-hover:animate-bounce" />
                    <span className="relative z-10 ">
                      တိတ်ႉတင်ႈ (Install App)
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Visual Area */}
              <div className="flex-1 w-full max-w-sm lg:max-w-none relative flex justify-center items-center">
                <div className="relative size-64 sm:size-80">
                  <div className="absolute inset-0 border-2 border-dashed border-yellow/20 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 border border-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-4 -right-4 bg-background p-3 rounded-2xl shadow-xl border border-foreground/5"
                  >
                    <Keyboard className="size-6 text-yellow" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-8 -left-6 bg-background p-4 rounded-2xl shadow-xl border border-foreground/5"
                  >
                    <Award className="size-8 text-purple" />
                  </motion.div>

                  {/* Center glowing orb with image */}
                  <div
                    className="absolute inset-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-[0_0_60px_-15px_rgba(234,179,8,0.3)] flex items-center justify-center p-8 border border-foreground/5 z-10 group cursor-pointer"
                    onClick={handleInstallClick}
                  >
                    <div className="absolute inset-0 bg-yellow/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                    <MonitorDown className="size-48 z-10 text-yellow transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Developers & Support */}
        <motion.section
          variants={itemVariants}
          className="border-b border-foreground/80 py-7"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 bg-orange/30 rounded-xl flex-shrink-0">
              <UserCog className="w-6 h-6 text-orange" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              4. ၽူႈၶူင်ႊသၢင်ႈ လႄႈ ၽူၵမ်ႉထႅမ်
            </h2>
          </div>

          <div className="space-y-8 text-muted-foreground leading-loose text-base md:text-lg">
            <div>
              <p>
                <span className="font-bold text-yellow">
                  ၸၢႆးၼေႃႇမိူင်း(လွၼ်ႉ){" "}
                </span>
                ပဵၼ် ၽူႈ ၶူင်ႊသၢင်ႈ ႁဵတ်းဢွၵ်ႇ ၶူင်းၵၢၼ်ၼႆႉ မႃးမိူဝ်ႈ လိူၼ် July
                ပီႊ 2025 ၼႆယူႇၶႃႈ။ ၵပ်းသိုပ်ႇ ၽူႈၶူင်ႊသၢင်ႈလႆႈလူၺ်ႈ
                ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {developerContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-2 border border-foreground/5 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={contact.imagePath}
                      alt={contact.link}
                      className="size-6 rounded-md"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-green-500/5 border-l-4 border-green-500 p-4 rounded-r-xl space-y-6">
              <div>
                <p className="mb-4">
                  ယိၼ်းၸူမ်းၶွပ်ႈၸႂ်ယႂ်ႇၼမ်ထိုင်{" "}
                  <span className="font-bold text-yellow">
                    ၸၢႆးမၢဝ်း (ထုင်ႉမၢဝ်းၶမ်း){" "}
                  </span>
                  ဢၼ်လႆႈၸွၺ်ႈထႅမ်ပၼ် Shan Quotes လႄႈ လွင်ႈၵမ်ႉၸွၺ်ႈ
                  တႃႇၶူင်းၵၢၼ်ၼႆႉယူႇၶႃႈ။ ၵပ်းသိုပ်ႇ ၸၢႆးမၢဝ်း လႆႈလူၺ်ႈ
                  ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။
                </p>
                <div className="flex flex-wrap gap-4">
                  {supporterContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-1 border border-foreground/5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={contact.imagePath}
                        alt={contact.link}
                        className="h-8 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4">
                  ယဝ်ႉၵေႃႈ ၶွပ်ႈၸႂ်ထိုင်ပႃး{" "}
                  <span className="font-bold text-yellow">ၸၢႆးၸၢမ်ႇၺုၼ်ႉ </span>
                  ႁဝ်း ဢၼ်လႆႈၸွၺ်ႈ ထတ်းၶေႃႈသဵင်တႅတ်ႈ လႄႈ ၸွၺ်ႈ ၽိူမ်ႉၶေႃႈမုၼ်း
                  လိၵ်ႈတႆး တွၼ်ႈတႃႇ ၶူင်းၵၢၼ်ၼႆႉၶႃႈ။ ၵပ်းသိုပ်ႇ ၸၢႆးၸၢမ်ႇၺုၼ်ႉ
                  လႆႈလူၺ်ႈ ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။
                </p>
                <div className="flex flex-wrap gap-4">
                  {anotherSupporterContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white p-1 border border-foreground/5 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={contact.imagePath}
                        alt={contact.link}
                        className="h-8 object-contain"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};
