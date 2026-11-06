import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  Leaf,
  Heart,
  Check,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    title: "Dekoracje ślubne",
    subtitle: "Kościół, sala i Wasza wspólna historia",
    image: "hero",
    tag: "ŚLUBY & WESELA",
    description:
      "Od pierwszego kroku w kościele po ostatni taniec. Tworzymy spójną oprawę kwiatową ceremonii i przyjęcia, aby każde miejsce było częścią tej samej, pięknej historii.",
    items: [
      "Dekoracja kościoła i miejsca ceremonii",
      "Kompozycje na stoły i stół Pary Młodej",
      "Dekoracje pojazdów ślubnych",
      "Dobór kolorystyki i kwiatów do charakteru uroczystości",
    ],
  },
  {
    title: "Wiązanki i wianki",
    subtitle: "Małe detale, wielkie emocje",
    image: "bouquet",
    tag: "BLISKO SERCA",
    description:
      "Bukiet, który pasuje do Ciebie, nie tylko do sukni. Delikatny wianek, który czujesz jak własny. Tworzymy osobiste kompozycje z wyczuciem proporcji, koloru i naturalnego piękna.",
    items: [
      "Indywidualne wiązanki ślubne",
      "Wianki z kwiatów i zieleni",
      "Bukieciki dla druhen",
      "Dopasowanie do stylu i palety ślubu",
    ],
  },
  {
    title: "Dekoracje sezonowe",
    subtitle: "Niech dom poczuje wyjątkowy czas",
    image: "wreath",
    tag: "W RYTMIE NATURY",
    description:
      "Zapach zielonych gałązek, ciepło świec i detale, które zmieniają zwykły stół w miejsce spotkań. Projektujemy stroiki, które wnoszą do domu świąteczną atmosferę.",
    items: [
      "Stroiki bożonarodzeniowe",
      "Kompozycje wielkanocne",
      "Wianki na drzwi",
      "Dekoracje świątecznego stołu",
    ],
  },
];
const photos = [
  {
    image: "hero",
    title: "Romantycznie, wśród kwiatów",
    category: "Śluby i wesela",
    detail: "Pudrowy róż, kremowe róże i naturalna zieleń.",
  },
  {
    image: "bouquet",
    title: "Bukiet pełen delikatności",
    category: "Wiązanki i wianki",
    detail: "Ponadczasowa biel w osobistej ślubnej kompozycji.",
  },
  {
    image: "table",
    title: "Przy wspólnym stole",
    category: "Śluby i wesela",
    detail: "Lekka, naturalna oprawa przyjęcia blisko natury.",
  },
  {
    image: "church",
    title: "Piękno pierwszego „tak”",
    category: "Śluby i wesela",
    detail: "Subtelne kwiaty podkreślające wyjątkowość ceremonii.",
  },
  {
    image: "wreath",
    title: "Święta zaczynają się w domu",
    category: "Dekoracje sezonowe",
    detail: "Naturalny wianek i spokojna, zielona paleta.",
  },
  {
    image: "car",
    title: "W drogę po wspólne jutro",
    category: "Śluby i wesela",
    detail: "Białe kwiaty jako inspiracja do oprawy pojazdu ślubnego.",
  },
];
const faqs = [
  [
    "Kiedy najlepiej zacząć planować dekoracje?",
    "Najlepiej wtedy, gdy znacie już datę i miejsce uroczystości. Wcześniejsza rozmowa daje więcej przestrzeni na dobór koncepcji i sezonowych kwiatów. Dostępność konkretnego terminu wymaga indywidualnego potwierdzenia.",
  ],
  [
    "Czy możemy przyjść z własnymi inspiracjami?",
    "Oczywiście. Zdjęcia, kolory, fragment tkaniny czy opis atmosfery pomogą stworzyć koncepcję bliską Wam. Inspiracje traktujemy jako punkt wyjścia, nie szablon do kopiowania.",
  ],
  [
    "Od czego zależy koszt dekoracji?",
    "Od zakresu oprawy, liczby i rodzaju kompozycji, wybranych kwiatów, ich sezonowości oraz logistyki. Budżet ustalamy indywidualnie — bez niego nie podajemy przypadkowych kwot.",
  ],
  [
    "Czy zajmujecie się także dekoracjami świątecznymi?",
    "Tak. W ofercie są stroiki bożonarodzeniowe i wielkanocne, wianki oraz kompozycje na świąteczny stół. Ich kolorystykę i charakter można dopasować do wnętrza.",
  ],
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="Cudna i Śmietanowska — strona główna"
    >
      <img src="/images/emblem.svg" alt="" />
      <span>
        <span className="wordmark">
          Cudna<span className="amp">&</span>Śmietanowska
        </span>
        <span className="brand-note">PRACOWNIA FLORYSTYCZNA</span>
      </span>
    </a>
  );
}
function Dialog({
  children,
  onClose,
  label,
  wide = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    const prev = document.activeElement as HTMLElement;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      prev?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${wide ? "dialog-wide" : ""}`}
      aria-label={label}
      onCancel={onClose}
    >
      <button className="close-button" onClick={onClose} aria-label="Zamknij">
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState<number | null>(null);
  const [filter, setFilter] = useState("Wszystkie");
  const [photo, setPhoto] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(null);
  const [briefReady, setBriefReady] = useState(false);
  const [briefText, setBriefText] = useState("");
  const filtered = photos.filter((p) => filter === "Wszystkie" || p.category === filter);
  useEffect(() => {
    if (photo === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPhoto((p) => (p === null ? null : (p + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setPhoto((p) => (p === null ? null : (p - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [photo, filtered.length]);
  function prepareBrief(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `CUDNA & ŚMIETANOWSKA — BRIEF FLORYSTYCZNY\n\nImię: ${data.get("name")}\nE-mail: ${data.get("email")}\nOkazja: ${data.get("occasion")}\nData: ${data.get("date") || "Do ustalenia"}\nMiejsce: ${data.get("place") || "Do ustalenia"}\n\nPomysły i oczekiwania:\n${data.get("message")}\n\nDokument przygotowany lokalnie. Nie został wysłany do pracowni; nie stanowi rezerwacji ani potwierdzenia terminu.`;
    setBriefText(text);
    setBriefReady(true);
  }
  function downloadBrief() {
    const url = URL.createObjectURL(new Blob([briefText], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "cudna-smietanowska-brief.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Brand />
          <nav className={menu ? "nav nav-open" : "nav"} aria-label="Nawigacja główna">
            {[
              ["O pracowni", "pracownia"],
              ["Oferta", "oferta"],
              ["Inspiracje", "inspiracje"],
              ["Opinie", "opinie"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href="#kontakt" className="nav-cta" onClick={() => setMenu(false)}>
              Porozmawiajmy <ArrowUpRight size={16} />
            </a>
          </nav>
          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> KWIATY. EMOCJE. WASZA HISTORIA.
            </div>
            <h1>
              Chwile, które
              <br />
              rozkwitają
              <br />
              <em>pięknem.</em>
            </h1>
            <p>
              Tworzymy kwiatową oprawę Waszych najważniejszych chwil. Z czułością do detali. Z
              miłością do natury. Po Waszemu.
            </p>
            <a className="button" href="#oferta">
              Odkryj naszą ofertę <ArrowUpRight size={18} />
            </a>
            <div className="hero-foot">
              <span className="tiny-flower">✳</span>
              <span>
                Nie tylko kwiaty.
                <br />
                <strong>Atmosfera, którą zapamiętacie.</strong>
              </span>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/hero.webp"
              alt="Romantyczna kompozycja z kremowych i różowych kwiatów na weselnym stole"
              fetchPriority="high"
            />
            <div className="hero-caption">
              <span>INSPIROWANE NATURĄ</span>
              <p>Stworzone dla Was.</p>
              <Leaf size={26} strokeWidth={1} />
            </div>
            <span className="image-note">ZDJĘCIE INSPIRACYJNE</span>
          </div>
        </section>
        <div className="promise-strip">
          <span>
            <Leaf size={19} strokeWidth={1.3} /> Naturalne piękno
          </span>
          <i />
          <span>
            <Heart size={18} strokeWidth={1.3} /> Osobiste podejście
          </span>
          <i />
          <span>
            <img src="/images/emblem.svg" alt="" /> Dopracowany każdy detal
          </span>
        </div>

        <section className="section offer" id="oferta">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KWIATY NA WYJĄTKOWE OKAZJE</p>
              <h2>
                Wasze marzenia.
                <br />
                <em>Nasza kwiatowa opowieść.</em>
              </h2>
            </div>
            <p>
              Od ślubnego „tak” po świąteczne spotkania.
              <br />
              Nadajemy chwilom niepowtarzalny charakter.
            </p>
          </div>
          <div className="services">
            {services.map((s, i) => (
              <button key={s.title} className="service" onClick={() => setService(i)}>
                <div className="service-image">
                  <img src={`/images/${s.image}.webp`} alt={s.title} loading="lazy" />
                  <span className="service-index">0{i + 1}</span>
                  <span className="service-link">
                    <ArrowUpRight size={22} />
                  </span>
                </div>
                <span className="eyebrow service-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
              </button>
            ))}
          </div>
          <p className="photo-disclaimer">
            Fotografie przedstawiają inspiracje stylistyczne, nie udokumentowane realizacje
            pracowni.
          </p>
        </section>

        <section className="story" id="pracownia">
          <div className="story-images">
            <img
              className="story-main"
              src="/images/table.webp"
              alt="Kwiaty i świece na elegancko nakrytym weselnym stole"
              loading="lazy"
            />
            <div className="story-small">
              <img
                src="/images/detail.webp"
                alt="Delikatne kremowe róże w dekoracji stołu"
                loading="lazy"
              />
            </div>
            <span className="story-stamp">
              Z NATURY
              <br />
              <em>z miłością</em>
            </span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">CUDNA & ŚMIETANOWSKA</p>
            <h2>
              Za każdym kwiatem
              <br />
              stoi <em>odrobina serca.</em>
            </h2>
            <p>
              Wierzymy, że najpiękniejsze dekoracje nie przyćmiewają chwili — pozwalają jej
              rozkwitnąć. Dlatego zaczynamy nie od kwiatów, lecz od Was. Od tego, co lubicie, o czym
              marzycie i jak chcecie się czuć.
            </p>
            <p>
              Cudna&Śmietanowska to pracownia florystyczna, w której natura spotyka się z
              wyobraźnią. Łączymy kolory, faktury i sezonowe kwiaty w kompozycje pełne lekkości. Od
              wianka po oprawę całej uroczystości — szukamy piękna, które jest naprawdę Wasze.
            </p>
            <div className="signature">Cudna & Śmietanowska</div>
            <a href="#kontakt" className="text-link">
              Poznajmy się <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="section gallery" id="inspiracje">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MAŁA GALERIA WIELKICH EMOCJI</p>
              <h2>
                Tak może wyglądać
                <br />
                <em>Wasza wyjątkowa chwila.</em>
              </h2>
            </div>
            <p>
              Znajdźcie kolor, nastrój lub detal,
              <br />
              od którego zaczniemy Waszą opowieść.
            </p>
          </div>
          <div className="filters" aria-label="Kategorie inspiracji">
            {["Wszystkie", "Śluby i wesela", "Wiązanki i wianki", "Dekoracje sezonowe"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filtered.map((p, i) => (
              <button
                key={p.image}
                className="gallery-item"
                onClick={() => setPhoto(i)}
                aria-label={`Powiększ: ${p.title}`}
              >
                <img src={`/images/${p.image}.webp`} alt={p.title} loading="lazy" />
                <span className="gallery-overlay">
                  <span>{p.title}</span>
                  <ArrowUpRight size={22} />
                </span>
              </button>
            ))}
          </div>
          <p className="photo-disclaimer">
            Galeria inspiracji · Zdjęcia poglądowe ze źródeł fotograficznych, nie portfolio
            realizacji.
          </p>
        </section>

        <section className="process">
          <div className="section">
            <div className="process-intro">
              <p className="eyebrow">SPOKOJNIE. KROK PO KROKU.</p>
              <h2>
                Wy cieszcie się chwilą.
                <br />
                <em>My zadbamy o kwiaty.</em>
              </h2>
              <p>
                Nie musicie znać nazw kwiatów ani mieć gotowego planu.
                <br />
                Wystarczy pomysł. Resztę ułożymy wspólnie.
              </p>
            </div>
            <div className="steps">
              {[
                [
                  "Poznajemy Was",
                  "Rozmawiamy o okazji, miejscu, marzeniach i budżecie. Słuchamy tego, co dla Was ważne.",
                ],
                [
                  "Tworzymy koncepcję",
                  "Dobieramy paletę i kompozycje. Wspólnie ustalamy zakres, aby wszystko tworzyło spójną całość.",
                ],
                [
                  "Dajemy chwilom rozkwitnąć",
                  "Dopracowujemy kwiatową oprawę i uzgadniamy realizację. Wy możecie skupić się na przeżywaniu.",
                ],
              ].map(([title, text], i) => (
                <div className="step" key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews" id="opinie">
          <p className="eyebrow">SŁOWA, KTÓRE CHCIELIBYŚMY USŁYSZEĆ</p>
          <h2>
            „Było dokładnie tak,
            <br />
            <em>jak sobie wymarzyliśmy.”</em>
          </h2>
          <p className="reviews-note">
            Poniższe opinie są fikcyjnymi przykładami. Docelowo zastąpią je autentyczne historie
            klientów.
          </p>
          <div className="review-grid">
            {[
              [
                "hero",
                "„Sala wyglądała jak zaczarowany ogród. Wszystko było spójne — od bukietu po najmniejszy detal na stole. Mogliśmy po prostu cieszyć się naszym dniem.”",
                "Anna i Michał",
                "Oprawa ślubu i wesela",
              ],
              [
                "bouquet",
                "„Mój bukiet był delikatny, naturalny i po prostu mój. Wianek idealnie dopełnił całość. Dokładnie taki klimat, o jakim marzyłam.”",
                "Katarzyna",
                "Wiązanka i wianek ślubny",
              ],
              [
                "wreath",
                "„Stroik sprawił, że nasz dom od razu poczuł święta. Naturalny, pachnący i bez nadmiaru ozdób. Piękno tkwiło w prostocie.”",
                "Magdalena",
                "Dekoracja bożonarodzeniowa",
              ],
            ].map(([image, quote, name, occasion]) => (
              <article className="review" key={name}>
                <div className="review-photo">
                  <img
                    src={`/images/${image}.webp`}
                    alt={`Inspiracja: ${occasion}`}
                    loading="lazy"
                  />
                  <span>OPINIA PRZYKŁADOWA</span>
                </div>
                <blockquote>{quote}</blockquote>
                <div className="review-author">
                  <span>{name}</span>
                  <small>{occasion}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="kontakt">
          <div className="section contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">WSZYSTKO ZACZYNA SIĘ OD ROZMOWY</p>
              <h2>
                Opowiedzcie nam
                <br />o <em>swojej chwili.</em>
              </h2>
              <p>
                Macie już wizję? A może tylko ulubiony kolor? Zapiszcie swoje pomysły — to dobry
                pierwszy krok do pięknej, wspólnej opowieści.
              </p>
              <div className="contact-note">
                <Leaf size={24} strokeWidth={1} />
                <p>
                  Dane kontaktowe pracowni zostaną uzupełnione.
                  <br />
                  Na razie możecie przygotować i pobrać brief.
                </p>
              </div>
              <img className="contact-emblem" src="/images/emblem.svg" alt="" />
            </div>
            <form
              className="contact-form"
              onSubmit={prepareBrief}
              onChange={() => setBriefReady(false)}
            >
              <div className="form-row">
                <label>
                  Wasze imię
                  <input
                    name="name"
                    aria-label="Wasze imię"
                    required
                    placeholder="Jak się do Was zwracać?"
                    autoComplete="name"
                    maxLength={100}
                  />
                </label>
                <label>
                  Adres e-mail
                  <input
                    name="email"
                    aria-label="Adres e-mail"
                    type="email"
                    required
                    placeholder="wasz@email.pl"
                    autoComplete="email"
                    maxLength={200}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Co planujecie?
                  <select name="occasion" defaultValue="Ślub i wesele">
                    <option>Ślub i wesele</option>
                    <option>Wiązanka lub wianek</option>
                    <option>Boże Narodzenie</option>
                    <option>Wielkanoc</option>
                    <option>Inna wyjątkowa okazja</option>
                  </select>
                </label>
                <label>
                  Data wydarzenia
                  <input name="date" type="date" aria-label="Data wydarzenia" />
                </label>
              </div>
              <label>
                Miejsce uroczystości <span>(opcjonalnie)</span>
                <input
                  name="place"
                  aria-label="Miejsce uroczystości"
                  placeholder="Miejscowość, kościół lub sala"
                  maxLength={250}
                />
              </label>
              <label>
                O czym marzycie?
                <textarea
                  name="message"
                  aria-label="O czym marzycie?"
                  rows={3}
                  required
                  placeholder="Kolory, styl, ulubione kwiaty, zakres dekoracji…"
                  maxLength={5000}
                />
              </label>
              <p className="form-privacy">
                Dane pozostają w Twojej przeglądarce. Formularz nie wysyła wiadomości i nie
                rezerwuje terminu.
              </p>
              <button className="button" type="submit">
                Przygotuj brief <ArrowRight size={18} />
              </button>
              {briefReady && (
                <output className="brief-success">
                  <Check size={18} />
                  <div>
                    <strong>Wasz brief jest gotowy.</strong>
                    <p>Zapiszcie go na późniejszą rozmowę z pracownią.</p>
                    <button type="button" onClick={downloadBrief}>
                      <Download size={16} /> Pobierz brief (.txt)
                    </button>
                  </div>
                </output>
              )}
            </form>
          </div>
        </section>

        <section className="section faq-section">
          <div>
            <p className="eyebrow">DOBRZE WIEDZIEĆ</p>
            <h2>
              Zanim <em>zaczniemy.</em>
            </h2>
          </div>
          <div className="faqs">
            {faqs.map(([q, a], i) => (
              <div className="faq" key={q}>
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  aria-expanded={faq === i}
                  aria-controls={`faq-${i}`}
                >
                  {q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <div id={`faq-${i}`} hidden={faq !== i}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <Brand footer />
          <p>
            Piękno przemija.
            <br />
            <em>Wspomnienia zostają.</em>
          </p>
          <a className="text-link" href="#home">
            Wróć na górę <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cudna&Śmietanowska · Pracownia florystyczna</span>
          <span>Śluby · Wiązanki · Wianki · Dekoracje sezonowe</span>
        </div>
      </footer>
      {service !== null && (
        <Dialog label={services[service].title} onClose={() => setService(null)}>
          <img
            className="dialog-photo"
            src={`/images/${services[service].image}.webp`}
            alt={services[service].title}
          />
          <div className="dialog-content">
            <p className="eyebrow">{services[service].tag}</p>
            <h2>{services[service].title}</h2>
            <p>{services[service].description}</p>
            <ul>
              {services[service].items.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <a href="#kontakt" className="button" onClick={() => setService(null)}>
              Zaplanujmy to razem <ArrowUpRight size={18} />
            </a>
          </div>
        </Dialog>
      )}
      {photo !== null && filtered[photo] && (
        <Dialog label={filtered[photo].title} onClose={() => setPhoto(null)} wide>
          <div className="lightbox-image">
            <img src={`/images/${filtered[photo].image}.webp`} alt={filtered[photo].title} />
            <button
              className="lightbox-prev"
              aria-label="Poprzednie zdjęcie"
              onClick={() => setPhoto((photo - 1 + filtered.length) % filtered.length)}
            >
              <ChevronLeft />
            </button>
            <button
              className="lightbox-next"
              aria-label="Następne zdjęcie"
              onClick={() => setPhoto((photo + 1) % filtered.length)}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="lightbox-caption">
            <div>
              <h3>{filtered[photo].title}</h3>
              <p>{filtered[photo].detail} · Zdjęcie inspiracyjne.</p>
            </div>
            <span>
              {photo + 1} / {filtered.length}
            </span>
          </div>
        </Dialog>
      )}
    </>
  );
}
