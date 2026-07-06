/**
 * WeurFarme – Assistant agricole IA
 * Appelle la fonction Netlify « ask-gemini »
 */

const AssistantWeurFarme = (() => {
  const historique = [];
  let enCours = false;
  let prenomUtilisateur = 'Agriculteur';
  let modePublic = false;

  const SUGGESTIONS = [
    'Quand semer l\'arachide au Sénégal ?',
    'Comment traiter la cercosporiose ?',
    'Quelles semences choisir pour le mil ?',
    'Comment économiser l\'eau en saison sèche ?',
  ];

  const MESSAGE_BIENVENUE =
    'Bonjour. Je suis l\'assistant agricole WeurFarme. ' +
    'Posez-moi vos questions sur les cultures, les maladies, l\'irrigation, ' +
    'les semences et les bonnes pratiques agricoles au Sénégal. ' +
    'Je vous réponds de façon claire et professionnelle.';

  const MESSAGE_BIENVENUE_PUBLIC =
    'Bonjour et bienvenue sur WeurFarme. Je suis votre assistant agricole. ' +
    'Posez gratuitement une question sur vos cultures, maladies ou l\'irrigation au Sénégal. ' +
    'Inscrivez-vous pour accéder à l\'assistant IA avancé, illimité, dans votre espace membre.';

  function $(id) {
    return document.getElementById(id);
  }

  function formaterReponse(texte) {
    const safe = echapper(texte);
    const lignes = safe.split('\n');
    let html = '';
    let dansListe = false;

    lignes.forEach((ligne) => {
      let trimmed = ligne.trim();
      if (!trimmed) {
        if (dansListe) { html += '</ul>'; dansListe = false; }
        return;
      }

      trimmed = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      if (/^[-•*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)) {
        if (!dansListe) { html += '<ul>'; dansListe = true; }
        const contenu = trimmed.replace(/^[-•*]\s+/, '').replace(/^\d+[.)]\s+/, '');
        html += '<li>' + contenu + '</li>';
        return;
      }

      if (dansListe) { html += '</ul>'; dansListe = false; }
      html += '<p>' + trimmed + '</p>';
    });

    if (dansListe) html += '</ul>';
    return html || '<p>' + echapper(texte) + '</p>';
  }

  function echapper(texte) {
    return texte
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function ajouterMessage(role, contenu, html) {
    const conteneur = $('assistant-messages');
    if (!conteneur) return;

    const div = document.createElement('div');
    div.className = 'msg ' + (role === 'user' ? 'msg-utilisateur' : 'msg-assistant');

    if (html) {
      div.innerHTML = contenu;
    } else {
      const p = document.createElement('p');
      p.textContent = contenu;
      div.appendChild(p);
    }

    conteneur.appendChild(div);
    conteneur.scrollTop = conteneur.scrollHeight;
    return div;
  }

  function afficherChargement() {
    const div = document.createElement('div');
    div.className = 'msg msg-chargement';
    div.id = 'assistant-chargement';
    div.innerHTML =
      'Analyse en cours<div class="dots"><span></span><span></span><span></span></div>';
    $('assistant-messages').appendChild(div);
    $('assistant-messages').scrollTop = $('assistant-messages').scrollHeight;
  }

  function retirerChargement() {
    $('assistant-chargement')?.remove();
  }

  function afficherErreur(msg) {
    const el = $('assistant-erreur');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
  }

  function cacherErreur() {
    $('assistant-erreur')?.classList.remove('visible');
  }

  function definirStatut(enLigne) {
    const el = $('assistant-statut');
    if (!el) return;
    el.textContent = enLigne ? 'En ligne' : 'Hors ligne';
    el.classList.toggle('hors-ligne', !enLigne);
  }

  function repondreLocal(message) {
    const local = ConnaissanceAgricole.trouverReponse(message);
    let reply = local.reply;

    if (modePublic) {
      reply +=
        '\n\n**Accès complet** : inscrivez-vous sur WeurFarme (1 000 FCFA/an) pour l\'assistant IA avancé, ' +
        'des fiches détaillées et votre espace personnel.';
    }

    historique.push({ role: 'assistant', content: reply });
    ajouterMessage('assistant', formaterReponse(reply), true);
    definirStatut(true);
    cacherErreur();
  }

  async function envoyerMessage(texteBrut) {
    const message = texteBrut.trim();
    if (!message || enCours) return;

    cacherErreur();
    enCours = true;
    $('assistant-envoyer').disabled = true;
    $('assistant-input').disabled = true;

    ajouterMessage('user', message);
    historique.push({ role: 'user', content: message });

    afficherChargement();

    if (modePublic) {
      await new Promise((r) => setTimeout(r, 600));
      retirerChargement();

      if (typeof ConnaissanceAgricole !== 'undefined') {
        repondreLocal(message);
      } else {
        definirStatut(false);
        ajouterMessage('assistant', 'Service temporairement indisponible. Réessayez plus tard.');
      }

      enCours = false;
      $('assistant-envoyer').disabled = false;
      $('assistant-input').disabled = false;
      $('assistant-input').focus();
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historique.slice(-10) }),
      });

      const data = await res.json().catch(() => ({}));

      retirerChargement();

      if (!res.ok || data?.error) {
        throw new Error(data?.error || 'Service IA indisponible');
      }

      const reponse = data?.reply?.trim();
      if (!reponse) {
        throw new Error('Réponse vide');
      }

      historique.push({ role: 'assistant', content: reponse });
      ajouterMessage('assistant', formaterReponse(reponse), true);
      definirStatut(true);

    } catch (err) {
      retirerChargement();
      console.warn('Assistant IA cloud:', err.message);

      if (typeof ConnaissanceAgricole !== 'undefined') {
        repondreLocal(message);
        return;
      }

      definirStatut(false);
      afficherErreur(
        'Assistant IA momentanément indisponible. Réponses locales utilisées en attendant.'
      );
      ajouterMessage(
        'assistant',
        'Je ne peux pas accéder au moteur IA pour le moment. Consultez les fiches techniques ci-dessous.'
      );
    } finally {
      enCours = false;
      $('assistant-envoyer').disabled = false;
      $('assistant-input').disabled = false;
      $('assistant-input').focus();
    }
  }

  function initialiserSuggestions() {
    const conteneur = $('assistant-suggestions');
    if (!conteneur) return;

    SUGGESTIONS.forEach((texte) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'suggestion-btn';
      btn.textContent = texte;
      btn.addEventListener('click', () => {
        $('assistant-input').value = texte;
        envoyerMessage(texte);
      });
      conteneur.appendChild(btn);
    });
  }

  function initialiserFormulaire() {
    const form = $('assistant-form');
    const input = $('assistant-input');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const texte = input.value;
      input.value = '';
      envoyerMessage(texte);
    });

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });
  }

  function init(options = {}) {
    modePublic = options.mode === 'public';
    prenomUtilisateur = options.prenom || 'Agriculteur';

    const conteneur = $('assistant-messages');
    if (conteneur && conteneur.children.length === 0) {
      const msg = modePublic
        ? MESSAGE_BIENVENUE_PUBLIC
        : MESSAGE_BIENVENUE.replace('Bonjour.', 'Bonjour ' + prenomUtilisateur + '.');
      ajouterMessage('assistant', msg);
    }

    const promo = $('assistant-promo');
    if (promo) promo.style.display = modePublic ? 'block' : 'none';

    initialiserSuggestions();
    initialiserFormulaire();
    definirStatut(true);
  }

  return { init, envoyerMessage };
})();

function initAssistant(options) {
  AssistantWeurFarme.init(options);
}
