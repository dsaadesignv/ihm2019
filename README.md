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
