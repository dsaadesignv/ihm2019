# ihm2019

# Introduction : comment ça va fonctionner ?

Vous avez un jeu (SuperTuxKart), un script-serveur et votre dispositif. 

Le jeu **SuperTuxKart** est une variante de Mario Kart, et est jouable avec un clavier classique. Votre but va être de bidouiller pour jouer avec votre dispositif plutôt qu'avec un clavier. Comment ? En simulant l'appui sur les touches jouables. Par exemple, si votre dispositif invite le joueur à secouer une bouteille pour accélérer, la secousse de la bouteille va simuler l'appui sur la touche <kbd>↑</kbd> qui permet d'accélérer dans le jeu.

#### Qui simule l'appui sur la touche ?

Pour remplir cette fonction, **un script-serveur** est fourni par le challenge IHM. Ce script-serveur a pour but de recevoir des messages et de les convertir en appuis sur les touches de clavier. Par exemple, le message généré par une secousse de bouteille est reçu par le script-serveur, et ce script-serveur va envoyer _"Appui sur la touche_ <kbd>↑</kbd>_"_ au jeu SuperTuxKart.

#### Comment détecter les secousses de bouteille et autres interactions avec les objets ?

Vous allez équiper vos objets de capteurs électroniques sensibles aux mouvements, gestes, percussions (…) donc capables de capter les interactions du joueur utilisant votre dispositif. Ces capteurs vont convertir une action (mouvement, geste, percussion) en une valeur numérique, et cette valeur numérique va vous permettre d'interpréter l'interaction initiale. 

Par exemple, une boîte d'allumettes peut être ouverte ou fermée. Grâce à un capteur de lumière placé dans la boîte, le capteur est soit éclairé par la lumière ambiante si la boîte est ouverte, soit plongé dans l'obscurité de la boîte fermée. Le capteur va donc vous renvoyer une valeur numérique (disons `1023` s'il est éclairé, et `0` s'il est dans l'obscurité) et c'est à vous, humain, d'interpréter ce résultat (`1023` = capteur éclairé donc boîte ouverte ou `0` = capteur dans l'obscurité donc boîte fermée).

#### Comment récupérer les valeurs numériques des capteurs ?

Vos capteurs vont être reliés à une carte électronique qui va transférer les données émises par le capteur vers votre ordinateur. Un capteur envoie des valeurs à la carte électronique, et la carte électronique envoie ces valeurs à votre ordinateur. Pour l'exercice, nous utiliserons une carte **Arduino**, facile à prendre en main pour découvrir l'électronique.

#### Qui récupère ces valeurs numériques sur l'ordinateur ? Et qu'est-ce qui fait qu'une valeur de capteur devient une action de jeu ?

Vous allez coder un script capable de plusieurs choses :
- Lire des valeurs envoyées depuis une carte électronique
- Interpréter ces valeurs pour comprendre l'action de jeu à effectuer (accélérer, tourner à gauche, freiner…)
- Envoyer l'action de jeu au script-serveur qui l'enverra à SuperTuxKart

Développons : votre script va récupérer les valeurs de chaque capteur, et vous allez les labelliser. Par exemple, cette valeur est issu du capteur de lumière dans la boîte, et permet d'interpréter s'il faut activer la Nitro ou pas. On va donc donner un nom à la valeur du capteur, pour la manipuler plus facilement : on créera par exemple la variable `capteurNitro` qui aura pour valeur `1023` ou `0` selon si la boîte est ouverte ou fermée.  

Ensuite, avec l'ensemble des valeurs labellisées issues des capteurs, vous allez définir la logique pour interpréter ces valeurs. Par exemple :
- Si `capteurNitro = 1023`, alors on interprète que la boîte est ouverte, donc que nous souhaitons activer la Nitro dans le jeu
- Si `capteurNitro = 0`, alors on interprète que la boîte est fermée, donc que nous n'activons pas la Nitro dans le jeu
Certains capteurs ne renvoient pas que des valeurs binaires (une valeur parmi 2 choix) mais renvoient une valeur dans une plage plus grande. Par exemple, un capteur de lumière ne renvoit pas uniquement `0` ou `1023` mais peut renvoyer tous les nombres entre 0 et 1023 : `capteurNitro` peut donc valoir `71`, `116`, `450`, `890`, `1022`…

C'est donc votre rôle de comprendre les différentes valeurs possibles, et de définir au mieux la logique d'interprétation des données. Si on affine notre exemple :
- Si `capteurNitro < 100`, alors on interprète que la boîte est ouverte (car elle reçoit au moins un tout petit peu de lumière), donc que nous souhaitons activer la Nitro dans le jeu
- Si `capteurNitro >= 100`, alors on interprète que la boîte n'est pas assez ouverte (car elle ne reçoit que très peu de lumière) ou est fermée, donc que nous n'activons pas la Nitro dans le jeu

#### Comment envoyer les actions de jeu au jeu ?

[❯❯❯ Introduction et codes d'exemple pour plonger dans Arduino et le monde des capteurs](https://github.com/dsaadesignv/arduino)

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
