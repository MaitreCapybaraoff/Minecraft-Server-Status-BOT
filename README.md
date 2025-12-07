<div align="center">

<img src="./assets/grass.png" height="100" />

<h1>État du serveur Minecraft - Bot Discord</h1>

<p>Un bot Discord.js simple qui affiche l'état des serveurs Minecraft.</p>

![Nombre de serveurs Discord](https://img.shields.io/endpoint?url=https%3A%2F%2Fmcstatusbot-delegate-production.up.railway.app%2Fcount%2FgetFormatted&style=for-the-badge)

[![Inviter à Serveur](https://img.shields.io/static/v1?label=&message=Invite%20to%20Server&color=forestgreen&style=for-the-badge)](https://discord.com/api/oauth2/authorize?client_id=788083161296273517&permissions=269485072&scope=bot%20applications.commands)

![Docker Pulls](https://img.shields.io/docker/pulls/rar1871/mcstatusbot?style=for-the-badge)

[![Hébergez votre [Hostez votre propre serveur](https://img.shields.io/static/v1?label=&message=Host%20Your%20Own&color=red&style=for-the-badge)](https://github.com/RahulR100/mcstatusbot/blob/main/HOSTING.md)

[![Visitez notre site web](https://img.shields.io/static/v1?label=&message=Website&color=purple&style=for-the-badge)](https://mcstatusbot.com/)

[![Rejoignez notre serveur Discord](https://img.shields.io/static/v1?label=&message=Join%20Our%20Discord&color=blue&style=for-the-badge)](https://discord.gg/FVuSmQx5tJ)

</div>
<br/>

**Utilisation :** Il suffit de… [Invitez](https://discord.com/api/oauth2/authorize?client_id=788083161296273517&permissions=269485072&scope=bot%20applications.commands) le

bot sur votre serveur, ou [hébergez votre propre instance](https://github.com/RahulR100/mcstatusbot/blob/main/HOSTING.md).

**Vous rencontrez des difficultés ?** Consultez la [FAQ](https://github.com/RahulR100/mcstatusbot/issues/154), [créez un ticket](https://github.com/RahulR100/mcstatusbot/issues/new) ou [posez votre question sur notre serveur Discord](https://discord.gg/FVuSmQx5tJ).

**Vous souhaitez contribuer à la traduction ?** Consultez le [guide de contribution](https://github.com/RahulR100/mcstatusbot/blob/main/CONTRIBUTING.md) ici.

## Fonctionnalités

- Mise à jour automatique des canaux vocaux pour afficher l'état du serveur et le nombre de joueurs en ligne

- Compatibilité avec les serveurs Java et Bedrock

- Possibilité de surveiller plusieurs serveurs Minecraft simultanément

- Consultation de l'état des serveurs non surveillés

- Prise en charge des commandes slash avec réponses éphémères (configurables) pour éviter l'encombrement des canaux

- Langues multiples : 🇬🇧 🇩🇪 🇩🇰 🇪🇸

<br>
<table style='border: none'>

<tr>

<td>

<img src="./assets/channels.png" height="200" />

</td>

<td>

<img src="./assets/status.png" height="200" />

</td>
</tr>
</table>

## Automne 2025 : Auto-hébergé Nouvelle version !

La version auto-hébergée du bot est désormais disponible ! Consultez le [guide d'auto-hébergement](https://github.com/RahulR100/mcstatusbot/blob/main/HOSTING.md) pour l'installation et l'utilisation.

Autres mises à jour :

- Amélioration de l'affichage des messages d'erreur lors de la récupération de l'état du serveur

- Mise à jour de la commande `/help` pour afficher les options d'assistance en cas de problème

- Mises à jour des paquets et du logiciel serveur

- Corrections de bugs

Comme d'habitude, merci de signaler tout bug ou comportement anormal. Merci !

## Remarques d'utilisation

**Serveurs Bedrock :** pour utiliser les commandes `/status` et `/monitor`, vous devez définir l'option `type` sur « Bedrock » pour que le bot fonctionne correctement.

**Adresses IP locales (Hébergement cloud uniquement)** Le bot filtre les adresses IP privées (192.168, 127.0.0, 10.0, etc.) qui lui sont inaccessibles. Le bot affichera désormais « Statut : Erreur » si l'adresse IP de votre serveur a été filtrée. Si vous souhaitez surveiller un serveur privé, vous pouvez héberger votre propre instance du bot (voir [https://github.com/MaitreCapybaraoff/Minecraft-Server-Status-BOT/blob/main/HOSTING.md](https://github.com/MaitreCapybaraoff/Minecraft-Server-Status-BOT/blob/main/HOSTING.md)) ou utiliser un proxy gratuit comme [Playit](https://playit.gg/) pour rendre votre serveur accessible de manière sécurisée via un nom de domaine, puis surveiller ce domaine.

## Commandes

`/status [serveur] [plateforme]` Affiche l'état actuel et le nombre de joueurs actifs pour n'importe quel serveur.

`/monitor server [pseudo] [plateforme] [default] [en ligne] [hors ligne]` Crée deux canaux vocaux affichant l'état d'un serveur Minecraft et permet de définir un pseudo, un état par défaut, ainsi qu'un indicateur de connexion et d'absence.

`/nickname pseudo [serveur]` Modifie le pseudo du serveur Minecraft surveillé.

`/default server` Définit un serveur comme serveur par défaut pour toutes les commandes.

`/unmonitor [serveur|tous]` Supprime les canaux vocaux pour le serveur spécifié ou pour tous les serveurs.

`/ephemeral setting` Active ou désactive les messages éphémères. Remarque : ceci est un paramètre global pour votre serveur Discord.

`/indicators server|all [online] [offline]` Personnaliser les indicateurs en ligne/hors ligne pour chaque serveur/tous les serveurs.

`/bug` Envoyer un rapport de bug aux développeurs.

`/help` Lister les autres commandes.

## Feuille de route

- [ ] Ajouter une commande de liste des serveurs (interface de gestion basique).

- [ ] Ajouter une option pour surveiller le serveur avec des messages intégrés au lieu des canaux vocaux.

- [ ] Notifications de serveur hors ligne dans le canal.

- [ ] Réécriture de l'API backend pour la prise en charge de l'IPC et du nouveau système de fédération.

- [ ] Refonte des commandes de surveillance et de pseudonyme pour inclure un flux de travail modal.

- [ ] Lier les noms d'utilisateur Discord aux comptes Minecraft pour la liste des joueurs dans la commande status (voir ce dépôt : [https://github.com/dommilosz/minecraft-auth]).
- [ ] Ajout de la prise en charge des graphiques (voir ce dépôt : [https://github.com/cappig/MC-status-bot])

- [x] Version Docker pour l'auto-hébergement
- [x] Refonte des commandes de statut, de pseudo et de désactivation du suivi : ajout de menus déroulants
- [x] Possibilité de désactiver les messages éphémères
- [x] Plugin Minecraft permettant la surveillance des serveurs locaux : utilisez [Playit](https://playit.gg/)
- [x] Indicateurs en ligne/hors ligne personnalisés