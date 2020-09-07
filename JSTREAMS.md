## Przyklad

przyklad jak mozna wykorzystac zapis podobny do streamowania/routowania

    
    file/http -> DOM-xpath -> Javascript-function

JS-script

    from("https://get.jloads.com/users.csv").to("table#users").by("LoadUsers");
  
  
JSON-def

    {  
      "from: https://get.jloads.com/users.csv",
      "to": "table#users",
      "by": "LoadUsers"
    }
        
