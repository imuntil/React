const local = {
  authToken:
    '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoieHh4emhpbiIsIk5pY2tOYW1lIjoieHh4emhpbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMjkzMjgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiZXhwIjoxNjIyODg2MDMxLCJpc3MiOiJodHRwczovL3Bjci5zYXRyb2tpLnRlY2giLCJhdWQiOiJodHRwczovL3Bjci5zYXRyb2tpLnRlY2gifQ.A5jxFfcdcVgoXWmBUWTfqyNsPOKsYFY3CfC1Ofh_xMQ"',
  LastEquipFilterRecord:
    '{"minLevel":4,"stockFilter":0,"typeFilter":2,"showAll":false}',
  server: 'cn',
  ClientSettings:
    '{"exportType":"v-c","exportFields":["Level","Rarity","Promotion"],"solveNormal":2,"solveHard":1,"solveHardTimes":0,"solveAreaLimit":23,"solveForecast":0,"showForecast":true,"minLevel":4,"areaSettingJp":{"solveNormal":2,"solveHard":0,"solveHardTimes":0,"solveAreaLimit":0,"solveForecast":0,"showForecast":true,"minLevel":4},"showByproduct":false,"filterByproduct":true,"autoStatusCalc":true,"showAllStatus":false,"allowAllRank":true,"applyToAll":true,"maxRank":13,"slots":4,"allowAllUnique":false,"useJpUniqueRank":false,"rankSlotSettingJp":{"allowAllRank":false,"applyToAll":true,"maxRank":18,"slots":3},"autoConsume":true,"showStockAdd":false,"showEquipsStock":false,"enableTargetSlots":false,"enableQuestEfficiency":true,"showSkillValueNo":true,"remoteSolve":false,"enableExtraStock":false,"includeExtraDrops":false,"ignoreDonation":false,"highlightUnique":true,"highlightPriority":false,"useJpCraft":false}',
  StaminaPlan_cn_29328:
    '{"userId":29328,"server":"cn","table":46,"dungeon":3,"base":250,"daily":200,"buy":0,"areaLimit":13,"questPlans":[]}',
  UserName: '"xxxzhin"',
  LastFilterRecord:
    '{"traceKey":"\\u5E38\\u7528","showSorter":true,"showTrace":true,"showFin":true,"showPos":true,"showUnique":false,"showR6":false,"showStatusSorter":true,"showPriority":false,"sorterOrder":"\\u8DDD\\u79BB \\u2191,\\u8DDD\\u79BB \\u2193,Rank \\u2193,\\u7B49\\u7EA7 \\u2193,\\u5E38\\u7528 \\u2193,\\u661F\\u7EA7 \\u2193,\\u4E13\\u6B66 \\u2193,\\u4F18\\u5148\\u7EA7 \\u2193,UID \\u2191,UID \\u2193,\\u6E38\\u620F\\u5185"}',
  stocks_cn_29328:
    '[[115611,608],[115581,328],[115551,609],[125521,393],[125401,264],[125371,243],[125341,152],[125281,141],[125252,223],[115251,319],[115222,538],[115221,525],[115132,375],[125131,319],[115102,107],[125101,82],[125072,255],[115042,140],[115041,116],[125012,353],[115011,304],[114613,571],[114612,1000],[114611,1020],[114582,510],[114581,520],[114554,168],[114553,188],[114552,700],[114551,616],[124523,560],[124522,900],[124521,660],[124491,180],[124463,490],[124462,626],[114461,630],[124433,375],[124432,600],[124431,867],[124402,600],[124401,400],[124373,302],[124372,607],[114371,626],[124344,172],[124343,259],[124342,506],[114341,137],[124312,1091],[124311,900],[124284,230],[124283,568],[114281,289],[114254,290],[124253,572],[114252,1051],[124251,540],[124224,344],[114223,650],[114222,1011],[114221,552],[114191,860],[114133,433],[114104,119],[124103,155],[114102,396],[124101,560],[124074,22],[114073,410],[114072,911],[124071,820],[114014,93],[114013,751],[114012,880],[114011,400],[114134,405],[124282,1120],[115612,700],[115582,204],[115552,716],[125311,131],[115192,128],[125191,251],[125162,78],[115161,12],[114583,268],[114194,380],[114164,201],[124163,401],[114162,920],[124161,520],[125431,171],[125372,397],[125312,171],[125282,226],[124313,880],[124044,222],[114043,600],[124042,560],[114041,900],[125522,43],[125342,58],[125253,48],[125223,208],[125193,286],[115133,176],[125103,54],[115073,111],[125043,102],[125013,111],[124192,900],[124131,1500]]',
}


Object.keys(local).forEach(k => {
  localStorage.setItem(k, local[k])
})