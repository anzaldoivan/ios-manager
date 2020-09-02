const someCommonValues = ["common", "values"]

export const doSomethingWithInput = (theInput) => {
  // Do something with the input
  let loop = true
  let multiplicador = 1.05
  const x = 0
  let i = 1
  let aux = 0

  if (theInput < 50 || !theInput) {
    aux = 50
    loop = false
  }
  if (theInput >= 92) {
    aux = 92 + theInput * 0.042
    loop = false
  }
  do {
    if (theInput < 93 - i && theInput >= 92 - i) {
      aux = theInput * multiplicador
      loop = false
    } else {
      i++
      multiplicador += 0.004
    }
  } while (loop == true)

  /*
   if(theInput<40 || !theInput){
    aux = 40
     loop = false;
   }
   if(theInput>=100){
    aux = 100 + (theInput * 0.021);
     loop = false;
   }
   do {
   if(theInput<(101-i) && theInput >= (100-i) ){
    aux = theInput * multiplicador;
       loop = false;
   }else{
       i++;
       multiplicador += 0.004;
   }
   }while (loop==true);  
   */

  theInput = aux
  return theInput
}

export const justAnAlert = () => {
  alert("hello")
}

export const steamid_to_64bit = (steamID) => {
  var parts = steamID.split(":")

  var iServer = Number(parts[1])
  var iAuthID = Number(parts[2])

  var converted = "76561197960265728"

  var lastIndex = converted.length - 1

  var toAdd = iAuthID * 2 + iServer
  var toAddString = new String(toAdd)
  var addLastIndex = toAddString.length - 1

  for (var i = 0; i <= addLastIndex; i++) {
    var num = Number(toAddString.charAt(addLastIndex - i))
    var j = lastIndex - i

    do {
      var num2 = Number(converted.charAt(j))
      var sum = num + num2

      converted =
        converted.substr(0, j) + (sum % 10).toString() + converted.substr(j + 1)

      num = Math.floor(sum / 10)
      j--
    } while (num)
  }

  return converted
}

export const getSeason = (tID) => {
  let aux
  tID == "t1"
    ? (aux = "Temporada 1")
    : tID == "master"
    ? (aux = "Copa Master")
    : tID == "t2"
    ? (aux = "Temporada 2")
    : tID == "t3"
    ? (aux = "Temporada 3")
    : tID == "t4"
    ? (aux = "Temporada 4")
    : tID == "t0"
    ? (aux = "Temporada 0")
    : tID == "t5"
    ? (aux = "Temporada 5")
    : tID == "t6"
    ? (aux = "Temporada 6")
    : tID == "maradei"
    ? (aux = "Copa Maradei")
    : tID == "copaamerica"
    ? (aux = "Copa America")
    : (aux = "Total")
  tID = aux
  return tID
}

export const getTeam = (team) => {
  let theteam = team.toString().toLowerCase()
  theteam == "TEST"
    ? (theteam = "TEST")
    : theteam == "ac milanesa"
    ? (theteam = "acm")
    : theteam == "afc academia"
    ? (theteam = "afca")
    : theteam == "argentina"
    ? (theteam = "arg")
    : theteam == "bravona"
    ? (theteam = "bv")
    : theteam == "brazil"
    ? (theteam = "bra")
    : theteam == "caballeros de la birra"
    ? (theteam = "lcb")
    : theteam == "chicago me limpio"
    ? (theteam = "cml")
    : theteam == "coldchester fc"
    ? (theteam = "cufc")
    : theteam == "colchester united fc"
    ? (theteam = "cufc")
    : theteam == "cualidachi f.c"
    ? (theteam = "cacfc")
    : theteam == "dream seven"
    ? (theteam = "d7")
    : theteam == "defensores del bidon"
    ? (theteam = "cadb")
    : theteam == "defensores del doctor"
    ? (theteam = "cadd")
    : theteam == "deportivo empate"
    ? (theteam = "ude")
    : theteam == "inter"
    ? (theteam = "inter")
    : theteam == "galactic boys"
    ? (theteam = "gb")
    : theteam == "jubilados"
    ? (theteam = "jub")
    : theteam == "just fragging"
    ? (theteam = "jf")
    : theteam == "just fragging b"
    ? (theteam = "jfb")
    : theteam == "la galaxy"
    ? (theteam = "lag")
    : theteam == "layuve"
    ? (theteam = "layuve")
    : theteam == "los angeles fc"
    ? (theteam = "lafc")
    : theteam == "los magios"
    ? (theteam = "lmg")
    : theteam == "los magorditos"
    ? (theteam = "mago")
    : theteam == "meteors gaming"
    ? (theteam = "mg")
    : theteam == "meiwa"
    ? (theteam = "mfc")
    : theteam == "merca doçura"
    ? (theteam = "mds")
    : theteam == "modo diablo"
    ? (theteam = "md")
    : theteam == "musashi fc"
    ? (theteam = "mcfc")
    : theteam == "nankatsu"
    ? (theteam = "nsc")
    : theteam == "pelados pretenciosos"
    ? (theteam = "pp")
    : theteam == "peñarol"
    ? (theteam = "peñarol")
    : theteam == "painters united"
    ? (theteam = "pufc")
    : theteam == "pibes chorros"
    ? (theteam = "pcs")
    : theteam == "puro humo"
    ? (theteam = "ph")
    : theteam == "real mandril"
    ? (theteam = "rm")
    : theteam == "santa ana"
    ? (theteam = "safc")
    : theteam == "shaolin soccer"
    ? (theteam = "ss")
    : theteam == "stargazing fc"
    ? (theteam = "sgfc")
    : theteam == "underdogs united"
    ? (theteam = "udu")
    : theteam == "uruguay"
    ? (theteam = "uru")
    : theteam == "velez sarsfield"
    ? (theteam = "velez")
    : theteam == "viral team"
    ? (theteam = "viral")
    : theteam == "vorpal swords"
    ? (theteam = "vs")
    : theteam == "xsn"
    ? (theteam = "xsn")
    : theteam == "xoteiros"
    ? (theteam = "xt")
    : theteam == "xt"
    ? (theteam = "xt")
    : (theteam = "0")
  return theteam
}

