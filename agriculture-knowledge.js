/**
 * WeurFarme – Base de connaissances agricoles
 * Fiches techniques + moteur de recherche pour l'assistant local
 */

const FICHES = [
  // ═══════════════════ ARACHIDE ═══════════════════
  {
    id: 'arachide-culture',
    culture: 'Arachide',
    categorie: 'cultures',
    icone: '🥜',
    titre: "Culture de l'arachide",
    motsCles: ['arachide', 'semer', 'semis', 'planter', 'cultiver'],
    contenu:
      "L'arachide se cultive principalement dans le bassin arachidier (Kaolack, Fatick, Kaffrine, Diourbel). " +
      "Semez en juin-juillet avec les premières pluies, sur sol sablo-argileux bien drainé. " +
      "Utilisez des semences certifiées (GH 119-20, 55-437) à raison de 25 à 30 kg/ha, traitées au fongicide avant semis. " +
      "Apportez 100 kg/ha de superphosphate simple au semis. La récolte intervient entre octobre et novembre, " +
      "soit 90 à 120 jours après semis. Surveillez la cercosporiose et la rosette ; évitez de cultiver l'arachide " +
      "deux années consécutives sur la même parcelle.",
  },
  {
    id: 'arachide-cercosporiose',
    culture: 'Arachide',
    categorie: 'maladies',
    icone: '🦠',
    titre: "Cercosporiose de l'arachide",
    motsCles: ['cercosporiose', 'tache', 'feuille arachide', 'maladie arachide'],
    contenu:
      "La cercosporiose se reconnaît aux taches brunes entourées d'un halo jaune sur les feuilles, " +
      "avec chute prématurée du feuillage. Elle se développe par humidité élevée et températures de 25 à 30 °C. " +
      "Traitez dès les premiers symptômes avec un fongicide à base de mancozèbe ou chlorothalonil, en renouvelant " +
      "tous les 14 jours. Brûlez les résidus infectés et pratiquez la rotation des cultures. " +
      "Privilégiez des variétés résistantes.",
  },
  {
    id: 'arachide-engrais',
    culture: 'Arachide',
    categorie: 'conseils',
    icone: '🌱',
    titre: "Fertilisation de l'arachide",
    motsCles: ['engrais arachide', 'fertiliser arachide', 'fumure arachide'],
    contenu:
      "L'arachide fixe une partie de son azote grâce aux bactéries du sol (rhizobium) : évitez les excès d'azote " +
      "qui favorisent le feuillage au détriment des gousses. Apportez 100 kg/ha de superphosphate simple au semis, " +
      "et du gypse (300 kg/ha) à la floraison pour améliorer le remplissage des gousses. " +
      "Un sol trop acide (pH < 5,5) réduit fortement les rendements : chaulez si nécessaire avant la campagne.",
  },

  // ═══════════════════ MIL ═══════════════════
  {
    id: 'mil-culture',
    culture: 'Mil',
    categorie: 'cultures',
    icone: '🌾',
    titre: 'Culture du mil',
    motsCles: ['mil', 'semer mil', 'planter mil', 'cultiver mil'],
    contenu:
      "Le mil est la céréale la plus résistante à la sécheresse au Sénégal, cultivé surtout au nord et au centre " +
      "(Louga, Diourbel, Kaolack). Semez dès les premières pluies utiles (juin-juillet) en poquets espacés de " +
      "0,80 à 1 m, à raison de 3-4 kg/ha de semences. Privilégiez les variétés améliorées (Souna 3, IBV 8004) " +
      "à cycle court (70-90 jours). Le sarclage précoce est essentiel : un premier sarclage 15 jours après " +
      "semis, puis un buttage à 30 jours. Récolte à maturité complète, épis bien secs, généralement en " +
      "septembre-octobre.",
  },
  {
    id: 'mil-mildiou',
    culture: 'Mil',
    categorie: 'maladies',
    icone: '🦠',
    titre: 'Mildiou du mil',
    motsCles: ['mildiou', 'maladie mil', 'mil malade'],
    contenu:
      "Le mildiou se manifeste par un feuillage pâle, des plants rabougris et une panicule déformée ou stérile " +
      "(\"tête folle\"). Il se transmet par les semences et le sol infecté. Prévention : traitez les semences " +
      "au métalaxyl avant semis, respectez une rotation de 2-3 ans avec des légumineuses (niébé), et arrachez " +
      "immédiatement les plants atteints pour éviter la propagation. Il n'existe pas de traitement curatif " +
      "efficace une fois les symptômes installés.",
  },
  {
    id: 'mil-engrais',
    culture: 'Mil',
    categorie: 'conseils',
    icone: '🌱',
    titre: 'Fertilisation du mil',
    motsCles: ['engrais mil', 'fertiliser mil', 'fumure mil'],
    contenu:
      "Apportez du fumier ou compost (5 t/ha) avant labour pour améliorer la structure du sol sableux. " +
      "En complément minéral : 100 kg/ha de NPK 15-15-15 au semis, puis 50 kg/ha d'urée en couverture " +
      "30 jours après semis (avant montaison). Le mil valorise très bien la matière organique : le microdosage " +
      "(une pincée d'engrais dans chaque poquet) donne d'excellents résultats avec de petites quantités.",
  },

  // ═══════════════════ MAÏS ═══════════════════
  {
    id: 'mais-culture',
    culture: 'Maïs',
    categorie: 'cultures',
    icone: '🌽',
    titre: 'Culture du maïs',
    motsCles: ['mais', 'maïs', 'semer mais', 'planter mais', 'cultiver mais'],
    contenu:
      "Le maïs exige plus d'eau que le mil ou le sorgho ; il réussit bien dans les zones à pluviométrie " +
      "supérieure à 700 mm (Casamance, Sédhiou, Kolda) ou sous irrigation (vallée du fleuve Sénégal). " +
      "Semez en lignes espacées de 80 cm, avec 25 cm entre poquets, 2 graines par poquet. Variétés recommandées : " +
      "Early Thai, Obatanpa. Démariage à 1 plant/poquet après 2 semaines. Sarclage à 15 et 35 jours. " +
      "Récolte 90 à 120 jours après semis selon la variété, quand les spathes jaunissent et sèchent.",
  },
  {
    id: 'mais-chenille',
    culture: 'Maïs',
    categorie: 'maladies',
    icone: '🐛',
    titre: 'Chenille légionnaire du maïs',
    motsCles: ['chenille', 'legionnaire', 'ravageur mais', 'insecte mais'],
    contenu:
      "La chenille légionnaire d'automne (Spodoptera frugiperda) creuse le cornet central et les feuilles, " +
      "laissant des trous caractéristiques et des excréments visibles. Surveillez dès la levée. " +
      "Traitement : insecticide à base d'émamectine benzoate ou de chlorantraniliprole, appliqué tôt le matin " +
      "ou en soirée directement dans le cornet. Alternez avec des méthodes biologiques (cendre + savon, extrait " +
      "de neem) pour limiter les résistances. Inspectez les champs chaque semaine dès la levée.",
  },
  {
    id: 'mais-engrais',
    culture: 'Maïs',
    categorie: 'conseils',
    icone: '🌱',
    titre: 'Fertilisation du maïs',
    motsCles: ['engrais mais', 'fertiliser mais', 'fumure mais'],
    contenu:
      "Le maïs est très exigeant en azote. Apportez 150 kg/ha de NPK 15-15-15 au semis, puis deux apports " +
      "d'urée (50 kg/ha chacun) : le premier à 21 jours (stade 6-8 feuilles), le second à 45 jours (avant " +
      "floraison mâle). Un jaunissement des feuilles basses signale souvent une carence en azote. " +
      "Le maïs répond aussi très bien au fumier bien décomposé apporté avant labour.",
  },

  // ═══════════════════ RIZ ═══════════════════
  {
    id: 'riz-culture',
    culture: 'Riz',
    categorie: 'cultures',
    icone: '🌾',
    titre: 'Culture du riz',
    motsCles: ['riz', 'semer riz', 'planter riz', 'cultiver riz', 'riziculture'],
    contenu:
      "Le riz se cultive surtout dans la vallée du fleuve Sénégal (irrigué) et en Casamance (pluvial/bas-fonds). " +
      "En riziculture irriguée : repiquage de jeunes plants (18-21 jours) en lignes espacées de 20x20 cm, " +
      "après un labour et un puddlage soigné. Variétés recommandées : Sahel 108, Sahel 202 (cycle court, " +
      "100-115 jours). Maintenez une lame d'eau de 5 à 10 cm en végétation, drainez avant récolte. " +
      "En pluvial, semez en poquets dès l'installation des pluies, sur sol bien préparé.",
  },
  {
    id: 'riz-pyriculariose',
    culture: 'Riz',
    categorie: 'maladies',
    icone: '🦠',
    titre: 'Pyriculariose du riz',
    motsCles: ['pyriculariose', 'maladie riz', 'riz malade'],
    contenu:
      "La pyriculariose provoque des taches en forme de losange, grises au centre avec bordure brune, sur " +
      "feuilles et cou de panicule (risque de \"cou cassé\" très destructeur). Elle prospère en conditions " +
      "humides avec excès d'azote. Prévention : variétés tolérantes, évitez les excès d'urée, aérez le repiquage. " +
      "Traitement curatif : fongicide à base de tricyclazole dès les premiers symptômes foliaires, avant " +
      "l'épiaison si possible.",
  },
  {
    id: 'riz-engrais',
    culture: 'Riz',
    categorie: 'conseils',
    icone: '🌱',
    titre: 'Fertilisation du riz',
    motsCles: ['engrais riz', 'fertiliser riz', 'fumure riz'],
    contenu:
      "Apportez 150 kg/ha de NPK au repiquage (incorporé au sol avant la lame d'eau), puis fractionnez l'urée " +
      "en 2-3 apports : tallage (15-20 jours), montaison (40-45 jours), et éventuellement à l'initiation " +
      "paniculaire. Évitez d'épandre l'urée juste avant un drainage ou une forte pluie pour limiter les pertes " +
      "par lessivage. Le zinc est souvent limitant sur sols de vallée : un apport de sulfate de zinc (25 kg/ha) " +
      "améliore le tallage.",
  },

  // ═══════════════════ NIÉBÉ ═══════════════════
  {
    id: 'niebe-culture',
    culture: 'Niébé',
    categorie: 'cultures',
    icone: '🫘',
    titre: 'Culture du niébé',
    motsCles: ['niebe', 'niébé', 'semer niebe', 'planter niebe', 'cultiver niebe'],
    contenu:
      "Le niébé (haricot local) est une légumineuse rustique, idéale en association ou rotation avec le mil " +
      "et le maïs car elle enrichit le sol en azote. Semez en début d'hivernage, en lignes espacées de 40-60 cm, " +
      "3-4 graines par poquet, densité 15-20 kg/ha. Variétés recommandées : Mouride, Melakh (résistantes aux " +
      "principaux ravageurs). Cycle court (60-75 jours), idéal en culture de contre-saison sous irrigation " +
      "légère. Récoltez dès que les gousses brunissent et sèchent, en plusieurs passages.",
  },
  {
    id: 'niebe-puceron',
    culture: 'Niébé',
    categorie: 'maladies',
    icone: '🐛',
    titre: 'Pucerons et thrips du niébé',
    motsCles: ['puceron', 'thrips', 'ravageur niebe', 'insecte niebe'],
    contenu:
      "Les pucerons noirs colonisent les jeunes pousses et fleurs, provoquant déformation et avortement floral ; " +
      "les thrips causent un aspect argenté et crispé des feuilles. Surveillez surtout à la floraison. " +
      "Traitement : insecticide à base de deltaméthrine ou lambda-cyhalothrine en cas de forte attaque, " +
      "en traitant tôt le matin pour préserver les insectes pollinisateurs. En prévention, un mélange savon " +
      "noir + eau en pulvérisation limite les populations naissantes.",
  },
  {
    id: 'niebe-engrais',
    culture: 'Niébé',
    categorie: 'conseils',
    icone: '🌱',
    titre: 'Fertilisation du niébé',
    motsCles: ['engrais niebe', 'fertiliser niebe', 'fumure niebe'],
    contenu:
      "Le niébé fixe son propre azote grâce aux nodosités racinaires : n'apportez pas d'azote en excès, " +
      "cela nuit à la nodulation et à la production de gousses. Un apport modéré de phosphore (50 kg/ha de " +
      "superphosphate) au semis favorise l'enracinement et la floraison. Inoculer les semences avec des " +
      "souches de rhizobium améliore nettement les rendements sur sols pauvres.",
  },

  // ═══════════════════ GOMBO ═══════════════════
  {
    id: 'gombo-culture',
    culture: 'Gombo',
    categorie: 'cultures',
    icone: '🌿',
    titre: 'Culture du gombo',
    motsCles: ['gombo', 'semer gombo', 'planter gombo', 'cultiver gombo'],
    contenu:
      "Le gombo se cultive toute l'année au Sénégal sous irrigation, avec un pic en saison sèche autour des " +
      "grandes villes (Niayes, banlieue de Dakar). Semez directement en poquets espacés de 50x50 cm, " +
      "2-3 graines par poquet après trempage 24h dans l'eau. Récolte précoce et régulière (tous les 2-3 jours) " +
      "dès que les fruits atteignent 6-8 cm : des fruits trop mûrs deviennent fibreux et invendables. " +
      "Un arrosage régulier est indispensable, surtout en saison sèche.",
  },
  {
    id: 'gombo-oidium',
    culture: 'Gombo',
    categorie: 'maladies',
    icone: '🦠',
    titre: 'Oïdium du gombo',
    motsCles: ['oidium', 'oïdium', 'maladie gombo', 'gombo malade'],
    contenu:
      "L'oïdium se manifeste par un feutrage blanc poudreux sur les feuilles, qui jaunissent et se dessèchent " +
      "progressivement. Il se développe surtout par temps sec et chaud avec une forte amplitude thermique " +
      "jour/nuit. Traitement : soufre mouillable en pulvérisation dès les premiers symptômes, renouvelé tous " +
      "les 10 jours. Une bonne aération des plants (espacement suffisant) réduit fortement les risques.",
  },
  {
    id: 'gombo-engrais',
    culture: 'Gombo',
    categorie: 'conseils',
    icone: '🌱',
    titre: 'Fertilisation du gombo',
    motsCles: ['engrais gombo', 'fertiliser gombo', 'fumure gombo'],
    contenu:
      "Apportez du compost ou fumier bien décomposé (10 t/ha) avant plantation. En cours de culture, " +
      "fractionnez un engrais NPK riche en potasse (type 10-10-20) toutes les 3 semaines pour soutenir la " +
      "fructification continue. Le gombo étant récolté en continu, il épuise vite le sol : un apport régulier " +
      "et léger est plus efficace qu'un gros apport unique.",
  },
];

