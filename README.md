# Unipäiväkirja

Henkilökohtainen unipäiväkirjasovellus, johon käyttäjä kirjaa yönsä — nukkumaanmeno- ja heräämisajan sekä unenlaadun — ja josta hän näkee unensa keston ja laadun kehityksen tilastoina.

Sovellus on toteutettu näyttötyönä.

## Ominaisuudet

- Kirjautuminen Google-tilillä (Firebase Authentication)
- Öiden kirjaus: päivämäärä, nukkumaanmeno- ja heräämisaika (kesto lasketaan automaattisesti), unenlaatu neliportaisella asteikolla (Huono / Kohtalainen / Hyvä / Erinomainen), sekä vapaaehtoiset lisätiedot (paikka, häiriöt yöllä, muistiinpanot)
- Öiden muokkaus ja poisto
- Etusivu: yhteenveto seurattujen öiden määrästä, keskiarvosta ja viime yöstä, sekä lista viimeisimmistä merkinnöistä
- Tilastot: keskiarvo, pisin ja lyhyin yö, unen keston kehitys viivakaaviona sekä unenlaadun jakauma, suodatettavissa 7 vrk / kaikki -valinnalla
- Jokaisen käyttäjän data on tallennettu erikseen Firestoreen (`users/{uid}/entries`) ja suojattu Firestore-säännöillä niin, ettei kukaan pääse käsiksi toisen käyttäjän tietoihin

## Teknologiat

- React 19 + Vite
- Sass (CSS-moduulit)
- React Router
- Firebase Authentication (Google-kirjautuminen) ja Firestore

## Asennus ja käyttö

Tämän projektin käyttäminen edellyttää,  että `node`- ja `npm`-sovellukset on asennettu.

1. Lataa tai kloonaa tämä repo.
2. Suorita projektikansiossa komento `npm install`.
3. Käynnistä testausympäristö komennolla `npm run test`.
4. Käynnistä kehitysympäristö komennolla `npm run dev`. 
5. Testaa sovellusta osoitteessa [http://localhost:5173](http://localhost:5173).

Sovellusta voi myös testata osoitteessa https://unipaivakirja.web.app/