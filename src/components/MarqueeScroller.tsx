import React from "react";

const KhaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    ၵ
  </div>
);
const KhaaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    ၶ
  </div>
);
const NgaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    င
  </div>
);
const JaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    ၸ
  </div>
);
const ChaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    သ
  </div>
);
const NyaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    ၺ
  </div>
);
const DaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    တ
  </div>
);
const TaCha = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    ထ
  </div>
);
const NaChar = () => (
  <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
    ၼ
  </div>
);

const BaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ပ
    </div>
  );
};

const PaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ၽ
    </div>
  );
};

const PhaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ၾ
    </div>
  );
};

const MaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      မ
    </div>
  );
};

const YaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ယ
    </div>
  );
};

const RaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ရ
    </div>
  );
};

const LaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      လ
    </div>
  );
};

const WaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ဝ
    </div>
  );
};

const HaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ႁ
    </div>
  );
};

const AaChar = () => {
  return (
    <div className="text-7xl font-bold text-yellow flex justify-center items-center font-secondary">
      ဢ
    </div>
  );
};

const logos1 = [
  { id: 1, component: <KhaChar /> },
  { id: 2, component: <KhaaChar /> },
  { id: 3, component: <NgaChar /> },
  { id: 4, component: <JaChar /> },
  { id: 5, component: <ChaChar /> },
  { id: 6, component: <NyaChar /> },
  { id: 7, component: <DaChar /> },
  { id: 8, component: <TaCha /> },
  { id: 9, component: <NaChar /> },
  { id: 10, component: <BaChar /> },
  { id: 11, component: <PaChar /> },
  { id: 12, component: <PhaChar /> },
  { id: 13, component: <MaChar /> },
  { id: 14, component: <YaChar /> },
  { id: 15, component: <RaChar /> },
  { id: 16, component: <LaChar /> },
  { id: 17, component: <WaChar /> },
  { id: 18, component: <HaChar /> },
  { id: 19, component: <AaChar /> },
];

const logos2 = [
  { id: 1, component: <KhaChar /> },
  { id: 2, component: <KhaaChar /> },
  { id: 3, component: <NgaChar /> },
  { id: 4, component: <JaChar /> },
  { id: 5, component: <ChaChar /> },
  { id: 6, component: <NyaChar /> },
  { id: 7, component: <DaChar /> },
  { id: 8, component: <TaCha /> },
  { id: 9, component: <NaChar /> },
  { id: 10, component: <BaChar /> },
  { id: 11, component: <PaChar /> },
  { id: 12, component: <PhaChar /> },
  { id: 13, component: <MaChar /> },
  { id: 14, component: <YaChar /> },
  { id: 15, component: <RaChar /> },
  { id: 16, component: <LaChar /> },
  { id: 17, component: <WaChar /> },
  { id: 18, component: <HaChar /> },
  { id: 19, component: <AaChar /> },
];

function Logomarquee() {
  // We need to inject the keyframes animation into the document's head
  // because Tailwind CSS doesn't directly support the 'cqw' unit.
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-move {
        to {
          transform: translateX(calc(-100cqw - var(--item-gap)));
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const Marquee = ({
    logos,
    direction = "forwards",
  }: {
    logos: typeof logos1;
    direction?: string;
  }) => {
    const numItems = logos.length;
    const speed = "25s";
    const itemWidth = "120px";
    const itemGap = "25px";

    return (
      <div
        className="max-w-full overflow-hidden"
        style={
          {
            "--speed": speed,
            "--numItems": numItems,
            "--item-width": itemWidth,
            "--item-gap": itemGap,
            "--direction": direction,
            maskImage:
              "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
          } as React.CSSProperties
        }
      >
        <div
          className="w-max flex"
          style={
            {
              "--track-width": `calc(var(--item-width) * ${numItems})`,
              "--track-gap": `calc(var(--item-gap) * ${numItems})`,
            } as React.CSSProperties
          }
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex justify-center items-center bg-white/10 border border-black rounded-2xl text-white w-20 h-28"
              style={
                {
                  width: "var(--item-width)",
                  aspectRatio: "1 / 1.2",
                  marginRight: "var(--item-gap)",
                  animation: `marquee-move var(--speed) linear infinite ${direction}`,
                } as React.CSSProperties
              }
            >
              <div className="w-3/5 h-auto">{logo.component}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="items-center overflow-hidden my-7">
      <div className="w-full max-w-6xl flex flex-col gap-y-6">
        <Marquee logos={logos1} />
        <Marquee logos={logos2} direction="reverse" />
      </div>
    </div>
  );
}

export default Logomarquee;
