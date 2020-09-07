## Przyklad

przyklad jak mozna wykorzystac zapis podobny do streamowania/routowania

    
    file/http -> DOM-xpath -> Javascript (local function)/ (external file)


Rozwiazanie pozwala na kontrolowanie kazdego elemetnu
pozwalajac na uruchomienie w czasie, gdy wszystko juz zostalo zaladowane
ograniczajac skutki niezaladowanych plikow/funkcji/elementow DOM


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
.filter().xpath("/order[not(@test)]")
.to("jms:queue:order")
