  const txLiveEl = document.getElementById('txLive');

  const firstNames = [
  "Aaron","Abigail","Adam","Adrian","Aiden","Alex","Alexa","Alice","Amanda","Andrew","Anthony",
  "Benjamin","Bella","Blake","Brandon","Brianna","Bryan",
  "Caleb","Cameron","Caroline","Charles","Charlotte","Chloe","Christian","Christopher",
  "Daniel","David","Diana","Dominic","Dylan",
  "Edward","Elena","Elias","Elizabeth","Ella","Emily","Ethan","Eva","Evelyn",
  "Felix","Finn","Faith","Fiona","Francis",
  "Gabriel","Grace","Gavin","George","Gianna","Gregory",
  "Hannah","Harper","Henry","Hudson",
  "Isaac","Isabella","Ivan","Ivy",
  "Jack","Jackson","Jacob","James","Jason","Jasmine","Jenna","Jessica","John","Joseph","Joshua","Julia","Julian",
  "Kevin","Katherine","Kayla","Kyle",
  "Liam","Lily","Lucas","Logan","Luna","Lauren","Leo",
  "Matthew","Mason","Michael","Mia","Mila","Madison","Maria","Mark","Martin",
  "Nathan","Natalie","Noah","Nora","Nicole",
  "Oliver","Olivia","Oscar","Owen",
  "Paul","Patrick","Penelope","Peter","Phoebe",
  "Quinn","Quentin",
  "Ryan","Rebecca","Robert","Riley","Rachel","Roman",
  "Samuel","Sophia","Sebastian","Scarlett","Steven","Sofia","Samantha",
  "Thomas","Theodore","Tyler","Taylor","Tristan",
  "Ulysses","Uma",
  "Victor","Victoria","Vincent","Valerie",
  "William","Wyatt","Wesley","Willow",
  "Xavier","Ximena",
  "Yusuf","Yara",
  "Zachary","Zoe","Zane","Zara"
];


  const lastNames = [
  "Anderson","Adams","Armstrong","Alvarez",
  "Brown","Bennett","Brooks","Bailey","Barnes","Baker",
  "Clark","Carter","Collins","Campbell","Cooper","Cox","Coleman",
  "Davis","Diaz","Daniels","Duncan","Dixon",
  "Edwards","Evans","Ellis","Erikson",
  "Foster","Flores","Fisher","Ford","Franklin",
  "Garcia","Gonzalez","Gray","Green","Griffin","Gomez",
  "Harris","Hall","Hernandez","Hill","Howard","Hughes",
  "Irwin","Ingram",
  "Johnson","Jackson","Jones","James","Jenkins",
  "King","Kelly","Knight","Kim","Keller",
  "Lopez","Lewis","Long","Lee","Lane","Lawson",
  "Miller","Martinez","Moore","Mitchell","Morgan","Morris","Murphy",
  "Nelson","Nguyen","Nash","Nichols",
  "Owens","Ortiz","Oliver",
  "Parker","Phillips","Price","Peterson","Powell",
  "Quinn","Quintero",
  "Robinson","Reed","Rivera","Rogers","Russell","Ramirez",
  "Smith","Scott","Sanders","Sanchez","Stewart","Sullivan","Stone","Spencer","Snyder",
  "Taylor","Thomas","Turner","Torres",
  "Underwood",
  "Vasquez","Vaughn","Vincent",
  "Walker","White","Watson","Ward","Wood","Wright","Wilson",
  "Xu","Xander",
  "Young","York",
  "Zimmerman","Zuniga"
];

  const types = ["Deposit", "Withdrawal", "Bonus", "Profit", "Fee"];
  const statuses = [
    { key: "ok",     label: "Completed" },
    { key: "pending",label: "Pending" },
    { key: "fail",   label: "Rejected" },
  ];

  function pad2(n){ return String(n).padStart(2,'0'); }

  function timeNow(){
    const d = new Date();
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
  }

  function randInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pick(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function maskName(first, last){
    const f = first[0].toUpperCase() + "*".repeat(randInt(4,6));
    const l = last[0].toUpperCase() + "*".repeat(randInt(3,5));
    return `${f} ${l}`;
  }

  function formatMoney(n){
    return `$${n.toLocaleString('en-US')}`;
  }

  const txState = [];

  function makeTx(){
    const f = pick(firstNames);
    const l = pick(lastNames);

    const type = pick(types);
    const st = pick(statuses);

    let amount = randInt(10, 1000);
    let sign = "+";
    if (type === "Withdrawal" || type === "Fee") sign = "-";

    if (Math.random() < 0.45) {
    }

    return {
      time: timeNow(),
      name: maskName(f, l),
      type,
      statusKey: st.key,
      statusLabel: st.label,
      amountSign: sign,
      amountValue: amount
    };
  }

  function renderTx(){
    txLiveEl.innerHTML = txState.map(tx => {
      const amountText = `${tx.amountSign}${formatMoney(tx.amountValue).replace('$','')}`;
      const amountClass = tx.amountSign === "+" ? "plus" : "minus";
      return `
        <div class="txRow">
          <span>${tx.time}</span>
          <span title="${tx.name}">${tx.name}</span>
          <span>${tx.type}</span>
          <span class="txStatus ${tx.statusKey}">
            <span class="txDot"></span>${tx.statusLabel}
          </span>
          <span class="txAmount ${amountClass}">${amountText}$</span>
        </div>
      `;
    }).join('');
  }

  for(let i=0;i<6;i++){
    txState.unshift(makeTx());
  }
  renderTx();

  function scheduleNextTx(){
    const delay = randInt(7000, 15000); 
    setTimeout(() => {
      txState.unshift(makeTx());
      txState.length = 6; 
      renderTx();

      scheduleNextTx();
    }, delay);
  }

scheduleNextTx();

