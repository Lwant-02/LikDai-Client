import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem(
  "language"
) as TranslationMode | null;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav_bar: {
          home: "Home",
          lessons: "Lessons",
          leaderboards: "Leaderboards",
          about: "About",
          login: "Login",
          account: "Account",
          theme: {
            0: "Light",
            1: "Dark",
          },
          language: {
            0: "English",
            1: "Shan",
          },
        },
        home_page: {
          title: "LikDai",
          type_animation: {
            0: "Master Shan Typing with LikDai",
            1: "Practice Fast. Type Smart.",
            2: "Challenge Yourself. Improve Every Day.",
            3: "Track Your Speed and Accuracy",
            4: "Become a Shan Typing Pro!",
          },
          button: "Start Typing Now",
          lesson: "Lessons",
          language: "Language",
          free: {
            title: "Free",
            description: "For Everyone",
          },
          download: "Download App",
        },
        lesson_page: {
          title: "Typing Lessons",
          lessons: "Lessons",
          description:
            "Choose your level and start improving your typing skills with structured lessons",
          lang_mode: {
            title: "Language",
            0: "English",
            1: "Shan",
          },
          beginner: {
            title: "Beginner",
            description: "Start your typing journey",
          },
          intermediate: {
            title: "Intermediate",
            description: "Improve your skills",
          },
          advanced: {
            title: "Advanced",
            description: "Master typing challenges",
          },
          quotes: {
            title: "Quotes",
            description: "Type inspiring quotes",
          },
          search_btn: "Search Lessons....",
          not_found: {
            title: "No lessons found",
            description: "Try adjusting your search terms",
          },
          word: "Words",
        },
        leaderboard_page: {
          title: "Leaderboards",
          description: {
            shan: "Shan All Times",
            eng: "English All Times",
          },
          no_data: "Currently, there are no leaderboards to display",
          note: "Leaderboards are updated every 15 minutes. Only verified accounts are displayed.",
        },
        about_page: {
          description: "Master Shan Typing with Precision and Speed",
          hackathon: {
            name: "Tuk Heng Hackathon",
            organization: "Hao Haa",
            title: "Tuk Heng Hackathon Winner",
            description1: "LikDai is the first winner of",
            description2: "organized by Team",
            description3:
              "This project is built with the hope of promoting Shan language typing education and hope to make it gives advantages to Shan language learners",
          },
          open_source: {
            description:
              "LikDai is proudly open source. Join our community and help us build the future of Shan language typing education.",
          },
          mission: {
            title: "Our Mission",
            1: "LikDai is a specialized typing platform designed to help users master Shan language typing. Inspired by MonkeyType, we've created a clean, distraction-free environment where you can practice and improve your typing skills in both English and Shan languages.",
            2: "Our mission is to preserve and promote the Shan language through technology, making it accessible for both native speakers and learners to develop their digital literacy skills.",
          },
          features: {
            feature_1: {
              title: "Free & Open",
              description:
                "Completely free to use with full source code available on GitHub. No hidden costs or premium features.",
            },
            feature_2: {
              title: "Community Driven",
              description:
                "Built by the community, for the community. Every contribution helps preserve and promote Shan language.",
            },
            feature_3: {
              title: "Modern Tech",
              description:
                "Built with React, TypeScript, and modern web technologies for the best user experience.",
            },
          },
          contribute: {
            title: "How To Contribute",
            developer: {
              title: "Developer",
              description:
                "Help us improve the platform by contributing code, fixing bugs, or adding new features.",
              list_1: "Frontend Development (React/TypeScript)",
              list_2: "Backend Development (Node.js)",
              list_3: "UI/UX Improvements",
            },
            content: {
              title: "Content Contributors",
              description:
                "Help expand our Shan language content, improve translations, or add new typing exercises.",
              list_1: "Shan Language Content",
              list_2: "Translation & Localization",
              list_3: "Educational Materials",
            },
          },
          github_title: "Join Us On GitHub",
          github_description:
            "Star our repository, report issues, or submit pull requests. Every contribution helps make LikDai better for everyone.",
          key_features: {
            title: "Key Features",
            description:
              "Everything you need to master typing in both English and Shan languages",
            feature_1_title: "Bilingual Support",
            feature_1_description:
              "Practice typing in both English and Shan languages.",
            feature_2_title: "Multiple Typing Lessons",
            feature_2_description:
              "Practice typing with various lessons such as beginner, intermediate, advanced and quotes",
            feature_3_title: "Achievements",
            feature_3_description:
              "Earn badges and unlock achievements as you improve your typing speed, accuracy, and consistency over time.",
            feature_4_title: "Leaderboards",
            feature_4_description:
              "Compete with others on the leaderboard to see how you rank against other users.",
            feature_5_title: "Keyboards Support",
            feature_5_description:
              "Support 4 Shan Keyboards (Namkhone, Panglong, Yunghkio, Sil) and English Keyboard",
            feature_6_title: " Progressive Web App",
            feature_6_description:
              "Download the app and use it on your device directly.",
          },
          install: {
            title: "Install LikDai on Your Computer",
            description: "Download the app and use it on your device directly.",
            button: "Download Now",
            text: "Download LikDai on your computer",
          },
          usage: {
            title: "How to Use LikDai",
            usage_1_title: "Choose Your Language",
            usage_1_description:
              "Select the language between English and Shan.",
            usage_2_title: "Select Your Level",
            usage_2_description:
              "Select the level between beginner, intermediate, advanced and quotes.",
            usage_3_title: "Select Your Keyboard",
            usage_3_description:
              "Select the keyboard between (Namkhone, Panglong, Yunghkio, Sil) and English Keyboard",
            usage_4_title: "Start Typing",
            usage_4_description:
              "Start typing and see your progress on the screen.",
            usage_5_title: "Test Your Skills",
            usage_5_description:
              "Test your skills by checking your accuracy and speed.",
            usage_6_title: "Track Your Progress",
            usage_6_description:
              "Create an account to track your progress and compete with others.",
          },
          report_title: "Report a Bug or Give Feedbacks",
          report_description:
            "If you encounter any bugs or issues or have any suggestions, please share them to us. We are always looking to improve and make LikDai even better for you.",
          report_button: "Report Now",
          developer: "Developer",
          developer_description:
            "is the developer of this project in July 2025. You can contact the developer via contacts below.",
          developer_name: "Sai Naw Main (Lwant)",
          support_title: "Support & Reference",
          support_description: "I would also like to ",
          support_description_2:
            "for helping me with the proofreading and providing the information in Tamil for this project. You can contact him via contacts below.",
          support_name: "Jai Tzarm Nyunt",
          reference_description: "Special thanks to",
          reference_description_2:
            "for providing Shan Quotes and other materials and support for this project. You can contact him via contacts below.",
          reference_name: "Sai Mao (TMK)",
          footer: {
            title: "Ready to Improve Your Typing Skills?",
            description:
              "Join thousands of users who are already mastering Shan typing with LikDai. It's completely free and designed to help you type faster and more accurately.",
          },
        },
      },
    },
    shn: {
      translation: {
        nav_bar: {
          home: "ၼႃႈႁိူၼ်း",
          lessons: "ၵၢၼ်ၽိုၵ်း",
          leaderboards: "ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
          about: "လွင်ႈႁဝ်းၶႃႈ",
          login: "ၶဝ်ႈဢၵွင်ႉ",
          account: "ဢၵွင်ႉ",
          theme: {
            0: "ၵၢင်ဝၼ်း",
            1: "ၵၢင်ၶမ်ႈ",
          },
          language: {
            0: "ဢိင်းၵလဵတ်",
            1: "လိၵ်ႈတႆး",
          },
        },
        home_page: {
          title: "လိၵ်ႈတႆး",
          type_animation: {
            0: "Master Shan Typing with LikDai",
            1: "Practice Fast. Type Smart.",
            2: "Challenge Yourself. Improve Every Day.",
            3: "Track Your Speed and Accuracy",
            4: "Become a Shan Typing Pro!",
          },
          button: "တႄႇပေႃႉတေႃႈလဵဝ်",
          lesson: "ၵၢၼ်ၽိုၵ်း",
          language: "ၽႃႇသႃႇ",
          free: {
            title: "ၽလီး",
            description: "တႃႇၵူႊၵေႃႉ",
          },
          download: "ၸၼ်ဢဝ်ဢႅပ်ႉ",
        },
        lesson_page: {
          title: "ၵၢၼ်ၽိုၵ်းတႅမ်ႈ",
          lessons: "ၵၢၼ်ၽိုၵ်း",
          description:
            "လိူၵ်ႈၸၼ်ႉၸဝ်ႈၵဝ်ႇသေ တႄႇႁဵတ်းႁႂ်ႈ ၼမ်ႉၵတ်ႉပေႃႉလိၵ်ႈၸဝ်ႈၵဝ်ႇ ၶိုၼ်ႈယႂ်ႇ လူၺ်ႈ တွၼ်ႈသွၼ် ဢၼ်မီးပိူင်တႅၵ်ႈ",
          lang_mode: {
            title: "ၽႃႇသႃႇ",
            0: "ဢိင်းၵလဵတ်ႈ",
            1: "လိၵ်ႈတႆး",
          },
          beginner: {
            title: "ၸၼ်ႉဢွၼ်ႇ",
            description: "တႄႇၶၢဝ်းတၢင်းပေႃႉလိၵ်ႈ",
          },
          intermediate: {
            title: "ၸၼ်ႉၵၢင်",
            description: "ယုၵ်ႉမုၼ်းၼမ်ႉၵဝ်ႉၸဝ်ႈၵဝ်ႇ",
          },
          advanced: {
            title: "ၸၼ်ႉသုင်",
            description: "လွင်ႈၶဵင်ႇတႃႉမေႃပေႃႉလိၵ်ႈ",
          },
          quotes: {
            title: "ၵႂၢမ်းၵပ်းထုၵ်ႇ",
            description: "ပေႃႉၵႂၢမ်းပၼ်ႁႅင်းၸႂ်",
          },
          search_btn: "သွၵ်ႈႁႃၵၢၼ်ၽိုၵ်းတႅမ်ႈ.....",
          not_found: {
            title: "ဢမ်ႇႁၼ်ၵၢၼ်ၽိုၵ်းၶႃႈ",
            description: "ၸၢမ်းမႄးၶေႃႈသွၵ်ႈႁႃတူၺ်းၶႃႈ",
          },
          word: "တူဝ်လိၵ်ႈ",
        },
        leaderboard_page: {
          title: "ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
          description: {
            shan: "လိၵ်ႈတႆး ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
            eng: "ဢိင်းၵလဵတ်ႈ ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
          },
          no_data: "တေႃႈလဵဝ် ပႆႇမီးၶေႃႈမုၼ်း ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်ၶႃႈ",
          note: "ၽိုၼ်လိၵ်ႈ ၽူႈဢွၼ်ႁူဝ် ၸိူဝ်းၼႆႉ တေႁဵတ်း Update 15 မိၼိတ်ႉၼိူင်ႈပွၵ်ႈ လႄႈ  ဢၵွင်ႉ ၸိူဝ်းလႆႈမၵ်းမၼ်ႈဝႆႉၼၼ်ႉၵွၺ်းၶႃႈ။",
        },
        about_page: {
          description: "ပေႃႉလိၵ်ႈတႆး လူၺ်ႈလၢႆးတႅတ်ႈတေႃးလႄႈဝႆး",
          hackathon: {
            name: "တိုၵ်ႉႁႅင်း Hackathon",
            organization: "ႁဝ်းႁႃး",
            title: "တိုၵ်ႉႁႅင်း Hackathon",
            description1: "LikDai ၼႆႉ ပဵၼ်ၽူႈလႆႈသူး တီႈပၢင်ၶေႉၶဵင်ႇ",
            description2: "လႄႈ ၸုမ်းဢၼ်ၸတ်းႁဵတ်းၼၼ်ႉၵေႃႈပဵၼ် ၸုမ်း",
            description3:
              " ၼႆၶႃႈ။ ၶူင်းၵၢၼ်ဢၼ်ၼႆႉ လႆႈၵေႃႇသၢင်ႈမႃး လူၺ်ႈတၢင်းမုင်ႈမွင်း တႃႇပူၵ်းပွင်ပၢႆးပၺ်ႇၺႃႇ ၵၢၼ်ပေႃႉလိၵ်ႈ ၽႃႇသႃႇတႆး လႄႈ မုင်ႈမွင်းဝႃႈ တေႁဵတ်းႁႂ်ႈမၼ်းပၼ်ၽွၼ်းလီ တႃႇၽူႈလဵပ်ႈႁဵၼ်းၽႃႇသႃႇတႆးႁဝ်း။",
          },
          open_source: {
            description:
              "LikDai ၼႆႉ ပဵၼ်ဢၼ်ပိုတ်ႇဝႆႉ open source လႄႈ ဢွၼ်ၵၼ် ၶဝ်ႈႁူမ်ႈတူင်ႇဝူင်းႁဝ်းၶႃႈသေ ၸွၺ်ႈၵေႃႇသၢင်ႈပၼ် ပၢႆးပၺ်ၺႃလိၵ်ႈတႆးမိူဝ်းၼႃႈၶႃႈ။",
          },
          mission: {
            title: "ယိူင်းဢၢၼ်းႁဝ်းၶႃႈ",
            1: "LikDai ၼႆႉၶူင်ႊသၢင်ႈဝႆႉ တႃႇပဵၼ်လွင်ႈၵမ်ႉထႅမ် ၼႂ်းၵၢၼ်ၽိုၵ်းတႅမ်ႈလိၵ်ႈတႆး ႁႂ်ႈလူင်ႉလႅၼ်ႇ လႄႈ လႅတ်းၽႆးယဝ်ႉ။ ငဝ်ႈတိုၼ်း LikDai ၼႆႉဢိင်ဢဝ်တီႈ MonkeyType သေၶူင်ႊသၢင်ႈပဵၼ်မႃးယဝ်ႉ၊ ပီႈၼွင်ႉႁဝ်း ၽိုၵ်းတႅမ်ႈလိၵ်ႈတႆး လႄႈ လိၵ်ႈဢိင်းၵလဵတ်ႈ ၼႂ်း LikDai ၼႆႉလႆႈယဝ်ႉဢေႃႈ။",
            2: "ယိူင်းဢၢၼ်းႁဝ်းၶႃႈတႄႉ တႃႇထိင်းသိမ်း လႄႈ ယုၵ်ႉမုၼ်း လိၵ်ႈတႆး လိူၺ်ႈလၢႆးတၢင်းပၢႆးၸၢင်ႈ၊ ၼင်ႇႁိုဝ်ပီႈၼွင်ႉတႆး လႄႈ ၽူႈလဵပ်ႈႁဵၼ်းလိၵ်ႈတႆး လႆႈၽိုၵ်းၼမ်ႉၵတ်ႉပၢႆးၸၢင်ႈၵႂႃႇ။",
          },
          features: {
            feature_1: {
              title: "ပၼ်ၽရီး",
              description:
                "ၸႂ်ႉတိုဝ်းလႆႈ လူၺ်ႈဢမ်ႇလႆႈသဵင်ႈငိုၼ်းသင် တင်း source code တဵမ်ထူၼ်ႈ ဢၼ်မီးဝႆႉတီႈ GitHub ၼၼ်ႉယဝ်ႉ။ ဢမ်ႇမီးၵႃႈၸႂ်ႉၸၢႆႇဢၼ်လပ်ႉဝႆႉ ဢမ်ႇၼၼ် ၽွၼ်းလီ Premium ။",
            },
            feature_2: {
              title: "တူင်ႇဝူင်းၵူၼ်း ၶိုင်ပွင်",
              description:
                "ၵေႃႇသၢင်ႈလူၺ်ႈတူင်ႇဝူင်းၵူၼ်း တွၼ်ႈတႃႇတူင်ႇဝူင်းၵူၼ်း လႄႈ လွင်ႈၵမ်ႉၸွၺ်ႈၵူႊလွင်ႈလွင်ႈၼႆႉ ၸွၺ်ႈထိင်းသိမ်း ယုၵ်ႉယွင်ႈလိၵ်ႈတႆးႁဝ်းၶႃႈ။",
            },
            feature_3: {
              title: "ပၢႆးၸၢင်ႊၶိုတ်းၵၢပ်ႈ",
              description:
                "ႁဵတ်းဢွၵ်ႇမႃး လူၺ်ႈ React, TypeScript လႄႈ ပၢႆးၸၢင်ႊ ဝႅပ်ႉသၢႆႉ ၵၢပ်ႈပၢၼ်မႂ်ႇ တႃႇႁႂ်ႈ ၽူႈၸႂ်ႉတိုဝ်းၶဝ် လႆႈၸႂ်ႉတိုဝ်း ႁႂ်ႈလီတီႈသုတ်း။",
            },
          },
          contribute: {
            title: "တေႁဵတ်းႁိုဝ်ၶဝ်ႈႁူမ်ႈသၢင်ႈ",
            developer: {
              title: "ၽူႈၶူင်ႊသၢင်ႈ",
              description:
                "ၸွႆႈထႅမ်ပၼ် ႁႂ်ႈပလႅတ်ႉၽွမ်းႁဝ်းၶၢႈ ၶိုၼ်ႈယႂ်ႇမႂ်ႇသုင် လူၺ်ႈ ၸွႆႈထႅမ်ပၼ် ၶူတ်ႉ၊ ဢမ်ႇၼၼ် ၸွၺ်ႈႁႃ ပၼ်ႁႃ",
              list_1: "Frontend Development (React/TypeScript)",
              list_2: "Backend Development (Node.js)",
              list_3: "UI/UX Improvements",
            },
            content: {
              title: "ၽူႈၸွၺ်ႈထႅမ်ၶေႃႈမုၼ်း",
              description:
                "ၸွၺ်ႈၶႂၢၵ်ႈပၼ် ၶေႃႈၼမ်းၽႃႇသႃႇတႆးႁဝ်း ႁႂ်ႈလီလိူဝ်မႃး ဢမ်ႇၼၼ် ထႅမ်သႂ်ႇ ၵၢၼ်ၽိုၵ်းၽွၼ်ႉ ပေႃႉလိၵ်ႈမႂ်ႇ။",
              list_1: "ၽႃႇသႃႇလိၵ်ႈတႆး",
              list_2: "ၵၢၼ်ပိၼ်ႇၽႃႇသႃႇ",
              list_3: "ၶိူင်ႈၸႂ်ႉၶူဝ်းတိုဝ်းပၢႆးပၺ်ႇၺႃႇ",
            },
          },
          github_title: "ၶဝ်ႈႁူမ်ႈႁဝ်းၶႃႈတီႈ Github",
          github_description:
            "ပၼ် လၢဝ် ဢမ်ႇၼၼ် တၢင်ႇပၼ် လွင်ႈပၼ်ႁႃ။ လွင်ႈၵမ်ႉထႅမ်ႈၵူႊလွင်ႈၼႆႉ ၸွၺ်ႈႁႂ်ႈ လိၵ်ႈတႆးႁဝ်းတိူဝ်းလီမႃးၶႃႈ။",
          key_features: {
            title: "ၽၢင်ႁၢင်ႈပိူင်လူင်",
            description:
              "ၵူႊလွင်ႈလွင်ႈတႃႇမေႃပေႃႉလိၵ်ႈ ဢိင်းၵလဵတ်ႈ လႄႈ လိၵ်ႈတႆးသွင်ၽႃႇသႃႇ",
            feature_1_title: "ၵမ်ႉထႅမ်သွင်ၽႃႇသႃႇ",
            feature_1_description:
              "ၽိုၵ်းပေႃႉလိၵ်ႈ ဢိင်းၵလဵတ်ႈ လႄႈ လိၵ်ႈတႆး သွင်ၽႃႇသႃႇ",
            feature_2_title: "ၵၢၼ်ၽိုၵ်းတႅမ်ႈၼမ်လၢႆ",
            feature_2_description:
              "ၽိုၵ်းပေႃႉလိၵ်ႈ လူၺ်ႈၵၢၼ်ၽိုၵ်းလၢႆလၢႆဢၼ် မိူၼ်ၼင်ႇ ၸၼ်ႉဢွၼ်ႇ၊ ၸၼ်ႉၵၢင်၊ ၸၼ်ႉသုင် လႄႈ ၵႂၢမ်းၵပ်းထုၵ်ႇ",
            feature_3_title: "လွင်ႈဢွင်ႇမၢၼ်",
            feature_3_description:
              "လႆႈႁပ်ႉပၢႆႉလႄႈ ပိုတ်ႇပၼ်လွင်ႈဢွင်ႇမၢၼ် မိူဝ်ႈၸဝ်ႈၵဝ်ႇ ႁဵတ်းႁႂ်ႈ လွင်ႈပေႃႉလိၵ်ႈ ဝႆးလိူဝ်မႃး",
            feature_4_title: "ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်",
            feature_4_description:
              "ၶေႉၶဵင်ႇၵၼ်တင်းပိူၼ်ႈ တီႈၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ် တႃႇတေႁူႉဝႃႈ ၸဝ်ႈၵဝ်ႇ မီးၸၼ်ႉထၢၼ်ႈ ၼိူဝ်ၽူႈၸႂ်ႉတိုဝ်းတၢင်ႇၵေႃႉ ၸိူင်ႉႁိုဝ်။",
            feature_5_title: "ၵမ်ႉထႅမ်ပၼ် ၶီးပူတ်ႉ",
            feature_5_description:
              "ၵမ်ႉထႅမ်ပၼ် ၶီးပူတ်ႉ 4 ဢၼ် မိူၼ်ၼင်ႇ ၼမ်ႉၶူင်း၊ ပၢင်လူင်၊ ယုင်းၶဵဝ် လႄႈ လၵ်းၸဵင်",
            feature_6_title: " Progressive Web App",
            feature_6_description:
              "လူတ်ႇဢဝ်ဢႅပ်ႉၼႆႉသေ ၸႂ်ႉတိုဝ်းၼႂ်းၶိူင်ႈၸဝ်ႈၵဝ်ႇၵမ်းသိုဝ်ႈ။",
          },
          install: {
            title: "ၸၼ်ဢဝ်ဢႅပ်ႉသႂ်ႇၼႂ်းၶွမ်း",
            description:
              "ဢဝ် LikDai ႁဵတ်းပဵၼ် Progressive Web App (PWA) သေ ၸၼ်သႂ်ႇၼႂ်းၶွမ်း ၵမ်းသိုဝ်ႈ တႃႇလႆႈႁပ်ႉလွင်ႈတူဝ်ထူပ်း ဢၼ်လီသုတ်း။",
            text: "လူတ်ႇလူင်း ဢႅပ်ႉသႂ်ႇၼႂ်းၶွမ်း",
            button: "လူတ်ႇလူင်း တေႃႈလဵဝ်",
          },
          usage: {
            title: "လၢႆးၸႂ်ႉတိုဝ်း",
            usage_1_title: "လိူၵ်ႈၽႃႇသႃႇ",
            usage_1_description: "လိူၵ်ႈၼႂ်းၵႄႈ လိၵ်ႈတႆး လႄႈ လိၵ်ႈဢိင်းၵလဵတ်ႈ",
            usage_2_title: "လိူၵ်ႈၸၼ်ႉ",
            usage_2_description:
              "လိူၵ်ႈၼႂ်းၵႄႈ ၸၼ်ႉ Beginner, Intermediate, Advanced and Quotes",
            usage_3_title: "လိူၵ်ႈလွၵ်းမိုဝ်း",
            usage_3_description:
              "လိူၵ်ႈၼႂ်းၵႄႈ လွၵ်းမိုဝ်း ၼမ်ႉၶူင်း၊ ပၢင်လူင် ၊ ယုင်းၶဵဝ် ဢမ်ႇၼၼ် လၵ်းၸဵင်။",
            usage_4_title: "တႄႇတႅမ်ႈ",
            usage_4_description:
              "မိူဝ်ႈတႄႇပေႃႉလိၵ်ႈၼၼ်ႉ ၶၢဝ်းယၢမ်းမၼ်း တေတႄႇမႃးႁင်းမၼ်းယဝ်ႉ။",
            usage_5_title: "ထတ်းတူၺ်း result ၸဝ်ႈၵဝ်ႇ",
            usage_5_description:
              "ဝၢႆးသေတႅမ်ႈယဝ်ႉ ထတ်းတူၺ်း WPM, Accuracy, Consistency လႄႈ Metrics တၢင်ႇၸိူဝ်း။",
            usage_6_title: "ၸွမ်းတူၺ်းလွင်ႈၶိုၼ်ႈယႂ်ႇၸဝ်ႈၵဝ်ႇ",
            usage_6_description:
              "ႁဵတ်းဢၵွင်ႉ တႃႇသိမ်းဝႆႉ result ၸဝ်ႈၵဝ်ႇသေ တႅၵ်ႈၼိူင်းၵၼ်တင်း ၵူၼ်းတၢင်ႇၵေႃႉ ဢၼ်မီးတီႈ ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်ၼၼ်ႉ။",
          },
          report_title: "ပၼ်တၢင်းႁၼ်ထိုင်",
          report_description:
            "သင်ဝႃႈ ၸဝ်ႈၵဝ်ႇထူပ်းၺႃး လွင်ႈၽိတ်းပိူင်ႈ ဢမ်ႇၼၼ် ပၼ်ႁႃ ဢမ်ႇၼၼ် မီးတၢင်းႁၼ်ထိုင်သင်ၼႆ ၸွၺ်ႈၽၢၵ်ႇပၼ်ႁဝ်းၶႃႈသေၵမ်း။ ႁဝ်းၶႃႈတိုၼ်းၶတ်းၸႂ်တႃႇတေႁဵတ်းႁႂ်ႈ LikDai လီလိူဝ်မႃး တွၼ်ႈတႃႇသူၸဝ်ႈယူႇတႃႇသေႇ။",
          report_button: "တၢင်ႇတေႃႈလဵဝ်",
          developer: "ၽူႈၶူင်ႊသၢင်ႈ",
          developer_description:
            "ပဵၼ် ၽူႈ ၶူင်ႊသၢင်ႈ ႁဵတ်းဢွၵ်ႇ ၶူင်းၵၢၼ်ၼႆႉ မႃးမိူဝ်ႈ လိူၼ် July ပီႊ 2025 ၼႆယူႇၶႃႈ။ ၵပ်းသိုပ်ႇ ၽူႈၶူင်ႊသၢင်ႈလႆႈလူၺ်ႈ ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။",
          developer_name: "ၸၢႆးၼေႃႇမိူင်း(လွၼ်ႉ)",
          support_title: "ၵမ်ႉထႅမ်လႄႈ ၽိုၼ်ဢိင်",
          support_description: "ယဝ်ႉၵေႃႈ ၶွပ်ႈၸႂ်ထိုင်ပႃး",
          support_description_2:
            "ႁဝ်း ဢၼ်လႆႈၸွၺ်ႈ ထတ်းၶေႃႈသဵင်တႅတ်ႈ လႄႈ ၸွၺ်ႈ ၽိူမ်ႉၶေႃႈမုၼ်း လိၵ်ႈတႆး တွၼ်ႈတႃႇ ၶူင်းၵၢၼ်ၼႆႉၶႃႈ။ ၵပ်းသိုပ်ႇ ၸၢႆးၸၢမ်ႇၺုၼ်ႉ လႆႈလူၺ်ႈ ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။",
          support_name: "ၸၢႆးၸၢမ်ႇၺုၼ်ႉ",
          reference_description: "ယိၼ်းၸူမ်းၶွပ်ႈၸႂ်ယႂ်ႇၼမ်ထိုင်",
          reference_description_2:
            "ဢၼ်လႆႈၸွႆႈထႅမ်ပၼ် Shan Quotes လႄႈ ၶူဝ်းၶွင်တၢင်ႇဢၼ် လႄႈ လွင်ႈၵမ်ႉၸွႆႈ တႃႇၶူင်းၵၢၼ်ၼႆႉယူႇၶႃႈ။ ၵပ်းသိုပ်ႇ ၸၢႆးမၢဝ်း လႆႈလူၺ်ႈ ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။",
          reference_name: "ၸၢႆးမၢဝ်း (ထုင်ႉမၢဝ်းၶမ်း)",
          footer: {
            title: "ၽွမ်ႉတႃႇတေ ယုၵ်ႉမုၼ်းၼမ်ႉၵတ်ႉ ပေႃႉလိၵ်ႈယဝ်ႉႁႃႉ?",
            description:
              "ၶဝ်ႈႁူမ်ႈၸွမ်း ၽူႈၸႂ်ႉတိုဝ်း ဢၼ်မေႃပေႃႉလိၵ်ႈတႆး ၼပ်ႉႁူဝ်ႁဵင်တီႈ LikDai ၶႃႈ။ မၼ်းဢမ်ႇလႆႈသဵင်ႈငိုၼ်းသင်သေ ႁဵတ်းဝႆႉ တႃႇၸွၺ်ႈထႅမ် ႁႂ်ႈၸဝ်ႈၵဝ်ႇ ပေႃႉလိၵ်ႈလႆႈဝႆးဝႆး လႄႈ တႅတ်ႈတေႃးလိူဝ်ၵဝ်ႇ။",
          },
        },
      },
    },
  },
  lng: savedLanguage ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
