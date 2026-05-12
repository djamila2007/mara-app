import { useState, useEffect } from "react";

// ─── CHARGEMENT DES POLICES (méthode fiable) ─────────────────────────────────
function useGoogleFonts() {
  useEffect(() => {
    const id = "google-fonts-maramarchés";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ─── DONNÉES ────────────────────────────────────────────────────────────────

const CATALOGUE = [
  { id: 1,  nom: "Pomme",     categorie: "Fruit",  prix: 1500, emoji: "🍎", stock: 50,  unite: "kg",        description: "Pommes croquantes du verger" },
  { id: 2,  nom: "Banane",    categorie: "Fruit",  prix: 500,  emoji: "🍌", stock: 80,  unite: "kg",        description: "Bananes mûres bien sucrées" },
  { id: 3,  nom: "Fraise",    categorie: "Fruit",  prix: 2500, emoji: "🍓", stock: 30,  unite: "barquette", description: "Fraises fraîches du marché" },
  { id: 4,  nom: "Orange",    categorie: "Fruit",  prix: 800,  emoji: "🍊", stock: 60,  unite: "kg",        description: "Oranges juteuses de saison" },
  { id: 5,  nom: "Raisin",    categorie: "Fruit",  prix: 2000, emoji: "🍇", stock: 25,  unite: "kg",        description: "Raisins muscat sans pépins" },
  { id: 6,  nom: "Mangue",    categorie: "Fruit",  prix: 1200, emoji: "🥭", stock: 40,  unite: "kg",        description: "Mangues sucrées du pays" },
  { id: 7,  nom: "Carotte",   categorie: "Légume", prix: 600,  emoji: "🥕", stock: 100, unite: "kg",        description: "Carottes fraîches du maraîcher" },
  { id: 8,  nom: "Tomate",    categorie: "Légume", prix: 750,  emoji: "🍅", stock: 70,  unite: "kg",        description: "Tomates mûres bien rouges" },
  { id: 9,  nom: "Brocoli",   categorie: "Légume", prix: 1000, emoji: "🥦", stock: 35,  unite: "pièce",     description: "Brocoli vert bien ferme" },
  { id: 10, nom: "Salade",    categorie: "Légume", prix: 300,  emoji: "🥬", stock: 45,  unite: "pièce",     description: "Laitue fraîche du jardin" },
  { id: 11, nom: "Courgette", categorie: "Légume", prix: 700,  emoji: "🥒", stock: 55,  unite: "kg",        description: "Courgettes vertes de saison" },
  { id: 12, nom: "Poivron",   categorie: "Légume", prix: 900,  emoji: "🫑", stock: 40,  unite: "kg",        description: "Poivrons tricolores croquants" },
];

// ─── COULEURS ────────────────────────────────────────────────────────────────

const C = {
  vert:       "#2d6a4f",
  vertClair:  "#52b788",
  vertPale:   "#d8f3dc",
  orange:     "#e76f51",
  orangePale: "#fde8df",
  fond:       "#f9f7f2",
  blanc:      "#ffffff",
  texte:      "#1b1b1b",
  gris:       "#6b7280",
  grisPale:   "#f3f4f6",
  bordure:    "#e5e7eb",
};

// ─── CSS GLOBAL ──────────────────────────────────────────────────────────────

const CSS_GLOBAL = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${C.fond}; }
  button { font-family: 'DM Sans', sans-serif; }
  button:hover { opacity: 0.88; }

  @keyframes flottement {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-18px) rotate(8deg); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.05); }
  }

  @media (max-width: 768px) {
    .nav-desktop  { display: none !important; }
    .burger       { display: block !important; }
    .panier-layout  { grid-template-columns: 1fr !important; }
    .contact-layout { grid-template-columns: 1fr !important; }
  }
