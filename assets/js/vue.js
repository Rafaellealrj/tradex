var app = new Vue({
  el: "#app",
  data: {
    maiorOddPartidas: [],
    matchesGGbet: [],
    matches1xbet: [],
    matchesPari: [],
    matchesLeon: [],
    stake1: 10.00,
    selectCountry: "all",
    endpoints: [
      {
        name: "ggbet",
        url: "https://api.betting-api.com/ggbet/football/live/all",
        authorization:
          "657e0c7308ac4accbedf9887314c4506fb7ff9d7d5d84dcb9d03f9d838086bef",
      },
      {
        name: "1xbet",
        url: "https://api.betting-api.com/1xbet/football/live/all",
        authorization:
          "40bd95985ebd433ab18dd64d3880ba4bbc44c33c839f45d6b4b8039bde555dc6",
      },
      {
        name: "parimatch",
        url: "https://api.betting-api.com/parimatch/football/live/all",
        authorization:
          "a1f2f4afa9024130b70662dfbde48ec6f9e7ddae8042494e970b7fd9753a01d4",
      },
      {
        name: "leonbets",
        url: "https://api.betting-api.com/leonbets/football/live/all",
        authorization:
          "965d0e44ee5d461abde583481ba9c165f807761c2feb47828549be6513a01e74",
      },
    ],
  },

  created() {
    this.carregarDados();
  },

  methods: {
    carregarDados() {
      this.endpoints.forEach(endpoint => this.consultarApi(endpoint));
    },

    /**
     * faz cada requisição e devolve o response para a função 'verificarCasaDeAposta'
     */
    consultarApi(endpoint) {
      let config = {
        headers: { authorization: endpoint.authorization },
      };

      this.$http.get(endpoint.url, config)
                .then(response => this.verificarCasaDeAposta(response, endpoint.name))
                .catch(error => console.log(error));
    },

    verificarCasaDeAposta(response, name) {
      switch (name) {
        case "ggbet":
          this.getGGbet(response);
          break;
        case "1xbet":
          this.get1xbet(response);
          break;
        case "parimatch":
          this.getPariMatch(response);
          break;
        case "leonbets":
          this.getLeonbets(response);
          break;
      }
    },

    /**
     *  Monta as partidas da GGBET
     */
    getGGbet(response) {
      this.matchesGGbet = [];
      response.body.forEach((item) => {

        let obj = {};

        obj.data            = new Date(item.date_start).toLocaleString();
        obj.url             = item.href;
        obj.liga            = item.league.toLocaleLowerCase();
        obj.equipe_1        = item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_1    = (item.markets.win1) ? item.markets.win1.v.toFixed(2) : '0.00';
        obj.equipe_2        = item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_2    = (item.markets.win2) ? item.markets.win2.v.toFixed(2) : '0.00';
        obj.odd_empate      = (item.markets.winX) ? item.markets.winX.v.toFixed(2) : '0.00';
        obj.bs_yes          = (item.markets.bothToScore.yes) ? item.markets.bothToScore.yes.v.toFixed(2) : '0.00';
        obj.bs_no           = (item.markets.bothToScore.no) ? item.markets.bothToScore.no.v.toFixed(2) : '0.00';

        this.matchesGGbet.push(obj);
      });
      
      console.log("terminou a primeira");
      console.log(response.body);
      console.log(this.matchesGGbet)
      this.verificarMaiorPartida(this.matchesGGbet);
    },

    /**
     *  Monta as partidas da 1XBET
     */
    get1xbet(response) {
      this.matches1xbet = [];
      response.body.forEach((item) => {

        let obj = {};

        obj.data            = new Date(item.date_start).toLocaleString();
        obj.url             = item.href;
        obj.liga            = item.league.name.toLocaleLowerCase();
        obj.equipe_1        = item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_1    = (item.markets.win1) ? item.markets.win1.v.toFixed(2) : '0.00';
        obj.equipe_2        = item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_2    = (item.markets.win2) ? item.markets.win2.v.toFixed(2) : '0.00';
        obj.odd_empate      = (item.markets.winX) ? item.markets.winX.v.toFixed(2) : '0.00';
        obj.bs_yes          = (item.markets.bothToScore.yes) ? item.markets.bothToScore.yes.v.toFixed(2) : '0.00';
        obj.bs_no           = (item.markets.bothToScore.no) ? item.markets.bothToScore.no.v.toFixed(2) : '0.00';

        this.matches1xbet.push(obj);
        

      });
      console.log("terminou a segunda");
    },

    /**
     *  monta as partidas da PARIMATCH
     */
    getPariMatch(response) {
      this.matchesPari = [];
      response.body.forEach((item) => {

        let obj = {};

        obj.data            = new Date(item.actual_at).toLocaleString();
        obj.url             = item.href;
        obj.liga            = item.title.toLocaleLowerCase();
        obj.equipe_1        = item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_1    = (item.win1) ? item.win1.value.toFixed(2) : '0.00';
        obj.equipe_2        = item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_2    = (item.win2) ? item.win2.value.toFixed(2) : '0.00';
        obj.odd_empate      = (item.winX) ? item.winX.value.toFixed(2) : '0.00';
        // obj.bs_yes          = (item.bothToScore) ? item.bothToScore.yes.value : '0.00';
        // obj.bs_no           = (item.bothToScore) ? item.bothToScore.no.value : '0.00';

        this.matchesPari.push(obj);

      });

      console.log("terminou a terceira");

    },

    /**
     *  monta as partidas da LEONBETS
     */
    getLeonbets(response) {
      this.matchesLeon = [];
      response.body.forEach((item) => {

        let obj = {};

        obj.data            = new Date(item.date_start).toLocaleString();
        obj.url             = item.href;
        obj.liga            = item.country.toLocaleLowerCase();
        obj.equipe_1        = item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_1    = (item.win1) ? item.win1.value.toFixed(2) : '0.00';
        obj.equipe_2        = item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_2    = (item.win2) ? item.win2.value.toFixed(2) : '0.00';
        obj.odd_empate      = (item.winX) ? item.winX.value.toFixed(2) : '0.00';
        obj.bs_yes          = (item.bothToScore) ? item.bothToScore.yes.value : '0.00';
        obj.bs_no           = (item.bothToScore) ? item.bothToScore.no.value : '0.00';

        this.matchesLeon.push(obj);

      });
      console.log("terminou a quarta");
    },

    verificarMaiorPartida(item) {
      item.forEach((partida) => {
        let objeto = {};

        if (partida[4] > partida[6]) {
          objeto.identificador = partida.identificador;
          objeto.odd = partida.odd_equipe_1;
          objeto.name = partida.equipe_1;
          objeto.casa = "ggbet";
        } else {
          objeto.identificador = partida.identificador;
          objeto.odd = partida.odd_equipe_2;
          objeto.name = partida.equipe_2;
          objeto.casa = "ggbet";
        }

        this.maiorOddPartidas.push(objeto);
      });


    },
    retornoStake1 (stake, odd) {
      let lucro = stake * odd;
      return lucro.toFixed(2);
    },

    buscarOdd (stake, odd) { 
    
      let oddBuscada = (stake*odd) / ((stake*odd) - stake);
      return oddBuscada.toFixed(2);

    },


  },
});
