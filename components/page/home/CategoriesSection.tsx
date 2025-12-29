import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'METAL',
    slug: 'metal',
    image: '/images/metal.jpg',
    bgColor: 'bg-white',
  },
  {
    id: 2,
    name: 'WOOD',
    slug: 'wood',
    image: '/images/wood.jpg',
    bgColor: 'bg-gray/20',
  },
  {
    id: 3,
    name: 'WATER',
    slug: 'water',
    image: '/images/aqua.jpg',
    bgColor: 'bg-white',
  },
  {
    id: 4,
    name: 'FIRE',
    slug: 'fire',
    image: '/images/fire.jpg',
    bgColor: 'bg-gray/20',
  },
  {
    id: 5,
    name: 'EARTH',
    slug: 'earth',
    image: '/images/earth.jpg',
    bgColor: 'bg-[#E8C5A0]',
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-3xl font-light tracking-wide text-dark">
          CATEGORIES
        </h2>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center"
            >
              <div className="relative mb-4 aspect-square w-full max-w-[200px] overflow-hidden rounded-full shadow-lg transition-transform group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-dark transition-colors group-hover:text-primary">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}