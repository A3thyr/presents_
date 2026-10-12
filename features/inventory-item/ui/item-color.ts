export const ITEM_COLOR_MAPPING = [
  { threshold: 0, color: "bg-item-blue" }, // че значит дефолт?
  { threshold: 0.1, color: "bg-item-purple" }, // норм порог цены написать
  { threshold: 3, color: "bg-item-orange" },
  {
    threshold: 40,
    color:
      "bg-linear-[180deg,_rgba(255,_190,_77,_0.34)_0%,_rgba(255,_226,_146,_0.34)_100%] border-item-gold-border",
  },
].sort((a, b) => b.threshold - a.threshold);

export function getColorByPrice(price: number) {
  const matchingThreshold = ITEM_COLOR_MAPPING.find(({ threshold }) => price >= threshold);

  return matchingThreshold?.color || "bg-item-blue";
}
