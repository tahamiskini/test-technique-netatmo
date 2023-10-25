# API de récuperation de mesures de températures d’une station publique

## Description :

Cette API permet de récuperer les mesures de températures d'une station Netatmo publique cours des 7 derniers jours, puis de calculer et renvoyer des statistiques telles que les valeurs minimales, maximales et la moyenne de la température.

## Endpoint :

### http://localhost:4000/api/public-station-temperature

Pour utiliser cette API, envoyez une requête GET à cet endpoint.

## Authentification :

L'API nécessite une authentification via un jeton d'accès. Assurez-vous d'inclure un en-tête d'autorisation (`Authorization: Bearer YOUR_ACCESS_TOKEN`) dans votre requête.

## Réponse :

Exemple de réponse :

```json
{
  "minTemperature": 12.4,
  "maxTemperature": 20.9,
  "averageTemperature": 15.729296875000019
}
```
