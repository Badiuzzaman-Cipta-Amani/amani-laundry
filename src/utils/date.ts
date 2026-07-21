export const formatDate = (d: number | Date) =>
  Intl.DateTimeFormat("ID-id", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d)
