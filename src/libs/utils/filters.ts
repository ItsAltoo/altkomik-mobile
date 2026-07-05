export const ORDER_OPTIONS = [
  { label: "Terbaru", value: "modified" },
  { label: "Tanggal Rilis", value: "date" },
  { label: "Acak", value: "rand" },
  { label: "Ranking", value: "ranking" },
]

export const TYPE_OPTIONS = [
  { label: "Semua", value: "all" },
  { label: "Manga", value: "manga" },
  { label: "Manhwa", value: "manhwa" },
  { label: "Manhua", value: "manhua" },
]

export const STATUS_OPTIONS = [
  { label: "Semua", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Tamat", value: "end" },
]

export const LETTER_OPTIONS = [
  { label: "Semua", value: "all" },
  ...Array.from({ length: 26 }, (_, i) => ({
    label: String.fromCharCode(65 + i),
    value: String.fromCharCode(65 + i),
  })),
  { label: "#", value: "#" },
  { label: "+", value: "+" },
  { label: "-", value: "-" },
  { label: ".", value: "." },
  { label: "[", value: "[" },
  { label: "“", value: "“" },
]
