import { Icon } from '@iconify/react';

const features = [
  {
    icon: 'mdi:truck-fast-outline',
    title: 'FREE DELIVERY',
    description: 'Consectetur adipi elit lorem ipsum dolor sit amet.',
  },
  {
    icon: 'mdi:medal-outline',
    title: 'QUALITY GUARANTEE',
    description: 'Dolor sit amet orem ipsu mcons ectetur adipi elit.',
  },
  {
    icon: 'mdi:tag-outline',
    title: 'DAILY OFFERS',
    description: 'Amet consectetur adipi elit loreme ipsum dolor sit.',
  },
  {
    icon: 'mdi:shield-check-outline',
    title: '100% SECURE PAYMENT',
    description: 'Rem Lopsum dolor sit amet, consectetur adipi elit.',
  },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-light-gray bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <Icon icon={feature.icon} className="h-8 w-8 text-dark" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-dark">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray/80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}