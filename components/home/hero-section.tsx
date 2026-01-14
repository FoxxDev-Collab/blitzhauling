import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional Hauling Services You Can Trust
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Fast, reliable junk removal and hauling services in {SITE_CONFIG.address}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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

          {/* Right Column - Image */}
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/cover-page.jpg"
              alt="Blitz Hauling truck and services"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
