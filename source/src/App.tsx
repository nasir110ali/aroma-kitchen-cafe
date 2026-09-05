import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Download,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Star,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  getOrderLink,
  instagramFeature,
  officialMenus,
  peshawariFeature,
  reasons,
  restaurant,
  sampleReviews,
} from './data/site';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function Brand() {
  return (
    <a className="logo" href="#top" aria-label="Aroma Kitchen and Cafe home">
      <img className="logo-mark-image" src="/aroma-logo.png" alt="" />
      <span className="logo-type">
        <strong>Aroma</strong>
        <small>Kitchen &amp; Cafe</small>
      </span>
    </a>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <div className="topline-note"><span>•</span> Karachi made, craving approved</div>
          <a href={restaurant.phoneHref} aria-label={`Call Aroma on ${restaurant.phoneDisplay}`}>{restaurant.phoneDisplay}</a>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#top">Home</a>
            <a href="#story">About</a>
            <a href="#menu">Menu</a>
            <a href="#reviews">Reviews</a>
            <a href="#locations">Locations</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-order" href={getOrderLink()} target="_blank" rel="noreferrer">Order now <ArrowUpRight size={13} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={25} /> : <MenuIcon size={25} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="container mobile-nav" aria-label="Mobile navigation">
            <a href="#top" onClick={closeMenu}>Home</a>
            <a href="#story" onClick={closeMenu}>About</a>
            <a href="#menu" onClick={closeMenu}>Menu</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#locations" onClick={closeMenu}>Locations</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="mobile-order" href={getOrderLink()} target="_blank" rel="noreferrer" onClick={closeMenu}>Order via WhatsApp <ArrowUpRight size={14} /></a>
          </nav>
        )}
      </header>
    </>
  );
}

function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <motion.div className="hero-copy" initial={reducedMotion ? false : 'hidden'} animate="visible" variants={reveal}>
          <span className="eyebrow">Fast food, slow moments</span>
          <h1 className="display">Come hungry.<br /><em>Leave happy.</em></h1>
          <p className="hero-lede">Burgers with bite, coffee with character and the kind of comfort food Karachi comes back for.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#menu">Explore the menu <ArrowDown size={15} /></a>
            <a className="button button-ghost" href={getOrderLink()} target="_blank" rel="noreferrer">Order now <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-meta">
            <div className="rating">
              <strong>{restaurant.rating}</strong>
              <div>
                <div className="rating-stars" aria-label={`${restaurant.rating} rating`}>
                  {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={11} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />)}
                </div>
                <small>from {restaurant.reviewCount}</small>
              </div>
            </div>
            <div className="muted" style={{ color: 'rgba(247, 239, 226, .55)', fontSize: 11, lineHeight: 1.45 }}>
              <Clock3 size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} aria-hidden="true" /> Open for your next craving
            </div>
          </div>
        </motion.div>
        <motion.div className="hero-photo-wrap" initial={reducedMotion ? false : { opacity: 0, scale: .96, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .9, delay: .16 }}>
          <img className="hero-photo" src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="A stacked cheeseburger with fresh greens and a sesame bun" />
          <div className="hero-sticker">Made for<br />the table</div>
          <div className="hero-caption"><b>02</b> places to find us</div>
        </motion.div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = ['Burgers with bite', 'Coffee with character', 'Made fresh in Karachi', 'Come hungry'];
  return (
    <div className="ticker" aria-label="Aroma highlights">
      <div className="ticker-track">
        {[...items, ...items].map((item, index) => <div className="ticker-item" key={`${item}-${index}`}>{item}</div>)}
      </div>
    </div>
  );
}

