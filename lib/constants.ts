export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Blitz Hauling',
  tagline: 'Professional Junk Removal & Hauling Services',
  description: 'St. Louis area professional hauling and junk removal services. Fast, reliable, and affordable.',
  phone: process.env.NEXT_PUBLIC_PHONE || '(555) 847-4267',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@blitzhauling.com',
  address: process.env.NEXT_PUBLIC_ADDRESS || 'St Louis Area & Lake County, IL',
  businessHours: 'Monday - Saturday: 8AM - 6PM',
} as const;

export const SERVICES = [
  {
    title: 'Junk Removal',
    description: 'Fast and efficient junk removal services for your home or business. We haul away unwanted items quickly and responsibly.',
    icon: 'Trash2',
  },
  {
    title: 'Residential Hauling',
    description: 'Professional residential hauling services for furniture, appliances, and household items. We make moving and decluttering easy.',
    icon: 'Home',
  },
  {
    title: 'Commercial Hauling',
    description: 'Reliable commercial hauling solutions for businesses. From office furniture to construction debris, we handle it all.',
    icon: 'Building2',
  },
  {
    title: 'Estate Cleanouts',
    description: 'Compassionate estate cleanout services. We help families clear out properties with care and respect during difficult times.',
    icon: 'Package',
  },
  {
    title: 'Furniture Removal',
    description: 'Need old furniture removed? We safely haul away sofas, mattresses, tables, and more. Same-day service available.',
    icon: 'Armchair',
  },
  {
    title: 'Appliance Removal',
    description: 'Professional appliance removal and disposal. We handle refrigerators, washers, dryers, and other large appliances.',
    icon: 'Refrigerator',
  },
] as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured for your peace of mind',
    icon: 'ShieldCheck',
  },
  {
    title: 'Fair Pricing',
    description: 'Transparent, competitive pricing with no hidden fees',
    icon: 'DollarSign',
  },
  {
    title: 'Same-Day Service',
    description: 'Fast response times and same-day service available',
    icon: 'Clock',
  },
  {
    title: 'Eco-Friendly',
    description: 'We recycle and donate whenever possible',
    icon: 'Leaf',
  },
] as const;
