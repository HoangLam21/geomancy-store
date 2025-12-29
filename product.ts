export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  material: string;
  beadSize: string;
  element: string;
  age: string;
  description: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "GREEN JADE BRACELET",
    slug: "green-jade-bracelet",
    price: 890000,
    originalPrice: 1150000,
    image: "/images/1.jpg",
    material: "Ngọc Bích",
    beadSize: "10mm",
    element: "Mộc",
    age: "30-50",
    description:
      "Vòng tay Ngọc Bích tự nhiên giúp cân bằng năng lượng, thu hút tài lộc và mang lại cảm giác bình an. Phù hợp với người mệnh Mộc, đặc biệt tốt cho sức khỏe và tinh thần.",
    rating: 5.0,
    reviews: 2,
    stock: 2,
    sizes: ["8mm", "10mm", "12mm"],
  },
  {
    id: 2,
    name: "AQUAMARINE BRACELET",
    slug: "aquamarine-bracelet",
    price: 760000,
    image: "/images/2.jpg",
    material: "Aquamarine",
    beadSize: "8mm",
    element: "Thủy",
    age: "18-30",
    description:
      "Vòng Aquamarine mang sắc xanh biển dịu nhẹ, hỗ trợ giao tiếp, giảm căng thẳng và tăng sự tự tin. Phù hợp cho người trẻ, người làm việc trí óc.",
    rating: 5.0,
    reviews: 3,
    stock: 5,
    sizes: ["8mm", "10mm"],
  },
  {
    id: 3,
    name: "ROSE QUARTZ BRACELET",
    slug: "rose-quartz-bracelet",
    price: 520000,
    image: "/images/3.jpg",
    material: "Thạch Anh Hồng",
    beadSize: "12mm",
    element: "Hỏa",
    age: "18-30",
    description:
      "Thạch Anh Hồng là biểu tượng của tình yêu và sự chữa lành cảm xúc. Giúp cải thiện các mối quan hệ và mang lại cảm giác ấm áp, nhẹ nhàng.",
    rating: 4.5,
    reviews: 5,
    stock: 8,
    sizes: ["10mm", "12mm"],
  },
  {
    id: 4,
    name: "FIRE GUARDIAN CHARM",
    slug: "fire-guardian-charm",
    price: 980000,
    originalPrice: 1290000,
    image: "/images/4.jpg",
    material: "Mã Não",
    beadSize: "10mm",
    element: "Hỏa",
    age: "30-50",
    description:
      "Charm Mã Não phong thủy giúp tăng cường năng lượng tích cực, bảo vệ chủ nhân khỏi nguồn năng lượng xấu. Thích hợp cho người mệnh Hỏa và người lãnh đạo.",
    rating: 5.0,
    reviews: 4,
    stock: 3,
    sizes: ["10mm", "12mm"],
  },
  {
    id: 5,
    name: "ONYX BRACELET",
    slug: "onyx-bracelet",
    price: 640000,
    image: "/images/5.jpg",
    material: "Onyx Đen",
    beadSize: "12mm",
    element: "Thủy",
    age: "trên 50",
    description:
      "Vòng Onyx Đen mang lại sự vững vàng, bảo vệ và ổn định tinh thần. Phù hợp với người trưởng thành, giúp tăng khả năng tập trung và quyết đoán.",
    rating: 4.8,
    reviews: 6,
    stock: 4,
    sizes: ["10mm", "12mm"],
  },
  {
    id: 6,
    name: "AMETHYST BRACELET",
    slug: "amethyst-bracelet",
    price: 870000,
    image: "/images/6.jpg",
    material: "Thạch Anh Tím",
    beadSize: "8mm",
    element: "Thổ",
    age: "18-30",
    description:
      "Thạch Anh Tím giúp thư giãn tinh thần, cải thiện giấc ngủ và tăng khả năng tập trung. Phù hợp cho người học tập và làm việc căng thẳng.",
    rating: 4.9,
    reviews: 7,
    stock: 6,
    sizes: ["8mm", "10mm"],
  },
  {
    id: 7,
    name: "ROSE QUARTZ BRACELET",
    slug: "rose-quartz-bracelet-2",
    price: 480000,
    image: "/images/7.jpg",
    material: "Thạch Anh Hồng",
    beadSize: "10mm",
    element: "Hỏa",
    age: "dưới 18",
    description:
      "Vòng Thạch Anh Hồng nhẹ nhàng, dễ đeo, phù hợp cho người trẻ. Mang ý nghĩa nuôi dưỡng cảm xúc tích cực và sự tự tin.",
    rating: 5.0,
    reviews: 3,
    stock: 10,
    sizes: ["8mm", "10mm"],
  },
  {
    id: 8,
    name: "FIRE GUARDIAN CHARM",
    slug: "fire-guardian-charm-2",
    price: 1120000,
    image: "/images/8.jpg",
    material: "Mã Não Đỏ",
    beadSize: "14mm",
    element: "Hỏa",
    age: "30-50",
    description:
      "Charm Mã Não Đỏ kích thước lớn, tượng trưng cho sức mạnh và quyền lực. Thích hợp với người kinh doanh, lãnh đạo và người mệnh Hỏa.",
    rating: 4.7,
    reviews: 4,
    stock: 3,
    sizes: ["12mm", "14mm"],
  },
  {
    id: 9,
    name: "TIGER'S EYE BRACELET",
    slug: "tigers-eye-bracelet",
    price: 930000,
    image: "/images/9.jpg",
    material: "Mắt Hổ",
    beadSize: "12mm",
    element: "Kim",
    age: "trên 50",
    description:
      "Vòng đá Mắt Hổ giúp tăng sự tự tin, bản lĩnh và thu hút tài lộc. Phù hợp với người mệnh Kim và người làm kinh doanh.",
    rating: 4.8,
    reviews: 5,
    stock: 5,
    sizes: ["10mm", "12mm"],
  },
  {
    id: 10,
    name: "CITRINE BRACELET",
    slug: "citrine-bracelet",
    price: 850000,
    originalPrice: 1180000,
    image: "/images/10.jpg",
    material: "Thạch Anh Vàng",
    beadSize: "10mm",
    element: "Thổ",
    age: "30-50",
    description:
      "Thạch Anh Vàng được xem là viên đá của sự thịnh vượng, giúp thu hút tài lộc và cơ hội trong công việc, kinh doanh.",
    rating: 5.0,
    reviews: 6,
    stock: 4,
    sizes: ["8mm", "10mm", "12mm"],
  },
  {
    id: 11,
    name: "LAPIS LAZULI BRACELET",
    slug: "lapis-lazuli-bracelet",
    price: 910000,
    image: "/images/11.jpg",
    material: "Lapis Lazuli",
    beadSize: "8mm",
    element: "Thủy",
    age: "18-30",
    description:
      "Lapis Lazuli mang sắc xanh sâu huyền bí, giúp tăng khả năng tư duy, sáng tạo và giao tiếp. Phù hợp cho người trẻ và người làm sáng tạo.",
    rating: 4.9,
    reviews: 4,
    stock: 7,
    sizes: ["8mm", "10mm"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  productId: number,
  limit: number = 4
): Product[] {
  return products.filter((p) => p.id !== productId).slice(0, limit);
}