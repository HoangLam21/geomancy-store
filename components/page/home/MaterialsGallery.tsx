import Link from 'next/link';

const materials = [
  {
    id: 1,
    name: 'Aquamarine',
    image: '/images/materials/1.jpg',
    size: 'large', // 1x1
  },
  {
    id: 2,
    name: 'Rose Quartz',
    image: '/images/materials/2.jpg',
    size: 'medium', // 1x1
  },
  {
    id: 3,
    name: 'Moonstone',
    image: '/images/materials/3.jpg',
    size: 'wide', // 2x1
  },
  {
    id: 4,
    name: 'Black Tourmaline',
    image: '/images/materials/4.jpg',
    size: 'large', // 2x1
  },
  {
    id: 5,
    name: 'Ruby',
    image: '/images/materials/5.jpg',
    size: 'medium', // 1x1
  },
  {
    id: 6,
    name: 'Lapis Lazuli',
    image: '/images/materials/6.jpg',
    size: 'medium', // 1x1
  },
];

export function MaterialsGallery() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-light tracking-wide text-white">
            MATERIAL
          </h2>
          <Link
            href="/materials"
            className="text-sm uppercase tracking-wide text-white underline transition-opacity hover:opacity-80"
          >
            SEE ALL
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {/* Large image - spans 2 rows */}
          <div className="col-span-2 row-span-2">
            <div className="group relative aspect-square overflow-hidden border-4 border-white">
              <img
                src={materials[0].image}
                alt={materials[0].name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          </div>

          {/* Medium image */}
          <div className="col-span-2">
            <div className="group relative aspect-square overflow-hidden border-4 border-white">
              <img
                src={materials[1].image}
                alt={materials[1].name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          </div>

          {/* Wide image - spans 2 columns */}
          <div className="col-span-2">
            <div className="group relative aspect-[2/1] overflow-hidden border-4 border-white">
              <img
                src={materials[2].image}
                alt={materials[2].name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          </div>

          {/* Large bottom image - spans 2 columns */}
          <div className="col-span-2 md:col-span-3">
            <div className="group relative aspect-[3/2] overflow-hidden border-4 border-white md:aspect-[3/1]">
              <img
                src={materials[3].image}
                alt={materials[3].name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          </div>

          {/* Medium image */}
          <div className="col-span-1">
            <div className="group relative aspect-square overflow-hidden border-4 border-white">
              <img
                src={materials[4].image}
                alt={materials[4].name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          </div>

          {/* Medium image */}
          <div className="col-span-1">
            <div className="group relative aspect-square overflow-hidden border-4 border-white">
              <img
                src={materials[5].image}
                alt={materials[5].name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}