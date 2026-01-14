import { ShieldCheck, DollarSign, Clock, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SITE_CONFIG, WHY_CHOOSE_US } from '@/lib/constants';

// Map icon names to Lucide components
const iconMap = {
  ShieldCheck,
  DollarSign,
  Clock,
  Leaf,
};

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About {SITE_CONFIG.name}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for professional hauling and junk removal services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              At {SITE_CONFIG.name}, we're committed to providing fast, reliable, and affordable
              hauling and junk removal services to our community. Whether you're clearing out a
              home, managing a construction site, or need commercial hauling, we handle every job
              with professionalism and care.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We understand that junk removal and hauling can be overwhelming. That's why we make
              the process simple, stress-free, and environmentally responsible. We recycle and
              donate whenever possible, ensuring your unwanted items are disposed of responsibly.
            </p>

            {/* Business Hours */}
            <div className="bg-background p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p className="text-sm text-muted-foreground">{SITE_CONFIG.businessHours}</p>
            </div>
          </div>

          {/* Right Column - Why Choose Us */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
            <div className="space-y-6">
              {WHY_CHOOSE_US.map((item) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="secondary">Licensed</Badge>
              <Badge variant="secondary">Insured</Badge>
              <Badge variant="secondary">Locally Owned</Badge>
              <Badge variant="secondary">Eco-Friendly</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
