# Revision Science Medicale — version locale fusionnée

Cette version fonctionne sans serveur Node.js, sans Render et sans base de données.

## Lancement

Ouvre simplement `index.html` dans un navigateur.

## Fichiers conservés

- `index.html` : page principale
- `style.css` : design du site
- `app.bundle.js` : logique locale du site
- `data.bundle.js` : questions, sujets et résumés fusionnés
- `codes.js` : codes d’accès et administrateurs
- `dictionnaire.medical.js` : dictionnaire médical
- `logo.png` : logo

## Important

Les comptes présents dans `codes.js` fonctionnent en local.
Les réglages et comptes créés depuis l’interface administrateur sont enregistrés dans le navigateur avec `localStorage`. Ils restent donc sur le même navigateur/appareil, mais ne sont pas partagés automatiquement avec d’autres téléphones ou ordinateurs.

Pour ajouter des comptes de façon définitive pour tous les utilisateurs, modifie directement `codes.js`.


## Modification admin

Dans les paramètres administrateur, seule la section **Gestion des quiz** est affichée. Les autres sections administrateur ont été retirées de l’interface.


## Modification ajoutée
- Le menu « Paramètres » remplace « Paramètres administrateur ».
- Tous les comptes connectés peuvent accéder à « Paramètres ».
- La section conservée reste uniquement « Gestion des quiz ».


## Modification ajoutée

Dans Paramètres, la section « Ajouter de nouvelles matières et de nouveaux sujets » a été retirée. Il reste seulement les paramètres des questions dans la gestion des quiz.

## Historique local des évaluations

Cette version ajoute un menu **Historique et évaluations** accessible à l’utilisateur connecté. À chaque quiz terminé, le navigateur enregistre localement la date, le niveau, la matière, le sujet, la note, le nombre de réponses et le détail de l’évaluation. Les données restent dans `localStorage` sur l’appareil utilisé : elles ne sont pas envoyées à un serveur.
