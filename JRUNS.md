## Przyklad

przyklad jak mozna wykorzystac zapis podobny do streamowania/routowania

    
    file/http -> DOM-xpath -> Javascript (local function)/ (external file)


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
