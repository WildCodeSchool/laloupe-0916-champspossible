function offreController(offreService) {

    this.offreService = offreService;

    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };

    this.load()

    this.transfert = (filtre) => {
        localStorage.setItem("filtre", filtre)
    };


    this.OpenFilter = (filtre) => {
        // console.log("if")
        if (typeof(Storage) !== "undefined") {
            document.getElementById("filtreOffre").innerHTML = localStorage.getItem("filtre");
            var mem = localStorage.getItem("filtre");
            console.log(this.offres.length);
            for (var i = 0; i < this.offres.length; i++) {
                console.log(this.offre.type)
                if (this.offres.offre.type != mem) {
                    this.offres.splice(i, 1);
                }
                return this.offres;
                console.log(this.offres)
                //
                // this.offres.filter(function(offre) {
                //   // console.log(offre)
                //     var mem =(offre.type = localStorage.getItem("filtre"))
                //     console.log(mem)
                //     return offre.type = localStorage.getItem("filtre")

                // console.log(localStorage.getItem("filtre"))
            }
        }
    }
}
