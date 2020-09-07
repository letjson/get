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
+ limit (10)


# Graph
reprezentacja graifczna tych zapytan w svg

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


# Multiple independent inputs

The simplest way to specify multiple inputs is using the multi-argument form of the from() DSL command, for example:

    from("URI1", "URI2", "URI3").to("DestinationUri");

Or you can use the following equivalent syntax:

    from("URI1").from("URI2").from("URI3").to("DestinationUri");

In both of these examples, exchanges from each of the input endpoints, URI1, URI2, and URI3, are processed independently of each other and in separate threads. In fact, you can think of the preceding route as being equivalent to the following three separate routes:

    from("URI1").to("DestinationUri");
    from("URI2").to("DestinationUri");
    from("URI3").to("DestinationUri");


# layers
## Stream layer

    from -> to 
                -> by 
                -> as
                -> filter 
                -> sort
                

## Exception layer                

+ not executed
+ executed, Failed


## Information Layer
    
+ info
+ log
+ warning
+ error
