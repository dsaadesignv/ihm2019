# ihm2019

# Introduction : comment ça va fonctionner ?

Vous avez un jeu (SuperTuxKart), un script-serveur et votre dispositif. 

Le jeu **SuperTuxKart** est une variante de Mario Kart, et est jouable avec un clavier classique. Votre but va être de bidouiller pour jouer avec votre dispositif plutôt qu'avec un clavier. Comment ? En simulant l'appui sur les touches jouables. Par exemple, si votre dispositif invite le joueur à secouer une bouteille pour accélérer, la secousse de la bouteille va simuler l'appui sur la touche <kbd>↑</kbd> qui permet d'accélérer dans le jeu.

Pour ça, **un script-serveur** est fourni par le challenge IHM. Ce script-serveur a pour but de recevoir des signaux et de les convertir en appuis sur les touches de clavier. Par exemple, le signal "Secousse de bouteille" est reçu par le script-serveur, et ce script-serveur va envoyer "Appui sur la touche <kbd>↑</kbd>" au jeu SuperTuxKart.

# Pour démarrer, configurons votre Mac

_La procédure est dédiée à macOS et la démonstration du vendredi se déroulera sur un Mac, par souci de gain de temps. Si vous tenez à développer votre code sur Windows ou Linux, la procédure est sensiblement identique mais quelques subtilités peuvent exister avec l'installation de Python ou des autres outils à disposition._

## 1. Installer SuperTuxKart
Vous allez pouvoir tester le jeu et comprendre les commandes puis vous pourrez tester votre dispositif pour de vrai, en contrôlant votre kart.

1. Télécharger : http://iihm.imag.fr/ChallengeIHM19/install/mac-SuperTuxKart-ihm2019.zip
2. Une fois téléchargé, ouvrir le dossier `📁SuperTuxKart-ihm2019`
3. Cliquer-droit sur l'app **`supertuxkart.app`** puis cliquer sur **Ouvrir**
3. Une fenêtre s'ouvre : cliquer sur **Ouvrir**

Le jeu se lance.

1. Répondre **Yes** pour l'envoi de données en ligne, afin de pouvoir jouer en ligne
2. Cliquer sur l'onglet **Existing Online Account**
3. Se connecter avec les identifiants de votre écurie (voir avec Kévin)

Vous êtes maintenant connecté à SuperTuxKart et vous êtes dans le menu principal.

- Pour tester votre dispositif en solo, créer une partie en **Singleplayer** 
- Pour tester votre dispositif avec une ou plusieurs autres équipes, aller dans : **Online ❯ Global Networking ❯ Find Server**, cocher **☑ Show Private Server** et trouver le serveur **`dsaadesignv`**. Ce serveur sera disponible chaque jour de la semaine (pendant les heures de travail). Si le serveur n'est pas listé, demander à Kévin 👍

Vous savez maintenant lancer une partie de SuperTuxKart.

Après avoir perdu une demie-heure à jouer au jeu, passons à la bidouille pour contrôler votre kart avec votre dispositif.

## 2. Installer Python 3 (pour Mac)
→ https://wsvincent.com/install-python3-mac/

Puis dans le répertoire des 2 fichiers Python (pour lancer le serveur Python) :

`python3 -m pip install keyboard`

puis lancer le serveur :

`python3 ./STK_input_server.py`




Dans Processing :

Sketch → Importer une librairie… → Rechercher `UDP` → Installer

Puis lancer le script


Puis donner le focus à la fenêtre de jeu Super Tux Kart

## Liste des commandes 

### Commandes obligatoires

| Commande | Description |
| --- | --- |
| **`P_LEFT`** | Tourne le volant à gauche<br>*Appui sur la touche* <kbd>←</kbd> |
| **`R_LEFT`** | Ramène le volant de la gauche<br>*Relâchement de la touche* <kbd>←</kbd> |
| **`P_RIGHT`** | Tourne le volant à droite<br>*Appui sur la touche* <kbd>→</kbd> |
| **`R_RIGHT`** | Ramène le volant de la droite<br>*Relâchement de la touche* <kbd>→</kbd> |
| **`P_ACCELERATE`** | Appuie sur l'accélérateur<br>*Appui sur la touche* <kbd>↑</kbd> |
| **`R_ACCELERATE`** | Relâche l'accélérateur<br>*Relâchement de la touche* <kbd>↑</kbd> |
| **`FIRE`** | Lance un objet<br>*Appui sur la touche* <kbd>Espace</kbd> |
| **`RESCUE`** | Ramène le kart sur la piste (sauvetage par l'oiseau)<br>*Appui sur la touche* <kbd>Retour ⌫</kbd> |

### Commandes optionnelles (mais utiles pour jouer)

| Commande | Description |
| --- | --- |
| **`P_BRAKE`** | Appuie sur la pédale de frein (puis recule si l'appui est prolongé)<br>*Appui sur la touche* <kbd>↓</kbd> |
| **`R_BRAKE`**	| Relâche la pédale de frein<br>*Relâchement de la touche* <kbd>↓</kbd> |
| **`NITRO`** | Déclenche une forte accélération temporaire<br>*Appui sur la touche* <kbd>N</kbd> |
| **`SKIDDING`** | Déclenche un dérapage au cours d'un virage<br>*Appui sur la touche* <kbd>V</kbd> |
| **`P_LOOKBACK`** | Regarde en arrière<br>*Appui sur la touche* <kbd>B</kbd> |
| **`R_LOOKBACK`** | Revient à la vue standard<br>*Relâchement de la touche* <kbd>B</kbd> |
