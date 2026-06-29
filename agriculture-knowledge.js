/**
 * Base de connaissances agricoles WeurFarme (secours local)
 * Utilisée si la Edge Function IA n'est pas encore déployée.
 */
const ConnaissanceAgricole = {
  themes: [
    {
      mots: ['arachide', 'cacahuète', 'cacahuete', 'groundnut'],
      titre: 'Culture de l\'arachide',
      reponse:
        'L\'arachide se cultive principalement dans le bassin arachidier (Kaolack, Fatick, Kaffrine, Diourbel). ' +
        'Semez en juin-juillet avec les premières pluies, sur sol sablo-argileux bien drainé. ' +
        'Utilisez des semences certifiées (GH 119-20, 55-437) à raison de 25 à 30 kg/ha, traitées au fongicide avant semis. ' +
        'Apportez 100 kg/ha de superphosphate simple au semis. La récolte intervient entre octobre et novembre, soit 90 à 120 jours après semis. ' +
        'Surveillez la cercosporiose et la rosette ; évitez de cultiver l\'arachide deux années consécutives sur la même parcelle.',
    },
    {
      mots: ['mil', 'sorgho', 'céréale', 'cereale'],
      titre: 'Culture du mil et du sorgho',
      reponse:
        'Le mil et le sorgho sont adaptés aux zones à faible pluviométrie (Louga, Matam, Saint-Louis, Tambacounda). ' +
        'Semez dès les premières pluies, en juin, avec un écartement de 80 cm entre lignes et 40 cm entre poquets. ' +
        'Placez 3 à 5 graines par poquet, puis ne conservez que 2 plants après levée. ' +
        'Sarclage recommandé 3 semaines après semis ; apport d\'urée 30 jours après levée. ' +
        'Protégez la récolte contre les oiseaux à maturité.',
    },
    {
      mots: ['maïs', 'mais', 'corn'],
      titre: 'Culture du maïs',
      reponse:
        'Le maïs convient aux zones humides : Casamance, Kolda, Ziguinchor (minimum 900 mm de pluie). ' +
        'Semis en juin-juillet, récolte en septembre-octobre (cycle 90 à 120 jours). ' +
        'Le maïs est sensible au stress hydrique à la floraison : irriguez si besoin toutes les deux semaines. ' +
        'Fertilisation type : NPK 15-15-15 à 200 kg/ha au semis, puis 100 kg/ha d\'urée en couverture à 30 jours.',
    },
    {
      mots: ['gombo', 'okra'],
      titre: 'Culture du gombo',
      reponse:
        'Le gombo peut se cultiver toute l\'année en irrigué ; en pluvial, privilégiez juin à septembre. ' +
        'Semez à 60 × 40 cm. Trempez les graines 12 h dans l\'eau avant semis pour améliorer la germination. ' +
        'Récoltez tous les 2 à 3 jours à partir de 45-50 jours, lorsque les gousses sont tendres (8 à 10 cm). ' +
        'Arrosez régulièrement et retirez les feuilles malades pour limiter les maladies.',
    },
    {
      mots: ['cercosporiose', 'tache', 'taches', 'feuille arachide'],
      titre: 'Cercosporiose de l\'arachide',
      reponse:
        'La cercosporiose se reconnaît aux taches brunes entourées d\'un halo jaune sur les feuilles, avec chute prématurée du feuillage. ' +
        'Elle se développe par humidité élevée et températures de 25 à 30 °C. ' +
        'Traitez dès les premiers symptômes avec un fongicide à base de mancozèbe ou chlorothalonil, en renouvelant tous les 14 jours. ' +
        'Brûlez les résidus infectés et pratiquez la rotation des cultures. Privilégiez des variétés résistantes.',
    },
    {
      mots: ['criquet', 'criquets', 'nuage', 'ravageur', 'insecte'],
      titre: 'Protection contre les criquets',
      reponse:
        'Les criquets (5 à 7 cm, verts ou bruns) peuvent dévorer une parcelle en quelques heures. ' +
        'Surveillez les alertes CLCPRO et agissez dès l\'approche d\'un nuage. ' +
        'Contactez immédiatement le service agricole local. Un traitement homologué à base de malathion peut être appliqué selon recommandation officielle. ' +
        'En cas d\'infestation massive, appelez la Direction de la Protection des Végétaux au +221 33 832 00 41.',
    },
    {
      mots: ['eau', 'irrigation', 'arrosage', 'sécheresse', 'secheresse', 'goutte'],
      titre: 'Gestion de l\'eau',
      reponse:
        'En saison sèche, privilégiez l\'irrigation le soir (après 18 h) ou tôt le matin (avant 8 h) pour limiter l\'évaporation. ' +
        'Le goutte-à-goutte permet d\'économiser jusqu\'à 40 % d\'eau. ' +
        'Installez des bassins de récupération des eaux de pluie pendant l\'hivernage (10 m³ pour environ 0,5 ha). ' +
        'Le paillage réduit l\'évaporation d\'environ 50 % et maintient l\'humidité du sol.',
    },
    {
      mots: ['sol', 'compost', 'fertilité', 'fertilite', 'engrais', 'azote'],
      titre: 'Fertilité du sol',
      reponse:
        'Entretenez votre sol avec du compost (résidus de culture + fumier, retourné toutes les 2 semaines, prêt en 2 à 3 mois). ' +
        'Pratiquez la rotation : alternez légumineuses (arachide, niébé) et céréales (mil, maïs). ' +
        'Les engrais verts (niébé, mucuna) fixent l\'azote naturellement. ' +
        'Un sol bien géré peut augmenter le rendement de 30 à 50 % sans surcoût d\'engrais chimiques.',
    },
    {
      mots: ['semence', 'semences', 'graine', 'graines'],
      titre: 'Choix des semences',
      reponse:
        'Utilisez des semences certifiées adaptées à votre zone agro-écologique. ' +
        'Pour l\'arachide : GH 119-20 ou 55-437. Traitez toujours les semences au fongicide avant semis. ' +
        'Conservez les semences dans un endroit sec, à l\'abri des insectes et de l\'humidité. ' +
        'Évitez les semences de récoltes anciennes non sélectionnées : elles donnent des rendements plus faibles et plus sensibles aux maladies.',
    },
    {
      mots: ['semis', 'planter', 'plantation', 'calendrier', 'quand'],
      titre: 'Calendrier cultural',
      reponse:
        'Au Sénégal, la majorité des cultures pluviales se sèment avec les premières pluies (juin-juillet). ' +
        'Arachide et maïs : juin-juillet, récolte octobre-novembre. Mil/sorgho : juin, récolte selon cycle (75 à 150 jours). ' +
        'Gombo : possible toute l\'année en irrigué. Adaptez toujours le calendrier aux pluies locales et à la maturité de votre sol.',
    },
  ],

  reponseParDefaut:
    'Merci pour votre question. Pour une réponse plus précise, précisez la culture concernée (arachide, mil, maïs, gombo), ' +
    'le stade de la plante et votre région au Sénégal. ' +
    'En attendant, consultez les fiches techniques WeurFarme ci-dessous ou contactez un conseiller agricole local.',

  trouverReponse(question) {
    const q = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    let meilleur = null;
    let scoreMax = 0;

    this.themes.forEach((theme) => {
      let score = 0;
      theme.mots.forEach((mot) => {
        const m = mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (q.includes(m)) score += m.length > 4 ? 2 : 1;
      });
      if (score > scoreMax) {
        scoreMax = score;
        meilleur = theme;
      }
    });

    if (meilleur && scoreMax > 0) {
      return {
        reply:
          '**' + meilleur.titre + '**\n\n' + meilleur.reponse +
          '\n\nPour un suivi personnalisé, décrivez votre parcelle (superficie, région, stade de la culture).',
        source: 'local',
      };
    }

    return { reply: this.reponseParDefaut, source: 'local' };
  },
};
