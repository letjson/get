[![License Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=true)](http://www.apache.org/licenses/LICENSE-2.0)
[![gitter](https://badges.gitter.im/Join%20Chat.svg)][gitter]

# Load JS files

[jloads.github.io/Load/](https://jloads.github.io/Load/)

[load.jloads.com](https://load.jloads.com/)


## environment

npm upgrade

    npm install -g npm
 
### production
[jLoads.Load - load.jloads.com](https://load.jloads.com/)

### local
[jLoads.Load - localhost:8080](http://localhost:8080/)

start 
    
    start.bat
    
start as process in backgrund
[forever - npm](https://www.npmjs.com/package/forever)
    
    npm install forever -g
    
    start2.bat    
    forever start server.js

## jLoads.Load
rozwiązanie dla programistów szukających prostych, natywnych rozwiązań
a nie wchodzących w najnowsze frameworki i biblioteki by następnie zajmować się
usuwaniem problemów wynikających z ich zastosowania oraz troszczeniem się o aktualizacje.

## Funkcjonalność
możliwe jest ładowanie dynamiczne, poprzez dodawanie przez JS odpowiednich tagów dla:

+ javascript
+ link - style
+ image, file/base64
+ zagnieżdzony html, system pluginów

### kaskadowe ładowanie plików
coś więcej niż tylko łaodwanie plików, one są ładowane w dokładnie takiej samej kolejności
ale jako jeden plik, który pozwala na zaoszczędzenie czasu ładowania i pozwala na optymalizację bez użycia zasobów serwera.

Dzięki zastosowaniu rozproszeonej infrastruktury CDN można zwiększyć szybkość ładowania.
 
## Obecnie są dostępne 2 rozwiązania:

+ jloads.url
+ jloads.content


### jloads.url
ma za zadanie rozpoznać typ pliku po rozszerzeniu i go załadować

może zostać przetworzone, i np wszystkie pliki js wstępnie pobrane, by skrócić czas ładowania plików oddzielnie.


#### przykład
    {
      "head": [
        "//code.jquery.com/jquery-3.5.1.min.js",
        "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
        "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        "//app.wapka.pl/css/style.css"
      ],
      "body": [
        "//app.wapka.pl/html/body.html"
      ],
      "#form": [
        "//app.wapka.pl/html/create.html",
        "//app.wapka.pl/js/create.js"
      ],
      "#image": [
        "//logo.wapka.pl/wapka-300.png"
      ]
   }


### jloads.content

Aplikacja po stronie backend, która pobiera konfigurację

    
Struktura: 
    
    selector : url zasobu
    
jest przetworzona do postaci:
    
    xpath: head, body, #image
    type: js, css, html, png,
    url: oryginalny url zasobu
    
rozszerzona:
    
    url_b64: base64 (local path, konwersja z url http do BASE64.txt)
    content_md5: wygenerowane poprzez md5( content ) 
    content_b64: base64 ( TEXT to BASE64 )
    time: timestamp
    
    
#### przykład
    {
        {
            "xpath": "head"
            "type": "js"
            "content": ""
        }
      "head": [
        "//code.jquery.com/jquery-3.5.1.min.js",
        "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
        "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        "//app.wapka.pl/css/style.css"
      ],
      "body": [
        "//app.wapka.pl/html/body.html"
      ],
      "#form": [
        "//app.wapka.pl/html/create.html",
        "//app.wapka.pl/js/create.js"
      ],
      "#image": [
        "//logo.wapka.pl/wapka-300.png"
      ]
   }
   

### jloads.value

ma za zadanie załadować określoną treść w określony xpath

    xpath: value
    
tutaj jest istotne by nie zapomnieć dokładnej ścieżki, aby nie było konfliktów

to rozwiązanie dla bardziej doświadczonych użytkowników

możliwe jest załadowanie wielu treści pod jeden adres xpath
w przypadku gdy adres nie istnieje, jest w poczekalni do momentu aż pojawi się ten element w DOM tree

domyślnie dodaj element do strony

value nie jest analizowane, tylko kolejno wstrzykiwane

#### przykład
    {
        { "head.script.src": "//code.jquery.com/jquery-3.5.1.min.js" }, 
        
        { "head.script.src": "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" }, 
        
        {
            "head.link.type": "text/css",
            "head.link.rel": "stylesheet",  
            "head.link.href": "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" 
        },
        
        {
            "head.link.type": "text/css",
            "head.link.rel": "stylesheet",  
            "head.link.href": "//app.wapka.pl/css/style.css" 
        },
        
      "body": [
        "//app.wapka.pl/html/body.html"
      ],
      "#form": [
        "//app.wapka.pl/html/create.html",
        "//app.wapka.pl/js/create.js"
      ],
      "#image": [
        "//logo.wapka.pl/wapka-300.png"
      ]
    }
    


## konfiguracja
obsługiwane funkcje

+ environment:    
    + localhost
    + testing
    + stage
    + production
+ domain, zamiast podawać pełną ścieżkę,
+ target, gdzie mają być załaodowane skrypty domyślnie w head
+ delay, 
+ cache, on/off
   
### Environment
zmienne w zależności od środowiska

    .env({
        "local":{
            "domain": "//localhost:63342/"
        },
        "production":{
            "domain": "//js.jloads.com/"
        }
    })

### Cache
możliwość wyłączenia cache-owania
    
    .cacheOff()
    
    
## Przykladowa implementacja

aplikacja html 
    
     <script src="https://jloads.github.io/Load/load.js"></script>
 

framework laravel

    {!! Html::script('https://jloads.github.io/Load/load.js') !!}


### TODO

### Environment friendly
+ sprawdzać czy funkcje już istnieją, informować i blokować
+ jeśli już np biblioteka bootstrap załadowana to informować i blokować 
+ jeśli inne pliki css, czy html załadowane, informować i blokować


### Funkcje
+ informacja przy kazdej funkcji skad pochodzi i jaka to wersja.
+ ladowanie plikow z roznych zrodel w zaleznosci od wersji: local/test/cdn

### Serwer, uslugi
+ odwrocone edytowanie, forkowanie
+ tworzenie wlasnych zestawow projektow
+ historia zmian, bazowanie na repozytoriach git
    + polaczenie z gitem
        + user
        + fork
Tworzenie w locei, poprzez APi i requesty
mozna wykorzystac bezposrednio zdefiniowane API/postman
wywolanie nawet z konsolie, zeby bylo mozna latwo obrabiac kod, zmieniac, doklejac
        
mozliwosc generowania wlasnego kodu online i dolaczania do projektu
lub bazujac na obcym kodzie zmienic go i wygenerowac link w ktorym bedzie mozna
go potem dalej edytowac,  

nodejs: 
+ OpenApi
+ deploy on api.jloads.com
+ ograniczenia dla ilosci requestow z jednego IP
+ kazdy kto publikuje - za darmo
+ plany platne dla tych, ktorzy wykorzytsuja devops, 1EUR/msc | lifetime 10EUR
    + ulatwienie automatycznego deployu biblitoeki w npmjs
    + edytor online
    + funkcja copy paste dla tych, ktorzy szukaja inspiracji
    + platforma uruchamianie kodu JS
    
    
W przszlosci wapka
    + mozna wybirac licencje, mozlwiosc generowania licencji, 
    + shop, market, aplikacji sprzedawanie swojego kodu, praw
    + 

Calls:
+ generator jednego pliku dla loadera z listy, get request
    + format url:  one.js?name=version&name=version&...
+ wyswietlanie dokumentacji konkretnej biblioteki
    + format url:  doc.html?name=version&name=version&...

+ 

---
[gitter]: https://gitter.im/UnitApi/community
[gitter]: https://gitter.im/jloads/community

