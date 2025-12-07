# Guide d'auto-hébergement :

Une image Docker est fournie pour l'auto-hébergement. Elle possède les mêmes fonctionnalités que le bot principal (hébergé par nos soins), mais peut être exécutée n'importe où, même sur votre ordinateur portable ! Il vous suffit de disposer de Docker et d'une connexion Internet.

**Remarque :** L'image Docker est conçue pour les serveurs à faible charge. La surveillance de plus de 100 serveurs peut entraîner des dysfonctionnements. L'utilisation du bot sur plus de 10 serveurs Discord n'est pas prise en charge. L'utilisation des images Docker à des fins commerciales est interdite.

## Options d'hébergement

Vous pouvez choisir d'héberger le bot sur votre propre matériel ou chez un fournisseur de cloud. Nous avons développé un modèle de déploiement en un clic qui déploiera une instance du bot dans le cloud en cliquant simplement sur le bouton ci-dessous. Quel que soit votre choix, vous aurez accès aux mêmes fonctionnalités.

[![Déployer sur Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcstatusbot?referralCode=eM55xc&utm_medium=integration&utm_source=template&utm_campaign=generic)

Voici un tableau comparatif des options d'hébergement :

| Sur le cloud | Sur votre propre serveur |

| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |

| 🟢 Mises à jour automatiques par défaut | 🟡 Les mises à jour automatiques doivent être configurées manuellement |

| 🟢 Configuration fonctionnelle testée | 🟡 Les images sont testées, mais la configuration globale dépend de votre système |

| 🔴 La surveillance des adresses IP privées est interdite. Votre serveur Minecraft doit être accessible publiquement. | 🟢 La surveillance des adresses IP privées est autorisée. Vous n'avez pas besoin d'exposer votre serveur Minecraft sur Internet. |

| 🟡 Payant (abonnement mensuel) | 🟢 Gratuit ! (utilisez votre propre matériel) |

## Configuration requise

Pour exécuter une instance du bot, vous aurez besoin des éléments suivants :

- Un ID client et un jeton Discord pour votre bot.

- Un ordinateur avec Docker installé (plus d'1 processeur, plus de 2 Go de RAM).

- Une connexion Internet.

Héberger le bot sur votre propre matériel nécessite des connaissances de base en matière de fonctionnement et de maintenance des conteneurs Docker, ainsi que de gestion des bots Discord via le portail développeur. Si vous n'êtes pas à l'aise avec ces aspects, nous vous recommandons d'utiliser la version hébergée sur un serveur distant, en utilisant ce [lien d'invitation](https://discord.com/api/oauth2/authorize?client_id=788083161296273517&permissions=269485072&scope=bot%20applications.commands).

**Remarque :** Bien que vous puissiez exécuter le bot sur n’importe quel ordinateur, il est recommandé de l’exécuter sur un petit serveur disponible 24 h/24 et 7 j/7. Son exécution sur un ordinateur portable peut nécessiter quelques précautions supplémentaires (voir ci-dessous).

## Création du bot Discord

Vous devez d’abord enregistrer un bot auprès de Discord. Commencez [ici](https://discord.com/developers/applications?new_application=true)

1. Donnez un nom à votre bot.

2. Copiez l’ID client et le jeton du bot.

3. Assurez-vous que le bot dispose des permissions appropriées (voir ci-dessous).

4. Utilisez le lien d’invitation fourni par Discord pour inviter votre bot sur votre serveur.

<img src="./assets/permissions.png"/>

## Docker Compose

Utilisez le fichier Docker Compose suivant pour démarrer une instance de base du bot :

```
name: "mcstatusbot"

services:

mongodb:

image: mongo:latest

volumes:

- mcstatusbot-data:/data/db

redis:

image: redis:latest

mcpingserver:

image: rar1871/mcpingserver:latest

depends_on:

- redis

mcstatusbot:

image: rar1871/mcstatusbot:latest

environment:

- CLIENT_ID=<VOTRE_ID_CLIENT_BOT>

- TOKEN=<VOTRE_JETON_BOT>

depends_on:

- mcpingserver

- mongodb

volumes:
mcstatusbot-data :

```

## Options supplémentaires :

Le service `mcstatusbot` accepte les options supplémentaires suivantes, définies comme variables d'environnement.

**Remarque :** Tous les booléens sont en minuscules.

| Nom | Description | Valeur par défaut |

| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |

| `UPDATE_SERVERS_ON_LAUNCH` | Cette option force le bot à se mettre à jour.

État des serveurs ESH surveillés au lancement. À utiliser avec précaution, car si votre bot redémarre fréquemment, vous risquez d'atteindre les limites de requêtes de Discord. | `false` |

| `DATABASE_URL` | Si vous ne souhaitez pas utiliser le service MongoDB inclus par défaut, vous pouvez indiquer une URL personnalisée ici. | `mongodb://mongodb:27107` |

| `DATABASE_NAME` | Indiquez un nom de base de données personnalisé ici. Ceci est sans effet si vous n'utilisez pas d'instance MongoDB personnalisée. | `mcstatusbot` |

| `ALLOW_PRIVATE_IPS` | Autoriser le bot à vérifier les adresses IP privées telles que `localhost` ou `192.168.x.y`. ATTENTION ! Si vous êtes hébergé chez un fournisseur d'hébergement commercial, vous risquez d'être banni ! | `false` |

| `CACHE_SM` | Définir la valeur du cache en secondes pour la commande `/status`. Définir une valeur inférieure à la valeur par défaut peut entraîner le bannissement de votre adresse IP de certains serveurs ! Une valeur trop élevée peut provoquer des réponses obsolètes. | `60` |

| `CACHE_LG` | Définissez la valeur du cache en secondes pour la mise à jour périodique du canal vocal. Définir une valeur inférieure à la valeur par défaut peut entraîner le bannissement de votre adresse IP de certains serveurs ! Une valeur trop élevée peut afficher un état du serveur incorrect. | `360` |

| `PING_URL` | Adresse IP complète (y compris http://) ou nom de domaine pleinement qualifié (FQDN) du service `mcpingserver`. Utile si vous souhaitez exécuter le serveur de ping sur une autre machine, mais dans la plupart des cas, nous recommandons de conserver les valeurs par défaut. | `http://mcpingserver:8000` |

Le service `mcpingserver` accepte les options supplémentaires suivantes, définies comme variables d'environnement.

| Nom | Description | Valeur par défaut |

| ----------- | -------------------------------------------------------------------------------------------------- | ---------------------- |

| `REDIS_URL` | Si vous ne souhaitez pas utiliser le service Redis inclus par défaut, vous pouvez fournir une URL personnalisée ici : `redis://redis:6379/0`.

## Considérations supplémentaires :

- Plus de RAM est préférable, surtout si vous ajoutez des serveurs.

- Le bot nécessite une connexion Internet permanente. Si vous utilisez un ordinateur portable et que celui-ci se met en veille, la connexion risque d'être interrompue. La reconnexion à la passerelle Discord nécessitera un redémarrage du bot.

- Vous pouvez utiliser des services comme Watchtower pour mettre à jour automatiquement les images du bot lorsque de nouvelles versions sont disponibles. Ceci est recommandé pour bénéficier des dernières fonctionnalités et corrections de bugs.