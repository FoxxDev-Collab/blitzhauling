import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Professional Hauling Services You Can Trust
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Fast, reliable junk removal and hauling services in {SITE_CONFIG.address}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {SITE_CONFIG.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
