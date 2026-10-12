import { SpinState } from "@/widgets/case-roulette/api/use-spin";

export function returnNames(spinners: SpinState[]): string {
  if (spinners.length === 1) {
    return spinners.map((spinner) => spinner.wonItem?.name).toString();
  }
  return spinners.map((spinner) => spinner.wonItem?.name).toString();
}
