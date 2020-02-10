[![License Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=true)](http://www.apache.org/licenses/LICENSE-2.0)
[![gitter](https://badges.gitter.im/Join%20Chat.svg)][gitter]

# Load JS files
https://unitapi.github.io/Load/


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


        

---
[gitter]: https://gitter.im/UnitApi/community    