`;

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header({ page, setPage, nbPanier }) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const nav = [
    { id: "accueil",  label: "Accueil" },
    { id: "boutique", label: "Boutique" },
    { id: "panier",   label: "Panier" },
    { id: "contact",  label: "Contact" },
  ];
  return (
    <header style={S.header}>
      <div style={S.headerInner}>
        <div style={S.logo} onClick={() => setPage("accueil")}>
          <span style={{ fontSize: 34 }}>🌿</span>
          <div>
            <div style={S.logoTitre}>MaraMarchés</div>
            <div style={S.logoSous}>Fruits & Légumes</div>
          </div>
        </div>
        <nav className="nav-desktop" style={S.navDesktop}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              style={{ ...S.navBtn, ...(page === n.id ? S.navBtnActif : {}) }}>
              {n.label}
              {n.id === "panier" && nbPanier > 0 && <span style={S.badge}>{nbPanier}</span>}
            </button>
          ))}
        </nav>
        <button className="burger" style={S.burger} onClick={() => setMenuOuvert(o => !o)}>
          {menuOuvert ? "✕" : "☰"}
        </button>
      </div>
      {menuOuvert && (
        <nav style={S.navMobile}>
          {nav.map(n => (
            <button key={n.id}
              onClick={() => { setPage(n.id); setMenuOuvert(false); }}
              style={{ ...S.navMobileBtn, ...(page === n.id ? S.navBtnActif : {}) }}>
              {n.label}{n.id === "panier" && nbPanier > 0 ? ` (${nbPanier})` : ""}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ─── CARTE PRODUIT ────────────────────────────────────────────────────────────

function CarteProduit({ produit, ajouterAuPanier }) {
  const [ajoute, setAjoute] = useState(false);
  const handleAjouter = () => {
    ajouterAuPanier(produit);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1200);
  };
  return (
    <div style={S.carte}>
      <div style={{ fontSize: 52, textAlign: "center", marginBottom: 4 }}>{produit.emoji}</div>
      <div style={S.carteBadge}>{produit.categorie === "Fruit" ? "🍎 Fruit" : "🥦 Légume"}</div>
      <h3 style={S.carteNom}>{produit.nom}</h3>
      <p style={S.carteDesc}>{produit.description}</p>
      <div style={S.carteFooter}>
        <div>
          <span style={S.cartePrix}>{produit.prix.toLocaleString()} FCFA</span>
          <span style={S.carteUnite}> / {produit.unite}</span>
        </div>
        <span style={S.carteStock}>
          {produit.stock > 0 ? `✅ En stock (${produit.stock})` : "❌ Épuisé"}
        </span>
      </div>
      <button
        onClick={handleAjouter}
        disabled={produit.stock === 0}
        style={{
          ...S.btnAjouter,
          ...(ajoute ? { background: "#4caf50" } : {}),
          ...(produit.stock === 0 ? { background: C.gris, cursor: "not-allowed", opacity: 0.6 } : {}),
        }}>
        {ajoute ? "✓ Ajouté !" : "Ajouter au panier"}
      </button>
    </div>
  );
}

// ─── PAGE ACCUEIL ─────────────────────────────────────────────────────────────

function PageAccueil({ setPage }) {
  const [compteur, setCompteur] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCompteur(c => { if (c >= CATALOGUE.length) { clearInterval(timer); return c; } return c + 1; });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { valeur: `${compteur}+`, label: "Produits frais" },
    { valeur: "100%",         label: "Produits locaux" },
    { valeur: "7j/7",         label: "Livraison" },
    { valeur: "★ 4.9",        label: "Satisfaction" },
  ];

  return (
    <div>
      <section style={S.hero}>
        <div style={{ maxWidth: 560, animation: "fadeInUp .7s ease" }}>
          <p style={S.heroTag}>🌱 Frais du marché chaque matin</p>
          <h1 style={S.heroTitre}>
            Des fruits & légumes<br />
            <span style={{ color: "#b7e4c7" }}>frais et savoureux</span>
          </h1>
          <p style={S.heroDesc}>
            Sélectionnés directement auprès des producteurs locaux. Livraison à domicile ou retrait en boutique.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button style={S.btnHP} onClick={() => setPage("boutique")}>Voir la boutique →</button>
            <button style={S.btnHS} onClick={() => setPage("contact")}>Nous contacter</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {["🍎","🍌","🥕","🍅","🍓","🥦"].map((e, i) => (
            <span key={i} style={{ fontSize: 52, textAlign: "center", display: "block",
              animation: "flottement 3s ease-in-out infinite", animationDelay: `${i * 0.3}s` }}>
              {e}
            </span>
          ))}
        </div>
      </section>

      <section style={{ background: C.blanc, display: "flex", justifyContent: "center", flexWrap: "wrap", borderBottom: `1px solid ${C.bordure}` }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "32px 48px", textAlign: "center", borderRight: `1px solid ${C.bordure}` }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: C.vert }}>{s.valeur}</div>
            <div style={{ fontSize: 14, color: C.gris, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      <section style={S.section}>
        <h2 style={S.titreSec}>🌟 Produits vedettes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
          {CATALOGUE.slice(0, 4).map(p => (
            <div key={p.id} onClick={() => setPage("boutique")}
              style={{ background: C.blanc, borderRadius: 16, padding: 24, textAlign: "center", cursor: "pointer", border: `2px solid ${C.bordure}` }}>
              <span style={{ fontSize: 48 }}>{p.emoji}</span>
              <div style={{ fontWeight: 700, fontSize: 16, color: C.texte, marginTop: 12 }}>{p.nom}</div>
              <div style={{ color: C.vert, fontWeight: 600, fontSize: 14, marginTop: 4 }}>{p.prix.toLocaleString()} FCFA/{p.unite}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: C.orangePale, textAlign: "center", padding: "60px 24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: C.orange, marginBottom: 12 }}>
          🚚 Livraison gratuite dès 15 000 FCFA d'achat
        </h2>
        <p style={{ color: C.gris, fontSize: 16, marginBottom: 28 }}>Commandez avant 14h pour une livraison le jour même !</p>
        <button style={{ ...S.btnHP, maxWidth: 280, margin: "0 auto", display: "block" }} onClick={() => setPage("boutique")}>
          Commander maintenant
        </button>
      </section>
    </div>
  );
}

// ─── PAGE BOUTIQUE ────────────────────────────────────────────────────────────

function PageBoutique({ ajouterAuPanier }) {
  const [filtre,    setFiltre]    = useState("Tous");
  const [recherche, setRecherche] = useState("");
  const [tri,       setTri]       = useState("nom");

  const produitsFiltres = CATALOGUE
    .filter(p => filtre === "Tous" || p.categorie === filtre)
    .filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase()))
    .sort((a, b) => {
      if (tri === "prix_asc")  return a.prix - b.prix;
      if (tri === "prix_desc") return b.prix - a.prix;
      return a.nom.localeCompare(b.nom);
    });

  return (
    <div style={S.section}>
      <h2 style={S.titreSec}>🛒 Notre Boutique</h2>
      <div style={S.filtresBar}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Tous", "Fruit", "Légume"].map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              style={{ ...S.filtrBtn, ...(filtre === f ? S.filtrBtnActif : {}) }}>
              {f === "Fruit" ? "🍎 " : f === "Légume" ? "🥦 " : "🌿 "}{f}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input type="text" placeholder="🔍 Rechercher..." value={recherche}
            onChange={e => setRecherche(e.target.value)} style={S.inputField} />
          <select value={tri} onChange={e => setTri(e.target.value)} style={S.inputField}>
            <option value="nom">Nom A→Z</option>
            <option value="prix_asc">Prix ↑</option>
            <option value="prix_desc">Prix ↓</option>
          </select>
        </div>
      </div>
      <p style={{ color: C.gris, fontSize: 14, marginBottom: 24 }}>{produitsFiltres.length} produit(s) trouvé(s)</p>
      {produitsFiltres.length === 0
        ? <div style={{ textAlign: "center", color: C.gris, padding: 60, fontSize: 18 }}>😕 Aucun résultat.</div>
        : <div style={S.grilleBoutique}>
            {produitsFiltres.map(p => <CarteProduit key={p.id} produit={p} ajouterAuPanier={ajouterAuPanier} />)}
          </div>
      }
    </div>
  );
}

// ─── PAGE PANIER ──────────────────────────────────────────────────────────────

function PagePanier({ panier, setPanier, setPage }) {
  const [commande, setCommande] = useState(false);
  const modifier  = (id, d) => setPanier(p => p.map(i => i.id === id ? { ...i, qte: i.qte + d } : i).filter(i => i.qte > 0));
  const supprimer = (id)    => setPanier(p => p.filter(i => i.id !== id));
  const total     = panier.reduce((s, i) => s + i.prix * i.qte, 0);
  const livraison = total >= 15000 ? 0 : 2500;

  if (commande) return (
    <div style={S.centreBox}>
      <div style={S.confirmBox}>
        <div style={{ fontSize: 64 }}>✅</div>
        <h2 style={S.confirmTitre}>Commande confirmée !</h2>
        <p style={{ color: C.gris, fontSize: 16, lineHeight: 1.6 }}>Merci ! Vous recevrez un email de confirmation.</p>
        <p style={{ fontSize: 16, color: C.vert, fontWeight: 700 }}>Total payé : {(total + livraison).toLocaleString()} FCFA</p>
        <button style={S.btnA} onClick={() => { setPanier([]); setCommande(false); setPage("accueil"); }}>Retour à l'accueil</button>
      </div>
    </div>
  );

  if (panier.length === 0) return (
    <div style={S.centreBox}>
      <div style={S.confirmBox}>
        <div style={{ fontSize: 64 }}>🛒</div>
        <h2 style={S.confirmTitre}>Votre panier est vide</h2>
        <p style={{ color: C.gris, fontSize: 16 }}>Ajoutez des produits depuis notre boutique.</p>
        <button style={S.btnA} onClick={() => setPage("boutique")}>Aller à la boutique</button>
      </div>
    </div>
  );

  return (
    <div style={S.section}>
      <h2 style={S.titreSec}>🛒 Mon Panier</h2>
      <div className="panier-layout" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {panier.map(item => (
            <div key={item.id} style={S.panierItem}>
              <span style={{ fontSize: 36 }}>{item.emoji}</span>
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: C.texte }}>{item.nom}</div>
                <div style={{ fontSize: 13, color: C.gris }}>{item.prix.toLocaleString()} FCFA / {item.unite}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: C.grisPale, borderRadius: 8, padding: "6px 12px" }}>
                <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", fontWeight: 700, color: C.vert }} onClick={() => modifier(item.id, -1)}>−</button>
                <span style={{ fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{item.qte}</span>
                <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", fontWeight: 700, color: C.vert }} onClick={() => modifier(item.id, +1)}>+</button>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.texte, minWidth: 100, textAlign: "right" }}>{(item.prix * item.qte).toLocaleString()} FCFA</div>
              <button style={{ background: "#fee2e2", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 16 }} onClick={() => supprimer(item.id)}>🗑</button>
            </div>
          ))}
        </div>

        <div style={S.panierRecap}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.texte }}>Récapitulatif</h3>
          <div style={S.recapLigne}><span>Sous-total</span><span>{total.toLocaleString()} FCFA</span></div>
          <div style={S.recapLigne}>
            <span>Livraison</span>
            <span style={livraison === 0 ? { color: "#4caf50", fontWeight: 700 } : {}}>
              {livraison === 0 ? "Gratuite 🎉" : `${livraison.toLocaleString()} FCFA`}
            </span>
          </div>
          {total < 15000 && (
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#92400e" }}>
              Plus que {(15000 - total).toLocaleString()} FCFA pour la livraison gratuite !
            </div>
          )}
          <div style={{ ...S.recapLigne, fontSize: 18, fontWeight: 800, color: C.texte, borderTop: `2px solid ${C.bordure}`, paddingTop: 16 }}>
            <span>Total</span><span>{(total + livraison).toLocaleString()} FCFA</span>
          </div>
          <button style={S.btnA} onClick={() => setCommande(true)}>Valider la commande →</button>
          <button style={{ ...S.btnA, background: C.grisPale, color: C.texte }} onClick={() => setPage("boutique")}>Continuer mes achats</button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE CONTACT ─────────────────────────────────────────────────────────────

function PageContact() {
  const VIDE = { nom: "", email: "", sujet: "", message: "" };
  const [champs,  setChamps]  = useState(VIDE);
  const [erreurs, setErreurs] = useState({});
  const [envoye,  setEnvoye]  = useState(false);
  const [envoi,   setEnvoi]   = useState(false);

  const valider = () => {
    const e = {};
    if (!champs.nom.trim()) e.nom = "Le nom est requis.";
    if (!champs.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email invalide.";
    if (!champs.sujet) e.sujet = "Choisissez un sujet.";
    if (champs.message.trim().length < 10) e.message = "Message trop court (min. 10 caractères).";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChamps(prev => ({ ...prev, [name]: value }));
    setErreurs(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = valider();
    if (Object.keys(errs).length > 0) { setErreurs(errs); return; }
    setEnvoi(true);
    setTimeout(() => { setEnvoye(true); setEnvoi(false); setChamps(VIDE); }, 1500);
  };

  if (envoye) return (
    <div style={S.centreBox}>
      <div style={S.confirmBox}>
        <div style={{ fontSize: 64 }}>📬</div>
        <h2 style={S.confirmTitre}>Message envoyé !</h2>
        <p style={{ color: C.gris, fontSize: 16 }}>Nous vous répondrons dans les 24h.</p>
        <button style={S.btnA} onClick={() => setEnvoye(false)}>Envoyer un autre message</button>
      </div>
    </div>
  );

  const Field = ({ label, name, type, as, children, placeholder }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: C.texte }}>{label}</label>
      {as === "select"
        ? <select name={name} value={champs[name]} onChange={handleChange} style={S.inputField}><option value="">-- Choisir --</option>{children}</select>
        : as === "textarea"
        ? <textarea name={name} value={champs[name]} onChange={handleChange} rows={5} placeholder={placeholder} style={{ ...S.inputField, resize: "vertical" }} />
        : <input type={type || "text"} name={name} value={champs[name]} onChange={handleChange} placeholder={placeholder} style={S.inputField} />
      }
      {erreurs[name] && <span style={{ fontSize: 13, color: "#ef4444", fontWeight: 500 }}>⚠ {erreurs[name]}</span>}
    </div>
  );

  return (
    <div style={S.section}>
      <h2 style={S.titreSec}>📬 Nous contacter</h2>
      <div className="contact-layout" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "start" }}>
        <div style={{ background: C.vert, borderRadius: 16, padding: 32, color: "#fff" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, marginBottom: 28 }}>Nos coordonnées</h3>
          {[
            { icon: "📍", label: "Adresse",   val: "Petit Paris, derrière le stade" },
            { icon: "📞", label: "Téléphone", val: "+241 74 04 78 63" },
            { icon: "✉️", label: "Email",     val: "contact@maramarchés.com" },
            { icon: "🕐", label: "Horaires",  val: "Lun–Sam : 8h–19h  |  Dim : 9h–13h" },
          ].map((info, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 22 }}>{info.icon}</span>
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{info.label}</div>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>{info.val}</div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }} noValidate>
          <Field label="Nom complet *"   name="nom"     placeholder="Jean Dupont" />
          <Field label="Adresse email *" name="email"   type="email" placeholder="jean@example.com" />
          <Field label="Sujet *"         name="sujet"   as="select">
            <option value="commande">Ma commande</option>
            <option value="produit">Un produit</option>
            <option value="livraison">Livraison</option>
            <option value="autre">Autre</option>
          </Field>
          <Field label="Message *"       name="message" as="textarea" placeholder="Votre message ici..." />
          <button type="submit" style={{ ...S.btnA, opacity: envoi ? 0.7 : 1 }} disabled={envoi}>
            {envoi ? "Envoi en cours..." : "Envoyer le message →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: C.vert, color: "#fff", padding: "40px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900 }}>🌿 MaraMarchés</div>
        <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>Fruits & légumes frais, livrés chez vous chaque jour.</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {["Accueil", "Boutique", "Panier", "Contact"].map(l => (
            <span key={l} style={{ color: "rgba(255,255,255,.8)", fontSize: 14, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12, borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 20, width: "100%", textAlign: "center" }}>
          © 2025 MaraMarchés — Projet React Formation
        </div>
      </div>
    </footer>
  );
}

// ─── APP PRINCIPALE ───────────────────────────────────────────────────────────

export default function App() {
  useGoogleFonts();
  const [page,   setPage]   = useState("accueil");
  const [panier, setPanier] = useState([]);

  const ajouterAuPanier = (produit) => {
    setPanier(prev => {
      const existe = prev.find(i => i.id === produit.id);
      if (existe) return prev.map(i => i.id === produit.id ? { ...i, qte: i.qte + 1 } : i);
      return [...prev, { ...produit, qte: 1 }];
    });
  };

  const nbPanier = panier.reduce((sum, i) => sum + i.qte, 0);
  const pages = {
    accueil:  <PageAccueil  setPage={setPage} />,
    boutique: <PageBoutique ajouterAuPanier={ajouterAuPanier} />,
    panier:   <PagePanier   panier={panier} setPanier={setPanier} setPage={setPage} />,
    contact:  <PageContact />,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.fond, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS_GLOBAL}</style>
      <Header page={page} setPage={setPage} nbPanier={nbPanier} />
      <main style={{ flex: 1 }}>{pages[page]}</main>
      <Footer />
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const S = {
  header:       { background: C.blanc, borderBottom: `2px solid ${C.vertPale}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(45,106,79,0.08)" },
  headerInner:  { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 },
  logo:         { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoTitre:    { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: C.vert },
  logoSous:     { fontSize: 11, color: C.gris, letterSpacing: 1 },
  navDesktop:   { display: "flex", gap: 8 },
  navBtn:       { background: "none", border: "none", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 15, fontWeight: 500, color: C.gris, position: "relative" },
  navBtnActif:  { background: C.vertPale, color: C.vert, fontWeight: 700 },
  badge:        { position: "absolute", top: 2, right: 2, background: C.orange, color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  burger:       { display: "none", background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.vert },
  navMobile:    { borderTop: `1px solid ${C.bordure}`, padding: 16, display: "flex", flexDirection: "column", gap: 8, background: C.blanc },
  navMobileBtn: { background: "none", border: "none", padding: "12px 16px", borderRadius: 8, cursor: "pointer", fontSize: 16, fontWeight: 500, color: C.gris, textAlign: "left" },

  hero:     { background: `linear-gradient(135deg, ${C.vert} 0%, ${C.vertClair} 100%)`, padding: "80px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 60, flexWrap: "wrap" },
  heroTag:  { display: "inline-block", background: "rgba(255,255,255,.2)", color: "#fff", borderRadius: 20, padding: "6px 16px", fontSize: 14, fontWeight: 500, marginBottom: 20 },
  heroTitre:{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 20 },
  heroDesc: { color: "rgba(255,255,255,.85)", fontSize: 17, lineHeight: 1.7, marginBottom: 32 },
  btnHP:    { background: C.orange, color: "#fff", border: "none", padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer" },
  btnHS:    { background: "rgba(255,255,255,.15)", color: "#fff", border: "2px solid rgba(255,255,255,.4)", padding: "14px 28px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" },

  section:  { maxWidth: 1200, margin: "0 auto", padding: "60px 24px" },
  titreSec: { fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: C.texte, marginBottom: 40 },

  filtresBar:    { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: 24, background: C.blanc, padding: 20, borderRadius: 14, border: `1px solid ${C.bordure}` },
  filtrBtn:      { background: C.grisPale, border: "none", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, color: C.gris },
  filtrBtnActif: { background: C.vertPale, color: C.vert, fontWeight: 700 },
  inputField:    { padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.bordure}`, fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif", background: C.blanc },
  grilleBoutique:{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 },

  carte:       { background: C.blanc, borderRadius: 16, padding: 24, border: `1px solid ${C.bordure}`, display: "flex", flexDirection: "column", gap: 8 },
  carteBadge:  { fontSize: 12, fontWeight: 600, color: C.vert, background: C.vertPale, padding: "3px 10px", borderRadius: 20, width: "fit-content" },
  carteNom:    { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.texte },
  carteDesc:   { fontSize: 13, color: C.gris, lineHeight: 1.5, flex: 1 },
  carteFooter: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 4 },
  cartePrix:   { fontSize: 20, fontWeight: 800, color: C.vert },
  carteUnite:  { fontSize: 13, color: C.gris },
  carteStock:  { fontSize: 12, color: C.gris },
  btnAjouter:  { background: C.vert, color: "#fff", border: "none", padding: "12px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, marginTop: 8 },

  panierItem:  { background: C.blanc, borderRadius: 14, padding: "20px 24px", border: `1px solid ${C.bordure}`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" },
  panierRecap: { background: C.blanc, borderRadius: 16, padding: 28, border: `1px solid ${C.bordure}`, display: "flex", flexDirection: "column", gap: 16 },
  recapLigne:  { display: "flex", justifyContent: "space-between", fontSize: 15, color: C.gris },

  centreBox:   { display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px" },
  confirmBox:  { background: C.blanc, borderRadius: 20, padding: "60px 48px", textAlign: "center", maxWidth: 480, width: "100%", border: `1px solid ${C.bordure}`, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" },
  confirmTitre:{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: C.texte },

  btnA: { background: C.orange, color: "#fff", border: "none", padding: "14px 24px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%" },
};