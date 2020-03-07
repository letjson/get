[![License Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=true)](http://www.apache.org/licenses/LICENSE-2.0)
[![gitter](https://badges.gitter.im/Join%20Chat.svg)][gitter]

# Load JS files
https://jloads.github.io/Load/


## Apiunit.Load
rozwiązanie dla programistów szukających prostych rozwiązań
a nie wchodzących co chwilę w nowe technologie a potem wszelkie zmiany i konflikty sprawiają dużo pośrednich problemów

## Funkcjonalność
możliwe jest ładowanie dynamiczne, poprzez dodawanie przez JS odpowiednich tagów dla:

+ javascript
+ link - style
+ image, file/base64
+ zagnieżdzony html, system pluginów

### kaskadowe ładowanie plików
coś więcej niż tylko łaodwanie plików, one są ładowane w dokładnie takiej samej kolejności

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
            "domain": "//js.apiunit.com/"
        }
    })

### Cache
możliwość wyłączenia cache-owania
    
    .cacheOff()
    
    
## Przykladowa implementacja

aplikacja html 
    
     <script src="https://unitapi.github.io/Load/load.js"></script>
 

framework laravel

    {!! Html::script('https://unitapi.github.io/Load/load.js') !!}


### TODO
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
+ deploy on api.unitapi.com
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
