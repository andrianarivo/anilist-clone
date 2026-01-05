# AniList API Mapping Reference

Ce document sert de pont entre l'interface utilisateur de l'application et l'API GraphQL d'AniList. Il répertorie quel onglet utilise quels objets et champs GraphQL.

---

## 🏠 Home (Accueil)
**Objectif** : Afficher les tendances, les nouveautés et les médias en cours de visionnage.

- **Requêtes principales** :
    - `MediaTrend` : Pour le bandeau "Most Popular" (utilisé dans `Home.tsx`).
    - `Page.mediaList(status_in: [PAUSED, CURRENT])` : Pour la section "Continue Watching".
    - `Page.media` : Avec filtres `sort: [TRENDING_DESC, POPULARITY_DESC]` pour les listes générales.
- **Objets GraphQL** :
    - `Media` : Titre, coverImage, bannerImage, averageScore, description.
    - `MediaTrend` : popularity, averageScore.

---

## 🔍 Search (Recherche)
**Objectif** : Recherche globale de médias, de personnages et de studios.

- **Requêtes principales** :
    - `Page.media(search: $search)` : Recherche d'anime/manga.
    - `Page.characters(search: $search)` : Recherche de personnages.
    - `Page.studios(search: $search)` : Recherche de studios.
- **Arguments clés** :
    - `type` : ANIME ou MANGA.
    - `format` : TV, MOVIE, OVA, etc.
    - `genre_in` : Filtrage par genres.

---

## 👥 Social (Social)
**Objectif** : Flux d'activité de la communauté.

- **Requêtes principales** :
    - `Page.activities(type: $type, isFollowing: true)` : Récupère les activités.
- **Objets GraphQL** :
    - `TextActivity` : Activités textuelles simples.
    - `ListActivity` : Mises à jour de listes (ex: "A regardé l'épisode X").
    - `MessageActivity` : Messages entre utilisateurs.

---

## 📚 Library (Bibliothèque)
**Objectif** : Gestion des listes personnelles de l'utilisateur.

- **Requêtes principales** :
    - `MediaListCollection(userName: $name, type: ANIME)` : Récupère toutes les listes d'un utilisateur groupées par statut (Planning, Current, Completed, etc.).
- **Objets GraphQL** :
    - `MediaListGroup` : Groupe de médias (ex: "Watching").
    - `MediaList` : Détails spécifiques à l'entrée de la liste (score personnel, progression).

---

## 👤 Profile (Profil)
**Objectif** : Informations sur l'utilisateur et statistiques.

- **Requêtes principales** :
    - `User(name: $name)` : Informations de base.
    - `User.statistics` : Statistiques détaillées sur les genres et les scores.
- **Objets GraphQL** :
    - `User` : avatar, bannerImage, about, statistics.

---

## 🛠️ Détails (AnimeDetails)
**Objectif** : Vue complète d'un média.

- **Requêtes principales** :
    - `Media(id: $id)` : Toutes les informations détaillées.
- **Champs importants** :
    - `characters` : Liste des personnages avec leurs doubleurs (`VoiceActor`).
    - `recommendations` : Médias similaires.
    - `relations` : Préquelles, séquelles, adaptations.
    - `studios` : Studios de production.
