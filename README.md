[![License Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=true)](http://www.apache.org/licenses/LICENSE-2.0)
[![gitter](https://badges.gitter.im/Join%20Chat.svg)][gitter]

![logo.jloads.com](https://logo.jloads.com/6/cover.png)

# [Biblioteka jLoads](https://docs.jloads.com/README.md)
+ jLoads oferuje streamowanie interfejsu aplikacji w natywnym JS 

+ jLoads wspiera natywne rozwiązania, ułatwia pracę z kodem zastanym (legacy code)

+ jLoads został stworzony dla programistów szukających prostych rozwiązań, by ułatwić modularyzację aplikacji

+ jLoads wspiera proces refaktoryzacji, gdyż pozwala poprzez modularyzację ominięcie pułapek stojących za najnowszymi wersjami frameworków oraz troszczeniem się o ich aktualizacje.

+ Obecnie rozwiązanie jLoads dotyczy frontendu, ale trwają pracę nad wykorzystaniem NodeJS do wsparcia backendu.

## More ...
 + [All projects on github](https://github.com/jloads/)
 + [jLoads on github](https://github.com/jloads/get/)
 + [changelog.md](changelog.md)
 
## How to use? 

1a. [download jloads.js](https://get.jloads.com/jloads.min.js)

OR 

1b. Load to Your project


       <script src="//get.jloads.com/jloads.min.js">
           // Jloads is loading any media and content dynamically
       </script>


2. Add dependences, example with jquery and bootstrap, asynchronus, without special tags, only jloads logic to controll JS loading


       <script>
           // load content ASAP with dependencies, that jquery must be first and after that bootstrap
           jl.file({
               "//code.jquery.com/jquery-3.5.1.min.js": [
                   "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
                   "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
               ]
           });
       </script>



# Przykładowe MVP
implementacja MVP z biblioteką jLoads

### Proste przeładowanie tła, tekstu, grafiki
+ [get.jloads.com](https://get.jloads.com/)


### Formularz
+ [FaaS](https://www.faas.ovh/)
+ [faas-ovh/www: Website](https://github.com/faas-ovh/www)

### Edytor
+ [edit](https://edit.ovh/)
+ [plainedit/flat: Edit is an example on ovh domain](https://github.com/plainedit/flat)

### Aplikacja do nauki gramatyki
+ [www.gramatyka .de](https://www.gramatyka.de/)
+ [tom-sapletta-com/gramatyka-de: Nauka Gramatyki Niemieckiej poprzez matrycę](https://github.com/tom-sapletta-com/gramatyka-de)