export const getBanner = (bannerteam) => {
  let thebanner = bannerteam.toString().toLowerCase()
  thebanner == "TEST"
    ? (thebanner = "TEST")
    : thebanner == "ac milanesa"
    ? (thebanner = "acm")
    : thebanner == "coldchester fc"
    ? (thebanner = "ccfc")
    : thebanner == "colchester united fc"
    ? (thebanner = "ccfc")
    : thebanner == "defensores del doctor"
    ? (thebanner = "cadd")
    : thebanner == "inter"
    ? (thebanner = "inter")
    : thebanner == "galactic boys"
    ? (thebanner = "gb")
    : thebanner == "layuve"
    ? (thebanner = "layuve")
    : thebanner == "los magios"
    ? (thebanner = "lmg")
    : thebanner == "meteors gaming"
    ? (thebanner = "mg")
    : thebanner == "merca doçura"
    ? (thebanner = "mds")
    : thebanner == "musashi fc"
    ? (thebanner = "mcfc")
    : thebanner == "peñarol"
    ? (thebanner = "peñarol")
    : thebanner == "velez sarsfield"
    ? (thebanner = "velez")
    : thebanner == "viral team"
    ? (thebanner = "viral")
    : (thebanner = "0")
  return thebanner
}

export const getSkill = (steamID) => {
  const players = require("../../pages/card/players.json")
  var theskill = players.players.map((player) => {
    if (player.skill1 && player.steam === steamID) {
      return player.skill1
    }
  })
  var theskill2 = theskill.toString().split(",").join("")
  return theskill2
}

export const getPosition = (val_del, val_def, val_mca, val_mcd, CP) => {
  let pos
  if (val_def >= val_del) {
    if (val_def >= val_mca) {
      if (val_def >= val_mcd) {
        if (val_def >= CP) {
          pos = "CB"
        } else {
          pos = "GK"
        }
      } else {
        if (val_mcd >= CP) {
          pos = "MCD"
        } else {
          pos = "GK"
        }
      }
    } else {
      if (val_mca >= val_mcd) {
        if (val_mca >= CP) {
          pos = "MCA"
        } else {
          pos = "GK"
        }
      } else {
        if (val_mcd >= CP) {
          pos = "MCD"
        } else {
          pos = "GK"
        }
      }
    }
  } else {
    if (val_del >= val_mca) {
      if (val_del >= val_mcd) {
        if (val_del >= CP) {
          pos = "CF"
        } else {
          pos = "GK"
        }
      } else {
        pos = "MCD"
      }
    } else {
      if (val_mca >= val_mcd) {
        if (CP >= val_mca) {
          pos = "GK"
        } else {
          pos = "MCA"
        }
      } else {
        if (val_mcd >= CP) {
          pos = "MCD"
        } else {
          pos = "GK"
        }
      }
    }
  }
  return pos
}

export const getOverall = (val_del, val_def, val_mca, val_mcd, CP) => {
  let ovr
  if (val_def >= val_del) {
    if (val_def >= val_mca) {
      if (val_def >= val_mcd) {
        ovr = Math.round(val_def)
      } else {
        ovr = Math.round(val_mcd)
      }
    } else {
      if (val_mca >= val_mcd) {
        ovr = Math.round(val_mca)
      } else {
        ovr = Math.round(val_mcd)
      }
    }
  } else {
    if (val_del >= val_mca) {
      if (val_del >= val_mcd) {
        ovr = Math.round(val_del)
      } else {
        ovr = Math.round(val_mcd)
      }
    } else {
      if (val_mca >= val_mcd) {
        ovr = Math.round(val_mca)
      } else {
        ovr = Math.round(val_mcd)
      }
    }
  }
  if (ovr < CP) {
    ovr = Math.round(CP)
  }
  return ovr
}
