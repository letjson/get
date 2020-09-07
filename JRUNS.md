## Przyklad

przyklad jak mozna wykorzystac zapis podobny do streamowania/routowania

    
    file/http -> DOM-xpath -> Javascript (local function)/ (external file)


Rozwiazanie pozwala na kontrolowanie kazdego elemetnu
pozwalajac na uruchomienie w czasie, gdy wszystko juz zostalo zaladowane
ograniczajac skutki niezaladowanych plikow/funkcji/elementow DOM

# Commands
    
+ from (source)
+ to (source)
+ by (function for processing between)
+ as (datamodel to use)
+ sort (up|date|time)
+ filter (xpath|file|exp)
+ msg(info|warning|error|log)


# Local function

JS-script

    from("https://get.jloads.com/users.csv").to("table#users").by("LoadUsers");
  
  
JSON-config

    {  
      "from: "https://get.jloads.com/users.csv",
      "to": "table#users",
      "by": "LoadUsers"
    }
        
        
        
# External function

JS-script

    from("https://get.jloads.com/users.csv").to("table#users").by("https://get.jloads.com/load_users.js");
  
  
JSON-config

    {  
      "from: "https://get.jloads.com/users.csv",
      "to": "table#users",
      "by": "https://get.jloads.com/load_users.js"
    }
    
    
# more

      from("file:c:\dir")
        .filter()
        .xpath(expression)
        .to("jms :aQueue");
        
        
      from("file:data/inbox")
        .filter()
        .xpath("/order[not(@test)]")
        .to("jms:queue:order")


SpringRouteBuilder
https://access.redhat.com/node/2583501/fluent%20builders/Fluent%20Builders
