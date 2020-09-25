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
      // {
      //   name: "1xbet",
      //   url: "https://api.betting-api.com/1xbet/football/live/all",
      //   authorization:
      //     "40bd95985ebd433ab18dd64d3880ba4bbc44c33c839f45d6b4b8039bde555dc6",
      // },
      // {
      //   name: "parimatch",
      //   url: "https://api.betting-api.com/parimatch/football/live/all",
      //   authorization:
      //     "a1f2f4afa9024130b70662dfbde48ec6f9e7ddae8042494e970b7fd9753a01d4",
      // },
      // {
      //   name: "leonbets",
      //   url: "https://api.betting-api.com/leonbets/football/live/all",
      //   authorization:
      //     "965d0e44ee5d461abde583481ba9c165f807761c2feb47828549be6513a01e74",
      // },
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
      response.body.forEach((item) => {
        let obj = {};

        obj.data            = new Date(item.date_start).toLocaleString();
        obj.url             = item.href;
        obj.liga            = item.league.toLocaleLowerCase();
        obj.equipe_1        = item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_1    = (item.markets.win1) ? item.markets.win1.v : '0.00';
        obj.equipe_2        = item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ").toLocaleLowerCase();
        obj.odd_equipe_2    = (item.markets.win2) ? item.markets.win2.v : '0.00';
        obj.odd_empate      = (item.markets.winX) ? item.markets.winX.v : '0.00';

        this.matchesGGbet.push(obj);
      });

      console.log("terminou a primeira");
    },

    /**
     *  Monta as partidas da 1XBET
     */
    get1xbet(response) {
      response.body.forEach((i) => {
        if (i.markets.win1 && i.markets.win2 && i.markets.winX) {
          this.matches1xbet.push([
            new Date(i.date_start).toLocaleString(),
            i.href,
            i.league.name.toLocaleLowerCase(),
            i.team1
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            i.markets.win1.v,
            i.team2
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            i.markets.win2.v,
            i.markets.winX.v,
          ]);
        } else {
          this.matches1xbet.push([
            new Date(i.date_start).toLocaleString(),
            i.href,
            i.league.name.toLocaleLowerCase(),
            i.team1
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            0,
            i.team2
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            0,
            0,
          ]);
        }
      });

      console.log("terminou a segunda");
    },

    /**
     *  monta as partidas da PARIMATCH
     */
    getPariMatch(response) {
      response.body.forEach((ix) => {
        if (ix.win1 && ix.win2 && ix.winX) {
          this.matchesPari.push([
            new Date(ix.actual_at).toLocaleString(),
            ix.href,
            ix.title.toLocaleLowerCase(),
            ix.team1
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            ix.win1.value,
            ix.team2
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            ix.win2.value,
            ix.winX.value,
          ]);
        } else {
          this.matchesPari.push([
            new Date(ix.actual_at).toLocaleString(),
            ix.href,
            ix.title.toLocaleLowerCase(),
            ix.team1
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            0,
            ix.team2
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            0,
            0,
          ]);
        }
      });

      console.log("terminou a terceira");
    },

    /**
     *  monta as partidas da LEONBETS
     */
    getLeonbets(response) {
      response.body.forEach((ixt) => {
        if (ixt.win1 && ixt.win2 && ixt.winX) {
          this.matchesLeon.push([
            new Date(ixt.date_start).toLocaleString(),
            ixt.href,
            ixt.country.toLocaleLowerCase(),
            ixt.team1
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            ixt.win1.value,
            ixt.team2
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            ixt.win2.value,
            ixt.winX.value,
          ]);
        } else {
          this.matchesLeon.push([
            new Date(ixt.date_start).toLocaleString(),
            ixt.href,
            ixt.country.toLocaleLowerCase(),
            ixt.team1
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            0,
            ixt.team2
              .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, " ")
              .toLocaleLowerCase(),
            0,
            0,
          ]);
        }
      });
      console.log("terminou a quarta");
    },

    verificarMaiorPartida(item) {
      item.forEach((partida) => {
        let objeto = {};

        if (partida[4] > partida[6]) {
          objeto.name = partida[3];
          objeto.odd = partida[4];
          objeto.casa = "ggbet";
        } else {
          objeto.name = partida[5];
          objeto.odd = partida[6];
          objeto.casa = "ggbet";
        }

        this.maiorOddPartidas.push(objeto);
      });
    },

    oddmaior() {
      this.matchesGGbet.forEach((ggbet) => {
        this.matches1xbet.forEach((xbet) => {
          this.matchesPari.forEach((pari) => {
            this.matchesLeon.forEach((leon) => {});
          });
        });
      });
    },
  },
});
