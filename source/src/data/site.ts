export const restaurant = {
  name: 'Aroma Kitchen & Cafe',
  shortName: 'Aroma',
  phoneDisplay: '+92 333 4953843',
  phoneHref: 'tel:+923334953843',
  whatsappHref: 'https://wa.me/923334953843',
  instagramHref: 'https://www.instagram.com/aroma_kitchen_n_cafe/?hl=en',
  rating: '4.7/5',
  reviewCount: '105 reviews',
  locations: [
    {
      id: 'scheme-33',
      label: 'Branch 01',
      name: 'Gulzar E Hijri',
      address: 'G-4/A32, D Scheme 33 Sadaat E Amroha Society, Gulzar E Hijri, Scheme 33, Karachi, Pakistan',
      mapsHref: 'https://www.google.com/maps/search/?api=1&query=G-4%2FA32%2C%20D%20Scheme%2033%20Sadaat%20E%20Amroha%20Society%2C%20Gulzar%20E%20Hijri%2C%20Scheme%2033%2C%20Karachi%2C%20Pakistan',
    },
    {
      id: 'clifton',
      label: 'Branch 02',
      name: 'Clifton',
      address: 'Corniche Apartment, Block 2, Clifton, Karachi, Pakistan',
      mapsHref: 'https://www.google.com/maps/search/?api=1&query=Corniche%20Apartment%2C%20Block%202%2C%20Clifton%2C%20Karachi%2C%20Pakistan',
    },
  ],
};

export const officialMenus = [
  {
    id: 'main-menu',
    label: 'Official main menu',
    alt: 'Official Aroma Kitchen & Cafe menu with appetizers, fries, burgers, sandwiches, pizza, Chinese cuisine, pasta, Pakistani cuisine, BBQ, rolls, beverages, desserts and family combos',
    image: '/aroma-kitchen-cafe/menu-main.png',
  },
  {
    id: 'deals-and-info',
    label: 'Official deals & restaurant information',
    alt: 'Official Aroma Kitchen & Cafe deals and restaurant information menu with Deals 1 through 25, contact details and dining information',
    image: '/aroma-kitchen-cafe/menu-deals.png',
  },
];

export const reasons = [
  { number: '01', title: 'Big flavour, no fuss', text: 'The menu is built for proper cravings: familiar comfort, sharper seasoning and zero overthinking.' },
  { number: '02', title: 'Made when you order', text: 'From toasted buns to crisp fries, every plate gets its best moment at the pass.' },
  { number: '03', title: 'A table for every mood', text: 'Grab a quick bite, settle in with coffee or bring the whole crew. There is room for your kind of day.' },
];

export const sampleReviews = [
  { quote: 'The kind of place where a quick burger turns into “should we get one more thing for the table?”', name: 'Editable sample review', detail: 'Replace with approved guest feedback' },
  { quote: 'Warm service, proper portions and a cold brew that makes the Clifton stop worth repeating.', name: 'Editable sample review', detail: 'Replace with approved guest feedback' },
  { quote: 'The menu has something for everyone, but the fire chicken wrap is the one I keep thinking about.', name: 'Editable sample review', detail: 'Replace with approved guest feedback' },
];

export const instagramFeature = {
  image: '/aroma-kitchen-cafe/monday-deal.png',
  alt: 'Aroma Kitchen and Cafe Monday Deal with Makhni Handi, chapatis, dessert and Cola Next',
  title: 'It’s Monday. You’re not in the mood?',
  description: 'It’s Monday, you’re not in the mood, and you really don’t feel like cooking? 😩 The solution is simple — Aroma Kitchen & Cafe’s Monday Deal, for just Rs. 1520/-! No cooking hassles, no Monday blues — just order and enjoy piping hot, home-style food. 🔥',
  price: 'Rs. 1520/-',
  items: ['Makhni Handi (Half)', '04 Chapatis', 'Kheer or Shahi Tukray', '500ml Cola Next'],
  foodpandaHref: 'https://www.foodpanda.pk/',
};

export const peshawariFeature = {
  image: '/aroma-kitchen-cafe/chicken-peshawari-karahi.png',
  alt: 'Aroma Kitchen and Cafe Chicken Peshawari Karahi prepared in a steaming karahi in a traditional market setting',
  title: 'The authentic taste of Peshawar is now in Karachi!',
  description: 'Aroma Kitchen & Cafe brings you Chicken Peshawari Karahi—prepared with desi spices and traditional techniques, offering the true flavor of Pakistan in every bite.',
  foodpandaHref: 'https://www.foodpanda.pk/',
};

export function getOrderLink(itemName?: string) {
  const message = itemName
    ? `Hi Aroma Kitchen & Cafe, I'd like to order the ${itemName}. Please share today's availability and order details.`
    : "Hi Aroma Kitchen & Cafe, I'd like to place an order. Please share today's menu and order details.";
  return `${restaurant.whatsappHref}?text=${encodeURIComponent(message)}`;
}
