function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string" );
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
}
function pick(set, n) { return new Pick(set,n); }



PennController.AddHost("https://amor.cms.hu-berlin.de/~plescaan/Master/")  //change Host
PennController.ResetPrefix(null);
//PennController.DebugOff() // use for the final version
var progressBarText = "Fortschritt"; //Changes the text of the progress bar
PennController.Sequence( "welcome",
                         "instructions",
                         "practice", "end_practice",
                         pick(list = seq("experiment_trial"),3), "break",
                         pick(list,3),
                         "post-ques", "send", "final");



//*********************************************************************************************************************************************************************************************
// INTRO & DEMOGRAPHICS
//********************************************************************************************************************************************************************************************

PennController("welcome",
               
        fullscreen()
        ,
        defaultText
            .print()
        ,       
        newText("text2", "<p>Humboldt Universit&auml;t zu Berlin, Institut f&uuml;r Deutsche Sprache und Linguistik </p>")
        .settings.center()
        .settings.css("font-style","italic")
       
        ,
        newText("text1", "<h2>Willkommen und Danke, dass Du Dir die Zeit nimmst, an unserem Experiment teilzunehmen!</h2>")
        .settings.center()
        .settings.css("font-size", "large")

        ,
        newText("browser_info", "<br> Bitte stelle sicher, dass Du das Experiment <b>nur mit Mozilla Firefox oder Google Chrome</b> durchf&uuml;hrst.")
        .settings.css("font-size", "large")
       .settings.center()
        ,
        newText("bi", "Versuche bitte <b>nicht</b>, das Experiment auf dem Tablet oder auf dem Mobiltelefon auszuf&uuml;hren, sondern nur am Laptop oder PC.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi2", "Stelle au&szlig;erdem sicher, dass Dein Browserfenster im Vollbildmodus ist.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi3", "W&auml;hle einen bequemen und ruhigen Platz f&uuml;r die n&auml;chsten 5 Minuten! Vielen Dank!")
        .settings.center()
        .settings.css("font-size", "large")
        ,        
                
        newText("br", "<br>")
        .print()
        ,        
        newButton("button1", "Start")
            .settings.center()
            .print()
            .wait()
        ,
        getText("text1")
            .remove()
       
        ,
        getText("browser_info")
        .remove()
        ,
        getText("text2")
        .remove()
        ,
        getText("bi")
        .remove()
        ,
         getText("bi2")
        .remove()
        ,
        getText("bi3")
        .remove()
        ,
        getText("br")
        .remove()
        ,       
        getButton("button1")
          .remove()
        ,
         newHtml("consentInfo", "consentInfo.html")
          .settings.center()
           .print()
          .checkboxWarning("Bitte die Checkbox abhaken um fortzufahren!")
        ,
         newButton("button2", "Fortsetzen")
         .settings.center()
         .print()
          .wait(
           getHtml("consentInfo").test.complete()
           .failure(getHtml("consentInfo").warn())
               )      
        ,
        getHtml("consentInfo")
        .remove()
        ,
        getButton("button2")
        .remove()
        ,       
        fullscreen()
        ,
               
        // Demographics begin
        newText("demo", "<p><small><i> Bevor es losgeht, brauchen wir noch ein paar Informationen von Dir. Alle personenbezogenen Angaben werden anonymisiert gespeichert und eine sp&auml;tere Zuordnung der angegebenen Daten zu Versuchspersonen wird den Forschenden nicht mehr m&ouml;glich sein."
        +" Bitte lies mehr &uuml;ber den Umgang mit den Daten in dem Informationsblatt nach (siehe unten).</i></small><p>")  
         .settings.css("font-size", "20px")
        .settings.center()
        ,
        newCanvas("democanvas", 1000, 125)
        .settings.add(0,0, getText("demo"))
        .settings.center()
        .print()
        ,
        newDropDown("age", "Bitte eine Option ausw&auml;hlen")
        .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31")
        ,
        newText("agetext", "Alter:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newCanvas("agecanvas", 1000, 40)
        .settings.add(0,0,getText("agetext"))
        .settings.add(600,2, getDropDown("age"))
        .settings.center()
        .print()
       
        ,
        newText("dominanteh", "Dominante Hand:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newDropDown("domhand","Bitte eine Option ausw&auml;hlen")
        .settings.add("rechte Hand", "linke Hand", "Ich bin beidh&auml;ndig")
        ,
        newCanvas("domhand", 1000, 40)
        .settings.add(0, 0, getText("dominanteh"))
        .settings.add(600,2, getDropDown("domhand"))
        .settings.center()
        .print()       
        ,       
        newText("sex", "Geschlecht:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
        .settings.add("weiblich", "m&auml;nnlich", "divers")
        ,
        newCanvas("sexcanvas", 1000, 40)
        .settings.add(0, 0, getText("sex"))
        .settings.add(600,3, getDropDown("sex"))
        .settings.center()
        .print()
        ,
        newText("abschluss", "H&ouml;chster Bildungsabschluss:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newDropDown("abschluss", "Bitte eine Option ausw&auml;hlen")
        .settings.add("kein Abschluss","Schulabschluss","Abitur oder gleichwertiger Abschluss","Studium ohne Abschluss","Ausbildung","Bachelor", "Master", "Promotion")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
        ,
         newCanvas("abschlusscanvas", 1000, 40)
        .settings.add(0, 0, getText("abschluss"))
        .settings.add(600,4, getDropDown("abschluss"))
        .settings.center()
        .print()
              
        ,      
        newText("nativeDE", "<b>Du bist monolingual mit Deutsch aufgewachsen.</b><br><small>(keine weitere Sprache wurde vor dem 6. Lebensjahr erworben)</small>")
        .settings.css("font-size", "20px")
        ,
        newTextInput("L2", "")
        .settings.size(200,30)
        .settings.hidden()
        ,
        newText("label input", "")
        .settings.after(getTextInput("L2"))
        ,
        newDropDown("language", "Bitte eine Option ausw&auml;hlen")
        .settings.log()
        .settings.add("Ja", "Nein, und zwar auch mit:")
        .settings.after(getText("label input"))
        .settings.callback(
            getDropDown("language")
            .test.selected("Nein, und zwar auch mit:")
            .success( getTextInput("L2").settings.visible())
            .failure( getTextInput("L2").settings.hidden())
        )
        ,
        
        newCanvas("languagecanvas", 1000, 45)
        .settings.add(0, 0, getText("nativeDE"))
        .settings.add(600, 10, getDropDown("language"))
        .settings.center()
        .print()
        ,
        newCanvas ("filler", 1,30)
        .print()
        ,
       newButton("consent","Fortsetzen")
        .settings.center()
        .print()
        .wait()
        ,
        getDropDown("age")
         .test.selected()
          .success()
          .failure(
                   newText("ageerror","Bitte gib Dein Alter an.")
                   .settings.color("red")
                   .print())   
         ,
         getDropDown("sex")
          .test.selected()
          .success()
          .failure(
                   newText("sexerror","Bitte gib Dein Geschlecht an.")
                   .settings.color("red")
                   .print())
          ,
          getDropDown("language")
          .test.selected()
               .success()
               .failure(
                   newText("langerror","Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds.")                   
                   .settings.color("red")
                   .print())      
               
          ,
           getDropDown("domhand")
               .test.selected()
               .success()
               .failure(
                   newText("domhanderr","Bitte gib Deine dominante Hand an.")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getDropDown("domhand").wait("first")
               
               ,
               getButton("consent")
               .remove()
             
               ,
               // Create new variables from input
               newVar("IDage")
               .settings.global()
               .set( getDropDown("age") )
               ,
               newVar("IDsex")
               .settings.global()
               .set( getDropDown("sex") )
               ,
               newVar("IDling")
               .settings.global()
               .set( getDropDown("language") )
               ,
               newVar("whichL2")
               .settings.global()
               .set( getTextInput("L2") )
               ,
               newVar("IDdomhand")
               .settings.global()
               .set(getDropDown("domhand"))
               
               
               
)
.log("age", getVar("IDage"))
.log("sex", getVar("IDsex"))
.log("L2", getVar("IDling"))
.log("dom_hand", getVar("IDdomhand"))


.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);


//*******************************************************************************************************************************************************************
// HOW TO BEHAVE & INSTRUCTIONS
//******************************************************************************************************************************************
PennController("instructions",
               
        fullscreen()
        ,

        newText("intro", "Vielen Dank f&uuml;r Deine Teilnahme an diesem Experiment! Das folgende Experiment besteht aus 3 Teilen: einer kurzen &Uuml;bungsrunde, dem tats&auml;chlichen Experiment und einem Post-Experiment Fragebogen. Insgesamt wird es ca. 5 Minuten in Anspruch nehmen.")
        .settings.css("font-size", "20px")
        ,
               
        newText("Remember", "Bitte denke daran, dass Du dieses Experiment <b>nur auf Deinem PC/Laptop mit Mozilla Firefox oder Google Chrome durchf&uuml;hren kannst</b>. Dein Fenster sollte im <b>Vollbildmodus</b> sein.<br> <br> Dr&uuml;cke die <b>Leertaste um fortzufahren</b>...")
        .settings.css("font-size", "20px")     
        ,
        newCanvas("introc", 900, 450)
        .settings.add(40,0, getText("intro"))
        .settings.add(40,120, getText("Remember"))
        .settings.center()
        .print()
        
        ,        
        newKey("intro", " ")
        .wait()
        ,
        getCanvas("introc")
        .remove()
        ,
        newText("precau", "<p>Weil <b>dies ein Experiment ist,</b> w&uuml;rden wir es sehr sch&auml;tzen, wenn Du die folgenden Schritte befolgen k&ouml;nntest, um Deine Konzentration zu gew&auml;hrleisten: <p><t>&nbsp;&nbsp;&nbsp;&bull; <b>schalte jegliche Musik/Audio aus</b>, die Du vielleicht h&ouml;rst<p>&nbsp;&nbsp;&nbsp;&bull; <b>verzichte darauf, w&auml;hrend des Experiments zu chatten</B> oder jegliche andere Handlungen au&szlig;er des Experiments vorzunehmen<p><t>&nbsp;&nbsp;&nbsp;&bull; stell Dein <b>Handy auf lautlos</b> und lass es mit dem Screen nach unten oder au&szlig;er Reichweite liegen<p><t>&nbsp;&nbsp;&nbsp;&bull; k&uuml;mmere Dich um das Experiment, bis es vorbei ist (es gibt kurze Pausen)<p><t>&nbsp;&nbsp;&nbsp;&bull; verhalte Dich generell so, als w&auml;rst Du in unserem Labor! <p>Diese Schritte werden dazu beitragen, dass die Daten, die wir von dir sammeln, von hoher Qualit&auml;t sind. Bitte <b>dr&uuml;cke die Leertaste</b>, wenn Du diesen Schritten zustimmst.")
        .settings.css("font-size", "20px")
        ,
        newCanvas("preccanvas",900, 450)
        .settings.add(20,0, getText("precau"))
        .settings.center()        
        .print()   
        ,
        newKey("set-up"," ")
        .wait()
        ,     
        getCanvas("preccanvas")
        .remove()
        ,
        newText("instructions_a", "<b>Deine Aufgaben w&auml;hrend des Experiments:</b><p>"
                        + "In diesem Experiment wirst du S&auml;tze &uuml;ber Menschen, Ereignisse und Berufe lesen. Jede Darstellung eines Ereignisses, die Du lesen wirst, besteht aus drei kurzen <b>S&auml;tzen</b> und zusammen bilden diese eine kleine Geschichte."
                        +" Deine Aufgabe ist es, jeden Satz einzeln, sorgf&auml;ltig und aufmerksam zu lesen und ganz am Ende die Verst&auml;ndlichkeit der gesamten Geschichte zu bewerten."
                        +"<p>(1) <b>Als erstes siehst Du den ersten Kontextsatz.</b> Lies ihn sorgf&auml;ltig durch und klicke auf die <b> Leertaste </b> um den n&auml;chsten Kontextsatz zu enth&uuml;llen."
                       )
                .settings.css("font-size", "20px")
        ,
         newText("instructions_b", "(2) <b>Sobald Du auf die Leertaste geklickt hast, wird der erste Kontextsatz verschwinden und Du wirst einen neuen Kontextsatz sehen.</b> "
                 +" Lies ihn sorgf&auml;ltig durch und klicke auf die <b> Leertaste </b> um den n&auml;chsten und letzten Satz zu enth&uuml;llen."
                       )
                .settings.css("font-size", "20px")
        ,
         newText("instructions_c",  "(3) <b>Sobald Du auf die Leertaste erneut geklickt hast, wird der zweite Kontextsatz verschwinden und Du wirst den letzten Satz sehen.</b>"
                 +" Lies ihn sorgf&auml;ltig durch und klicke auf die <b> Leertaste </b> um die Bewertungsskala f&uuml;r Verst&auml;ndlichkeit der gesamten Geschichte zu enth&uuml;llen."
                       )
                .settings.css("font-size", "20px")
        ,
         newText("instructions_d", "(4) Es ist besonders wichtig, dass Du die S&auml;tze aufmerksam liest und versuchst, Dir deren Inhalt zu merken. Am Ende jeder Geschichte wirst Du eine Bewertungsskala sehen."
                           +" <b>Bitte bewerte, wie viel Sinn die Geschichte insgesamt ergibt.</b>"
                           )
                 .settings.css("font-size", "20px")
        ,
        newText("instructions_e", "<i>Klicke auf die Leertaste um die &Uuml;bungsrunde zu starten</i>")
        .settings.css("font-size", "20px")
        .settings.center()
        ,       
        newText("context1", "e.g, <i>'Nach dem Ende des Konzerts entspannten sich die Orchestermitglieder.'</i>")
        .settings.css("font-size", "18px")
        .settings.css("font-family","courier")
        ,
        newText("context2", "e.g, <i>'Der Musikant prustete:'</i>")
        .settings.css("font-size", "18px")
        .settings.css("font-family","courier")
        ,
        newText("context3", "e.g, <i>'Wir wollen doch mal Luft schnappen.'</i>")
        .settings.css("font-size", "18px")
        .settings.css("font-family","courier")
        ,
        newCanvas("instruccanvas",1000, 500)
        .settings.add(20,0, getText("instructions_a"))  // added first set of instructions
        .settings.add(30,280, getText("context1"))      // added the first context sentence
        .settings.center()
        .print()
        ,
        newKey("con"," ")
        .wait()
        ,
        getCanvas("instruccanvas")
       .remove( getText("context1"))  //removed 1st sentence
        .remove( getText("instructions_a")) //removes 1st instructions
        ,
        getCanvas("instruccanvas",1000, 500)
        .settings.add(20,150, getText("instructions_b"))  //added the second set of instructions
        .settings.add(30,280, getText("context2"))      //added the second context sentence
        .settings.center()
        .print()
        ,
        newKey("con1"," ")
        .wait()
        
        ,
        getCanvas("instruccanvas")
       .remove( getText("context2"))   //removed 2nd sentence
        .remove( getText("instructions_b"))//removes 2nd instructions
        ,
        getCanvas("instruccanvas",1000, 500)
        .settings.add(20,150, getText("instructions_c"))   //added the second set of instructions
        .settings.add(30,280, getText("context3"))       //added the second context sentence 
        .settings.center()
        .print()
        ,
        newKey("con2"," ")
        .wait()
        ,
        getCanvas("instruccanvas")
       .remove( getText("context3"))  //removed 1st sentence
       .remove( getText("instructions_c")) //removes 1st instructions
        ,
        newScale("comprehensibility", "1", "2", "3", "4", "5", "6", "7")
       .settings.before( newText("left", "die Geschichte ergibt keinen Sinn   ").settings.css("font-size", "17px").settings.css("font-family","courier"))
       .settings.after( newText("right", "   die Geschichte ergibt durchaus Sinn").settings.css("font-size", "17px").settings.css("font-family","courier"))
       .settings.center()
        ,
        getCanvas("instruccanvas")
        .settings.add(20,100, getText("instructions_d"))   //added the second set of instructions
        .settings.add(30,200, getScale("comprehensibility"))       //added the second context sentence
        .settings.add(250,300, getText("instructions_e")) 
        .settings.center()
        .print()
        ,
        newKey("con3"," ")
        .wait()
        ,
        getCanvas("instruccanvas")
       .remove( getScale("comprehensibility"))  //removed 1st sentence
       .remove( getText("instructions_d")) //removes 1st instructions
       .remove( getText("instructions_e"))
        
        );

//************************************************************
// PRACTICE TRIALS
//************************************************************
PennController.Template( PennController.GetTable("test_list.csv")
                         .filter("itemType" , "practice")
                         ,
                         variable => ["practice",
                                      
                                      "PennController", PennController(
                                       fullscreen()
                                       ,
                                       defaultText
                                       .settings.css("font-family","courier")
                                       ,   
                                       //CONTEXT SENTENCE 1
                                       // dots
                                       newText("start", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start")
                                       .remove()
                                       ,
                                       // context sentence
                                       newText ("read_ctxt","<i>Lies bitte den Kontextsatz aufmerksam durch. Wenn Du fertig bist, dr&uuml;cke auf die Leertaste um den n&auml;chsten Satz zu enth&uuml;llen</i>")
                                      .settings.css("font-size", "18px")
                                      .settings.center()
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .print(50,200)
                                      ,
                                      newText("ctxt", variable.context1) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                     
                                      ,
                                      newKey("after_ctxt1", " ")
                                      .wait()
                                      .log()
                                      ,
                                      getText("read_ctxt")
                                      .remove()
                                      ,
                                      getText("ctxt")
                                      .remove()
                                      ,
                                    
                                      //CONTEXT SENTENCE 2
                                       // dots
                                       newText("start2", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start2")
                                       .remove()
                                       ,
                                       // context sentence
                                       newText ("read_ctxt","<i>Lies bitte den Kontextsatz aufmerksam durch. Wenn Du fertig bist, dr&uuml;cke auf die Leertaste um den n&auml;chsten Satz zu enth&uuml;llen</i>")
                                      .settings.css("font-size", "18px")
                                      .settings.center()
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .print(50,200)
                                      ,
                                      newText("ctxt2", variable.context2) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      
                                      ,
                                      newKey("after_ctxt2", " ")
                                      .wait()
                                      .log()
                                      ,
                                      getText("read_ctxt2")
                                      .remove()
                                      ,
                                      getText("ctxt2")
                                      .remove()
                                      ,
                                      //TARGET SENTENCE
                                      // dots
                                       newText("start3", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start3")
                                       .remove()
                                       ,
                                       // context sentence
                                       newText ("read_ctxt3","<i>Lies bitte den Kontextsatz aufmerksam durch. Wenn Du fertig bist, dr&uuml;cke auf die Leertaste um die Bewertungsskala zu enth&uuml;llen</i>")
                                      .settings.css("font-size", "18px")
                                      .settings.center()
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .print(50,200)
                                      ,
                                      newText("ctxt3", variable.critical) 
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240) 
                                      ,
                                      newKey("after_ctxt2", " ")
                                      .wait()
                                      .log()
                                      ,
                                      getText("read_ctxt3")
                                      .remove()
                                      ,
                                      getText("ctxt3")
                                      .remove()
                                      ,
                                      newText("<br><br><br><b>Wie verst&auml;ndlich war die vorher gelesene Geschichte insgesamt?</b><br><br><br>")
                                      .settings.css("font-size", "20px")
                                      .settings.center()
                                      .print()
                                    //  .print(375,250)
                                      ,
                                       newText ("choose","<i>Bewerte bitte die Verst&auml;ndlichkeit der zuvor gelesenen Geschichte mittels der Bewertungsskala. Wenn Du fertig bist, validiere deine Antwort um fortzufahren</i><br><br>")
                                      .settings.css("font-size", "18px")
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .settings.center()
                                      .print()
                                    //  .print(220,320)
                                      ,
                                      newScale("comprehensibility_1", "1", "2", "3", "4", "5", "6", "7")
                                      .settings.before( newText("left1", "die Geschichte ergibt keinen Sinn   ").settings.css("font-size", "19px").settings.css("font-family","courier"))
                                      .settings.after(newText("right1", "   die Geschichte ergibt durchaus Sinn").settings.css("font-size", "19px").settings.css("font-family","courier"))
                                      .settings.center()
                                      .print()
                                     // .print(280,380)
                                      ,
                                      newCanvas ("filler1", 1,25)
                                      .print()
                                      ,
                                      
                                      newButton("validation", "Best&auml;tigen")
                                      .settings.center()
                                      //.print(715,420)
                                      .print()
                                      .wait( getScale("comprehensibility_1").test.selected()
                                                                              .failure(
                                                                                newText("timedout","<b>Bitte bewerte die S&auml;tze anhand der Bewertungsskala!</b>")
                                                                                 .settings.css("font-size", "19px")
                                                                                 .settings.css("font-family","courier")
                                                                                 .settings.color("red")
                                                                                 .settings.center()
                                                                                 .print()
   
                                                                                  
                                                                              ) )
                                      
                                      
                                      
                                      
                                      
                                      )
                                      //log stuff

                                     ]

                        );


//**********************************************************************
// EXPERIMENTAL TRIALS
//**********************************************************************

PennController.Template( PennController.GetTable("test_list.csv")
                         .filter("itemType" , "critical")
                         ,
                         variable => ["experiment_trial",
                                      
                                      "PennController", PennController(
                                       fullscreen()
                                       ,
                                       defaultText
                                       .settings.css("font-family","courier")
                                       ,   
                                       //CONTEXT SENTENCE 1
                                       // dots
                                       newText("start", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start")
                                       .remove()
                                       ,
                                       
                                      newText("ctxt", variable.context1) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                     
                                      ,
                                      newKey("after_ctxt1", " ")
                                      .wait()
                                      .log()
                                      
                                      ,
                                      getText("ctxt")
                                      .remove()
                                      ,
                                    
                                      //CONTEXT SENTENCE 2
                                       // dots
                                       newText("start2", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start2")
                                       .remove()
                                       ,
                                       
                                      newText("ctxt2", variable.context2) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      
                                      ,
                                      newKey("after_ctxt2", " ")
                                      .wait()
                                      .log()
                                      
                                      ,
                                      getText("ctxt2")
                                      .remove()
                                      ,
                                      //TARGET SENTENCE
                                      // dots
                                       newText("start3", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start3")
                                       .remove()
                                       
                                      ,
                                      newText("ctxt3", variable.critical)
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      ,
                                      newKey("after_ctxt2", " ")
                                      .wait()
                                      .log()
                                      
                                      ,
                                      getText("ctxt3")
                                      .remove()
                                      ,
                                      newText("<br><br><br><b>Wie verst&auml;ndlich war die vorher gelesene Geschichte insgesamt?</b><br><br><br>")
                                      .settings.css("font-size", "20px")
                                      .settings.center()
                                      //.print(375,250)
                                      .print()
                                      ,
                                       
                                      newScale("comprehensibility_1", "1", "2", "3", "4", "5", "6", "7")
                                      .settings.before( newText("left1", "die Geschichte ergibt keinen Sinn   ").settings.css("font-size", "19px").settings.css("font-family","courier"))
                                      .settings.after(newText("right1", "   die Geschichte ergibt durchaus Sinn").settings.css("font-size", "19px").settings.css("font-family","courier"))
                                      .settings.center()
                                      .print()
                                      //.print(280,320)
                                     
                                      ,
                                      newCanvas ("filler1", 1,18)
                                      .print()
                                      ,
                                      newButton("validation", "Best&auml;tigen")
                                      .settings.center()
                                      .print()
                                      //.print(715,420)
                                      .wait( getScale("comprehensibility_1").test.selected()
                                                                              .failure(
                                                                                newText("timedout","<br><br><br><b>Bitte bewerte die S&auml;tze anhand der Bewertungsskala!</b>")
                                                                                 .settings.css("font-size", "19px")
                                                                                 .settings.css("font-family","courier")
                                                                                 .settings.color("red")
                                                                                 .settings.center()
                                                                                 .print()
                                                                                 //.print(480,470)
                                                                                 
  
                                                                                  
                                                                              ) )
                                      
                                      
                                      
                                      
                                      
                                      )
                                      //log stuff

                                     ]

                        );


//*******************************************************************************************************************************************************************
// END of PRACTICE
//******************************************************************************************************************************************
PennController( "end_practice" ,
                 
                newText("end_practice", "<p> <i>Das ist das Ende der &Uuml;bungsphase! Das Experiment beginnt, sobald Du die Leertaste dr&uuml;ckst!</i> </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                         .settings.center()
                         .print()

                ,
                
                newKey("end_pract", " ")
                .wait()
                .log()
                ,  
               
                getText("end_practice")
                .remove()
                ,
                newTimer(3000)
                .start()
                .wait()
                          
               )   
    
 

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// TAKE A BREAK 
//******************************************************************************************************************************************
PennController( "break" ,
                
               
                newText("break_text", "<p><b>Zeit f&uuml;r die letzte Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen.Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                 newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,

                getKey("continue_exp")
                .remove()   
                ,
                newText("continue_exp_final", "<br><br><br><br>Dr&uuml;cke die <b>Leertaste</b> noch einmal, um das Experiment zu starten."
                       )
               .settings.css("font-size", "25px")
               .settings.center()
               .print()  
              
                ,
                newKey("end_break", " ")
                .wait()
                .log()              
                ,
                getText("continue_exp_final")
                .remove()
                ,
                newTimer(3000)
                .start()
                .wait()                   
               )   
    
    .log("type", "break")
    

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);





//*******************************************************************************************************************************************************************
// End of Experiment
//******************************************************************************************************************************************
PennController( "end_exp" ,
                 newText("end_exp","<p> Das ist das Ende der Experimentphase! Als n&auml;chstes kommt einen kurzen Post-Experiment Fragebogen. </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                         .settings.center()
                         .print()

                ,
                
                newKey("end_exp", " ")
                .wait()
                .log()
                ,  
                
                getText("end_exp")
                .remove()
                           
               )   
    
 

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//*******************************************************************************************************************************************************************
// POST EXPERIMENT QUESTIONNAIRE
//******************************************************************************************************************************************

PennController("post-ques",
               newText("post-instruc", "Wir m&ouml;chten Dich darum bitten, noch ein paar Fragen zum Experiment zu beantworten. <br>Deine Antworten sollten kurz, aber informativ sein.<p><p>")
               .settings.center()
               .settings.bold()
               .print()
               ,
               // Q1
               newText("notice", "1. Gibt es etwas, das Dir w&auml;hrend des Experimentes aufgefallen ist? (Irgendwelche Muster/Regelm&auml;&szlig;igkeiten/etwas Seltsames oder &Uuml;berraschendes)")
               .settings.center()
               .print()
              
               ,
               newTextInput("notice")
               .size(600,50)
               .settings.center()
               .print()
               .log()
               ,
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,
               newButton("next1", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next1")
               .remove()
               ,
               // Q2
               newText("about", "2. K&ouml;nntest Du erraten, worum es bei dem Experiment ging?")
               .settings.center()
               .print()
               ,
               newTextInput("about")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,            
               newButton("next2", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next2")
               .remove()
               ,
               //Q3
               newText("hard", "3. Gab es etwas besonders Schwieriges an dem Experiment?")
               .settings.center()
               .print()
               ,
               newTextInput("hard","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,     
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next3", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next3")
               .remove()
               ,
               // Q4
               newText("strategy", "4. Hast Du w&auml;hrend des Experiments irgendwelche Strategien entwickelt? Wenn ja, bitte erl&auml;utern.")
               .settings.center()
               .print()
               ,
               newTextInput("strategy","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,              
               newButton("next4", "Fertig!")
               .settings.center()
               .print()
               .wait()
               ,
               // create Vars
               newVar("notice") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("notice") )
               ,
               newVar("about") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("about") )
               ,
               newVar("hard") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("hard") )
               ,
               newVar("strategy") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("strategy") )
 
              )
    
//*******************************************************************************************************************************************************************
// SEND THE RESULTS TO THE SERVER
//******************************************************************************************************************************************
                            
    PennController.SendResults( "send" ); // send results to the server before participants see the actual end of the experiment
                            
                            
//*******************************************************************************************************************************************************************
// THKS & BYE
//*******************************************************************************************************************************************************************                      
                            
  PennController.Template(PennController.GetTable( "validation.csv")// change this line for the appropriate experimental list
                          ,
                         variable => PennController( "final"
                         ,
                         
                         newText("<p> Das ist das Ende des Experimentes. Vielen Dank f&uuml;r Deine Teilnahme! </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p>Bitte kopiere den Code und gib ihn in dem Clickworker-Formular ein, um Deine Teilnahme zu best&auml;tigen und die Bezahlung zu erhalten. </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p>Wichtig: Behandle diesen Code vertraulich und gib ihn nicht an eine andere Person weiter! </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p><b>"+variable.val_code+"</b></p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "30px")
                         .settings.center()
                         .print()
                         ,
                         
        
                        newButton("void")
                         .wait()                            
                                                  
                         )   
                        .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                        .setOption("hideProgressBar", true)
                            );