function MenuSection() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const closeViewer = () => {
    setActiveMenu(null);
    setZoom(1);
  };

  useEffect(() => {
    if (!activeMenu) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeViewer();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu]);

  const selectedMenu = officialMenus.find((item) => item.id === activeMenu);

  return (
    <section className="section menu-section" id="menu">
      <div className="container">
        <motion.div className="menu-head" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
          <div>
            <span className="eyebrow">Official menu</span>
            <h2 className="display">Our Menu</h2>
          </div>
          <p className="menu-note">Explore the flavors of Aroma Kitchen &amp; Cafe. Tap either menu to read the full selection, offers and restaurant details.</p>
        </motion.div>
        <div className="official-menu-gallery">
          {officialMenus.map((item, index) => (
            <motion.figure className="official-menu-card" key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ delay: index * .1 }}>
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
                <button type="button" className="menu-view-button" onClick={() => setActiveMenu(item.id)} aria-label={`Open ${item.label} in fullscreen`}>
                  <ZoomIn size={15} /> View full menu
                </button>
              </figcaption>
              <button type="button" className="official-menu-trigger" onClick={() => setActiveMenu(item.id)} aria-label={`Open ${item.label} in fullscreen`}>
                <img src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} width={index === 0 ? 2157 : 2137} height={index === 0 ? 1436 : 1577} />
                <span className="menu-image-hint"><ZoomIn size={16} /> Click to enlarge</span>
              </button>
            </motion.figure>
          ))}
        </div>
        <div className="menu-order-note">
          <span>Ready to order?</span>
          <a className="mini-order" href={getOrderLink()} target="_blank" rel="noreferrer">Message us on WhatsApp <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <AnimatePresence>
        {selectedMenu && (
          <motion.div className="menu-lightbox" role="dialog" aria-modal="true" aria-label={selectedMenu.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) closeViewer(); }}>
            <div className="lightbox-shell">
              <div className="lightbox-toolbar">
                <div>
                  <span className="lightbox-kicker">Aroma Kitchen &amp; Cafe</span>
                  <strong>{selectedMenu.label}</strong>
                </div>
                <div className="lightbox-actions">
                  <button type="button" onClick={() => setZoom((current) => Math.max(.75, current - .25))} aria-label="Zoom out"><Minus size={17} /></button>
                  <span aria-live="polite">{Math.round(zoom * 100)}%</span>
                  <button type="button" onClick={() => setZoom((current) => Math.min(2.5, current + .25))} aria-label="Zoom in"><Plus size={17} /></button>
                  <a href={selectedMenu.image} download={`aroma-kitchen-${selectedMenu.id}.png`} aria-label="Download this menu image"><Download size={17} /></a>
                  <button type="button" onClick={closeViewer} aria-label="Close fullscreen menu"><X size={20} /></button>
                </div>
              </div>
              <div className="lightbox-image-wrap">
                <img src={selectedMenu.image} alt={selectedMenu.alt} style={{ transform: `scale(${zoom})` }} />
              </div>
              <p className="lightbox-help">Use the controls to zoom. Press Escape or select close to return to the page.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Favorites() {
  return (
    <section className="section favorites">
      <div className="container favorite-layout">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} variants={reveal}>
          <span className="eyebrow">The regulars know</span>
          <h2 className="display">The ones<br />we crave too.</h2>
          <p className="favorites-copy">The official menu has all the answers for your table — from a quick bite to a full family feast.</p>
          <a className="button button-light" href="#menu" style={{ marginTop: 27 }}>View the official menu <ArrowRight size={15} /></a>
        </motion.div>
        <div className="official-menu-promise">
          <span className="promise-mark">AK</span>
          <div>
            <strong>Full menu.<br />Straight from Aroma.</strong>
            <small>Prices and offers shown in the official menu gallery.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section" id="story">
      <div className="container about-grid">
        <motion.div className="about-art" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal}>
          <img className="about-art-main" src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Freshly prepared cafe breakfast on a sunny table" loading="lazy" />
          <img className="about-art-small" src="https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Friends sharing food around a cafe table" loading="lazy" />
          <div className="about-stamp">Good food<br />good company</div>
        </motion.div>
        <motion.div className="about-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal}>
          <span className="eyebrow">A little about us</span>
          <h2 className="display">A neighbourhood<br /><em style={{ color: 'hsl(var(--primary))' }}>mood.</em></h2>
          <p>Aroma is your easy yes in Karachi — the place you suggest when the group chat cannot decide. We bring together the energy of a fast-food counter and the comfort of a cafe table, with plates made to be passed around.</p>
          <p>Nothing too precious. Just bright flavours, warm service and enough room for your day to unfold.</p>
          <div className="about-signature">See you at Aroma.</div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyAroma() {
  return (
    <section className="section why" id="why-aroma">
      <div className="container">
        <div className="why-head">
          <div><span className="eyebrow">The Aroma feeling</span><h2 className="display">Simple things.<br />Done properly.</h2></div>
          <p>No grand claims, no complicated rules. Just the details that make a casual meal feel like a good idea.</p>
        </div>
        <div className="why-grid">
          {reasons.map((reason, index) => (
            <motion.article className="why-card" key={reason.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal} transition={{ delay: index * .1 }}>
              <div className="why-number">{reason.number}</div>
              <h3 className="display">{reason.title}</h3>
              <p>{reason.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [active, setActive] = useState(0);
  const review = sampleReviews[active];
  const showPrevious = () => setActive((current) => (current - 1 + sampleReviews.length) % sampleReviews.length);
  const showNext = () => setActive((current) => (current + 1) % sampleReviews.length);
  return (
    <section className="section reviews-section" id="reviews">
      <div className="container review-layout">
        <motion.div className="review-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal}>
          <span className="eyebrow">Kind words</span>
          <h2 className="display">Good food<br />gets talked about.</h2>
          <p>We are collecting the stories that make a place feel like yours. Here is a little space ready for them.</p>
          <span className="demo-label">Editable sample/demo content</span>
        </motion.div>
        <motion.div className="review-card" key={active} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .35 }}>
          <div className="review-mark" aria-hidden="true">“</div>
          <blockquote className="review-text">{review.quote}</blockquote>
          <div className="review-attribution">
            <div><strong>{review.name}</strong><small>{review.detail}</small></div>
            <div className="review-controls">
              <button className="round-button" type="button" onClick={showPrevious} aria-label="Previous sample review"><ArrowLeft size={16} /></button>
              <button className="round-button" type="button" onClick={showNext} aria-label="Next sample review"><ArrowRight size={16} /></button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="section" id="locations">
      <div className="container">
        <div className="locations-head">
          <div><span className="eyebrow">Find your table</span><h2 className="display">Two Karachi<br />stops.</h2></div>
          <p>Come by, call ahead or send a WhatsApp. Your next easy meal is closer than you think.</p>
        </div>
        <div className="location-grid">
          {restaurant.locations.map((location, index) => (
            <motion.article className="location-card" key={location.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal} transition={{ delay: index * .1 }}>
              <div className="location-index">{location.label}</div>
              <h3 className="display">{location.name}</h3>
              <p className="location-address">{location.address}</p>
              <div className="location-actions">
                <a href={location.mapsHref} target="_blank" rel="noreferrer"><MapPin size={14} /> Google Maps <ArrowUpRight size={12} /></a>
                <a href={restaurant.phoneHref}><Phone size={13} /> Call</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Social() {
  return (
    <section className="social-section" id="instagram">
      <div className="container">
        <div className="social-head">
          <div><span className="eyebrow">Aroma on Instagram</span><h2 className="display">Pull up a chair<br />on the feed.</h2></div>
          <a className="social-link" href={restaurant.instagramHref} target="_blank" rel="noreferrer"><Instagram size={16} /> @aroma_kitchen_n_cafe <ArrowUpRight size={14} /></a>
        </div>
        <article className="social-feature">
          <a className="social-feature-media" href={restaurant.instagramHref} target="_blank" rel="noreferrer" aria-label="View the Monday Deal on Instagram">
            <img src={instagramFeature.image} alt={instagramFeature.alt} />
          </a>
          <div className="social-feature-copy">
            <span className="social-feature-eyebrow">Monday Deal · {instagramFeature.price}</span>
            <h3 className="display">{instagramFeature.title}</h3>
            <p>{instagramFeature.description}</p>
            <div className="social-feature-deal">
              <strong className="social-feature-price">{instagramFeature.price}</strong>
              <ul aria-label="Monday Deal includes">
                {instagramFeature.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="social-feature-locations" aria-label="Aroma locations">
              <a href={restaurant.locations[0].mapsHref} target="_blank" rel="noreferrer">
                <MapPin size={15} />
                <span><strong>Amroha Society</strong>Gulzar Hijri, Scheme 33</span>
                <ArrowUpRight size={13} />
              </a>
              <a href={restaurant.locations[1].mapsHref} target="_blank" rel="noreferrer">
                <MapPin size={15} />
                <span><strong>Branch 02</strong>Corniche Apartment, Block 2, Clifton</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="social-feature-footer">
              <a className="social-foodpanda" href={instagramFeature.foodpandaHref} target="_blank" rel="noreferrer" aria-label="Find Aroma Kitchen and Cafe on Foodpanda">
                <span aria-hidden="true">🐼</span> Also available on Foodpanda
              </a>
              <a className="button button-primary" href={getOrderLink('the Monday Deal')} target="_blank" rel="noreferrer">
                Order the deal <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </article>
        <article className="social-feature social-feature-peshawari">
          <a className="social-feature-media" href={restaurant.instagramHref} target="_blank" rel="noreferrer" aria-label="View Chicken Peshawari Karahi on Instagram">
            <img src={peshawariFeature.image} alt={peshawariFeature.alt} />
          </a>
          <div className="social-feature-copy">
            <span className="social-feature-eyebrow">Authentic Pakistani flavour</span>
            <h3 className="display">{peshawariFeature.title}</h3>
            <p>{peshawariFeature.description}</p>
            <div className="social-feature-deal social-feature-note">
              <strong className="social-feature-price">Made with desi spices</strong>
              <span>Traditional techniques. True Pakistani flavour in every bite.</span>
            </div>
            <div className="social-feature-locations" aria-label="Aroma locations">
              <a href={restaurant.locations[0].mapsHref} target="_blank" rel="noreferrer">
                <MapPin size={15} />
                <span><strong>Amroha Society</strong>Gulzar Hijri, Scheme 33</span>
                <ArrowUpRight size={13} />
              </a>
              <a href={restaurant.locations[1].mapsHref} target="_blank" rel="noreferrer">
                <MapPin size={15} />
                <span><strong>Branch 02</strong>Corniche Apartment, Block 2, Clifton</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="social-feature-footer">
              <a className="social-foodpanda" href={peshawariFeature.foodpandaHref} target="_blank" rel="noreferrer" aria-label="Find Aroma Kitchen and Cafe on Foodpanda">
                <span aria-hidden="true">🐼</span> Ordering via Foodpanda is also available
              </a>
              <a className="button button-primary" href={getOrderLink('Chicken Peshawari Karahi')} target="_blank" rel="noreferrer">
                Order Peshawari Karahi <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta" id="contact">
      <div className="container">
        <span className="eyebrow">Your table is waiting</span>
        <h2 className="display">Make your next meal an Aroma meal.</h2>
        <p>For a quick bite, a proper catch-up or something deliciously in between — we are ready when you are.</p>
        <a className="button button-primary" href={getOrderLink()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Order on WhatsApp</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p className="footer-blurb">Fast food and cafe comfort, made for Karachi days and late little cravings.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#top">Home</a><a href="#story">About</a><a href="#menu">Menu</a><a href="#reviews">Reviews</a><a href="#locations">Locations</a><a href="#contact">Contact</a>
            </nav>
          </div>
          <div>
            <h3>Say hello</h3>
            <nav className="footer-links" aria-label="Contact links">
              <a href={restaurant.phoneHref}>{restaurant.phoneDisplay}</a>
              <a href={restaurant.whatsappHref} target="_blank" rel="noreferrer">WhatsApp us</a>
              <a href={restaurant.instagramHref} target="_blank" rel="noreferrer">Instagram</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Aroma Kitchen &amp; Cafe. Made in Karachi.</span><a href="#top">Back to top <ChevronDown size={12} style={{ transform: 'rotate(180deg)', verticalAlign: 'middle' }} /></a></div>
      </div>
    </footer>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Aroma Kitchen & Cafe | Official Menu | Karachi';
    const metadata = [
      { name: 'description', content: 'Aroma Kitchen & Cafe official menu for fast food in Karachi, with branches in D Scheme 33 and Clifton.' },
      { name: 'keywords', content: 'Aroma Kitchen Cafe, official menu, fast food Karachi, cafe Karachi, D Scheme 33, Clifton' },
      { property: 'og:title', content: 'Aroma Kitchen & Cafe | Official Menu | Karachi' },
      { property: 'og:description', content: 'Explore the official Aroma Kitchen & Cafe menu and find us in D Scheme 33 or Clifton, Karachi.' },
      { property: 'og:type', content: 'website' },
    ];
    metadata.forEach(({ name, property, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', property);
        if (name) tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, []);

  return (
    <div className="site-shell">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Ticker />
        <section className="section">
          <div className="container">
            <div className="intro-grid">
              <div><span className="eyebrow">Not just a quick bite</span><h2 className="section-title display">Your new<br />usual.</h2></div>
              <p className="intro-copy"><strong>Aroma Kitchen &amp; Cafe is a little bit of everything you want.</strong> A bold, friendly spot where crispy edges meet creamy coffee, and ordering for the table is always the right call.</p>
            </div>
            <div className="rule" />
          </div>
        </section>
        <MenuSection />
        <Favorites />
        <Story />
        <WhyAroma />
        <Reviews />
        <Locations />
        <Social />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;