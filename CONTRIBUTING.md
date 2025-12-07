# Guide de contribution :

Toute contribution au bot est la bienvenue ! Vous trouverez ici quelques étapes et instructions de base pour les contributions de code/langues. Veuillez suivre les instructions pour que votre pull request soit approuvée sans problème !

## Ajout de nouvelles localisations :

L’ajout de la prise en charge de nouvelles langues est une contribution précieuse qui permet à notre bot d’être plus accessible à un public plus large. Notez que Discord utilise le terme « localisations » pour désigner les langues.

Pour ajouter de nouvelles localisations :

1. Clonez le dépôt : `git clone https://github.com/MaitreCapybaraoff/Minecraft-Server-Status-BOT.git`

2. Trouvez le code de localisation Discord pour la langue que vous souhaitez ajouter : `https://discord.com/developers/docs/reference#locales`

- Nous ne prenons en charge que les langues reconnues par Discord. Si Discord ne propose pas de localisation pour votre langue, notre bot ne pourra pas la prendre en charge. Toute pull request utilisant un code de langue ne figurant pas dans la liste des langues prises en charge par Discord sera rejetée.

3. Créez une nouvelle branche pour vos modifications en utilisant le modèle suivant (nom_utilisateur_github_code_de_locale) : `git checkout -b <nom_utilisateur_github_code_de_locale>`

4. Modifiez les fichiers de localisation. Ces fichiers se trouvent dans le dossier `localizations`. Ouvrez chaque fichier et ajoutez une nouvelle entrée pour chaque variable exportée correspondant à votre langue, en vous basant sur l'exemple existant.

- Respectez les commentaires dans les fichiers concernant la casse (minuscules).

5. Ajoutez vos modifications à l'index, validez-les et envoyez-les.

- ```

git add .

git commit -m "<un message pour la validation ici>"

git push
```

- Lors de votre premier envoi, selon votre configuration Git, vous devrez peut-être utiliser `git push --set-upstream origin <nom_de_votre_branche>`, où `nom_de_votre_branche` doit correspondre à `votre_code_de_locale` défini précédemment.

6. Créez une demande de fusion (pull request) sur GitHub de votre branche vers la branche principale.

7. Après vérification, la demande de fusion sera intégrée au bot de production et la branche supprimée.

### Remarques :

- N'ajoutez/modifiez qu'une seule langue à la fois.

- Ne modifiez aucun autre fichier/code dans une demande de fusion de langue. Ouvrez une demande de fusion distincte pour toute modification de code.

- N'ajoutez ni ne supprimez aucun fichier.

- N'utilisez pas de langage vulgaire dans vos traductions. Nous vérifierons. Tout premier manquement entraînera le rejet de votre demande de fusion avec avertissement. Tout manquement ultérieur entraînera une exclusion.

- Les demandes de fusion multiples pour une même langue seront traitées dans l'ordre de leur réception. Si la fusion d'une demande de fusion précédente pour votre langue crée un conflit avec votre demande de fusion, nous vous en informerons par un commentaire et vous permettreons de corriger vos traductions.

- En cas d'erreurs mineures dans la demande de fusion, nous ajouterons un commentaire et vous permettrayons de la corriger.

- Une fois la fusion effectuée, le bot intégrera les modifications dans la prochaine mise à jour mensuelle. Selon la date d'acceptation de vos modifications, leur affichage peut prendre quelques semaines.

Merci pour votre contribution ! Une fois votre pull request fusionnée, vous serez automatiquement listé(e) comme contributeur(trice) ! Pour toute question, veuillez ouvrir une issue sur GitHub.