# ihm2019

## Installer SuperTuxKart
→ http://iihm.imag.fr/ChallengeIHM19/install/mac-SuperTuxKart-ihm2019.zip

1. Répondre "Yes", pour l'envoi de données en ligne, afin de pouvoir jouer en ligne
2. Se connecter en ligne avec vos identifiants STK (voir avec Kévin)
3. Aller dans : Online ➙ Global Networking ➙ Find Server ➙ Show Private Server ➙ **`dsaadesignv`**. Ce serveur sera disponible chaque jour de la semaine (pendant les heures de travail)

## Installer Python 3 sur le Mac
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

#### Commandes obligatoires

`P_LEFT`	tourne le volant à gauche	appui sur la touche 'flèche gauche'
`R_LEFT`	ramène le volant de la gauche	relâchement de la touche 'flèche gauche'

`P_RIGHT`	tourne le volant à droite	appui sur la touche 'flèche droite'
`R_RIGHT`	ramène le volant de la droite	relâchement de la touche 'flèche droite'

`P_ACCELERATE`	appuie sur l'accélérateur	appui sur la touche 'flèche haut'
`R_ACCELERATE`	relâche l'accélérateur	relâchement de la touche 'flèche haut'

`FIRE`	lance un objet	appui sur la touche 'espace'

`RESCUE`	ramène le kart sur la piste (sauvetage par l'oiseau)	appui sur la touche 'retour'

#### Commandes optionnelles (mais utiles pour jouer)

`P_BRAKE`	appuie sur la pédale de frein / recule	appui sur la touche 'flèche bas'
`R_BRAKE`	relâche la pédale de frein	relâchement de la touche 'flèche bas'

`NITRO`	déclenche une forte accélération temporaire	appui sur la touche 'n'

`SKIDDING`	déclenche un dérapage au cours d'un virage	appui sur la touche 'v'

`P_LOOKBACK`	regarde en arrière	appui sur la touche 'b'
`R_LOOKBACK`	revient à la vue standard	relâchement de la touche 'b'