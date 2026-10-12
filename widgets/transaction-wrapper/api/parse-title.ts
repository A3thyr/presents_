export function parseTitle(title: string) {
  switch (title) {
    case "Payment":
      return "payment";

    case "Refund":
      return "refund";
    default:
      return "payment";
  }
}
