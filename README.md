# fullstackCompany
## Projectötlet
A project célja egy céges alkalmazás megalkozása, ami lehetőséget nyújt az alkalmazottak személyes adatainak tárolására, projectek managementjére, és külöböző kellékek (nyersanyagok) igényléseinek lebonyolítására akár több telephelyen.

## Fejlesztők
* Pap Gábor

* Takács László Kristóf

## Adatbázisok
* Alkalmazottak (id, jelszó, név, e-mail cím, telefonszám, fizetés, beosztás)

* Projectek(id, név, igénylő, határidő)

* Telephelyek(név, cím, típus)

* Nyersanyagok(id, név, mennyiség, hely)


## Objektumok kapcsolatai
* **Alkalmazottak - Projectek**
(n<->n)

* **Alkalmazottak - Telephelyek**
(1<->n)

* **Nyersanyagok - Telephelyek**
(1<->n)

## Szerepkörök
* Főnök
  * Nyersanyagigénylés elbírálása
  * Project létrehozása
  * Project lezárása
  * Alkalmazottak adatainak lekérdezése

* Alkalmazott
  * Nyersanyag igénylése
  * Más alkalmazottak elérhetőségének lekérdezése

* Vendég
  * Regisztráció
  * Bejelentkezés

## Adatbázis terv

![adatbázis terv](img/data.png)

## Felhasználói eset diagram

![Felhasználói eset diagram](img/UCD.png)

## Felhasznált technológiák

* Backend:

  * Nyelv: Java

  * Dependeciák:

    * Lombok

    * Spring boot Web

    * Spring boot DevTools

    * H2

    * Spring boot Security
    
## Szakterületi fogalmak

* Project
* Telephely
* Beosztás
* Igénylő
* Nyersanyag
* Igénylés

## Backend könyvtárstruktúra
* main
  * java
    * controllers - Kontroller osztályok csomagja
    * entities - Entitás osztályok csomagja
    * Enums - Enum (szerepek) csomagja
    * repositories - Tároló osztályok csomagja
    * security - Biztonsági osztályok csomagja
  * resources - Az adatbázis csomagja
* test - tesztosztályok csomagja

## Frontend könyvtárstruktúra
* e2e
  * src
    * app.e2e-spec.ts
    * app.po.ts
  * protractor.conf.js
  * tsconfig.json
* src
  * app
    * core
      * auth.guard.ts
      * auth.service.ts
      * material.service.ts
      * material.ts
      * project.service.ts
      * project.ts
      * site.service.ts
      * site.ts
      * worker.ts
    * login
      * login.component.ts
    * material
      * material.component.ts
    * material-editor
      * material-editor.component.ts
    * materials
      * materials.component.ts
    * menu
      * menu.component.ts
    * project
      * project.component.ts
    * project-editor
      * project-editor.component.ts
    * projects
      * projects.component.ts
    * register
      * register.component.ts
    * site
      * site.component.ts
    * site-editor
      * site-editor.component.ts
    * sites
      * sites.component.ts
    * app.component.ts
    * app.module.ts
  * assets
  * environments
    * environments.prod.ts
    * environments.ts
  * main.ts
  * polyfills.ts
  * test.ts

## Végpontok
* Végpontok leírása
  * GET /materials - Nyersanyagok listázása
  * GET /materials/{id} - Az adott id-jű nyersanyag megtekintése
  * POST /materials - Új nyersanyag felvétele
  * DELETE /materials/{id} - Adott id-jű nyersanyag törlése
  * GET /projects - Projectek listázása
  * GET /projects/{id} - Az adott id-jű project megtekintése
  * POST /projects - Új project létrehozása
  * PUT /projects/{id} - Az adott id-jű project módosítása
  * DELETE /projects/{id} - Adott id-jű project törlése
  * GET /projects/{id}/workers - Egy adott projectben résztvevő alkalmazottak megtekintése
  * POST /projects/{id}/workers - Egy adott projectben résztvevő alkalmazottak listájának módosítása
  * GET /sites - Telephelyek listázása
  * GET /sites/{id} - Adott id-jű telephely megtekintése
  * POST /sites - Új telephely felvétele
  * DELETE /sites/{id} Aditt id-jű telephely törlése
  * GET /sites/{id}/materials - Adott telephelyen tárolt nyersanyagok listázása
  * GET /sites/{id}/workers - Adott telephelyen dolgozó alkalmazottak megtekintése
  * POST /sites/{id}/workers - Új alkalmazott felvétele egy adott telephelyre
  * POST /workers/authenticate - Alkalmazott hitelesítése
  * GET /workers - Alkalmazottak listázása
  * GET /workers/{id} - Adott alkalmazott megtekintése
  * GET /workers/{id}/projects - Adott alkalmazott projectjeinek megtekintése
  * POST /workers/{id}/projects - Adott alkalmazott projectjeinek módosítása
  
* Egy végpont bemutatása: GET /sites
  * A felhasználó GET kérést küld a /sites végpontra, és ha tartalmaz érvényes tokent, akkor a szerver vissszaküldi a felhasználónak a telephelyek listáját

## Nem funkcionális követelmények

* Az alkalmazás hibamentessége
* A belépési rendszer biztonságossága