/* ═══════════════════ MOTEUR DE RECHERCHE LOCAL ═══════════════════ */

function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function trouverReponse(question) {
  const q = normaliser(question);

  let meilleur = null;
  let meilleurScore = 0;

  FICHES.forEach((fiche) => {
    let score = 0;
    fiche.motsCles.forEach((mot) => {
      if (q.includes(normaliser(mot))) score += 2;
    });
    if (q.includes(normaliser(fiche.culture))) score += 1;

    if (score > meilleurScore) {
      meilleurScore = score;
      meilleur = fiche;
    }
  });

  if (meilleur && meilleurScore > 0) {
    return {
      reply:
        `**${meilleur.titre}**\n\n${meilleur.contenu}\n\n` +
        `Pour un suivi personnalisé, décrivez votre parcelle (superficie, région, stade de la culture).`,
      fiche: meilleur,
    };
  }

  return {
    reply:
      "Je n'ai pas encore de fiche précise pour cette question. Essayez de reformuler avec le nom de la " +
      "culture (arachide, mil, maïs, riz, niébé, gombo) ou consultez les fiches techniques ci-dessous.",
    fiche: null,
  };
}

function getFichesParCategorie(categorie) {
  if (!categorie || categorie === 'toutes') return FICHES;
  return FICHES.filter((f) => f.categorie === categorie);
}

function getFichesParCulture(culture) {
  return FICHES.filter((f) => f.culture.toLowerCase() === culture.toLowerCase());
}

/* ═══════════════════ EXPORT GLOBAL (usage navigateur) ═══════════════════ */

const ConnaissanceAgricole = {
  FICHES,
  trouverReponse,
  getFichesParCategorie,
  getFichesParCulture,
};

if (typeof window !== 'undefined') {
  window.ConnaissanceAgricole = ConnaissanceAgricole;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConnaissanceAgricole;
}
