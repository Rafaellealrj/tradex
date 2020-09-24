var app = new Vue({
    el: "#app",
    data: {
        idPartida: [],
        maiorOddPartidas: [],
        matchesGGbet: [],
        matches1xbet: [],
        matchesPari: [],
        matchesLeon: [],
        stake1: "10.00",
        selectCountry: "all",
    },
    created() {
        this.getGGbet(),
            this.get1xbet(),
            this.getPariMatch(),
            this.getLeonbets()
    },
    methods: {
        async getGGbet() {
            var url = "https://api.betting-api.com/ggbet/football/live/all"
            this.$http.get(url, { headers: { 'Authorization': '657e0c7308ac4accbedf9887314c4506fb7ff9d7d5d84dcb9d03f9d838086bef' } })
                .then(response => {
                    this.matchesGGbet = [];
                    response.body.forEach(item => {

                        // let bigTeam1 = "";
                        // let bigTeam2 = "";

                        // item.team1.split(" ").forEach(word => {
                        //     if (word.trim().length > bigTeam1.length) {
                        //         bigTeam1 = word.trim();
                        //     }
                        // });

                        // item.team2.split(" ").forEach(word => {
                        //     if (word.trim().length > bigTeam2.length) {
                        //         bigTeam2 = word.trim();
                        //     }
                        // });

                        // // let identificador = (bigTeam1).substring(2, 0) + "#" + (bigTeam2).substring(2, 0) + "#" + item.league.substring(3, 0);
                        // this.idPartida.push(["ggbet", identificador, item.team1]);

                        // this.verificarMaiorPartida(item);

                        if (item.markets.win1 && item.markets.win2 && item.markets.winX) {
                            this.matchesGGbet.push([new Date(item.date_start).toLocaleString(), item.href, item.league.toLocaleLowerCase(), item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), item.markets.win1.v, item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), item.markets.win2.v, item.markets.winX.v]);
                        } else {
                            this.matchesGGbet.push([new Date(item.date_start).toLocaleString(), item.href, item.league.toLocaleLowerCase(), item.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, item.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, 0]);
                        }

                    });
                    console.log(response.body);

                })
                .then(() => {
                    this.verificarMaiorPartida(this.matchesGGbet);

                })
        },
        async get1xbet() {
            var url = "https://api.betting-api.com/1xbet/football/live/all"
            this.$http.get(url, { headers: { 'Authorization': "40bd95985ebd433ab18dd64d3880ba4bbc44c33c839f45d6b4b8039bde555dc6" } })
                .then(response => {
                    this.matches1xbet = [];

                    response.body.forEach(i => {

                        // let bigTeam1 = "";
                        // let bigTeam2 = "";
                        // i.team1.split(" ").forEach(word => {
                        //     if (word.trim().length > bigTeam1.length) {
                        //         bigTeam1 = word.trim();
                        //     }
                        // });
                        // i.team2.split(" ").forEach(word => {
                        //     if (word.trim().length > bigTeam2.length) {
                        //         bigTeam2 = word.trim();
                        //     }
                        // });

                        if (i.markets.win1 && i.markets.win2 && i.markets.winX) {
                            this.matches1xbet.push([new Date(i.date_start).toLocaleString(), i.href, i.league.name.toLocaleLowerCase(), i.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), i.markets.win1.v, i.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), i.markets.win2.v, i.markets.winX.v]);
                        } else {
                            this.matches1xbet.push([new Date(i.date_start).toLocaleString(), i.href, i.league.name.toLocaleLowerCase(), i.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, i.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, 0]);
                        }

                    });

                })
        },
        async getPariMatch() {
            var url = "https://api.betting-api.com/parimatch/football/live/all"
            this.$http.get(url, { headers: { 'Authorization': "a1f2f4afa9024130b70662dfbde48ec6f9e7ddae8042494e970b7fd9753a01d4" } })
                .then(response => {
                    this.matchesPari = [];
                    response.body.forEach(ix => {
                        if (ix.win1 && ix.win2 && ix.winX) {
                            this.matchesPari.push([new Date(ix.actual_at).toLocaleString(), ix.href, ix.title.toLocaleLowerCase(), ix.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), ix.win1.value, ix.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), ix.win2.value, ix.winX.value]);
                        } else {
                            this.matchesPari.push([new Date(ix.actual_at).toLocaleString(), ix.href, ix.title.toLocaleLowerCase(), ix.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, ix.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, 0]);
                        }
                    });

                })

        },
        async getLeonbets() {
            var url = "https://api.betting-api.com/leonbets/football/live/all"
            this.$http.get(url, { headers: { 'Authorization': "965d0e44ee5d461abde583481ba9c165f807761c2feb47828549be6513a01e74" } })
                .then(response => {
                    this.matchesLeon = [];
                    response.body.forEach(ixt => {
                        if (ixt.win1 && ixt.win2 && ixt.winX) {
                            this.matchesLeon.push([new Date(ixt.date_start).toLocaleString(), ixt.href, ixt.country.toLocaleLowerCase(), ixt.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), ixt.win1.value, ixt.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), ixt.win2.value, ixt.winX.value]);
                        } else {
                            this.matchesLeon.push([new Date(ixt.date_start).toLocaleString(), ixt.href, ixt.country.toLocaleLowerCase(), ixt.team1.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, ixt.team2.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').toLocaleLowerCase(), 0, 0]);
                        }
                    });
                })

        },

        verificarMaiorPartida(item) {

            item.forEach(partida => {

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
            })
        },

        oddmaior() {

            this.matchesGGbet.forEach(ggbet => {

                this.matches1xbet.forEach(xbet => {

                    this.matchesPari.forEach(pari => {

                        this.matchesLeon.forEach(leon => {

                        })
                    })
                })

            })


        }

    }

})